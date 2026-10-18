// helpers/helperFunctions.js
import { UI } from "./domReferences.js";

export const showLoader = () => {
  UI.formLoader?.classList.remove("hidden");
};

export const hideLoader = () => {
  UI.formLoader?.classList.add("hidden");
};

export const showForm = (activeForm) => {
  if (!activeForm) return;

  showLoader();

  Object.values(UI.forms).forEach((form) => {
    if (!form) return;
    form.classList.remove("show");
  });

  setTimeout(() => {
    activeForm.classList.add("show");
    UI.landingContainer?.classList.add("hidden");
    hideLoader();
  }, 500);
};

export const showModal = (modal, duration = 3000) => {
  if (!modal) return;
  showLoader();

  const loadTimer = setTimeout(() => {
    hideLoader();
    modal.showModal();
  }, 2000);

  const timeOutId = setTimeout(() => {
    modal.close();
  }, duration);

  modal.addEventListener(
    "close",
    () => {
      clearTimeout(loadTimer);
      clearTimeout(timeOutId);
      hideLoader();
    },
    { once: true },
  );
};

export const indexRedirection = () => {
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
};

export const checkPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (password.length === 0) {
    return { message: "", color: "" };
  }

  if (score <= 2) {
    return { message: "Weak password 😡", color: "red" };
  } else if (score === 3 || score === 4) {
    return { message: "Medium password 🤨", color: "orange" };
  } else if (score === 5) {
    return { message: "Strong password 💪", color: "blue" };
  } else {
    return { message: "Excellent password 👌", color: "green" };
  }
};
