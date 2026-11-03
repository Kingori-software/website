/* ==========================================
   CTT YOUTH MEDIA — WEBSITE ENGINE
   Login | Events | Media Team | Chatbot
   Theme | Animations | Personal Greeting
========================================== */

"use strict";

/* ==========================================
   1. LOGIN SYSTEM
========================================== */

// Names are deliberately NOT displayed on the login screen.
// The user must type their name and password manually.

const allowedUsers = {
  loftus: "Loftus",
  david: "David",
  mark: "Mark",
  praise: "Praise",
  florence: "Florence",
  precious: "Precious",
  ryan: "Ryan",
  lewis: "Lewis",
Stephen:"Stephen",
};

const loginScreen = document.getElementById("loginScreen");
const loginForm = document.getElementById("loginForm");
const loginName = document.getElementById("loginName");
const loginPassword = document.getElementById("loginPassword");
const loginFace = document.getElementById("loginFace");
const faceEmoji = document.getElementById("faceEmoji");
const loginMessage = document.getElementById("loginMessage");
const togglePassword = document.getElementById("togglePassword");
const websiteContent = document.getElementById("websiteContent");
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutButton = document.getElementById("logoutButton");

let currentUser = null;

function setLoginFace(expression) {
  if (!loginFace || !faceEmoji) return;

  loginFace.classList.remove("sad", "happy");

  function setLoginFace(state) {
    const face = document.getElementById("faceEmoji");

    if (!face) return;

    if (state === "happy") {
        face.textContent = "😊";
    } else if (state === "sad") {
        face.textContent = "😔";
    } else {
        face.textContent = "😐";
    }
}

function showLoginMessage(message) {
  if (loginMessage) {
    loginMessage.textContent = message;
  }
}

function showWebsite(name) {
  currentUser = name;

  if (loginScreen) {
    loginScreen.hidden = true;
  }

  if (websiteContent) {
    websiteContent.hidden = false;
  }

  if (welcomeMessage) {
    welcomeMessage.textContent = `Hello, ${name} 👋`;
  }

  setLoginFace("happy");

  document.title = `CTT Youth Media | ${name}`;

  // Add the user's name to the current browser session.
  // This does not store the password.
  try {
    sessionStorage.setItem("cttCurrentUser", name);
  } catch (error) {
    // The website can still work if session storage is unavailable.
  }

  initializeRevealAnimations();
}

function showLogin() {
  currentUser = null;

  if (loginScreen) {
    loginScreen.hidden = false;
  }

  if (websiteContent) {
    websiteContent.hidden = true;
  }

  if (loginForm) {
    loginForm.reset();
  }

  showLoginMessage("");
  setLoginFace("normal");

  document.title = "CTT Youth Media";

  try {
    sessionStorage.removeItem("cttCurrentUser");
  } catch (error) {
    // No action needed.
  }

  if (loginName) {
    loginName.focus();
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const typedName = loginName.value.trim();
    const typedPassword = loginPassword.value;

    const normalizedName = typedName.toLowerCase();
    const correctName = allowedUsers[normalizedName];

    if (!typedName || !typedPassword) {
      setLoginFace("sad");
      showLoginMessage("Please enter your name and password.");
      return;
    }

    if (!correctName) {
      setLoginFace("sad");
      showLoginMessage("That name is not recognized. Please try again.");
      loginPassword.value = "";
      loginPassword.focus();
      return;
    }

    const expectedPassword = `${correctName}@123`;

    if (typedPassword !== expectedPassword) {
      setLoginFace("sad");
      showLoginMessage("Incorrect password. Give it another try.");
      loginPassword.value = "";
      loginPassword.focus();
      return;
    }

    showLoginMessage("");
    showWebsite(correctName);
  });
}

// Show/hide password button.
if (togglePassword && loginPassword) {
  togglePassword.addEventListener("click", function () {
    const isHidden = loginPassword.type === "password";

    loginPassword.type = isHidden ? "text" : "password";
    togglePassword.textContent = isHidden ? "Hide" : "Show";
    togglePassword.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password"
    );
  });
}

// Make the face react when the user starts typing.
if (loginName) {
  loginName.addEventListener("input", function () {
    setLoginFace("normal");
    showLoginMessage("");
  });
}

if (loginPassword) {
  loginPassword.addEventListener("input", function () {
    setLoginFace("normal");
    showLoginMessage("");
  });
}

