<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#050807">
  <meta name="description" content="TAYA IA - Votre assistant intelligent par Maruce Soldado">
  <title>TAYA IA V20 — By Maruce 🇬🇳</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="style.css">
</head>

<body>
  <!-- AUTHENTIFICATION -->
  <section id="authScreen" class="auth-screen">
    <div class="auth-card">
      <div class="brand-logo">T</div>
      <h1>TAYA <span>IA</span></h1>
      <p class="brand-subtitle">L'intelligence à portée de main 🇬🇳</p>

      <div class="auth-tabs">
        <button id="loginTab" class="auth-tab active" onclick="switchAuth('login')">Connexion</button>
        <button id="registerTab" class="auth-tab" onclick="switchAuth('register')">Inscription</button>
      </div>

      <form id="authForm" onsubmit="submitAuth(event)">
        <div id="nameField" class="form-group hidden">
          <label for="authName">Nom complet</label>
          <input id="authName" type="text" placeholder="Votre nom complet" autocomplete="name">
        </div>

        <div class="form-group">
          <label for="authPhone">Numéro de téléphone</label>
          <input id="authPhone" type="tel" placeholder="+224XXXXXXXXX" autocomplete="tel" required>
        </div>

        <div class="form-group">
          <label for="authPassword">Mot de passe</label>
          <input id="authPassword" type="password" placeholder="Votre mot de passe" autocomplete="current-password" required>
        </div>

        <div id="confirmField" class="form-group hidden">
          <label for="authConfirm">Confirmer le mot de passe</label>
          <input id="authConfirm" type="password" placeholder="Confirmez le mot de passe">
        </div>

        <p id="authError" class="error-message"></p>
        <button id="authSubmit" class="primary-button" type="submit">Se connecter</button>
      </form>

      <p class="auth-footer">TAYA IA V20 • By Maruce Soldado 👑</p>
    </div>
  </section>

  <!-- APPLICATION -->
  <main id="app" class="app hidden">

    <!-- MENU LATÉRAL -->
    <div id="sidebarOverlay" class="sidebar-overlay" onclick="toggleSidebar(false)"></div>

    <aside id="sidebar" class="sidebar">
      <div class="sidebar-header">
        <div class="mini-brand">
          <div class="mini-logo">T</div>
          <div>
            <strong>TAYA IA</strong>
            <small>VERSION 20</small>
          </div>
        </div>
        <button class="icon-button close-sidebar" onclick="toggleSidebar(false)">✕</button>
      </div>

      <button class="new-chat-button" onclick="newChat()">
        <span>＋</span> Nouveau chat
      </button>

      <nav class="sidebar-nav">
        <button class="nav-item active" data-page="home" onclick="showPage('home')">
          <span>⌂</span> Accueil
        </button>
        <button class="nav-item" data-page="chat" onclick="showPage('chat')">
          <span>✦</span> Assistant IA
        </button>
        <button class="nav-item" data-page="memory" onclick="showPage('memory')">
          <span>◈</span> Ma mémoire
        </button>
        <button class="nav-item" data-page="contact" onclick="showPage('contact')">
          <span>✉</span> Contacter Maruce
        </button>
        <button class="nav-item hidden" id="adminNav" data-page="admin" onclick="showPage('admin')">
          <span>⚙</span> Administration
        </button>
        <button class="nav-item" data-page="settings" onclick="showPage('settings')">
          <span>☷</span> Paramètres
        </button>
      </nav>

      <div class="sidebar-history">
        <h3>DISCUSSIONS RÉCENTES</h3>
        <div id="historyList">
          <p class="muted-text">Aucune discussion récente</p>
        </div>
      </div>

      <div class="sidebar-user">
        <div id="userAvatar" class="user-avatar">T</div>
        <div class="user-details">
          <strong id="userName">Utilisateur</strong>
          <small id="userPhone"></small>
        </div>
        <button class="icon-button" onclick="logout()" title="Déconnexion">↪</button>
      </div>
    </aside>

    <!-- CONTENU PRINCIPAL -->
    <section class="main-content">

      <!-- BARRE SUPÉRIEURE -->
      <header class="topbar">
        <div class="topbar-left">
          <button class="icon-button menu-button" onclick="toggleSidebar(true)">☰</button>
          <button id="backButton" class="icon-button hidden" onclick="goBack()">←</button>
          <div>
            <strong id="topTitle">Accueil</strong>
            <small class="online-status"><span></span> Assistant disponible</small>
          </div>
        </div>

        <div class="topbar-actions">
          <button class="icon-button" onclick="toggleTheme()" title="Changer le thème">◐</button>
          <button class="icon-button" onclick="newChat()" title="Nouveau chat">＋</button>
        </div>
      </header>

      <!-- PAGE ACCUEIL -->
      <section id="homePage" class="page active">
        <div class="home-container">
          <div class="hero-section">
            <div class="hero-badge">✦ INTELLIGENCE ARTIFICIELLE</div>
            <div class="hero-logo">T</div>
            <h1>Bienvenue sur <span>TAYA IA</span></h1>
            <h2>Salut <span id="welcomeName">Utilisateur</span> 👋</h2>
            <p>Pose tes questions, crée, apprends et avance avec ton assistant intelligent.</p>
            <button class="primary-button hero-button" onclick="showPage('chat')">
              Commencer une conversation →
            </button>
            <div class="creator-line">BY MARUCE SOLDADO 👑 🇬🇳</div>
          </div>

          <div class="feature-grid">
            <button class="feature-card" onclick="newChatWithPrompt('Explique-moi un sujet simplement')">
              <span class="feature-icon">✦</span>
              <strong>Questions & réponses</strong>
              <small>Obtiens des réponses utiles</small>
            </button>

            <button class="feature-card" onclick="newChatWithPrompt('Aide-moi à écrire un texte professionnel')">
              <span class="feature-icon">✎</span>
              <strong>Écriture</strong>
              <small>Messages, textes et idées</small>
            </button>

            <button class="feature-card" onclick="newChatWithPrompt('Aide-moi à résoudre un calcul')">
              <span class="feature-icon">∑</span>
              <strong>Calculs</strong>
              <small>Résous tes problèmes</small>
            </button>

            <button class="feature-card" onclick="newChatWithPrompt('Aide-moi à programmer un site web')">
              <span class="feature-icon">⌘</span>
              <strong>Programmation</strong>
              <small>Code et développement</small>
            </button>
          </div>
        </div>
      </section>

      <!-- PAGE CHAT -->
      <section id="chatPage" class="page">
        <div class="chat-layout">
          <div id="welcomeScreen" class="chat-welcome">
            <div class="welcome-icon">✦</div>
            <h2>Comment puis-je t'aider ?</h2>
            <p>Je suis TAYA IA, ton assistant intelligent.</p>

            <div class="prompt-grid">
              <button onclick="usePrompt('Explique-moi quelque chose de nouveau')">
                💡 Apprendre quelque chose
              </button>
              <button onclick="usePrompt('Aide-moi à écrire un message')">
                ✍️ Écrire un message
              </button>
              <button onclick="usePrompt('Aide-moi avec un problème informatique')">
                💻 Informatique
              </button>
              <button onclick="usePrompt('Traduis ce texte en français')">
                🌍 Traduction
              </button>
            </div>
          </div>

          <div id="messages" class="messages-container"></div>

          <div class="composer-area">
            <div class="composer-tools">
              <span>✦ TAYA IA peut faire des erreurs. Vérifie les informations importantes.</span>
            </div>

            <div id="composer" class="composer">
              <input id="fileInput" type="file" accept="image/*,.pdf,.txt,.doc,.docx" hidden onchange="handleFile(this)">

              <button class="composer-button" onclick="document.getElementById('fileInput').click()" title="Joindre un fichier">＋</button>
              <button id="voiceButton" class="composer-button" onclick="startVoice()" title="Dicter un message">🎤</button>

              <textarea id="messageInput" rows="1" placeholder="Écris ton message..." onkeydown="handleComposerKey(event)"></textarea>

              <button id="stopButton" class="composer-button hidden" onclick="stopGeneration()" title="Arrêter">■</button>
              <button id="sendButton" class="send-button" onclick="sendMessage()" title="Envoyer">↑</button>
            </div>
          </div>
        </div>
      </section>

      <!-- PAGE MÉMOIRE -->
      <section id="memoryPage" class="page">
        <div class="content-card">
          <div class="section-heading">
            <span class="section-icon">◈</span>
            <div>
              <h2>Ma mémoire</h2>
              <p>Informations que TAYA IA peut utiliser pour mieux t'aider.</p>
            </div>
          </div>

          <textarea id="memoryInput" class="large-textarea" placeholder="Ajoute ici les informations que tu souhaites que TAYA IA retienne..."></textarea>
          <button class="primary-button" onclick="saveMemory()">Enregistrer ma mémoire</button>
        </div>
      </section>

      <!-- PAGE CONTACT -->
      <section id="contactPage" class="page">
        <div class="content-card">
          <div class="section-heading">
            <span class="section-icon">✉</span>
            <div>
              <h2>Contacter Maruce</h2>
              <p>Envoie directement ton message à l'administration de TAYA IA.</p>
            </div>
          </div>

          <div class="form-group">
            <label for="contactSubject">Sujet</label>
            <input id="contactSubject" type="text" placeholder="Sujet du message">
          </div>

          <div class="form-group">
            <label for="contactMessage">Ton message</label>
            <textarea id="contactMessage" class="large-textarea" placeholder="Écris ton message ici..."></textarea>
          </div>

          <button class="primary-button" onclick="sendContactMessage()">Envoyer le message</button>
          <p id="contactStatus" class="status-message"></p>
        </div>
      </section>

      <!-- PAGE ADMINISTRATION -->
      <section id="adminPage" class="page">
        <div class="admin-container">
          <div class="section-heading">
            <span class="section-icon">⚙</span>
            <div>
              <h2>Administration</h2>
              <p>Gestion des utilisateurs et des messages.</p>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <small>Utilisateurs inscrits</small>
              <strong id="adminUserCount">0</strong>
            </div>
            <div class="stat-card">
              <small>Messages reçus</small>
              <strong id="adminMessageCount">0</strong>
            </div>
          </div>

          <div class="admin-panel">
            <h3>Utilisateurs</h3>
            <div id="adminUsers"></div>
          </div>

          <div class="admin-panel">
            <h3>Messages reçus</h3>
            <div id="adminMessages"></div>
          </div>
        </div>
      </section>

      <!-- PAGE PARAMÈTRES -->
      <section id="settingsPage" class="page">
        <div class="content-card">
          <div class="section-heading">
            <span class="section-icon">☷</span>
            <div>
              <h2>Paramètres</h2>
              <p>Personnalise ton expérience TAYA IA.</p>
            </div>
          </div>

          <div class="setting-row">
            <div>
              <strong>Apparence</strong>
              <small>Passer du thème sombre au thème clair</small>
            </div>
            <button class="secondary-button" onclick="toggleTheme()">Changer le thème</button>
          </div>

          <div class="setting-row">
            <div>
              <strong>Nouvelle conversation</strong>
              <small>Commencer une nouvelle discussion</small>
            </div>
            <button class="secondary-button" onclick="newChat()">Nouveau chat</button>
          </div>

          <div class="setting-row">
            <div>
              <strong>Déconnexion</strong>
              <small>Quitter ton compte</small>
            </div>
            <button class="danger-button" onclick="logout()">Déconnexion</button>
          </div>

          <div class="about-card">
            <div class="mini-logo">T</div>
            <h3>TAYA IA V20</h3>
            <p>Une création de Maruce Soldado</p>
            <strong>Fièrement guinéen 🇬🇳</strong>
          </div>
        </div>
      </section>

    </section>
  </main>

  <!-- NOTIFICATIONS -->
  <div id="toastContainer" class="toast-container"></div>

  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.6/dist/purify.min.js"></script>
  <script src="script.js"></script>
