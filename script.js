/* =========================================================
   TAYA IA V20 — FRONTEND COMPLET
   By Maruce Soldado 🇬🇳

   Backend API :
   https://taya-ai-api.onrender.com/api
   ========================================================= */

"use strict";

/* ================= CONFIGURATION ================= */

const API_BASE = "https://taya-ai-api.onrender.com/api";

const STORAGE = {
  token: "taya_v20_token",
  user: "taya_v20_user",
  theme: "taya_v20_theme"
};

let currentUser = null;
let authToken = localStorage.getItem(STORAGE.token);
let currentMessages = [];
let pendingFile = null;
let abortController = null;
let isGenerating = false;
let mediaRecorder = null;
let audioChunks = [];
let presenceTimer = null;
let adminRefreshTimer = null;

/* ================= OUTILS ================= */

function $(id) {
  return document.getElementById(id);
}

function toast(message) {
  const container = $("toastContainer");

  if (!container) {
    console.log(message);
    return;
  }

  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  container.appendChild(item);

  setTimeout(() => item.remove(), 4000);
}

async function api(path, options = {}) {
  const headers = {
    ...(options.headers || {})
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const contentType =
    response.headers.get("content-type") || "";

  let data;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : "") ||
      `Erreur serveur (${response.status})`;

    throw new Error(message);
  }

  return data;
}

function saveSession(token, user) {
  authToken = token;
  currentUser = user;

  localStorage.setItem(STORAGE.token, token);
  localStorage.setItem(
    STORAGE.user,
    JSON.stringify(user)
  );
}

