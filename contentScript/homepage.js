

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
        }, 200);
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


