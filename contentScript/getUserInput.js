import { getCurrentUser } from "../script/auth.js";

// Fetch current user details from storage
const userProfile = getCurrentUser();
const $ = (id) => document.getElementById(id);

// Map profile fields to DOM elements
const profileInput = {
    name: $("fullname"),
    username: $("username"),
    age: $("age"), 
    email: $("email")
};

// Field label mappings
const labels = {
    name: "Name", 
    username: "Username", 
    age: "Age", 
    email: "Email"
};


// Populate profile UI elements with user data (BACK-END NOTE: Replace getCurrentUser() with API call e.g., GET /api/user/profile)
Object.entries(profileInput).forEach(([key, element]) => {
    
    const labelText = labels[key]; 
    const userData = userProfile[key] || "N/A";
    
    
    if(element){
        element.textContent = `${labelText}: ${userData}`;
    }
    
});