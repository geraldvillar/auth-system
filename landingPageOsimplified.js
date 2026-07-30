document.addEventListener("DOMContentLoaded", () => {

    //Helper Function - Get the ID of Element//
    const $ = (id) => document.getElementById(id); 
    const topButtons = $("top-buttons");
    const welcome = $("welcome");
    const header = $("landing-container");
    const formLoader = $("form-loader");


//Navigation Buttons and Forms//
const UI = {
    buttons: {
    signUp: $("sign-up-btn"),
    login: $("login-btn"), 
    forgot: $("recover-password"),
    existingAccount: $("login-link")
},

forms : {
    signUp: $("user-info"), 
    login: $("login-user"), 
    forgot: $("forgot-password"), 
    
} 
};

//Loading Animation//
const showLoader = () => {
    formLoader.classList.remove("hidden");
};

const hideLoader = () => {
    formLoader.classList.add("hidden");
};


//Navigation//
//Helper Function For Navigation Modal//

const showForm = (activeForm) =>{
    if(!activeForm) return; 

    showLoader();



    Object.values(UI.forms).forEach(form =>{

        if (!form) return;

        form.classList.remove("show");
    });
    
    topButtons.classList.add("hidden");
    welcome.classList.add("hidden");
    header.classList.add("hidden");

setTimeout(() => {
    activeForm.classList.add("show"); 
    hideLoader();

}, 500);

};


//Call the helper//
//show sign up//
UI.buttons.signUp?.addEventListener("click", () => {
    showForm(UI.forms.signUp);
    
});

//Show login//
UI.buttons.login?.addEventListener("click", () =>{
    showForm(UI.forms.login); 
    
});

//show forgot//
UI.buttons.forgot?.addEventListener("click", () => {
    showForm(UI.forms.forgot);
    
});

UI.buttons.existingAccount?.addEventListener("click", () => {
    showForm(UI.forms.login);
});


//ACCOUNT CREATION//

//Button Groups modals and buttons//
const modals = {
    success: $("account-new"), 
    failed: $("account-failed"), 
    changedPassword: $("changed-pass"), 
    matchedError: $("matched-error-msg"), 
    emptyError: $("insufficient-length-msg"), 
    shortError: $("lessThanSix-msg"), 
    emptyInputsMsg: $("empty-input-msg"),
    lessThanSix: $("lessThanSixChar-msg"), 
    mismatched: $("mismatched-msg")


};

//VERIFICATION AND APPROVAL//


//helper function to show modal ANTI DRY // 
    const showModal = (modal, duration = 3000) => {
        if (!modal) return;
        modal.showModal();

        const timeOutId = setTimeout(() => {
            modal.close();
        }, duration );

        modal.addEventListener("close", () => {
            clearTimeout(timeOutId);
        }, {once: true});
    };
//Forgot Password Conditions and Approval//

const confirmPassBtn = $("confirm-new-password");

if(confirmPassBtn) {
confirmPassBtn.addEventListener("click", (event) => {
const oldPassword = $("user-password")?.value;
const newPassword = $("new-password")?.value;


 //conditions//

     //empty errors//
    if(newPassword === "" && oldPassword === ""){
        showModal(modals.emptyError); 
    } 
    //match error//
    else if(oldPassword === newPassword){
    showModal(modals.matchedError);
    }

    //short//
else if(newPassword.length < 6){
        showModal(modals.shortError);
    }

    else{
        showModal(modals.changedPassword);
        event.preventDefault();
    }

});
}

//ACCOUNT CREATION//
    const createAccountBtn = $("account-created");
    

if(createAccountBtn) {
    createAccountBtn.addEventListener("click", (event) => {
    const actualForm = event.target.closest("form"); 
        event.preventDefault();

    if(!actualForm) return;

    const inputs = actualForm.querySelectorAll("input");
    
    const hasEmpty = Array.from(inputs).some(input => input.value.trim() === ""); 
    //empty inputs//
    if(hasEmpty){
        showModal(modals.emptyInputsMsg);
        return; 
    }


    const initialPass = $("password").value;
    const confirmedPass = $("confirm-password").value; 
    
    if(initialPass !== confirmedPass){
        showModal(modals.mismatched);
        return;
    }

    else if(initialPass.length < 6 || confirmedPass.length < 6){
        showModal(modals.lessThanSix); 
        return; 
    }

//Page refreshes after 3 secs//
    showModal(modals.success);
    setTimeout (() => {
        window.location.reload();
    }, 3000);
    
    });
    
    }

//eye icon toggle//

const passwordInputs = {
    signup: $("password"), 
    current: $("user-password"),
    new: $("new-password"),
    confirm: $("confirm-password")
};

const toggleButton = document.querySelectorAll(".togglePassword");

    toggleButton.forEach(icon => {
        icon.addEventListener("click", () => {
            const target = icon.dataset.target; 
            const input = passwordInputs[target]; 
            
            if(!input) return;

            const isHidden = input.type === "password"; 

            input.type = isHidden ? "text" : "password"; 

            icon.src = isHidden ? "imgResources/close-eye.png" : "imgResources/view.png";
        });
    });
});

//close icon button//

const closeIcons = document.querySelectorAll(".close-icon"); 

closeIcons.forEach(icon => {
    icon.addEventListener("click", ()=> {
        const modalId = icon.dataset.modal; 
        const modal = document.getElementById(modalId);

        if(modal) modal.close();
    });

    
});