function clearSession() {
  authToken = null;
  currentUser = null;

  localStorage.removeItem(STORAGE.token);
  localStorage.removeItem(STORAGE.user);

  stopPresence();
  stopAdminRefresh();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function getUserName() {
  return (
    currentUser?.name ||
    currentUser?.full_name ||
    "Utilisateur"
  );
}

function getInitial(name) {
  return String(name || "T")
    .trim()
    .charAt(0)
    .toUpperCase();
}

function formatDate(date) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleString("fr-FR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

function setText(id, value) {
  const element = $(id);

  if (element) {
    element.textContent = value;
  }
}

function setHTML(id, value) {
  const element = $(id);

  if (element) {
    element.innerHTML = value;
  }
}

/* ================= AUTHENTIFICATION ================= */

function switchAuth(mode) {
  const register = mode === "register";

  $("loginTab")?.classList.toggle(
    "active",
    !register
  );

  $("registerTab")?.classList.toggle(
    "active",
    register
  );

  $("nameField")?.classList.toggle(
    "hidden",
    !register
  );

  $("confirmField")?.classList.toggle(
    "hidden",
    !register
  );

  setText(
    "authTitle",
    register ? "Créer un compte" : "Connexion"
  );

  setText(
    "authSubmit",
    register ? "Créer mon compte" : "Se connecter"
  );

  setText("authError", "");

  if ($("authPassword")) {
    $("authPassword").autocomplete = register
      ? "new-password"
      : "current-password";
  }
}

async function submitAuth(event) {
  event.preventDefault();

  const button = $("authSubmit");
  const error = $("authError");

  if (!button || !error) return;

  error.textContent = "";

  const isRegister =
    $("registerTab")?.classList.contains("active");

  const phone = $("authPhone")?.value.trim();
  const password = $("authPassword")?.value;

  if (!phone || !password) {
    error.textContent =
      "Remplis les champs obligatoires.";
    return;
  }

  if (isRegister) {
    const name = $("authName")?.value.trim();
    const confirm = $("authConfirm")?.value;

    if (!name) {
      error.textContent = "Entre ton nom complet.";
      return;
    }

    if (password.length < 6) {
      error.textContent =
        "Le mot de passe doit contenir au moins 6 caractères.";
      return;
    }

    if (password !== confirm) {
      error.textContent =
        "Les deux mots de passe ne correspondent pas.";
      return;
    }
  }

  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Connexion en cours...";

  try {
    const endpoint = isRegister
      ? "/auth/register"
      : "/auth/login";

    const body = isRegister
      ? {
          name: $("authName").value.trim(),
          phone,
          password
        }
      : {
          phone,
          password
        };

    const result = await api(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });

    if (!result.token || !result.user) {
      throw new Error(
        "Le serveur n'a pas retourné les informations du compte."
      );
    }

    saveSession(result.token, result.user);

    if ($("authPassword")) {
      $("authPassword").value = "";
    }

    if ($("authConfirm")) {
      $("authConfirm").value = "";
    }

    openApplication();

    if (isRegister && result.recovery_code) {
      alert(
        "Ton compte TAYA IA a été créé !\n\n" +
        "Ton code de récupération est :\n\n" +
        result.recovery_code +
        "\n\nConserve-le dans un endroit sûr."
      );
    } else {
      toast("Connexion réussie !");
    }

  } catch (err) {
    error.textContent =
      err.message || "Impossible de se connecter.";
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function checkSession() {
  if (!authToken) {
    showAuth();
    return;
  }

  try {
    const result = await api("/auth/me");

    currentUser = result.user || result;

    localStorage.setItem(
      STORAGE.user,
      JSON.stringify(currentUser)
    );

    openApplication();

  } catch (err) {
    clearSession();
    showAuth();
  }
}

function showAuth() {
  $("authScreen")?.classList.remove("hidden");
  $("app")?.classList.add("hidden");
}

function openApplication() {
  $("authScreen")?.classList.add("hidden");
  $("app")?.classList.remove("hidden");

  updateUserInterface();
  applySavedTheme();

  showPage("home");

  loadHistory();
  loadMemory();
  startPresence();

  if (isAdmin()) {
    $("adminNav")?.classList.remove("hidden");
    renderAdmin();
    startAdminRefresh();
  } else {
    $("adminNav")?.classList.add("hidden");
  }

  loadContactMessages();
}

function logout() {
  if (!confirm("Veux-tu vraiment te déconnecter ?")) {
    return;
  }

  clearSession();

  currentMessages = [];
  pendingFile = null;

  setHTML("messages", "");

  showAuth();

  toast("Déconnexion effectuée.");
}

function updateUserInterface() {
  const name = getUserName();
  const phone = currentUser?.phone || "";

  setText("userName", name);
  setText("userPhone", phone);
  setText("welcomeName", name);
  setText("userAvatar", getInitial(name));

  if (isAdmin()) {
    $("adminNav")?.classList.remove("hidden");
  }
}

function isAdmin() {
  return (
    currentUser?.role === "admin" ||
    currentUser?.role === "administrator"
  );
}

/* ================= PRÉSENCE UTILISATEUR ================= */

/*
  IMPORTANT :
  Le backend actuel doit être complété avec :
  POST /api/presence/heartbeat
  GET  /api/admin/presence

  Tant que ces routes ne sont pas ajoutées,
  le compteur des utilisateurs connectés restera indisponible.
*/

async function sendPresenceHeartbeat() {
  if (!authToken) return;

  try {
    await api("/presence/heartbeat", {
      method: "POST",
      body: JSON.stringify({})
    });
  } catch (err) {
    // La route sera activée lors de la mise à jour du backend.
  }
}

function startPresence() {
  stopPresence();

  sendPresenceHeartbeat();

  presenceTimer = setInterval(() => {
    sendPresenceHeartbeat();
  }, 45000);
}

function stopPresence() {
  if (presenceTimer) {
    clearInterval(presenceTimer);
    presenceTimer = null;
  }
}

/* ================= NAVIGATION ================= */

function showPage(page) {
  const pages = [
    "home",
    "chat",
    "memory",
    "contact",
    "admin",
    "settings"
  ];

  if (!pages.includes(page)) return;

  if (page === "admin" && !isAdmin()) {
    toast("Accès réservé à l'administration.");
    return;
  }

  pages.forEach(name => {
    const element = $(name + "Page");

    if (element) {
      element.classList.toggle(
        "active",
        name === page
      );
    }
  });

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });

  const titles = {
    home: "Accueil",
    chat: "Assistant IA",
    memory: "Ma mémoire",
    contact: "Contacter Maruce",
    admin: "Administration",
    settings: "Paramètres"
  };

  setText("topTitle", titles[page] || "TAYA IA");

  $("backButton")?.classList.toggle(
    "hidden",
    page === "home"
  );

  toggleSidebar(false);

  if (page === "admin") {
    renderAdmin();
  }

  if (page === "contact") {
    loadContactMessages();
  }

  if (page === "chat") {
    setTimeout(() => {
      $("messageInput")?.focus();
    }, 100);
  }
}

function goBack() {
  showPage("home");
}

function toggleSidebar(force) {
  const sidebar = $("sidebar");
  const overlay = $("sidebarOverlay");

  if (!sidebar) return;

  const shouldOpen = typeof force === "boolean"
    ? force
    : !sidebar.classList.contains("open");

  sidebar.classList.toggle("open", shouldOpen);
  overlay?.classList.toggle("show", shouldOpen);
}

/* ================= THÈME ================= */

function applySavedTheme() {
  const theme =
    localStorage.getItem(STORAGE.theme) || "dark";

  document.body.classList.toggle(
    "light",
    theme === "light"
  );
}

function toggleTheme() {
  const light =
    !document.body.classList.contains("light");

  document.body.classList.toggle("light", light);

  localStorage.setItem(
    STORAGE.theme,
    light ? "light" : "dark"
  );
}

/* ================= CONVERSATIONS ================= */

function newChat() {
  currentMessages = [];

  setHTML("messages", "");

  $("welcomeScreen")?.classList.remove("hidden");

  if ($("messageInput")) {
    $("messageInput").value = "";
  }

  pendingFile = null;

  if ($("fileInput")) {
    $("fileInput").value = "";
  }

  showPage("chat");
}

function newChatWithPrompt(prompt) {
  newChat();

  if ($("messageInput")) {
    $("messageInput").value = prompt;
  }

  setTimeout(() => sendMessage(), 100);
}

function usePrompt(prompt) {
  if (!$("messageInput")) return;

  $("messageInput").value = prompt;
  sendMessage();
}

function handleComposerKey(event) {
  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {
    event.preventDefault();
    sendMessage();
  }
}

function renderMarkdown(text) {
  let html;

  if (window.marked) {
    html = window.marked.parse(String(text || ""));
  } else {
    html = escapeHTML(text).replace(/\n/g, "<br>");
  }

  if (window.DOMPurify) {
    return window.DOMPurify.sanitize(html);
  }

  return escapeHTML(text).replace(/\n/g, "<br>");
}

function addMessage(role, content) {
  const container = $("messages");

  if (!container) return null;

  $("welcomeScreen")?.classList.add("hidden");

  const message = document.createElement("div");
  message.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";

  avatar.textContent = role === "user"
    ? getInitial(getUserName())
    : "T";

  const bubble = document.createElement("div");
  bubble.className = "message-content";

  if (role === "assistant") {
    bubble.innerHTML = renderMarkdown(content);

    const speakButton = document.createElement("button");
    speakButton.className = "secondary-button";
    speakButton.textContent = "🔊 Écouter";
    speakButton.style.marginTop = "12px";

    speakButton.addEventListener("click", () => {
      speakText(content);
    });

    bubble.appendChild(
      document.createElement("br")
    );

    bubble.appendChild(speakButton);
  } else {
    bubble.textContent = content;
  }

  if (role === "user") {
    message.append(bubble, avatar);
  } else {
    message.append(avatar, bubble);
  }

  container.appendChild(message);
  container.scrollTop = container.scrollHeight;

  return message;
}

/* ================= ENVOI DES MESSAGES ================= */

function needsWebSearch(message) {
  return /\b(recherche|cherche sur internet|sur le web|actualité|actualités|aujourd'hui|aujourd’hui|cette semaine|dernier|dernière|récent|récente|météo|prix actuel|news|latest|today|current)\b/i.test(message);
}

async function sendMessage() {
  if (isGenerating) return;

  const input = $("messageInput");

  if (!input) return;

  const message = input.value.trim();
  const file = pendingFile;

  if (!message && !file) return;

  if (file && file.type.startsWith("image/")) {
    await sendImage(
      file,
      message || "Analyse cette image."
    );
    return;
  }

  if (
    file &&
    file.type === "application/pdf"
  ) {
    await sendPDF(
      file,
      message || "Lis et analyse ce document PDF."
    );
    return;
  }

  if (file && file.type === "text/plain") {
    try {
      const text = await file.text();

      input.value = "";
      pendingFile = null;

      if ($("fileInput")) {
        $("fileInput").value = "";
      }

      await sendTextMessage(
        message
          ? `${message}\n\nContenu du fichier :\n${text}`
          : `Lis et analyse ce fichier :\n\n${text}`
      );
    } catch (err) {
      toast("Impossible de lire ce fichier.");
    }

    return;
  }

  if (file) {
    toast("Format de fichier non pris en charge.");
    return;
  }

  await sendTextMessage(message);
}

async function sendTextMessage(message) {
  if (!message || isGenerating) return;

  if ($("messageInput")) {
    $("messageInput").value = "";
  }

  currentMessages.push({
    role: "user",
    content: message
  });

  addMessage("user", message);

  isGenerating = true;
  setGenerationUI(true);

  const loading = addMessage(
    "assistant",
    "TAYA IA réfléchit..."
  );

  abortController = new AbortController();

  try {
    const result = await api("/chat", {
      method: "POST",
      signal: abortController.signal,
      body: JSON.stringify({
        message,
        messages: currentMessages.slice(-20),
        web_search: needsWebSearch(message)
      })
    });

    const answer = result.answer || result.message;

    if (!answer) {
      throw new Error(
        "Le serveur n'a pas retourné de réponse."
      );
    }

    loading?.remove();

    currentMessages.push({
      role: "assistant",
      content: answer
    });

    addMessage("assistant", answer);

    if (result.web_search) {
      toast("Réponse avec recherche Web.");
    }

    loadHistory();

  } catch (err) {
    loading?.remove();

    if (err.name === "AbortError") {
      addMessage("assistant", "Génération arrêtée.");
    } else {
      addMessage(
        "assistant",
        `Une erreur est survenue : ${err.message}\n\nVérifie que ton backend Render fonctionne.`
      );
    }

  } finally {
    isGenerating = false;
    abortController = null;
    setGenerationUI(false);
  }
}

/* ================= IMAGES ================= */

async function sendImage(file, message) {
  if (isGenerating) return;

  if (file.size > 8 * 1024 * 1024) {
    toast("L'image dépasse la limite de 8 Mo.");
    return;
  }

  isGenerating = true;
  setGenerationUI(true);

  const loading = addMessage(
    "assistant",
    "Analyse de l'image en cours..."
  );

  addMessage("user", message);

  try {
    const base64 = await fileToBase64(file);

    const result = await api("/chat/image", {
      method: "POST",
      body: JSON.stringify({
        image_base64: base64,
        mime_type: file.type,
        message
      })
    });

    const answer =
      result.answer || result.message ||
      "Aucune réponse reçue.";

    loading?.remove();

    addMessage("assistant", answer);

    currentMessages.push(
      { role: "user", content: message },
      { role: "assistant", content: answer }
    );

    loadHistory();

  } catch (err) {
    loading?.remove();

    addMessage(
      "assistant",
      `Impossible d'analyser cette image : ${err.message}`
    );
  } finally {
    pendingFile = null;

    if ($("fileInput")) {
      $("fileInput").value = "";
    }

    isGenerating = false;
    setGenerationUI(false);
  }
}

/* ================= PDF ================= */

async function sendPDF(file, message) {
  if (isGenerating) return;

  if (file.size > 8 * 1024 * 1024) {
    toast("Le PDF dépasse la limite de 8 Mo.");
    return;
  }

  isGenerating = true;
  setGenerationUI(true);

  addMessage("user", `${message}\n📄 ${file.name}`);

  const loading = addMessage(
    "assistant",
    "Lecture du document PDF en cours..."
  );

  try {
    const base64 = await fileToBase64(file);

    const result = await api("/chat/pdf", {
      method: "POST",
      body: JSON.stringify({
        pdf_base64: base64,
        filename: file.name,
        message
      })
    });

    const answer =
      result.answer || result.message ||
      "Aucune réponse reçue.";

    loading?.remove();

    addMessage("assistant", answer);

    currentMessages.push(
      {
        role: "user",
        content: `${message} (${file.name})`
      },
      {
        role: "assistant",
        content: answer
      }
    );

    loadHistory();

  } catch (err) {
    loading?.remove();

    addMessage(
      "assistant",
      `Impossible de lire ce PDF : ${err.message}`
    );
  } finally {
    pendingFile = null;

    if ($("fileInput")) {
      $("fileInput").value = "";
    }

    isGenerating = false;
    setGenerationUI(false);
  }
}

/* ================= FICHIERS ================= */

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.split(",")[1]);
    };

    reader.onerror = () => {
      reject(
        new Error("Impossible de lire le fichier.")
      );
    };

    reader.readAsDataURL(file);
  });
}

