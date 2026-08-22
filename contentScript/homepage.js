

import { getCurrentUser } from "../script/auth.js";
import { showLoader, hideLoader } from "../script/utils.js";
import { showModal } from "../script/modal.js";
import { $ } from "../script/utils.js";


document.addEventListener("DOMContentLoaded", () => {
    // Check authentication (BACK-END NOTE: Replace with server session check / JWT verification)
const currentUser = getCurrentUser(); 

    if(!currentUser){
        window.location.href="index.html";
        return;
    }

    // Populate profile UI elements
    const fullnameEl = $("fullname");
    const usernameEl = $("username");
    const ageEl = $("age");
    const emailEl = $("email");

    if(fullnameEl){
        fullnameEl.innerHTML = `Name: ${currentUser.name || 'N/A'} <img src="/imgResources/id-cardii.png" class="profile-icon">`;
    } 
    if (usernameEl) {
        usernameEl.innerHTML = `Username: ${currentUser.username || 'N/A'} <img src="/imgResources/user.png" class="profile-icon">`;
    }
    if (ageEl) {
        ageEl.innerHTML = `Age: ${currentUser.age || 'N/A'} <img src="/imgResources/age.png" class="profile-icon">`;
    }
    if (emailEl) {
        emailEl.innerHTML = `Email Address: ${currentUser.email || 'N/A'} <img src="/imgResources/email.png" class="profile-icon">`;
    }


// Typing effect for welcome greeting
const welcome = document.getElementById("welcome");

let index = 0; 
const message = ` , ${currentUser.name} !`;

function typeText(){
    if(index < message.length) {
        welcome.textContent += message[index];
        index++; 

        setTimeout(typeText, 150);

    } else {
        setTimeout(() => {
        index = 0; 
        welcome.textContent = "Welcome";

        setTimeout(typeText, 300);
        }, 5000);
    }
}
typeText();

// Logout logic (BACK-END NOTE: Replace localStorage removal with POST /api/v1/auth/logout endpoint)
const logOutBtn = document.querySelector("#logout-btn");
const logoutModal = document.getElementById("logout-msg");
const loader = document.getElementById("form-loader");

logOutBtn.addEventListener("click", () => {

    showLoader(loader);

    setTimeout(() => {
        hideLoader(loader);
    
    showModal(logoutModal);

    }, 2000);
    
    setTimeout(() => {

    
        localStorage.removeItem("currentUser");

        
        window.location.href = "../index.html";

    }, 3000);

});

// Typing effect for bio/question container
const messageQuest = document.getElementById("question");

let mesIndex = 0;

const actualMsg =
    "I built this project from the ground up to challenge myself and apply the core principles I have mastered in Web Development Fundamentals. Every line of code, from the structure to the styling, was written from scratch to solidify my technical foundation and demonstrate my ability to translate concepts into functional, modern web interfaces.";

function typingMessage() {
let mesIndex = 0;
messageQuest.textContent = "";
function type(){
    if (mesIndex < actualMsg.length) {

        messageQuest.textContent += actualMsg[mesIndex];
        mesIndex++;
        
        setTimeout(type, 40);
    } else{
        setTimeout(() =>{
            typingMessage();
        }, 60000);
    }
}
type();
}


typingMessage();
});