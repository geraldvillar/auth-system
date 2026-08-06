//LOGIC MAIN SOURCE FOR MODULES

document.addEventListener("DOMContentLoaded", () => {

    //HELPER FUNCTION - SYNC THE ID OF ELEMENTS
    const $ = (id) => document.getElementById(id); 
    const topButtons = $("top-buttons");
    const formLoader = $("form-loader");
    const landingContainer = $("landing-container");
    
    //NAVIGATION BUTTONS AND FORMS
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

    //LOADING ANIMATION HELPER FUNCTIONS 

    const showLoader = () => {
        formLoader?.classList.remove("hidden");
    };

    const hideLoader = () => {
        formLoader?.classList.add("hidden");
    };


    //HELPER FUNCTION FOR NAVIGATIONS 

    const showForm = (activeForm) =>{
        if(!activeForm) return; 

        showLoader();
        
        //EXTRACT VALUE FROM OBJECT SOURCE
        //FORMS ARE HIDDEN BY DEFAULT

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

    //EVENT LISTENERS FOR NAVIGATIONS 
    //DRY 
    const buttonFormMap = {
        signUp: UI.forms.signUp, 
        login: UI.forms.login, 
        forgot: UI.forms.forgot, 
        existingAccount: UI.forms.login
    };

    Object.entries(UI.buttons).forEach(([key, button]) => {
        button?.addEventListener("click", () =>{
            showForm(buttonFormMap[key]);
        });
    });

    //MODAL IDS 

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

    //FORGOT PASSWORD LOGIC
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

    //ACCOUNT CREATION MESSAGE TO USERS
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

        
            //SAVE USERS(SIGN UP) - LOCAL STORAGE
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

    //EYE TOGGLE FOR REVEALING AND HIDING PASSWORD
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

            //INITIAL SYNC
            if(input.type === "password"){
                icon.src="imgResources/close-eye.png"; 
            } else {
                icon.src="imgResources/view.png"
            }

            const isHidden = input.type === "password"; 
            input.type = isHidden ? "text" : "password"; 

            icon.src = isHidden 
                ? "imgResources/view.png" 
                : "imgResources/close-eye.png";
        });
    });

    //CLOSE ICON BUTTON (FIXED LOCATION)
    const closeIcons = document.querySelectorAll(".close-icon"); 

    closeIcons.forEach(icon => {
        icon.addEventListener("click", ()=> {
            const modalId = icon.dataset.modal; 
            const modal = document.getElementById(modalId);

            if(modal) modal.close();
        });
    });

    //PASSWORD STRENGTH FUNCTION
    const checkPasswordStrength = (password) => {
        let score = 0; 
        if (password.length >= 6) score++; 
        if(password.length >= 10) score++;
        if(/[A-Z]/.test(password)) score++; 
        if(/[a-z]/.test(password)) score++;
        if(/[0-9]/.test(password)) score++; 
        if(/[!@#$%^&*]/.test(password)) score++; 

        if(password.length === 0) {
            return {message : "", color: ""};
        }
        
        if(score <= 2){
            return {message: "Weak password 😡", color: "red"};
        }

        else if(score === 3 || score === 4){
            return {message: "Medium password 🤨", color: "orange"}; 
        } 

        else if(score === 5) {
            return{message: "Strong password 💪", color: "blue"};
        }

        else {
            return{message: "Excellent password 👌", color: "green"};
        }
    }

    //PASSWORD STRENGTH TEST

    Object.entries(passwordInputs).forEach(([key, input]) => {
        if(!input) return;

        input.addEventListener("input", () => {

            const strength = checkPasswordStrength(input.value);

            //Target message container per input
            const msg = document.querySelector(`[data-strength="${key}"]`);

            if(!msg) return;

            msg.textContent = strength.message;
            msg.style.color = strength.color;
        });
    });


    //LOG IN LOGIC
    //Login Authentication using local storage

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