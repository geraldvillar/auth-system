// ---BEGINNING OF ORTHOGONAL TO INDEX PAGE, INDEX SCRIPT AND OTHER COMPONENTS---

import { getCurrentUser } from "../script/auth.js";
import { showLoader, hideLoader, $ } from "../script/utils.js";
import { showModal } from "../script/modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const iconLoading = document.getElementById("icon-loading");

  // Check authentication (BACK-END NOTE: Replace with server session check / JWT verification)
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  // ---SESSION TIMEOUT---
  let inactivityTimer; 
  const sessionExpiredMsg = $("sessionExpired-msg");

  const resetInactivityTimer = () => {

    if (sessionExpiredMsg && sessionExpiredMsg.open) return;
    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {

      localStorage.removeItem("currentUser");

      if(sessionExpiredMsg) {
        sessionExpiredMsg.showModal();
      } else {
        window.location.href = "../index.html";
      }
    }, 10 * 60 * 1000);
  };
      window.addEventListener("mousemove", resetInactivityTimer);
      window.addEventListener("mousedown", resetInactivityTimer); 
      window.addEventListener("click", resetInactivityTimer); 
      window.addEventListener("scroll", resetInactivityTimer);
      window.addEventListener("keypress", resetInactivityTimer);

      resetInactivityTimer();
    
      const sessionCloseIcon = document.querySelector("#sessionExpired-msg .close-icon");
      if(sessionCloseIcon){
        sessionCloseIcon.addEventListener("click", () =>{
          window.location.href = "../index.html";
        });
      }

  // ---SCROLLSPY ACTIVE STATE FOR LINK ON SCROLL---
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("ul a[href^='#']");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ---POPULATE PROFILE UI ELEMENTS---
  const fullnameEl = $("fullname-val");
  const usernameEl = $("username-val");
  const ageEl = $("age-val");
  const emailEl = $("email-val");

  if (fullnameEl) {
    fullnameEl.innerHTML = `Name: ${currentUser.name || "N/A"} <img src="/imgResources/id-cardii.png" class="profile-icon">`;
  }
  if (usernameEl) {
    usernameEl.innerHTML = `Username: ${currentUser.username || "N/A"} <img src="/imgResources/user.png" class="profile-icon">`;
  }
  if (ageEl) {
    ageEl.innerHTML = `Age: ${currentUser.age || "N/A"} <img src="/imgResources/age.png" class="profile-icon">`;
  }
  if (emailEl) {
    emailEl.innerHTML = `Email Address: ${currentUser.email || "N/A"} <img src="/imgResources/email.png" class="profile-icon">`;
  }

  // ---TYPING EFFECT FOR WELCOME GREETING---
  const welcome = document.getElementById("welcome");

  let index = 0;
  const message = ` , ${currentUser.name} !`;

  const typeText = () => {
    if (index < message.length) {
      welcome.textContent += message[index];
      index++;

      setTimeout(typeText, 150);
    } else {
      setTimeout(() => {
        index = 0;
        welcome.textContent = "Welcome";

        setTimeout(typeText, 300);
      }, 5000);
    }
  };
  typeText();

  // Logout logic (BACK-END NOTE: Replace localStorage removal with POST /api/v1/auth/logout endpoint)
  const logOutBtn = document.querySelector("#logout-btn");
  const logoutModal = $("logout-msg");
  const loader = $("form-loader");

  logOutBtn.addEventListener("click", () => {
    const iconLoading = document.getElementById("icon-loading");
    iconLoading.style.top = `${window.scrollY}px`;
    showLoader(loader);

    setTimeout(() => {
      hideLoader();

      if (logoutModal && typeof logoutModal.showModal === "function");
      {
        showModal(logoutModal);
      }

      setTimeout(() => {
        localStorage.removeItem("currentUser");
        window.location.href = "../index.html";
      }, 1500);
    }, 1500);
  });

  // ---TYPING EFFECT FOR BIO/QUESTION CONTAINER---
  const messageQuest = $("question");

  let mesIndex = 0;

  const actualMsg =
    "I built this project from the ground up to challenge myself and apply the core principles I have mastered in Web Development Fundamentals. Every line of code, from the structure to the styling, was written from scratch to solidify my technical foundation and demonstrate my ability to translate concepts into functional, modern web interfaces.";

  function typingMessage() {
    let mesIndex = 0;
    messageQuest.textContent = "";

    function type() {
      if (mesIndex < actualMsg.length) {
        messageQuest.textContent += actualMsg[mesIndex];
        mesIndex++;

        setTimeout(type, 40);
      } else {
        setTimeout(() => {
          typingMessage();
        }, 60000);
      }
    }
    type();
  }

  typingMessage();

  // --- SCROLL TO TOP ARROW LOGIC ---
  const backToTopBtn = $("backToTopBtn");
  const userProfileSection = $("userProfile");

  if (backToTopBtn && userProfileSection) {
    window.addEventListener("scroll", () => {
      const secondSectionPosition = userProfileSection.offsetTop; //Top part of the section

      if (window.scrollY >= secondSectionPosition - 150) {
        backToTopBtn.classList.remove("hidden");
      } else {
        backToTopBtn.classList.add("hidden");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ---FOR PROFILE UPDATING INFO AND SAVE---

  // BACKEND NOTE: PROFILE UPDATING & SAVING SYSTEM

  // API Endpoint Reference (Future Backend Integration):
  // - GET /api/users/:id -> Fetch user profile data
  // - PUT /api/users/:id -> Update user profile data in database

  const profileUpdate = $("profileUp-msg");
  let activeUser = currentUser;

  const profileFields = [
    { key: "name", display: $("fullname-val"), input: $("editableName") },
    {
      key: "username",
      display: $("username-val"),
      input: $("editableUsername"),
    },
    { key: "age", display: $("age-val"), input: $("editableAge") },
    { key: "email", display: $("email-val"), input: $("editableEmail") },
  ];

  const editButton = $("editButton");
  const saveButton = $("saveButton");

  const loadProfileData = (user) => {
    profileFields.forEach(({ key, display, input }) => {
      const val = user[key] || "";
      if (display) display.textContent = val || "N/A";
      if (input) input.value = val;
    });
  };

  loadProfileData(activeUser);

  if (editButton && saveButton) {
    editButton.addEventListener("click", () => {
      showLoader(loader);

      // BACKEND NOTE: Network Request Simulation.
      // Replace this setTimeout block with an async/await fetch() or Axios PUT/PATCH request.
      // Example:
      // const response = await fetch(`/api/users/${activeUser.id}`, {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(updatedUser)
      // });
      // const result = await response.json();

      setTimeout(() => {
        hideLoader(loader);

        profileFields.forEach(({ display, input }) => {
          if (display) display.classList.add("hidden");
          if (input) input.classList.remove("hidden");
        });

        editButton.classList.add("hidden");
        saveButton.classList.remove("hidden");
      }, 500);
    });

    saveButton.addEventListener("click", () => {
      const iconLoading = $("icon-loading");
      if (iconLoading) iconLoading.style.top = `${window.scrollY}px`;
      showLoader(loader);

      setTimeout(() => {
        hideLoader(loader);

        const updatedUser = profileFields.reduce(
          (acc, { key, input }) => {
            acc[key] = input ? input.value : "";
            return acc;
          },
          { ...activeUser },
        );

        activeUser = updatedUser;

        localStorage.setItem("currentUser", JSON.stringify(activeUser));

        let allUsers = JSON.parse(localStorage.getItem("users")) || [];
        allUsers = allUsers.map((u) =>
          u.email === activeUser.email ? activeUser : u,
        );
        localStorage.setItem("users", JSON.stringify(allUsers));

        loadProfileData(activeUser);

        profileFields.forEach(({ display, input }) => {
          if (display) display.classList.remove("hidden");
          if (input) input.classList.add("hidden");
        });

        saveButton.classList.add("hidden");
        editButton.classList.remove("hidden");

        if (profileUpdate) {
          showModal(profileUpdate);
        }
      }, 500);
    });
  }

  // ---DATE INFO: DATE OF ACCOUNT CREATION & DELETE ACCOUNT---
  const q = (id) => document.querySelector(id);
  const elements = {
    dateIcon: q("#dateIcon"),
    settingsDropdown: q("#settingsDropdown"),
    creationDateText: q("#creationDateText"),
    deleteAccountTrigger: q("#delete-account"),
    confirmDeleteDiv: q("#confirm-delete"),
    yesBtn: q("#yes"),
    noBtn: q("#no"),
    iconLoading: q("#icon-loading"),
  };

  if (elements.creationDateText) {
    let creationDate = localStorage.getItem("account_creation_date");

    if (!creationDate) {
      creationDate = new Date().toISOString();
      localStorage.setItem("account_creation_date", creationDate);
    }

    const dateObj = new Date(creationDate);
    elements.creationDateText.textContent = isNaN(dateObj.getTime())
      ? "N/A"
      : dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  }

  // 2. ---TOGGLE SETTINGS DROPDOWN---
  if (elements.dateIcon && elements.settingsDropdown) {
    elements.dateIcon.addEventListener("click", () => {
      elements.settingsDropdown.classList.toggle("hidden");
    });
  }

  // 3. ---TOGGLE DELETE CONFIRMATION BOX---
  if (elements.deleteAccountTrigger && elements.confirmDeleteDiv) {
    elements.deleteAccountTrigger.addEventListener("click", () => {
      elements.confirmDeleteDiv.classList.toggle("hidden");
    });
  }

  // 4. ---CANCEL DELETE (NO BUTTON)---
  if (elements.noBtn && elements.confirmDeleteDiv) {
    elements.noBtn.addEventListener("click", () => {
      elements.confirmDeleteDiv.classList.add("hidden");
    });
  }

  // 5. ---CONFIRM DELETE (YES BUTTON)---
  if (elements.yesBtn) {
    elements.yesBtn.addEventListener("click", () => {
      showLoader(loader);

      setTimeout(() => {
        hideLoader(loader);

        localStorage.removeItem("currentUser");

        // BACK-END NOTE: Once a database and backend server are integrated, replace this
        // with an API call (e.g., fetch('/api/users/' + activeUser.id, { method: 'DELETE' }))
        let allUsers = JSON.parse(localStorage.getItem("users")) || [];

        if (typeof activeUser !== "undefined" && activeUser) {
          allUsers = allUsers.filter((u) => u.email !== activeUser.email);
          localStorage.setItem("users", JSON.stringify(allUsers));
        }

        alert("Account successfully deleted.");
        window.location.href = "../index.html";
      }, 1500);
    });
  }

  // ---ANIMATION FOR DATE---
  let startTime = null;
  const duration = 1500;

  const animation = (timestamp) => {
    if (!timestamp) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const progress = (elapsed % duration) / duration;
    const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.12;

    const rotation = Math.sin(progress * Math.PI * 4) * 5;

    dateIcon.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

    requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);

  const themeToggleBtn = $("themeToggleBtn");
  const lightIcon = $("lightIcon");
  const darkIcon = $("darkIcon");

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    lightIcon.classList.toggle("active");
    lightIcon.classList.toggle("hidden");

    darkIcon.classList.toggle("active");
    darkIcon.classList.toggle("hidden");
  });

  // ---COPY EMAIL LOGIC---
  const copyBtn = document.getElementById("copy-btn");
  const emailText = document.getElementById("email-text").innerText;
  const tooltipText = document.getElementById("tooltip-text");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(emailText)
        .then(() => {
          tooltipText.innerText = "Copied!";
          copyBtn.classList.add("copied");

          setTimeout(() => {
            copyBtn.classList.remove("copied");
            tooltipText.innerText = "Copy";
          }, 1500);
        })
        .catch((err) => {
          console.error("Clipboard copy failed: ", err);
        });
    });
  }
});
