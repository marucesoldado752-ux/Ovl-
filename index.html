/* =========================================================
   TAYA IA V20 — FRONTEND
   By Maruce Soldado 🇬🇳

   Backend API : https://taya-ai-api.onrender.com
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

/* ================= OUTILS ================= */

function $(id) {
  return document.getElementById(id);
}

function toast(message) {
  const container = $("toastContainer");
  if (!container) {
    alert(message);
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

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type") || "";

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
  localStorage.setItem(STORAGE.user, JSON.stringify(user));
}

function clearSession() {
  authToken = null;
  currentUser = null;

  localStorage.removeItem(STORAGE.token);
  localStorage.removeItem(STORAGE.user);
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
  return currentUser?.name || currentUser?.full_name || "Utilisateur";
}

function getInitial(name) {
  return String(name || "T").trim().charAt(0).toUpperCase();
}

/* ================= AUTHENTIFICATION ================= */

function switchAuth(mode) {
  const register = mode === "register";

  $("loginTab")?.classList.toggle("active", !register);
  $("registerTab")?.classList.toggle("active", register);

  $("nameField")?.classList.toggle("hidden", !register);
  $("confirmField")?.classList.toggle("hidden", !register);

  $("authTitle") && (
    $("authTitle").textContent = register ? "Créer un compte" : "Connexion"
  );

  if ($("authSubmit")) {
    $("authSubmit").textContent = register
      ? "Créer mon compte"
      : "Se connecter";
  }

  $("authError").textContent = "";
  $("authPassword").autocomplete = register
    ? "new-password"
    : "current-password";
}

async function submitAuth(event) {
  event.preventDefault();

  const button = $("authSubmit");
  const error = $("authError");

  error.textContent = "";

  const isRegister = $("registerTab").classList.contains("active");

  const phone = $("authPhone").value.trim();
  const password = $("authPassword").value;

  if (!phone || !password) {
    error.textContent = "Remplis tous les champs obligatoires.";
    return;
  }

  if (isRegister) {
    const name = $("authName").value.trim();
    const confirm = $("authConfirm").value;

    if (!name) {
      error.textContent = "Entre ton nom complet.";
      return;
    }

    if (password.length < 6) {
      error.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
      return;
    }

    if (password !== confirm) {
      error.textContent = "Les deux mots de passe ne correspondent pas.";
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
      throw new Error("Le serveur n'a pas retourné les informations du compte.");
    }

    saveSession(result.token, result.user);

    $("authPassword").value = "";
    $("authConfirm").value = "";

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
    error.textContent = err.message || "Impossible de se connecter.";
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
    localStorage.setItem(STORAGE.user, JSON.stringify(currentUser));

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

  if (isAdmin()) {
    $("adminNav")?.classList.remove("hidden");
  } else {
    $("adminNav")?.classList.add("hidden");
  }
}

function logout() {
  if (!confirm("Veux-tu vraiment te déconnecter ?")) return;

  clearSession();
  currentMessages = [];

  $("messages").innerHTML = "";
  showAuth();

  toast("Déconnexion effectuée.");
}

function updateUserInterface() {
  const name = getUserName();
  const phone = currentUser?.phone || "";

  if ($("userName")) $("userName").textContent = name;
  if ($("userPhone")) $("userPhone").textContent = phone;
  if ($("welcomeName")) $("welcomeName").textContent = name;
  if ($("userAvatar")) $("userAvatar").textContent = getInitial(name);

  if (isAdmin()) {
    $("adminNav")?.classList.remove("hidden");
  }
}

function isAdmin() {
  return currentUser?.role === "admin" ||
         currentUser?.role === "administrator";
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
      element.classList.toggle("active", name === page);
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

  $("topTitle").textContent = titles[page] || "TAYA IA";

  $("backButton")?.classList.toggle("hidden", page === "home");

  toggleSidebar(false);

  if (page === "admin") {
    renderAdmin();
  }

  if (page === "chat") {
    setTimeout(() => $("messageInput")?.focus(), 100);
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
  const theme = localStorage.getItem(STORAGE.theme) || "dark";
  document.body.classList.toggle("light", theme === "light");
}

function toggleTheme() {
  const light = !document.body.classList.contains("light");

  document.body.classList.toggle("light", light);

  localStorage.setItem(
    STORAGE.theme,
    light ? "light" : "dark"
  );
}

/* ================= CONVERSATIONS ================= */

function newChat() {
  currentMessages = [];

  $("messages").innerHTML = "";
  $("welcomeScreen")?.classList.remove("hidden");

  $("messageInput").value = "";
  pendingFile = null;

  showPage("chat");
}

function newChatWithPrompt(prompt) {
  newChat();

  $("messageInput").value = prompt;

  setTimeout(() => sendMessage(), 100);
}

function usePrompt(prompt) {
  $("messageInput").value = prompt;
  sendMessage();
}

function handleComposerKey(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function renderMarkdown(text) {
  let html;

  if (window.marked) {
    html = marked.parse(String(text || ""));
  } else {
    html = escapeHTML(text).replace(/\n/g, "<br>");
  }

  if (window.DOMPurify) {
    return DOMPurify.sanitize(html);
  }

  return escapeHTML(text).replace(/\n/g, "<br>");
}

function addMessage(role, content) {
  const container = $("messages");

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

    bubble.appendChild(document.createElement("br"));
    bubble.appendChild(speakButton);
  } else {
    bubble.textContent = content;
  }

  if (role === "user") {
    message.appendChild(bubble);
    message.appendChild(avatar);
  } else {
    message.appendChild(avatar);
    message.appendChild(bubble);
  }

  container.appendChild(message);

  container.scrollTop = container.scrollHeight;

  return message;
}

/* ================= ENVOI DES MESSAGES ================= */

function needsWebSearch(message) {
  return /\b(recherche|cherche sur internet|sur le web|actualité|actualités|aujourd'hui|aujourd’hui|cette semaine|dernier|dernière|récent|récente|météo|prix actuel|actualité|news|latest|today|current)\b/i.test(message);
}

async function sendMessage() {
  if (isGenerating) return;

  const input = $("messageInput");
  const message = input.value.trim();
  const file = pendingFile;

  if (!message && !file) return;

  if (file && file.type.startsWith("image/")) {
    await sendImage(file, message || "Analyse cette image.");
    return;
  }

  if (file && file.type === "text/plain") {
    const text = await file.text();

    input.value = "";

    pendingFile = null;
    $("fileInput").value = "";

    await sendTextMessage(
      message
        ? `${message}\n\nContenu du fichier :\n${text}`
        : `Lis et analyse ce fichier :\n\n${text}`
    );

    return;
  }

  if (file) {
    toast("Ce type de fichier n'est pas encore pris en charge par le backend.");
    return;
  }

  await sendTextMessage(message);
}

async function sendTextMessage(message) {
  if (!message || isGenerating) return;

  $("messageInput").value = "";

  currentMessages.push({
    role: "user",
    content: message
  });

  addMessage("user", message);

  isGenerating = true;
  setGenerationUI(true);

  const loading = addMessage("assistant", "TAYA IA réfléchit...");

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
      throw new Error("Le serveur n'a pas retourné de réponse.");
    }

    loading.remove();

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
    loading.remove();

    if (err.name === "AbortError") {
      addMessage("assistant", "Génération arrêtée.");
    } else {
      addMessage(
        "assistant",
        `Une erreur est survenue : ${err.message}\n\nVérifie que ton backend Render fonctionne et que les services sont configurés.`
      );
    }

  } finally {
    isGenerating = false;
    abortController = null;
    setGenerationUI(false);
  }
}

async function sendImage(file, message) {
  if (isGenerating) return;

  if (file.size > 8 * 1024 * 1024) {
    toast("L'image dépasse la limite de 8 Mo.");
    return;
  }

  isGenerating = true;
  setGenerationUI(true);

  const loading = addMessage("assistant", "Analyse de l'image en cours...");

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

    const answer = result.answer || "Aucune réponse reçue.";

    loading.remove();

    addMessage("assistant", answer);

    currentMessages.push(
      { role: "user", content: message },
      { role: "assistant", content: answer }
    );

    loadHistory();

  } catch (err) {
    loading.remove();
    addMessage("assistant", `Impossible d'analyser cette image : ${err.message}`);
  } finally {
    pendingFile = null;
    $("fileInput").value = "";
    isGenerating = false;
    setGenerationUI(false);
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.split(",")[1]);
    };

    reader.onerror = () => reject(
      new Error("Impossible de lire le fichier.")
    );

    reader.readAsDataURL(file);
  });
}