// Logout.
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    showLogin();
  });
}

// Restore the signed-in name for the current browser session.
(function restoreSession() {
  try {
    const savedUser = sessionStorage.getItem("cttCurrentUser");

    if (savedUser && Object.values(allowedUsers).includes(savedUser)) {
      showWebsite(savedUser);
    } else {
      showLogin();
    }
  } catch (error) {
    showLogin();
  }
})();

 /* =================================
   DARK MODE / LIGHT MODE
================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("ctt-theme", theme);

    if (themeIcon) {
        themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

// Load the saved theme when the website opens
const savedTheme = localStorage.getItem("ctt-theme") || "dark";

applyTheme(savedTheme);

// Toggle between the two themes
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
}


/* ==========================================
   3. UPCOMING EVENTS
========================================== */

const events = [
  {
    title: "Missions Month",
    description:
      "A special opportunity to grow in faith, serve others, and participate in our church's mission activities.",
    icon: "🙏",
    date: "Missions Month",
    time: "See announcements"
  },
  {
    title: "Sunday Service",
    description:
      "Join the CTT Youth community for worship, fellowship, teaching, and spiritual growth.",
    icon: "✨",
    date: "Sunday",
    time: "Join us for service"
  }
];

const eventsGrid = document.getElementById("eventsGrid");

function renderEvents() {
  if (!eventsGrid) return;

  eventsGrid.innerHTML = events.map(function (event) {
    return `
      <article class="event-card reveal">
        <div class="event-icon" aria-hidden="true">
          ${event.icon}
        </div>

        <h3>${event.title}</h3>

        <p>${event.description}</p>

        <div class="event-meta">
          <span>📅 ${event.date}</span>
          <span>🕒 ${event.time}</span>
        </div>
      </article>
    `;
  }).join("");

  initializeRevealAnimations();
}

renderEvents();


/* ==========================================
   4. MEDIA TEAM MEMBERS
========================================== */

// Update these arrays with the correct names, roles,
// and photo URLs for your actual media team.

const firstTeam = [
  {
    name: "Lewis",
    role: "Sound",
    image: ""
  },
  {
    name: "Faith",
    role: "Projection",
    image: ""
  },
  {
    name: "Ryan",
    role: "Photography",
    image: ""
  },
  {
    name: "Team Member",
    role: "Cable and Stage Management",
    image: ""
  },
  {
    name: "Team Member",
    role: "Note Taking",
    image: ""
  }
];

const secondTeam = [
  {
    name: "Lewis",
    role: "Sound",
    image: ""
  },
  {
    name: "Faith",
    role: "Projections",
    image: ""
  },
  {
    name: "Team Member",
    role: "Socials",
    image: ""
  },
  {
    name: "Ryan",
    role: "Photography",
    image: ""
  },
  {
    name: "David",
    role: "Cable and Stage Management",
    image: ""
  }
];

const teamGridFirst = document.getElementById("teamGridFirst");
const teamGridSecond = document.getElementById("teamGridSecond");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function createTeamCard(member) {
  const name = escapeHTML(member.name);
  const role = escapeHTML(member.role);
  const initials = escapeHTML(
    member.name
      .split(/\s+/)
      .filter(Boolean)
      .map(function (part) {
        return part.charAt(0);
      })
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );

  const avatar = member.image
    ? `<div class="team-avatar">
         <img src="${escapeHTML(member.image)}"
              alt="${name}"
              loading="lazy">
       </div>`
    : `<div class="team-avatar" aria-label="${name}">
         ${initials}
       </div>`;

  return `
    <article class="team-card reveal">
      ${avatar}
      <h3>${name}</h3>
      <p>${role}</p>
    </article>
  `;
}

function renderTeam() {
  if (teamGridFirst) {
    teamGridFirst.innerHTML = firstTeam
      .map(createTeamCard)
      .join("");
  }

  if (teamGridSecond) {
    teamGridSecond.innerHTML = secondTeam
      .map(createTeamCard)
      .join("");
  }

  initializeRevealAnimations();
}

renderTeam();


/* ==========================================
   5. YOUTH MEDIA CHATBOT
========================================== */

const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

