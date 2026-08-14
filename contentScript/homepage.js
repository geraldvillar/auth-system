import { getCurrentUser } from "../script/auth.js";


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