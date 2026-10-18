// helpers/domReferences.js
export const $ = (id) => document.getElementById(id);

export const UI = {
  formLoader: $("form-loader"),
  landingContainer: $("landing-container"),

  buttons: {
    signUp: $("sign-up-btn"),
    login: $("login-btn"),
    forgot: $("recover-password"),
    existingAccount: $("login-link"),
    createAccount: $("account-created"),
    confirmPass: $("confirm-new-password"),
    submitLogin: $("submit-data"),
  },

  forms: {
    signUp: $("user-info"),
    login: $("login-user"),
    forgot: $("forgot-password"),
  },

  inputs: {
    password: $("password"),
    confirmPassword: $("confirm-password"),
    userPassword: $("user-password"),
    newPassword: $("new-password"),
    resetEmail: $("reset-email"),
    loginEmail: $("login-email"),
    name: $("name"),
    email: $("email"),
    username: $("username"),
    age: $("age"),
  },

  modals: {
    success: $("account-new"),
    failed: $("account-failed"),
    changedPassword: $("changed-pass"),
    matchedError: $("matched-error-msg"),
    emptyError: $("insufficient-length-msg"),
    shortError: $("lessThanSix-msg"),
    emptyInputsMsg: $("empty-input-msg"),
    lessThanSix: $("lessThanSixChar-msg"),
    mismatched: $("mismatched-msg"),
    loggedIn: $("successLogInMsg"),
    incorrectCredential: $("incorrectEmailPassMsg"),
    unrecognizedAccount: $("unrecognized-account-msg"),
    alreadyExistAccount: $("alreadyExistAccount-msg"),
  },
};
