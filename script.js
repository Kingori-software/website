/* ============================================================
   CTT YOUTH MEDIA — v10 SCRIPT
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     CONFIG
  ------------------------------------------------------------ */
  const USERS = ["Loftus", "David", "Mark", "Praise", "Florence", "Precious", "Ryan", "Lewis"];
  const STORAGE_KEY = "ctt-user";

  /* ------------------------------------------------------------
     DOM
  ------------------------------------------------------------ */
  const body         = document.body;
  const loginGate    = document.getElementById("loginGate");
  const loginCard    = document.getElementById("loginCard");
  const loginForm    = document.getElementById("loginForm");
  const loginName    = document.getElementById("loginName");
  const loginPass    = document.getElementById("loginPass");
  const loginError   = document.getElementById("loginError");
  const faceWrap     = document.getElementById("faceWrap");
  const togglePw     = document.getElementById("togglePw");
  const confettiLayer= document.getElementById("confettiLayer");

  const site         = document.getElementById("site");
  const siteHeader   = document.getElementById("siteHeader");
  const greetingName = document.getElementById("greetingName");
  const userAvatar   = document.getElementById("userAvatar");
  const logoutBtn    = document.getElementById("logoutBtn");
  const scrollProgress = document.getElementById("scrollProgress");
  const themeToggle  = document.getElementById("themeToggle");
  const themeIcon    = document.getElementById("themeIcon");
  const toastEl      = document.getElementById("toast");

  /* ------------------------------------------------------------
     DATA
  ------------------------------------------------------------ */
  const events = [
    {
      title: "Missions Month",
      date: "September",
      description: "Missions.",
      image: "https://i.ibb.co/d0SQskDQ/IMG-20260906-WA7380.jpg"
    },
    {
      title: "Sunday",
      date: "September",
      description: "Church.",
      image: "https://i.ibb.co/dJrgqtkN/FSai5-UPXIAE0g-Y6.jpg"
    }
  ];

  const firstTeam = [
    { name: "Lewis", role: "Sound" },
    { name: "Faith", role: "Projection" },
    { name: "Ryan",  role: "Photography" },
    { name: "...",   role: "Cable and Stage Management" },
    { name: "Note taking", role: "Note taking" }
  ];

  const secondTeam = [
    { name: "Lewis", role: "Sound" },
    { name: "Faith", role: "Projections" },
    { name: "...",   role: "Socials" },
    { name: "Ryan",  role: "Photography" },
    { name: "David", role: "Cable and Stage management" }
  ];

  const answers = [
    {
      keys: ["service timing", "service times", "timing", "timings", "time"],
      answer: "The 1st Service is from 8:30am to 10:30am. The 2nd Service is from 11:30am to 1:30pm."
    },
    {
      keys: ["first service", "1st service"],
      answer: "The first service is the Teens Service, from 8:30am to 10:30am."
    },
    {
      keys: ["second service", "2nd service"],
      answer: "The second service is the Youth Service, from 11:30am to 1:30pm."
    },
    {
      keys: ["upcoming event", "upcoming events", "events"],
      answer: "Kindly scroll through to the Upcoming Events section and you'll check them there."
    }
  ];

  /* ------------------------------------------------------------
     LOGIN HELPERS
  ------------------------------------------------------------ */
  function findUser(name) {
    const needle = (name || "").trim().toLowerCase();
    return USERS.find(u => u.toLowerCase() === needle) || null;
  }

  function isValid(name, pass) {
    const user = findUser(name);
    if (!user) return false;
    return (pass || "").trim().toLowerCase() === (user.toLowerCase() + "@123");
  }

  function setFace(sad) {
    faceWrap.classList.toggle("sad", sad);
  }

  function showError(msg) {
    loginError.textContent = msg;
    loginError.classList.add("show");
    loginCard.classList.remove("shake");
    void loginCard.offsetWidth; // restart animation
    loginCard.classList.add("shake");
  }

  function clearError() {
    loginError.textContent = "";
    loginError.classList.remove("show");
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  /* ------------------------------------------------------------
     FACE INPUT HANDLERS
  ------------------------------------------------------------ */
  loginName.addEventListener("input", () => { setFace(false); clearError(); });
  loginPass.addEventListener("input", () => { setFace(false); clearError(); });

  togglePw.addEventListener("click", () => {
    const hidden = loginPass.type === "password";
    loginPass.type = hidden ? "text" : "password";
    togglePw.textContent = hidden ? "🙈" : "👁";
  });

  /* ------------------------------------------------------------
     CONFETTI
  ------------------------------------------------------------ */
  function burstConfetti() {
    const colors = ["#e03131", "#ff8787", "#ffd43b", "#ffffff", "#8f1111", "#ffa94d"];
    for (let i = 0; i < 80; i++) {
      const p = document.createElement("i");
      p.className = "confetti";
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
      p.style.animationDelay = (Math.random() * 0.4) + "s";
      const w = 6 + Math.random() * 8;
      p.style.width = w + "px";
      p.style.height = (w * 1.6) + "px";
      p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      confettiLayer.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  }

  /* ------------------------------------------------------------
     LOGIN SUBMIT
  ------------------------------------------------------------ */
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearError();

    const name = loginName.value.trim();
    const pass = loginPass.value;

    if (!name || !pass) {
      setFace(true);
      showError("Please fill in both your name and password.");
      return;
    }

    if (!isValid(name, pass)) {
      setFace(true);
      showError("Wrong name or password. Try again.");
      loginPass.value = "";
      loginPass.focus();
      return;
    }

    // success
    const user   = findUser(name);
    const pretty = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();

    setFace(false);
    faceWrap.classList.add("happy");
    burstConfetti();

    setTimeout(() => enterSite(pretty, false), 560);
  });

  /* ------------------------------------------------------------
     ENTER / EXIT SITE
  ------------------------------------------------------------ */
  let siteReady = false;

  function enterSite(name, instant) {
    localStorage.setItem(STORAGE_KEY, name);

    greetingName.textContent = name;
    userAvatar.textContent   = name.charAt(0).toUpperCase();

    site.classList.add("site-in");
    site.setAttribute("aria-hidden", "false");
    body.classList.remove("locked");

    if (instant) {
      loginGate.style.display = "none";
    } else {
      loginGate.classList.add("gate-out");
      setTimeout(() => { loginGate.style.display = "none"; }, 700);
    }

    if (!siteReady) {
      siteReady = true;
      initSite();
    }
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });

  /* ------------------------------------------------------------
     RENDER: EVENTS
  ------------------------------------------------------------ */
  const eventsGrid = document.getElementById("eventsGrid");

  function renderEvents() {
    eventsGrid.innerHTML = events.map((event, i) => {
      const imageLink = event.image;
      const titleLink = event.url || null;

      return `
        <article class="event-card reveal" style="--d:${(i * 0.08).toFixed(2)}s">
          <a href="${imageLink}" target="_blank" rel="noopener noreferrer">
            <img src="${event.image}" alt="${event.title}" loading="lazy" />
          </a>
          <div class="event-body">
            <div class="event-date">${event.date}</div>
            ${titleLink
              ? `<h3><a href="${titleLink}" target="_blank" rel="noopener noreferrer">${event.title}</a></h3>`
              : `<h3>${event.title}</h3>`}
            <p>${event.description}</p>
          </div>
        </article>
      `;
    }).join("");
  }

  /* ------------------------------------------------------------
     RENDER: TEAM
  ------------------------------------------------------------ */
  function initials(name) {
    const clean = (name || "").trim();
    if (!clean || /^\.+$/.test(clean)) return "★";
    return clean.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  }

  function renderTeam() {
    const gridFirst  = document.getElementById("teamGridFirst");
    const gridSecond = document.getElementById("teamGridSecond");

    function renderGrid(grid, team) {
      grid.innerHTML = team.map((person, i) => `
        <article class="team-card reveal" style="--d:${(i * 0.06).toFixed(2)}s">
          <div class="team-avatar">${initials(person.name)}</div>
          <h3>${person.name}</h3>
          <p>${person.role}</p>
        </article>
      `).join("");
    }

    renderGrid(gridFirst,  firstTeam);
    renderGrid(gridSecond, secondTeam);
  }

  /* ------------------------------------------------------------
     BOT CHAT
  ------------------------------------------------------------ */
  const chatMessages = document.getElementById("chatMessages");
  const chatForm     = document.getElementById("chatForm");
  const chatInput    = document.getElementById("chatInput");

  function botAnswer(question) {
    const q = question.toLowerCase().trim();
    const match = answers.find(item => item.keys.some(key => q.includes(key)));
    if (match) return match.answer;
    return "I can help with service timings, the first service, the second service, and upcoming events. Try asking me one of those.";
  }

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.innerHTML = `<b>${type === "bot" ? "CTT Bot" : "You"}</b><span>${text}</span>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function ask(question) {
    addMessage(question, "user");
    setTimeout(() => addMessage(botAnswer(question), "bot"), 300);
  }

  function setupChat() {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = chatInput.value.trim();
      if (!q) return;
      ask(q);
      chatInput.value = "";
    });

    document.querySelectorAll(".quick-questions button").forEach(btn => {
      btn.addEventListener("click", () => ask(btn.dataset.question));
    });
  }

  /* ------------------------------------------------------------
     THEME
  ------------------------------------------------------------ */
  function getTheme() {
    return document.documentElement.dataset.theme || "light";
  }

  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.dataset.theme = "dark";
      localStorage.setItem("ctt-theme", "dark");
    } else {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("ctt-theme", "light");
    }
    updateThemeIcon();
  }

  function updateThemeIcon() {
    themeIcon.textContent = getTheme() === "dark" ? "☀️" : "🌑";
  }

  function setupTheme() {
    const saved = localStorage.getItem("ctt-theme");
    setTheme(saved === "dark" ? "dark" : "light");

    themeToggle.addEventListener("click", () => {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }

  /* ------------------------------------------------------------
     TILT (hero card)
  ------------------------------------------------------------ */
  function setupTilt() {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) ` +
          `rotateY(${(x * 8).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ------------------------------------------------------------
     SCROLL FX (progress bar + sticky header)
  ------------------------------------------------------------ */
  function setupScrollFx() {
    const onScroll = () => {
      const h   = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      scrollProgress.style.width = pct + "%";
      siteHeader.classList.toggle("scrolled", h.scrollTop > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------
     SCROLL REVEALS
  ------------------------------------------------------------ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in)").forEach(el => {
      revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------
     INIT SITE
  ------------------------------------------------------------ */
  function initSite() {
    renderEvents();
    renderTeam();
    setupChat();
    setupTilt();
    observeReveals();

    document.getElementById("lastUpdated").textContent =
      new Date().toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric"
      });
  }

  /* ------------------------------------------------------------
     BOOT
  ------------------------------------------------------------ */
  setupTheme();       // theme persists even before login
  setupScrollFx();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && findUser(stored)) {
    enterSite(stored, true);
  } else {
    // stay on login gate
    setTimeout(() => loginName.focus(), 400);
  }

})();