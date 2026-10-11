import { $ } from "../independents/utils.js";

// --- ID SELECTORS ---

export const signUpForm = $("account-created").closest("form");

export const getFormInputs = (formSelector) => {
    const form = typeof formSelector === "string" ? $(formSelector) : formSelector;
    return form ? Array.from(form.querySelectorAll("input")) : [];
};

// ---AUTH & FORM INPUTS---

export const authElements = {
    signUp: {
        form: signUpForm,

        inputs: getFormInputs(signUpForm.closest("form"))
    },

    login: {
        email: $("login-email"), 
        password: $("user-password")
    }, 

    recover: {
        email: $("reset-email"), 
        newPassword: $("new-password") 
    }
};





