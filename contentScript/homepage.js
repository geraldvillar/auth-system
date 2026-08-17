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
    } else {
        index = 0; 
        welcome.textContent = "Welcome";
    }
}
setInterval(typeText, 300);
setTimeout(typeText, 1000);

const logOutBtn = document.querySelector("#logout-btn"); 
const logoutModal = document.getElementById("logout-msg");

logOutBtn.addEventListener("click", () => {
    showLoader();
    
    showModal(logoutModal);

    

    setTimeout(() => {
        localStorage.removeItem("currentUser");
        window.location.href = "../index.html";
        
    }, 3000);
});