const chatbotAnswers = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    answer:
      "Hey there! 👋 Welcome to CTT Youth Media. What would you like to know?"
  },
  {
    keywords: ["service", "services", "church", "sunday"],
    answer:
      "We gather for Sunday services, worship, fellowship, and spiritual growth. Check our announcements for the latest service details. 🙏"
  },
  {
    keywords: ["first service", "morning service"],
    answer:
      "For the latest first-service time, please check the church's official announcements or contact the media team."
  },
  {
    keywords: ["second service", "afternoon service"],
    answer:
      "For the latest second-service time, please check the church's official announcements or contact the media team."
  },
  {
    keywords: ["event", "events", "upcoming", "calendar"],
    answer:
      "You can find our listed activities in the Upcoming Events section of this website. Keep checking announcements for updates! 📅"
  },
  {
    keywords: ["media", "team", "members", "photography", "sound"],
    answer:
      "Our media team supports church services through sound, projection, photography, social media, and stage support. Check the Media Team section to meet the team."
  },
  {
    keywords: ["missions", "mission"],
    answer:
      "Missions Month is an opportunity to serve, grow spiritually, and take part in mission activities. Please check the latest announcements for specific plans."
  },
  {
    keywords: ["contact", "email", "admin", "reach"],
    answer:
      "You can contact the CTT Youth Media administrator through the email address listed in the Contact section below."
  },
  {
    keywords: ["thank", "thanks", "thank you"],
    answer:
      "You're very welcome! 😊 We're glad to help. Have a blessed day!"
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    answer:
      "See you soon! 👋 Thanks for visiting CTT Youth Media."
  }
];

function addChatMessage(message, sender) {
  if (!chatMessages) return;

  const bubble = document.createElement("div");

  bubble.className =
    sender === "user" ? "chat-message user" : "chat-message";

  bubble.textContent = message;

  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatbotAnswer(message) {
  const normalizedMessage = message.toLowerCase().trim();

  for (const item of chatbotAnswers) {
    const matched = item.keywords.some(function (keyword) {
      return normalizedMessage.includes(keyword);
    });

    if (matched) {
      return item.answer;
    }
  }

  return (
    "Thanks for your question! 😊 I may not have that information yet. " +
    "Please check the website announcements or contact the CTT Youth Media team."
  );
}

function sendChatMessage(message) {
  const cleanMessage = message.trim();

  if (!cleanMessage) return;

  addChatMessage(cleanMessage, "user");

  const answer = getChatbotAnswer(cleanMessage);

  // Small delay makes the reply feel more conversational.
  window.setTimeout(function () {
    addChatMessage(answer, "bot");
  }, 350);
}

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const message = chatInput.value;
    if (!message.trim()) return;

    chatInput.value = "";
    sendChatMessage(message);
    chatInput.focus();
  });
}

// Quick-question buttons should use data-question="your question".
document.querySelectorAll("[data-question]").forEach(function (button) {
  button.addEventListener("click", function () {
    const question = button.getAttribute("data-question");

    if (question) {
      sendChatMessage(question);
    }
  });
});

// Initial chatbot greeting.
if (chatMessages && chatMessages.children.length === 0) {
  addChatMessage(
    "Hey! 👋 Welcome to CTT Youth Media. Ask me about services, events, or our media team.",
    "bot"
  );
}


/* ==========================================
   6. LAST UPDATED DATE
========================================== */

const lastUpdated = document.getElementById("lastUpdated");

if (lastUpdated) {
  lastUpdated.textContent = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


/* ==========================================
   7. SCROLL REVEAL ANIMATIONS
========================================== */

let revealObserver = null;

function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll(
    ".reveal:not(.visible)"
  );

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });

    return;
  }

  if (revealObserver) {
    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });

    return;
  }

  revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeRevealAnimations();
});


/* ==========================================
   8. IMAGE FALLBACKS
========================================== */

// If a team photo URL fails, show the member's initials
// rather than leaving a broken image on the website.

document.addEventListener("error", function (event) {
  const target = event.target;

  if (target instanceof HTMLImageElement) {
    target.style.opacity = "0.35";
    target.alt = target.alt || "Image unavailable";
  }
}, true);


/* ==========================================
   9. CONSOLE MESSAGE
========================================== */

console.log(
  "%cCTT YOUTH MEDIA",
  "font-size:20px;font-weight:bold;color:#7c5cff;"
);

console.log(
  "%cServing through creativity, connection, and media.",
  "font-size:12px;color:#00bfae;"
);