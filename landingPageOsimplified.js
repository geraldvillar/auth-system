document.addEventListener("DOMContentLoaded", () => {

    //Helper Function - Get the ID of Element//
    const $ = (id) => document.getElementById(id); 
    const topButtons = $("top-buttons");
    const welcome = $("welcome");


//Navigation Buttons and Forms//
const UI = {
    buttons: {
    signUp: $("sign-up-btn"),
    login: $("login-btn"), 
    forgot: $("recover-password"),
},

forms : {
    signUp: $("user-info"), 
    login: $("login-user"), 
    forgot: $("forgot-password"), 
    
} 
};

//Navigation//
//Helper Function For Navigation Modal//
const showForm = (activeForm) =>{
    if(!activeForm) return; 

    Object.values(UI.forms).forEach(form =>{

        if (!form) return;

        form.classList.remove("show");
        
        
    });

    activeForm.classList.add("show"); 
    topButtons.classList.add("hidden");
    welcome.classList.add("hidden");


}
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

const modalButtons = {
    successBtn: $("closeModalAccountCreated"), 
    failedBtn: $("closeModalFailed"),
    changedPassBtn: $("close-changed-pass"), 
    matchedBtn: $("matchClose"), 
    emptyBtn: $("insufficientClose"), 
    shortBtn: $("lessThanSixClose"), 
    emptyInputBtn: $("empty-input-btn"), 
    lessThanSixBtn: $("lessThanSix-msg-btn"),
    mismatchedBtn: $("mismatched-btn")

    
};

const pairs = [
    
    {btn: modalButtons.successBtn, modal: modals.success},
    {btn: modalButtons.failedBtn, modal: modals.failed}, 
    {btn: modalButtons.changedPassBtn, modal: modals.changedPassword},
    {btn: modalButtons.matchedBtn, modal: modals.matchedError}, 
    {btn: modalButtons.emptyBtn, modal: modals.emptyError}, 
    {btn: modalButtons.shortBtn, modal: modals.shortError}, 
    {btn: modalButtons.emptyInputBtn, modal: modals.emptyInputsMsg}, 
    {btn: modalButtons.lessThanSixBtn, modal: modals.lessThanSix}, 
    {btn: modalButtons.mismatchedBtn, modal: modals.mismatched}
    
];

//Account Creation Messages Interaction to Users//
//MODALS//
//Modal Closers//
    pairs.forEach(pair => {
    if(!pair.btn || !pair.modal) return; 

    pair.btn.addEventListener("click", () =>{
        pair.modal.close();
    });
    });


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
confirmPassBtn.addEventListener("click", () => {
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
    
});