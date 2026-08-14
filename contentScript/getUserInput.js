import { getCurrentUser } from "../script/auth.js";

const userProfile = getCurrentUser();
const $ = (id) => document.getElementById(id);

const profileInput = {
    name: $("fullname"),
    username: $("username"),
    age: $("age"), 
    email: $("email")
};

const labels = {
    name: "Name", 
    username: "Username", 
    age: "Age", 
    email: "Email"
};

Object.entries(profileInput).forEach(([key, element]) => {
    
    const labelText = labels[key]; 
    const userData = userProfile[key] || "N/A";
    
    
    if(element){
        element.textContent = `${labelText}: ${userData}`;
    }
    
});