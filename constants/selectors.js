import { $ } from "../script/utils";

// --- ID SELECTORS ---

export const signUpForm = $("account-created");

// ---AUTH & FORM INPUTS---

export const authElements = {
    signUp: {
        form: $("account-created").closest("form"), 

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





