// ---BUTTONS AND FORMS---
// ---UI ELEMENTS---
import { $ } from "../independents/utils.js";

// ---NAVIGATION BUTTONS AND FORMS---
export const UI = {
  buttons: {
    signUp: $("sign-up-btn"),
    login: $("login-btn"),
    forgot: $("recover-password"),
    existingAccount: $("login-link"), //REDIRECTED TO LOGIN PAGE
  },
  forms: {
    signUp: $("user-info"),
    login: $("login-user"),
    forgot: $("forgot-password"),
  },
};

// ---EVENT LISTENERS FOR NAVIGATION---
//DRY
export const buttonFormMap = {
  signUp: UI.forms.signUp,
  login: UI.forms.login,
  forgot: UI.forms.forgot,
  existingAccount: UI.forms.login,
};

// ---AUTH BUTTONS---
export const confirmPassBtn = $("confirm-new-password");
export const resetEmail = $("reset-email");
export const newPass = $("new-password");
export const createAccountBtn = $("account-created");
export const loginBtn = $("submit-data");
export const passwordInput = $("user-password");
export const emailInput = $("login-email");

// ---CLOSE ICON---
export const closeIcons = document.querySelectorAll(".close-icon");