function handleFile(input) {
  const file = input.files?.[0];

  if (!file) return;

  const allowedImage = file.type.startsWith("image/");
  const allowedText = file.type === "text/plain";

  if (!allowedImage && !allowedText) {
    toast("Pour le moment, seules les images et les fichiers TXT sont pris en charge.");
    input.value = "";
    return;
  }

  pendingFile = file;
  toast(`Fichier ajouté : ${file.name}`);
}

function setGenerationUI(active) {
  $("sendButton")?.classList.toggle("hidden", active);
  $("stopButton")?.classList.toggle("hidden", !active);

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
      history.innerHTML = '<p class="muted-text">Aucune discussion récente</p>';
      return;
    }

    userMessages.forEach(item => {
      const button = document.createElement("button");
      button.className = "nav-item";
      button.style.fontSize = "11px";

      const label = String(item.message || "Conversation")
        .slice(0, 35);

      button.textContent = "• " + label;

      button.addEventListener("click", () => {
        newChat();
        $("messageInput").value = item.message || "";
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
      $("memoryInput").value = result.memory || "";
    }
  } catch (err) {
    console.warn("Mémoire :", err.message);
  }
}

async function saveMemory() {
  const memory = $("memoryInput").value.trim();

  try {
    await api("/memory", {
      method: "PUT",
      body: JSON.stringify({ memory })
    });

    toast("Mémoire enregistrée avec succès.");
  } catch (err) {
    toast("Erreur lors de l'enregistrement : " + err.message);
  }
}

/* ================= CONTACT MARUCE ================= */

async function sendContactMessage() {
  const subject = $("contactSubject").value.trim();
  const message = $("contactMessage").value.trim();

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

    $("contactSubject").value = "";
    $("contactMessage").value = "";

    $("contactStatus").textContent = "Message envoyé avec succès.";

    toast("Ton message a été envoyé à Maruce.");
  } catch (err) {
    $("contactStatus").textContent = "Erreur : " + err.message;
  }
}