</body>
</html>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@600;700;800&display=swap');

:root {
  --bg: #050807;
  --surface: #0c1210;
  --surface-2: #111a16;
  --surface-3: #17231d;
  --text: #f4fff8;
  --muted: #91a59a;
  --green: #00ff88;
  --green-dark: #00b968;
  --blue: #4488ff;
  --border: rgba(255,255,255,.09);
  --danger: #ff4c65;
  --shadow: 0 20px 60px rgba(0,0,0,.35);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
}

body {
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 10% 10%, rgba(0,255,136,.09), transparent 30%),
    radial-gradient(circle at 90% 80%, rgba(68,136,255,.08), transparent 32%),
    var(--bg);
  background-size: 150% 150%;
  animation: backgroundMove 16s ease-in-out infinite alternate;
}

@keyframes backgroundMove {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

button, input, textarea {
  font: inherit;
}

button {
  cursor: pointer;
  color: inherit;
  border: none;
}

.hidden {
  display: none !important;
}

.muted-text {
  color: var(--muted);
  font-size: 12px;
}

/* AUTHENTIFICATION */

.auth-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  padding: 35px;
  border: 1px solid var(--border);
  border-radius: 26px;
  background: rgba(12,18,16,.94);
  box-shadow: var(--shadow), 0 0 50px rgba(0,255,136,.07);
  text-align: center;
  backdrop-filter: blur(20px);
}

