

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
const logoutModal = $("logout-msg");
const loader = $("form-loader");

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
const messageQuest = $("question");

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


//FOR PROFILE UPDATING INFO AND SAVE
    const updateMsg = $("profileUp-msg");
    let activeUser = currentUser;

    const fullnameValEl = $("fullname-val");
    const usernameValEl = $("username-val");
    const ageValEl = $("age-val");
    const emailValEl = $("email-val");

    const editFullName = $("editableName");
    const editUsername = $("editableUsername");
    const editAge = $("editableAge");
    const editEmail = $("editableEmail");

    const editButton = $("editButton");
    const saveButton = $("saveButton");

    const displayElements = [fullnameValEl, usernameValEl, ageValEl, emailValEl];
    const editInputs = [editFullName, editUsername, editAge, editEmail];

    function loadProfileData(user) {
        if (fullnameValEl) fullnameValEl.textContent = user.name || 'N/A';
        if (usernameValEl) usernameValEl.textContent = user.username || 'N/A';
        if (ageValEl) ageValEl.textContent = user.age || 'N/A';
        if (emailValEl) emailValEl.textContent = user.email || 'N/A';

        if (editFullName) editFullName.value = user.name || '';
        if (editUsername) editUsername.value = user.username || '';
        if (editAge) editAge.value = user.age || '';
        if (editEmail) editEmail.value = user.email || '';
    }

    loadProfileData(activeUser);

    if (editButton && saveButton) {
        editButton.addEventListener("click", () => {
            showLoader(loader);

            setTimeout(() => {
                hideLoader(loader);

                displayElements.forEach(el => el.classList.add("hidden"));
                editInputs.forEach(el => el.classList.remove("hidden"));

                editButton.classList.add("hidden");
                saveButton.classList.remove("hidden");
            }, 500);
        });

        saveButton.addEventListener("click", () => {
            showLoader(loader);

            setTimeout(() => {
                hideLoader(loader);

                const updatedUser = {
                    ...activeUser,
                    name: editFullName.value,
                    username: editUsername.value,
                    age: editAge.value,
                    email: editEmail.value
                };

                localStorage.setItem("currentUser", JSON.stringify(updatedUser));

                let allUsers = JSON.parse(localStorage.getItem("users")) || [];
                allUsers = allUsers.map(u => u.email === activeUser.email ? updatedUser : u);
                localStorage.setItem("users", JSON.stringify(allUsers));

                activeUser = updatedUser;
                loadProfileData(activeUser);

                displayElements.forEach(el => el.classList.remove("hidden"));
                editInputs.forEach(el => el.classList.add("hidden"));

                saveButton.classList.add("hidden");
                editButton.classList.remove("hidden");

                showModal(updateMsg);

            }, 2000);
        });
    }
});


const copyBtn = document.getElementById("copy-btn");
const emailText = document.getElementById("email-text").innerText;
const tooltipText = document.getElementById("tooltip-text");

copyBtn.addEventListener("click", () => {
    
    navigator.clipboard.writeText(emailText).then(() => {
        tooltipText.innerText = "Copied!";
        copyBtn.classList.add("copied");

        
        setTimeout(() => {
            copyBtn.classList.remove("copied");
            tooltipText.innerText = "Copy";
        }, 1500);
    }).catch(err => {
        console.error("Clipboard copy failed: ", err);
    });
});
