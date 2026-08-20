

import { getCurrentUser } from "../script/auth.js";
import { showLoader } from "../script/utils.js";
import { hideLoader } from "../script/utils.js";
import { showModal } from "../script/modal.js";
import { closeIcons } from "../script/modal.js";


const currentUser = getCurrentUser(); 


const welcome = document.getElementById("welcome");

let index = 0; 
const message = ` , ${currentUser.name} !`;

function typeText(){
    if(index < message.length) {
        welcome.textContent += message[index];
        index++; 

        setTimeout(typeText, 300);

    } else {
        setTimeout(() => {
        index = 0; 
        welcome.textContent = "Welcome";

        setTimeout(typeText, 300);
        }, 5000);
    }
}
typeText();


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
