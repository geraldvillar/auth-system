document.addEventListener("DOMContentLoaded", () => {

    //Helper Function - Get the ID of Element//
    const $ = (id) => document.getElementById(id); 
    const topButtons = $("top-buttons");
    const formLoader = $("form-loader");
    const landingContainer = $("landing-container");
    
    //Navigation Buttons and Forms//
    const UI = {
        buttons: {
            signUp: $("sign-up-btn"),
            login: $("login-btn"), 
            forgot: $("recover-password"),
            existingAccount: $("login-link")
        },
        forms: {
            signUp: $("user-info"), 
            login: $("login-user"), 
            forgot: $("forgot-password"), 
        } 
    };

    //Loading Animation Helper Functions//
    const showLoader = () => {
        formLoader?.classList.remove("hidden");
    };

    const hideLoader = () => {
        formLoader?.classList.add("hidden");
    };


    //Helper Function For Navigation//

    const showForm = (activeForm) =>{
        if(!activeForm) return; 

        showLoader();
        
        //Extract value from object source //
        //Forms are hidden by default//

        Object.values(UI.forms).forEach(form =>{
            if (!form) return;
            form.classList.remove("show");
        });

        setTimeout(() => {
            activeForm.classList.add("show");
            landingContainer?.classList.add("hidden");
            hideLoader();
        }, 500);
    };

    //Event Listeners//
    
    UI.buttons.signUp?.addEventListener("click", () => {
        showForm(UI.forms.signUp);
    });

    UI.buttons.login?.addEventListener("click", () =>{
        showForm(UI.forms.login); 
    });

    UI.buttons.forgot?.addEventListener("click", () => {
        showForm(UI.forms.forgot);
    });

    UI.buttons.existingAccount?.addEventListener("click", () => {
        showForm(UI.forms.login);
    });

    //Modals//
    const modals = {
        success: $("account-new"), 
        failed: $("account-failed"), 
        changedPassword: $("changed-pass"), 
        matchedError: $("matched-error-msg"), 
        emptyError: $("insufficient-length-msg"), 
        shortError: $("lessThanSix-msg"), 
        emptyInputsMsg: $("empty-input-msg"),
        lessThanSix: $("lessThanSixChar-msg"), 
        mismatched: $("mismatched-msg"), 
        loggedIn: $("successLogInMsg"),
        incorrectCredential: $("incorrectEmailPassMsg"), 
        unrecognizedAccount: $("unrecognized-account-msg")
    };

    // HELPER FUNCTION FOR MODALS//
    const showModal = (modal, duration = 3000) => {
        if (!modal) return;
        modal.showModal();
        //auto close modals//
        const timeOutId = setTimeout(() => {
            modal.close();
        }, duration );

        modal.addEventListener("close", () => {
            clearTimeout(timeOutId);
        }, {once: true});
    };

    //Forgot Password//
    const confirmPassBtn = $("confirm-new-password");

    if(confirmPassBtn) {
        confirmPassBtn.addEventListener("click", (event) => {
            event.preventDefault(); // FIXED

            const oldPassword = $("user-password")?.value;
            const newPassword = $("new-password")?.value;

            if(newPassword === "" && oldPassword === ""){
                showModal(modals.emptyError); 
            } 
            else if(oldPassword === newPassword){
                showModal(modals.matchedError);
            }
            else if(newPassword.length < 6){
                showModal(modals.shortError);
            }
            else{
                showModal(modals.changedPassword);

                setTimeout(() => {
                    window.location.href = "landing.html";
                }, 3000);
            }
        });
    }

    //ACCOUNT CREATION MESSAGES//
    const createAccountBtn = $("account-created");

    if(createAccountBtn) {
        createAccountBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const actualForm = event.target.closest("form"); 
            if(!actualForm) return;

            const inputs = actualForm.querySelectorAll("input");
            const hasEmpty = Array.from(inputs).some(input => input.value.trim() === ""); 

            if(hasEmpty){
                showModal(modals.emptyInputsMsg);
                return; 
            }

            const initialPass = $("password")?.value;
            const confirmedPass = $("confirm-password")?.value; 

            if(initialPass !== confirmedPass){
                showModal(modals.mismatched);
                return;
            }

            if(initialPass.length < 6 || confirmedPass.length < 6 ){
                showModal(modals.lessThanSix); 
                return; 
            }

        
            //Save User(Sign up) local storage//
            const name = $("name")?.value; 
            const email = $("email")?.value;
            const username = $("username")?.value; 
            const password = $("password")?.value; 

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const emailExists = users.some(user => user.email === email);

            if(emailExists){
                showModal(modals.failed); 
                return; 
            }

            users.push({
                name, 
                email,
                username, 
                password
            });

            localStorage.setItem("users", JSON.stringify(users));
            showModal(modals.success);

            setTimeout (() => {
                window.location.href = "landing.html";
            }, 3000);
        });
    }

    //Eye toggle Reveal and Hide Password //
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

            icon.src = isHidden 
                ? "imgResources/view.png" 
                : "imgResources/close-eye.png";
        });
    });

    //close icon button (FIXED LOCATION)//
    const closeIcons = document.querySelectorAll(".close-icon"); 

    closeIcons.forEach(icon => {
        icon.addEventListener("click", ()=> {
            const modalId = icon.dataset.modal; 
            const modal = document.getElementById(modalId);

            if(modal) modal.close();
        });
    });

    //AFTER LOGGING IN LOGIC//
    //Login Authentication using local storage//

    const loginBtn = $("submit-data"); 

    if (loginBtn) {

    loginBtn.addEventListener("click", (event) => {

        const emailLogin = $("login-email")?.value;
        const passwordLogin = $("user-password")?.value;

        event.preventDefault(); 

        const users  = JSON.parse(localStorage.getItem("users")) || []; 

        if(emailLogin === "" || passwordLogin === ""){
            showModal(modals.unrecognizedAccount);
            return;
        }

        const validUser = users.find(user => user.email === emailLogin && user.password === passwordLogin);

        if(validUser){
            showModal(modals.loggedIn);

            localStorage.setItem("currentUser", JSON.stringify(validUser));

            setTimeout(() => {
                window.location.href = "landing.html";
            }, 3000);
        } else {
            showModal(modals.unrecognizedAccount);
        }
        
    });

    };


});