import { signUpForm, getFormInputs} from "./selectors.js"
import { $ } from "../independents/utils.js"; 




export const authInputs = {
    signup: {
    form: signUpForm,

    inputs: getFormInputs(signUpForm)
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


console.log(authInputs);