.brand-logo,
.hero-logo,
.mini-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', sans-serif;
  font-weight: 800;
  color: #001b0e;
  background: linear-gradient(135deg, var(--green), #75ffc0);
  box-shadow: 0 0 30px rgba(0,255,136,.25);
}

.brand-logo {
  width: 65px;
  height: 65px;
  margin: 0 auto 17px;
  border-radius: 20px;
  font-size: 35px;
}

.auth-card h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 30px;
  letter-spacing: 2px;
}

.auth-card h1 span {
  color: var(--green);
}

.brand-subtitle {
  margin: 10px 0 28px;
  color: var(--muted);
  font-size: 13px;
}

.auth-tabs {
  display: flex;
  gap: 8px;
  padding: 5px;
  margin-bottom: 25px;
  border-radius: 13px;
  background: #080e0b;
}

.auth-tab {
  flex: 1;
  padding: 12px;
  border-radius: 9px;
  background: transparent;
  color: var(--muted);
  font-weight: 700;
}

.auth-tab.active {
  color: #001b0e;
  background: var(--green);
}

.form-group {
  margin-bottom: 18px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #c6d8cd;
  font-size: 12px;
  font-weight: 700;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 15px;
  color: var(--text);
  outline: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #080e0b;
  transition: .2s;
}

