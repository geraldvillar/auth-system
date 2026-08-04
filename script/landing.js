document.addEventListener("DOMContentLoaded", () => {
  // Navigation elements
  const signUpBtn = document.getElementById("sign-up-btn");
  const loginBtn = document.getElementById("login-btn");
  const forgotPasswordBtn = document.getElementById("recover-password");

  // Form container elements
  const signUpForm = document.getElementById("user-info");
  const loginForm = document.getElementById("login-user");
  
  const forgotPassPg =  document.getElementById("forgot-password");
  
  // Modal and user response elements
  const messageToUser = document.getElementById("logged");
  const closeModal = document.getElementById("closeModal");
  const accountCreated = document.getElementById("account-created");
  const failedAccount = document.getElementById("failed");
  const closeModalFailed = document.getElementById("closeModalFailed");


//change password modal button//
const changedPassMsgBtn = document.getElementById("confirm-new-password");


  //change password modal//
  const changedPassMsg = document.getElementById("changed-pass"); 
  const closeChangedMsg = document.getElementById("close-changed-pass");

  // Show Sign Up form and hide Login form
  signUpBtn.addEventListener("click", () => {
    signUpForm.classList.add("show");
    loginForm.classList.remove("show");
  });

  // Show Login form and hide Sign Up form
  loginBtn.addEventListener("click", () => {
    loginForm.classList.add("show");
    signUpForm.classList.remove("show");
  });

  // Show Forgot Password form and hide all other forms
  forgotPasswordBtn.addEventListener("click", () => {
    forgotPassPg.classList.add("show");
    loginForm.classList.remove("show");
    signUpForm.classList.remove("show");
  });

  // Handle account creation validation and modal alerts
  accountCreated.addEventListener("click", (event) => {
    const actualForm = signUpForm.querySelector("form");

    // Exit if HTML5 standard validation rules are not met
    if(!actualForm.checkValidity()){
        return;
    }
    
    // Prevent the form from reloading the page
    event.preventDefault();

    // Retrieve input values for comparison
    const passwordApproval = document.getElementById("password").value;
    const confirmPasswordVal = document.getElementById("confirm-password").value;

    // Show failure modal if passwords do not match
    if(passwordApproval !== confirmPasswordVal) {
      failedAccount.show();
        return;
    }
    
    // Show success modal and clear input fields if all conditions pass
    messageToUser.showModal();
    actualForm.reset();
  });

  // Close the registration success modal
  closeModal.addEventListener("click", ()=>{
    messageToUser.close();
  });

  // Close the registration failure modal with condition//

  const matchErrorMsg = document.getElementById("matched-error-msg");
  const matchClosed = document.getElementById("matchClose");
  const insufficientPassLength = document.getElementById("insufficient-length-msg");
  const insufficientClose = document.getElementById("insufficientClose");
  const lessThanSixMsg = document.getElementById("lessThanSix-msg");
  const lessThanSixBtn = document.getElementById("lessThanSixClose");
  const changedPassClose = document.getElementById("close-changed-pass");
 



changedPassMsgBtn.addEventListener("click", () => {

  const newPassword = document.getElementById("new-password").value;
  const currentPassword =  document.getElementById("user-password").value;

  //check if empty//
  if(newPassword === ""){
    insufficientPassLength.showModal();
    return;
  }

  //check if password is less than 6 characters//
  if(newPassword.length < 6){
    lessThanSixMsg.showModal();
    return;
  }

  //check if current password matches the new password//
  if(newPassword === currentPassword){
    matchErrorMsg.showModal();
    return;
  }
//matches the conditions 
  else {
    changedPassMsg.showModal();
  }
});
  //grouped modal close//
const modalClosers = [{btn: matchClosed, modal: matchErrorMsg}, 
    {btn: insufficientClose, modal: insufficientPassLength}, 
    {btn: lessThanSixBtn, modal: lessThanSixMsg }, 
    {btn: changedPassClose, modal: changedPassMsg}
];

modalClosers.forEach(item => {
    item.btn.addEventListener("click", () => {
        item.modal.close();
    });
});
//page refresh prevention//
const logInForm = document.querySelector("form");

logInForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

});