function handleFile(input) {
  const file = input.files?.[0];

  if (!file) return;

  const allowedImage = file.type.startsWith("image/");
  const allowedText = file.type === "text/plain";
  const allowedPDF = file.type === "application/pdf";

  if (!allowedImage && !allowedText && !allowedPDF) {
    toast("Choisis une image, un PDF ou un fichier TXT.");
    input.value = "";
    return;
  }

  if (file.size > 8 * 1024 * 1024) {
    toast("Le fichier dépasse la limite de 8 Mo.");
    input.value = "";
    return;
  }

  pendingFile = file;

  toast(`Fichier ajouté : ${file.name}`);
}

function setGenerationUI(active) {
  $("sendButton")?.classList.toggle(
    "hidden",
    active
  );

  $("stopButton")?.classList.toggle(
    "hidden",
    !active
  );

  if ($("messageInput")) {
    $("messageInput").disabled = active;
  }
}

function stopGeneration() {
  if (abortController) {
    abortController.abort();
  }
}

/* ================= HISTORIQUE ================= */

async function loadHistory() {
  if (!authToken) return;

  try {
    const result = await api("/history");
    const messages = result.messages || [];

    const history = $("historyList");

    if (!history) return;

    history.innerHTML = "";

    const userMessages = messages
      .filter(item => item.role === "user")
      .slice(-12)
      .reverse();

    if (!userMessages.length) {
      history.innerHTML =
        '<p class="muted-text">Aucune discussion récente</p>';
      return;
    }

    userMessages.forEach(item => {
      const button = document.createElement("button");

      button.className = "nav-item";
      button.style.fontSize = "11px";

      button.textContent =
        "• " +
        String(item.message || "Conversation").slice(0, 35);

      button.addEventListener("click", () => {
        newChat();

        if ($("messageInput")) {
          $("messageInput").value =
            item.message || "";
        }
      });

      history.appendChild(button);
    });

  } catch (err) {
    console.warn("Historique :", err.message);
  }
}

