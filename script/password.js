//SCRIPT FOR PASSWORD MODULE//

// Calculate password strength score and return status message with color
export const checkPasswordStrength = (password) => {
        let score = 0; 
        if (password.length >= 6) score++; 
        if(password.length >= 10) score++;
        if(/[A-Z]/.test(password)) score++; 
        if(/[a-z]/.test(password)) score++;
        if(/[0-9]/.test(password)) score++; 
        if(/[!@#$%^&*]/.test(password)) score++; 

        if(password.length === 0) {
            return {message : "", color: ""};
        }
        
        if(score <= 2){
            return {message: "Weak password 😡", color: "red"};
        }

        else if(score === 3 || score === 4){
            return {message: "Medium password 🤨", color: "orange"}; 
        } 

        else if(score === 5) {
            return{message: "Strong password ✌", color: "blue"};
        }

        else {
            return{message: "Excellent password 👌", color: "green"};
        }
    }