.form-group input:focus,
.form-group textarea:focus,
.large-textarea:focus {
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(0,255,136,.08);
}

.error-message {
  min-height: 18px;
  margin-bottom: 12px;
  color: var(--danger);
  font-size: 12px;
}

.auth-footer {
  margin-top: 25px;
  color: var(--muted);
  font-size: 11px;
}

/* BOUTONS */

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  color: #001b0e;
  background: linear-gradient(110deg, var(--green), #6bffb5);
  font-weight: 800;
  transition: transform .2s, box-shadow .2s;
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,255,136,.2);
}

.secondary-button,
.danger-button {
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
}

.secondary-button {
  background: var(--surface-3);
  border: 1px solid var(--border);
}

.danger-button {
  color: #fff;
  background: rgba(255,76,101,.15);
  border: 1px solid rgba(255,76,101,.3);
}

/* APPLICATION */

.app {
  min-height: 100vh;
  display: flex;
}

.sidebar {
  position: fixed;
  z-index: 30;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 270px;
  padding: 20px 15px;
  background: rgba(8,14,11,.97);
  border-right: 1px solid var(--border);
  backdrop-filter: blur(20px);
}

.sidebar-header,
.mini-brand,
.topbar,
.topbar-left,
.topbar-actions,
.sidebar-user,
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mini-brand {
  justify-content: flex-start;
  gap: 11px;
}

.mini-logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  font-size: 22px;
}

.mini-brand strong {
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-size: 13px;
}

.mini-brand small {
  color: var(--green);
  font-size: 9px;
  letter-spacing: 1px;
}

.icon-button {
  width: 39px;
  height: 39px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  color: var(--text);
  background: rgba(255,255,255,.05);
  border: 1px solid var(--border);
  transition: .2s;
}

.icon-button:hover {
  color: var(--green);
  border-color: rgba(0,255,136,.4);
  background: rgba(0,255,136,.08);
}