/* ================= MÉMOIRE ================= */

async function loadMemory() {
  if (!authToken) return;

  try {
    const result = await api("/memory");

    if ($("memoryInput")) {
      $("memoryInput").value =
        result.memory || "";
    }
  } catch (err) {
    console.warn("Mémoire :", err.message);
  }
}

async function saveMemory() {
  const memory =
    $("memoryInput")?.value.trim() || "";

  try {
    await api("/memory", {
      method: "PUT",
      body: JSON.stringify({ memory })
    });

    toast("Mémoire enregistrée avec succès.");

  } catch (err) {
    toast(
      "Erreur lors de l'enregistrement : " +
      err.message
    );
  }
}

/* ================= CONTACT MARUCE ================= */

async function sendContactMessage() {
  const subject =
    $("contactSubject")?.value.trim() || "";

  const message =
    $("contactMessage")?.value.trim() || "";

  if (!message) {
    toast("Écris ton message avant de l'envoyer.");
    return;
  }

  const finalMessage = subject
    ? `Sujet : ${subject}\n\n${message}`
    : message;

  try {
    await api("/contact", {
      method: "POST",
      body: JSON.stringify({
        message: finalMessage
      })
    });

    if ($("contactSubject")) {
      $("contactSubject").value = "";
    }

    if ($("contactMessage")) {
      $("contactMessage").value = "";
    }

    setText(
      "contactStatus",
      "Message envoyé avec succès."
    );

    toast("Ton message a été envoyé à Maruce.");

    loadContactMessages();

  } catch (err) {
    setText(
      "contactStatus",
      "Erreur : " + err.message
    );
  }
}

