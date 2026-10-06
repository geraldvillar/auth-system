import { authElements } from "./selectors.js"
import { $ } from "../independents/utils.js"; 




export const signUpForm = $("account-created");

export const signUpInputs = {
    form: signUpForm.querySelectorAll("input")
}

export const loginInputs = {
    login: {
        email: $("login-email"), 
        password: $("user-password")
    }
}


export const recoveryInputs = {
    recover: {
        email: $("reset-email"), 
        newPassword: $("new-password")
    }
}

console.log(signUpInputs);
