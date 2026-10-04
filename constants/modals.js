import { $ } from "../independents/utils.js";

// ---MODALS--- 
export const modals = {
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
};