/* ================= MESSAGES DE L'UTILISATEUR ================= */

async function loadContactMessages() {
  if (!authToken) return;

  const container = $("myContactMessages");

  if (!container) return;

  container.innerHTML = "Chargement des messages...";

  try {
    const result = await api("/contact/messages");

    const messages = result.messages || [];

    container.innerHTML = "";

    if (!messages.length) {
      container.innerHTML =
        '<div class="empty-state">Tu n’as pas encore de message.</div>';
      return;
    }

    messages.forEach(message => {
      const card = document.createElement("div");

      card.className = "contact-message";

      const sender = document.createElement("strong");

      sender.textContent =
        message.sender_role === "admin"
          ? "Réponse de Maruce"
          : "Ton message";

      const content = document.createElement("p");
      content.textContent = message.message || "";

      const date = document.createElement("small");
      date.className = "date";
      date.textContent = formatDate(message.created_at);

      card.append(sender, content, date);

      if (message.sender_role === "admin") {
        card.classList.add("admin-reply");
      }

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML =
      '<div class="empty-state">Impossible de charger les messages.</div>';

    console.warn("Messages contact :", err.message);
  }
}

/* ================= ADMINISTRATION ================= */

async function renderAdmin() {
  if (!isAdmin()) return;

  const usersContainer = $("adminUsers");
  const messagesContainer = $("adminMessages");

  if (!usersContainer || !messagesContainer) {
    console.warn(
      "Les éléments adminUsers ou adminMessages sont absents du HTML."
    );
    return;
  }

  usersContainer.textContent = "Chargement des utilisateurs...";
  messagesContainer.textContent = "Chargement des messages...";

  setText("adminOnlineCount", "—");

  try {
    const [usersResult, messagesResult] =
      await Promise.all([
        api("/admin/users"),
        api("/admin/messages")
      ]);

    const users = usersResult.users || [];
    const messages = messagesResult.messages || [];

    setText("adminUserCount", users.length);
    setText("adminMessageCount", messages.length);

    const userMap = new Map(
      users.map(user => [String(user.id), user])
    );

    renderAdminUsers(users);
    renderAdminMessages(messages, userMap);

    await loadOnlineCount();

  } catch (err) {
    usersContainer.textContent =
      "Erreur : " + err.message;

    messagesContainer.textContent =
      "Impossible de charger les messages.";

    toast("Erreur du tableau de bord : " + err.message);
  }
}

/* ================= LISTE DES UTILISATEURS ADMIN ================= */

function renderAdminUsers(users) {
  const container = $("adminUsers");

  if (!container) return;

  container.innerHTML = "";

  if (!users.length) {
    container.innerHTML =
      '<div class="empty-state">Aucun utilisateur inscrit.</div>';
    return;
  }

  users.forEach(user => {
    const row = document.createElement("div");

    row.className = "user-card admin-user-card";

    const avatar = document.createElement("div");
    avatar.className = "user-avatar";
    avatar.textContent = getInitial(
      user.name || user.full_name
    );

    const info = document.createElement("div");
    info.className = "user-info";

    const name = document.createElement("strong");
    name.textContent =
      user.name || user.full_name || "Utilisateur";

    const phone = document.createElement("small");
    phone.textContent =
      user.phone || "Numéro non disponible";

    const role = document.createElement("small");
    role.textContent =
      "Rôle : " + (user.role || "user");

    info.append(name, phone, role);
    row.append(avatar, info);

    container.appendChild(row);
  });
}

/* ================= BOÎTE DE RÉCEPTION ADMIN ================= */

function renderAdminMessages(messages, userMap) {
  const container = $("adminMessages");

  if (!container) return;

  container.innerHTML = "";

  if (!messages.length) {
    container.innerHTML =
      '<div class="empty-state">Aucun message reçu pour le moment.</div>';
    return;
  }

  /*
    Regroupement des messages par utilisateur.
    Cela permet d'afficher une conversation complète,
    et pas seulement le dernier message.
  */

  const conversations = new Map();

  messages.forEach(message => {
    const userId = String(message.user_id || "");

    if (!userId) return;

    if (!conversations.has(userId)) {
      conversations.set(userId, []);
    }

    conversations.get(userId).push(message);
  });

  const sortedConversations =
    Array.from(conversations.entries()).sort((a, b) => {
      const dateA = new Date(
        a[1][a[1].length - 1]?.created_at || 0
      );

      const dateB = new Date(
        b[1][b[1].length - 1]?.created_at || 0
      );

      return dateB - dateA;
    });

  sortedConversations.forEach(([userId, conversation]) => {
    const user = userMap.get(userId);

    const card = document.createElement("div");
    card.className = "admin-message-card inbox-card";

    const header = document.createElement("div");
    header.className = "message-header";

    const sender = document.createElement("div");
    sender.className = "message-sender";

    const name = document.createElement("strong");
    name.textContent =
      user?.name ||
      user?.full_name ||
      "Utilisateur";

    const phone = document.createElement("small");
    phone.textContent =
      user?.phone ||
      "Numéro non disponible";

    sender.append(name, phone);

    const count = document.createElement("span");
    count.className = "badge badge-online";
    count.textContent =
      `${conversation.length} message(s)`;

    header.append(sender, count);

    const history = document.createElement("div");
    history.className = "conversation-history";

    conversation
      .slice()
      .sort((a, b) =>
        new Date(a.created_at || 0) -
        new Date(b.created_at || 0)
      )
      .forEach(message => {
        const item = document.createElement("div");

        item.className = "message-content";

        const role = document.createElement("strong");

        role.textContent =
          message.sender_role === "admin"
            ? "Maruce : "
            : "Utilisateur : ";

        const content = document.createElement("p");
        content.textContent = message.message || "";

        const date = document.createElement("small");
        date.className = "message-date";
        date.textContent = formatDate(message.created_at);

        item.append(role, content, date);

        history.appendChild(item);
      });

    const replyArea = document.createElement("div");
    replyArea.className = "reply-area";

    const replyInput = document.createElement("textarea");

    replyInput.placeholder =
      "Écris ta réponse à cet utilisateur...";

    replyInput.rows = 3;

    const replyButton = document.createElement("button");

    replyButton.className = "btn";
    replyButton.textContent = "Envoyer la réponse";

    replyButton.addEventListener("click", async () => {
      await replyToUser(
        userId,
        replyInput,
        replyButton
      );
    });

    replyArea.append(replyInput, replyButton);

    card.append(
      header,
      history,
      replyArea
    );

    container.appendChild(card);
  });
}

/* ================= RÉPONDRE À UN UTILISATEUR ================= */

async function replyToUser(userId, input, button) {
  const message = input.value.trim();

  if (!message) {
    toast("Écris une réponse avant de l'envoyer.");
    return;
  }

  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Envoi...";

  try {
    await api(
      `/admin/messages/${encodeURIComponent(userId)}/reply`,
      {
        method: "POST",
        body: JSON.stringify({
          message
        })
      }
    );

    input.value = "";

    toast("Réponse envoyée avec succès.");

    await renderAdmin();

  } catch (err) {
    toast(
      "Impossible d'envoyer la réponse : " +
      err.message
    );
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

/* ================= UTILISATEURS CONNECTÉS ================= */

/*
  Cette fonction attend la future route :
  GET /api/admin/presence

  Le backend actuel ne possède pas encore cette route.
*/

async function loadOnlineCount() {
  if (!isAdmin()) return;

  try {
    const result = await api("/admin/presence");

    const count =
      result.online_count ??
      result.count ??
      result.online ??
      null;

    if (count !== null) {
      setText("adminOnlineCount", count);
    } else {
      setText("adminOnlineCount", "—");
    }

  } catch (err) {
    setText("adminOnlineCount", "—");
  }
}

function startAdminRefresh() {
  stopAdminRefresh();

  adminRefreshTimer = setInterval(() => {
    if (
      isAdmin() &&
      $("adminPage")?.classList.contains("active")
    ) {
      renderAdmin();
    }
  }, 60000);
}

function stopAdminRefresh() {
  if (adminRefreshTimer) {
    clearInterval(adminRefreshTimer);
    adminRefreshTimer = null;
  }
}

/* ================= DICTÉE VOCALE ================= */

async function startVoice() {
  if (
    mediaRecorder &&
    mediaRecorder.state === "recording"
  ) {
    mediaRecorder.stop();
    return;
  }

  if (
    !navigator.mediaDevices?.getUserMedia ||
    !window.MediaRecorder
  ) {
    useBrowserVoiceRecognition();
    return;
  }

  try {
    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio: true
      });

    audioChunks = [];

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(track => {
        track.stop();
      });

      const blob = new Blob(audioChunks, {
        type: mediaRecorder.mimeType || "audio/webm"
      });

      try {
        toast("Transcription audio en cours...");

        const base64 = await fileToBase64(blob);

        const result = await api(
          "/audio/transcriptions",
          {
            method: "POST",
            body: JSON.stringify({
              audio_base64: base64,
              filename: "taya-audio.webm",
              mime_type: blob.type
            })
          }
        );

        if (result.text) {
          if ($("messageInput")) {
            $("messageInput").value = (
              $("messageInput").value +
              " " +
              result.text
            ).trim();

            $("messageInput").focus();
          }

          toast("Dictée terminée.");
        } else {
          toast("Aucun texte détecté.");
        }

      } catch (err) {
        toast("Erreur audio : " + err.message);
      }
    };

    mediaRecorder.start();

    toast(
      "Enregistrement en cours. Appuie sur le micro pour terminer."
    );

  } catch (err) {
    useBrowserVoiceRecognition();
  }
}

function useBrowserVoiceRecognition() {
  const Recognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!Recognition) {
    toast(
      "La dictée vocale n'est pas disponible sur ce navigateur."
    );
    return;
  }

  const recognition = new Recognition();

  recognition.lang = "fr-FR";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = event => {
    const text =
      event.results[0][0].transcript;

    if ($("messageInput")) {
      $("messageInput").value = (
        $("messageInput").value + " " + text
      ).trim();
    }
  };

  recognition.onerror = () => {
    toast("Erreur de reconnaissance vocale.");
  };

  recognition.start();
}

/* ================= LECTURE VOCALE ================= */

async function speakText(text) {
  try {
    const response = await fetch(
      `${API_BASE}/audio/speech`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ text })
      }
    );

    if (!response.ok) {
      throw new Error(
        "Service vocal indisponible."
      );
    }

    const blob = await response.blob();

    const audioURL =
      URL.createObjectURL(blob);

    const audio = new Audio(audioURL);

    audio.onended = () => {
      URL.revokeObjectURL(audioURL);
    };

    await audio.play();

  } catch (err) {
    if ("speechSynthesis" in window) {
      const utterance =
        new SpeechSynthesisUtterance(text);

      utterance.lang = "fr-FR";

      speechSynthesis.speak(utterance);
    } else {
      toast("Lecture vocale indisponible.");
    }
  }
}

/* ================= DÉMARRAGE ================= */

document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();

  $("messageInput")?.addEventListener(
    "input",
    event => {
      const textarea = event.target;

      textarea.style.height = "auto";

      textarea.style.height =
        Math.min(textarea.scrollHeight, 150) + "px";
    }
  );

  checkSession();
});

/* ================= FIN TAYA IA V20 ================= */