/* ================= ADMINISTRATION ================= */

async function renderAdmin() {
  if (!isAdmin()) return;

  $("adminUsers").innerHTML = "Chargement...";
  $("adminMessages").innerHTML = "Chargement...";

  try {
    const [usersResult, messagesResult] = await Promise.all([
      api("/admin/users"),
      api("/admin/messages")
    ]);

    const users = usersResult.users || [];
    const messages = messagesResult.messages || [];

    $("adminUserCount").textContent = users.length;
    $("adminMessageCount").textContent = messages.length;

    const userMap = new Map(
      users.map(user => [user.id, user])
    );

    $("adminUsers").innerHTML = "";

    if (!users.length) {
      $("adminUsers").textContent = "Aucun utilisateur.";
    }

    users.forEach(user => {
      const row = document.createElement("div");
      row.className = "admin-user";

      const name = document.createElement("strong");
      name.textContent = user.name || "Utilisateur";

      const phone = document.createElement("small");
      phone.textContent = user.phone || "";

      const role = document.createElement("small");
      role.textContent = "Rôle : " + (user.role || "user");

      row.append(name, phone, role);
      $("adminUsers").appendChild(row);
    });

    $("adminMessages").innerHTML = "";

    if (!messages.length) {
      $("adminMessages").textContent = "Aucun message reçu.";
    }

    messages.forEach(message => {
      const row = document.createElement("div");
      row.className = "admin-message";

      const user = userMap.get(message.user_id);

      const name = document.createElement("strong");
      name.textContent = user?.name || "Utilisateur";

      const phone = document.createElement("small");
      phone.textContent = user?.phone || "";

      const content = document.createElement("p");
      content.textContent = message.message || "";

      const date = document.createElement("small");
      date.textContent = message.created_at
        ? new Date(message.created_at).toLocaleString("fr-FR")
        : "";

      row.append(name, phone, content, date);
      $("adminMessages").appendChild(row);
    });

  } catch (err) {
    $("adminUsers").textContent = "Erreur : " + err.message;
    $("adminMessages").textContent = "Impossible de charger les messages.";
  }
}

/* ================= DICTÉE VOCALE ================= */

async function startVoice() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    useBrowserVoiceRecognition();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
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
      stream.getTracks().forEach(track => track.stop());

      const blob = new Blob(audioChunks, {
        type: mediaRecorder.mimeType || "audio/webm"
      });

      try {
        toast("Transcription audio en cours...");

        const base64 = await fileToBase64(blob);

        const result = await api("/audio/transcriptions", {
          method: "POST",
          body: JSON.stringify({
            audio_base64: base64,
            filename: "taya-audio.webm",
            mime_type: blob.type
          })
        });

        if (result.text) {
          $("messageInput").value =
            ($("messageInput").value + " " + result.text).trim();

          $("messageInput").focus();
          toast("Dictée terminée.");
        } else {
          toast("Aucun texte détecté.");
        }

      } catch (err) {
        toast("Erreur audio : " + err.message);
      }
    };

    mediaRecorder.start();

    toast("Enregistrement en cours. Appuie sur le micro pour terminer.");

  } catch (err) {
    useBrowserVoiceRecognition();
  }
}

function useBrowserVoiceRecognition() {
  const Recognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!Recognition) {
    toast("La dictée vocale n'est pas disponible sur ce navigateur.");
    return;
  }

  const recognition = new Recognition();

  recognition.lang = "fr-FR";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = event => {
    const text = event.results[0][0].transcript;

    $("messageInput").value =
      ($("messageInput").value + " " + text).trim();
  };

  recognition.onerror = () => {
    toast("Erreur de reconnaissance vocale.");
  };

  recognition.start();
}

/* ================= LECTURE VOCALE ================= */

async function speakText(text) {
  try {
    const response = await fetch(`${API_BASE}/audio/speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error("Service vocal indisponible.");
    }

    const blob = await response.blob();
    const audioURL = URL.createObjectURL(blob);

    const audio = new Audio(audioURL);

    audio.onended = () => URL.revokeObjectURL(audioURL);
    await audio.play();

  } catch (err) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
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

  $("messageInput")?.addEventListener("input", event => {
    const textarea = event.target;

    textarea.style.height = "auto";
    textarea.style.height =
      Math.min(textarea.scrollHeight, 150) + "px";
  });

  checkSession();
});
