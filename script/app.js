// script/app.js
import { UI, $ } from "../helpers/domReferences.js";
import {
  showLoader,
  hideLoader,
  showForm,
  showModal,
  indexRedirection,
  checkPasswordStrength,
} from "../helpers/helperFunctions.js";

document.addEventListener("DOMContentLoaded", () => {
  const formsList = Object.values(UI.forms);

  // --- NAVIGATION EVENT LISTENERS ---
  const buttonFormMap = {
    signUp: UI.forms.signUp,
    login: UI.forms.login,
    forgot: UI.forms.forgot,
    existingAccount: UI.forms.login,
  };

  Object.entries(UI.buttons).forEach(([key, button]) => {
    button?.addEventListener("click", () => {
      showForm(buttonFormMap[key]);
    });
  });

  // --- CLOSE ICON BUTTON READER ---
  document.querySelectorAll(".close-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const modalId = icon.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.close();
    });
  });

  // ==========================================
  // --- FORGOT PASSWORD LOGIC ---
  // BACK-END NOTE: CHANGE THE LOCALSTORAGE LOGIC WITH:
  // POST /api/v1/auth/forgot-password or /reset-password
  // ==========================================
  const { resetEmail, newPassword: newPassInput, confirmPass } = UI.inputs;

  const isNewPasswordValid = () => {
    const registeredEmailVal = resetEmail?.value.trim() || "";
    const newPassVal = newPassInput?.value.trim() || "";

    if (registeredEmailVal === "" || newPassVal === "") {
      confirmPass?.setAttribute("disabled", "true");
    } else {
      confirmPass?.removeAttribute("disabled");
    }
  };

  if (resetEmail && newPassInput) {
    resetEmail.addEventListener("input", isNewPasswordValid);
    newPassInput.addEventListener("input", isNewPasswordValid);
  }

  if (confirmPass) {
    confirmPass.addEventListener("click", (event) => {
      event.preventDefault();

      const emailInput = resetEmail.value.trim();
      const newPassword = newPassInput?.value;

      if (emailInput === "" || newPassword === "") {
        showModal(UI.modals.emptyError);
        return;
      } else if (newPassword.length < 6) {
        showModal(UI.modals.shortError);
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex((user) => user.email === emailInput);

      if (userIndex === -1) {
        showModal(UI.modals.unrecognizedAccount);
        return;
      }

      if (users[userIndex].password === newPassword) {
        showModal(UI.modals.matchedError);
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      showModal(UI.modals.changedPassword);
      indexRedirection();
    });
  }

  // ==========================================
  // ACCOUNT CREATION (SIGN UP) LOGIC
  // BACK-END NOTE: CONNECT HERE API endpoint:
  // POST /api/v1/auth/register
  // Expected Payload: { name, email, username, age, password }
  // ==========================================
  const createAccountBtn = UI.buttons.createAccount;

  if (createAccountBtn) {
    const actualForm = createAccountBtn.closest("form");

    if (actualForm) {
      const inputs = actualForm.querySelectorAll("input");

      const validateFormInputs = () => {
        const allFilled = Array.from(inputs).every(
          (input) => input.value.trim() !== "",
        );

        if (allFilled) {
          createAccountBtn.removeAttribute("disabled");
        } else {
          createAccountBtn.setAttribute("disabled", "true");
        }
      };

      inputs.forEach((input) => {
        input.addEventListener("input", validateFormInputs);
      });
    }

    createAccountBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const actualForm = event.target.closest("form");
      if (!actualForm) return;

      const initialPass = UI.inputs.password?.value;
      const confirmedPass = UI.inputs.confirmPassword?.value;

      if (initialPass !== confirmedPass) {
        showModal(UI.modals.mismatched);
        return;
      }

      if (initialPass.length < 6 || confirmedPass.length < 6) {
        showModal(UI.modals.lessThanSix);
        return;
      }

      const name = UI.inputs.name?.value;
      const email = UI.inputs.email?.value;
      const username = UI.inputs.username?.value;
      const age = UI.inputs.age?.value;
      const password = UI.inputs.password?.value;

      // BACK-END MOCKUP: Local Storage (replace it by fetch() POST request)
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        showModal(UI.modals.alreadyExistAccount);
        return;
      }

      users.push({ name, email, username, age, password });
      localStorage.setItem("users", JSON.stringify(users));
      actualForm.reset();
      createAccountBtn.setAttribute("disabled", "true");
      showModal(UI.modals.success);
      indexRedirection();
    });
  }

  // --- EYE TOGGLE FOR PASSWORD ---
  const passwordInputsMap = {
    signup: UI.inputs.password,
    current: UI.inputs.userPassword,
    new: UI.inputs.newPassword,
    confirm: UI.inputs.confirmPassword,
  };

  const toggleButtons = document.querySelectorAll(".togglePassword");

  if (toggleButtons) {
    toggleButtons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const target = icon.dataset.target;
        const input = passwordInputsMap[target];

        if (!input) return;

        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";

        icon.src = isHidden
          ? "imgResources/view.png"
          : "imgResources/close-eye.png";
      });
    });
  }

  // --- PASSWORD STRENGTH TEST ---
  Object.entries(passwordInputsMap).forEach(([key, input]) => {
    if (!input) return;

    input.addEventListener("input", () => {
      const strength = checkPasswordStrength(input.value);
      const msg = document.querySelector(`[data-strength="${key}"]`);

      if (!msg) return;

      msg.textContent = strength.message;
      msg.style.color = strength.color;
    });
  });

  // ==========================================
  // LOG IN LOGIC
  // BACK-END NOTE: Once integrated with the API, use the token provided by the server
  // POST /api/v1/auth/login
  // Expected Payload: { email: emailLogin, password: passwordLogin }
  // Expected Response: JWT Token or Session Cookie + User Details
  // ==========================================
  const loginBtn = UI.buttons.submitLogin;
  const passwordInput = UI.inputs.userPassword;
  const emailInput = UI.inputs.loginEmail;

  const validateLoginForm = () => {
    const emailValue = emailInput?.value.trim() || "";
    const passwordValue = passwordInput?.value.trim() || "";

    if (emailValue === "" || passwordValue === "") {
      loginBtn?.setAttribute("disabled", "true");
    } else {
      loginBtn?.removeAttribute("disabled");
    }
  };

  if (emailInput && passwordInput) {
    emailInput.addEventListener("input", validateLoginForm);
    passwordInput.addEventListener("input", validateLoginForm);
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const emailLogin = emailInput?.value;
      const passwordLogin = passwordInput?.value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const validUser = users.find(
        (user) => user.email === emailLogin && user.password === passwordLogin,
      );

      if (validUser) {
        showModal(UI.modals.loggedIn);
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        setTimeout(() => {
          hideLoader();
          window.location.href = "/content/homepage.html";
        }, 3000);
      } else {
        showModal(UI.modals.mismatched);
      }
    });
  }
});