.close-sidebar {
  display: none;
}

.new-chat-button {
  width: 100%;
  margin: 27px 0 22px;
  padding: 13px;
  border-radius: 12px;
  color: #001b0e;
  background: var(--green);
  font-weight: 800;
  text-align: left;
}

.new-chat-button span {
  margin-right: 8px;
  font-size: 20px;
}

.sidebar-nav {
  display: grid;
  gap: 7px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  padding: 13px;
  border-radius: 11px;
  color: #b7c9bf;
  background: transparent;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  transition: .2s;
}

.nav-item span {
  width: 20px;
  color: var(--green);
  font-size: 19px;
  text-align: center;
}

.nav-item:hover,
.nav-item.active {
  color: #fff;
  background: rgba(0,255,136,.1);
}

.nav-item.active {
  border-left: 3px solid var(--green);
}

.sidebar-history {
  flex: 1;
  overflow-y: auto;
  margin-top: 30px;
}

.sidebar-history h3 {
  margin-bottom: 14px;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 1.4px;
}

.sidebar-user {
  justify-content: flex-start;
  gap: 10px;
  padding: 13px 5px 3px;
  border-top: 1px solid var(--border);
}

.user-avatar {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #001b0e;
  background: var(--green);
  font-weight: 800;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-details strong,
.user-details small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-details strong {
  font-size: 12px;
}

.user-details small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 10px;
}

/* CONTENU */

.main-content {
  width: calc(100% - 270px);
  min-height: 100vh;
  margin-left: 270px;
}

.topbar {
  position: sticky;
  z-index: 10;
  top: 0;
  height: 75px;
  padding: 0 30px;
  background: rgba(5,8,7,.82);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(20px);
}

.topbar-left {
  justify-content: flex-start;
  gap: 13px;
}

.topbar-left strong {
  display: block;
  font-size: 14px;
}

.online-status {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
  color: var(--muted);
  font-size: 10px;
}

.online-status span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 10px var(--green);
}

.topbar-actions {
  gap: 8px;
}

.menu-button {
  display: none;
}

.page {
  display: none;
  min-height: calc(100vh - 75px);
  padding: 30px;
}

.page.active {
  display: block;
}

/* ACCUEIL */

.home-container {
  max-width: 1000px;
  margin: 0 auto;
}

.hero-section {
  position: relative;
  overflow: hidden;
  padding: 55px 25px 40px;
  border: 1px solid rgba(0,255,136,.17);
  border-radius: 25px;
  background:
    radial-gradient(circle at 50% 0%, rgba(0,255,136,.13), transparent 45%),
    linear-gradient(145deg, #101c15, #0a100d);
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 8px 13px;
  margin-bottom: 25px;
  border: 1px solid rgba(0,255,136,.25);
  border-radius: 30px;
  color: var(--green);
  background: rgba(0,255,136,.07);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.hero-logo {
  width: 85px;
  height: 85px;
  margin: 0 auto 23px;
  border-radius: 25px;
  font-size: 45px;
  animation: floatLogo 4s ease-in-out infinite;
}

@keyframes floatLogo {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}

.hero-section h1 {
  font-size: clamp(25px, 4vw, 39px);
  font-weight: 800;
}

.hero-section h1 span {
  color: var(--green);
}

.hero-section h2 {
  margin-top: 15px;
  font-size: 17px;
}

.hero-section h2 span {
  color: var(--green);
}

.hero-section p {
  max-width: 500px;
  margin: 13px auto 25px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.hero-button {
  max-width: 280px;
}

.creator-line {
  margin-top: 28px;
  color: var(--green);
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 13px;
  margin-top: 20px;
}

.feature-card {
  min-height: 145px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 17px;
  background: var(--surface);
  text-align: left;
  transition: .25s;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0,255,136,.4);
  background: var(--surface-2);
}

.feature-icon {
  display: block;
  margin-bottom: 17px;
  color: var(--green);
  font-size: 24px;
}

.feature-card strong,
.feature-card small {
  display: block;
}

.feature-card strong {
  font-size: 12px;
}

.feature-card small {
  margin-top: 7px;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

/* CHAT */

.chat-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  min-height: calc(100vh - 135px);
  margin: 0 auto;
}

.chat-welcome {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px 10px;
  text-align: center;
}

.welcome-icon {
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 20px;
  color: #001b0e;
  background: var(--green);
  font-size: 32px;
  box-shadow: 0 0 35px rgba(0,255,136,.2);
}

.chat-welcome h2 {
  font-size: clamp(22px, 4vw, 30px);
}

.chat-welcome p {
  margin-top: 10px;
  color: var(--muted);
  font-size: 13px;
}

.prompt-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 550px;
  margin-top: 30px;
}

.prompt-grid button {
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 13px;
  color: var(--text);
  background: var(--surface);
  text-align: left;
  font-size: 12px;
  transition: .2s;
}

.prompt-grid button:hover {
  border-color: var(--green);
  background: rgba(0,255,136,.07);
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0 25px;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 100%;
  animation: messageIn .25s ease;
}

@keyframes messageIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.user {
  justify-content: flex-end;
}

.message-avatar {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  color: #001b0e;
  background: var(--green);
  font-weight: 800;
}

.message.assistant .message-avatar {
  color: #fff;
  background: linear-gradient(135deg, #00a968, #276de0);
}

.message-content {
  max-width: min(78%, 720px);
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: var(--surface-2);
  font-size: 13px;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

.message.user .message-content {
  color: #001b0e;
  background: var(--green);
  border-color: transparent;
}

.message-content pre {
  overflow-x: auto;
  padding: 14px;
  margin: 10px 0;
  border-radius: 10px;
  background: #030705;
}

.message-content code {
  font-family: monospace;
  font-size: 12px;
}

.message-content p + p {
  margin-top: 10px;
}

.message-content a {
  color: var(--green);
}

.message.user .message-content a {
  color: #003b23;
}

.composer-area {
  position: sticky;
  bottom: 0;
  padding: 15px 0 10px;
  background: linear-gradient(transparent, var(--bg) 22%);
}

.composer-tools {
  margin-bottom: 10px;
  color: var(--muted);
  font-size: 10px;
}

.composer {
  display: flex;
  align-items: flex-end;
  gap: 9px;
  padding: 10px;
  border: 1px solid rgba(0,255,136,.25);
  border-radius: 18px;
  background: #0d1511;
  box-shadow: 0 8px 35px rgba(0,0,0,.25);
}

.composer textarea {
  flex: 1;
  min-height: 40px;
  max-height: 150px;
  padding: 10px 5px;
  resize: none;
  outline: none;
  border: none;
  color: var(--text);
  background: transparent;
  font-size: 13px;
  line-height: 1.5;
}

.composer textarea::placeholder {
  color: #71847a;
}

.composer-button,
.send-button {
  flex-shrink: 0;
  width: 39px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: rgba(255,255,255,.06);
  color: var(--text);
}

.composer-button:hover {
  color: var(--green);
}

.send-button {
  color: #001b0e;
  background: var(--green);
  font-size: 22px;
  font-weight: 800;
}

/* CARTES ET AUTRES PAGES */

.content-card,
.admin-container {
  width: 100%;
  max-width: 850px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 25px;
}

.section-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  color: var(--green);
  background: rgba(0,255,136,.1);
  font-size: 24px;
}

.section-heading h2 {
  font-size: 20px;
}

.section-heading p {
  margin-top: 6px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.large-textarea {
  width: 100%;
  min-height: 150px;
  padding: 15px;
  margin-bottom: 18px;
  resize: vertical;
  outline: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  background: #080e0b;
  font-size: 13px;
  line-height: 1.6;
}

.status-message {
  margin-top: 12px;
  color: var(--green);
  font-size: 12px;
}

/* ADMINISTRATION */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 20px;
  border: 1px solid rgba(0,255,136,.15);
  border-radius: 15px;
  background: rgba(0,255,136,.05);
}

.stat-card small,
.stat-card strong {
  display: block;
}

.stat-card small {
  color: var(--muted);
  font-size: 11px;
}

.stat-card strong {
  margin-top: 12px;
  color: var(--green);
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
}

.admin-panel {
  padding: 18px;
  margin-top: 15px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: var(--surface-2);
  overflow-x: auto;
}

.admin-panel h3 {
  margin-bottom: 15px;
  font-size: 14px;
}

.admin-user,
.admin-message {
  padding: 13px 0;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
}

.admin-user:last-child,
.admin-message:last-child {
  border-bottom: none;
}

.admin-user small,
.admin-message small {
  display: block;
  margin-top: 5px;
  color: var(--muted);
}

/* PARAMÈTRES */

.setting-row {
  gap: 15px;
  padding: 18px 0;
  border-bottom: 1px solid var(--border);
}

.setting-row > div {
  flex: 1;
}

.setting-row strong,
.setting-row small {
  display: block;
}

.setting-row strong {
  font-size: 13px;
}

.setting-row small {
  margin-top: 6px;
  color: var(--muted);
  font-size: 11px;
}

.about-card {
  padding: 25px;
  margin-top: 25px;
  border: 1px solid rgba(0,255,136,.15);
  border-radius: 15px;
  background: rgba(0,255,136,.04);
  text-align: center;
}

.about-card .mini-logo {
  margin: 0 auto 12px;
}

.about-card h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
}

.about-card p {
  margin: 8px 0;
  color: var(--muted);
  font-size: 12px;
}

.about-card strong {
  color: var(--green);
  font-size: 11px;
}

/* NOTIFICATIONS */

.toast-container {
  position: fixed;
  z-index: 100;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  max-width: 320px;
  padding: 13px 17px;
  border: 1px solid rgba(0,255,136,.25);
  border-radius: 12px;
  color: var(--text);
  background: #102018;
  box-shadow: var(--shadow);
  font-size: 12px;
  animation: messageIn .2s ease;
}

/* THÈME CLAIR */

body.light {
  --bg: #f1f7f3;
  --surface: #ffffff;
  --surface-2: #f4faf6;
  --surface-3: #e5f0e9;
  --text: #14251b;
  --muted: #64796b;
  --border: rgba(0,0,0,.1);
  background: #f1f7f3;
}

body.light .sidebar {
  background: rgba(255,255,255,.97);
}

body.light .topbar {
  background: rgba(255,255,255,.9);
}

body.light .composer,
body.light .auth-card,
body.light .form-group input,
body.light .large-textarea {
  background: #fff;
}

body.light .hero-section {
  background: linear-gradient(145deg, #e7f9ee, #f7fffa);
}

body.light .nav-item {
  color: #405749;
}

body.light .nav-item:hover,
body.light .nav-item.active {
  color: #123d27;
}

body.light .composer textarea {
  color: #14251b;
}

/* RESPONSIVE MOBILE */

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .sidebar {
    width: 285px;
    transform: translateX(-105%);
    transition: transform .25s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .close-sidebar {
    display: inline-flex;
  }

  .main-content {
    width: 100%;
    margin-left: 0;
  }

  .menu-button {
    display: inline-flex;
  }

  .topbar {
    height: 65px;
    padding: 0 14px;
  }

  .page {
    min-height: calc(100vh - 65px);
    padding: 17px 13px;
  }

  .hero-section {
    padding: 40px 17px 30px;
  }

  .feature-grid {
    gap: 9px;
  }

  .feature-card {
    min-height: 130px;
    padding: 14px;
  }

  .chat-layout {
    min-height: calc(100vh - 105px);
  }

  .message-content {
    max-width: 85%;
    font-size: 12px;
  }

  .composer {
    gap: 5px;
    padding: 7px;
  }

  .composer-button,
  .send-button {
    width: 35px;
    height: 35px;
  }

  .content-card,
  .admin-container {
    padding: 18px;
    margin: 5px auto;
  }
}

@media (max-width: 420px) {
  .auth-card {
    padding: 25px 18px;
  }

  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .prompt-grid {
    grid-template-columns: 1fr;
  }

  .setting-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .setting-row button {
    width: 100%;
  }

  .composer-tools {
    font-size: 9px;
  }
}

/* OVERLAY DU MENU MOBILE */

.sidebar-overlay {
  display: none;
  position: fixed;
  z-index: 20;
  inset: 0;
  background: rgba(0,0,0,.65);
  backdrop-filter: blur(3px);
}

.sidebar-overlay.show {
  display: block;
}/* =========================================================
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
