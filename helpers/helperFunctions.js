// ---UTILITY & HELPER FUNCTIONS SECTION---
export const $ = (id) => document.getElementById(id);



// ---HELPER FUNCTION FOR FORM LOADER---
export const showLoader = () => {
  const formLoader = $("form-loader"); 
  formLoader?.classList.remove("hidden");
};

export const hideLoader = () => {
  const formLoader = $("form-loader"); 
  formLoader?.classList.add("hidden");
};


// ---HELPER FUNCTION FOR INDEX REDIRECTION---
export const indexRedirection = (path = "../index.html", delay = 3000) => {
  setTimeout(() => {
    window.location.href = path;
  }, delay);
};

// ---HELPER FUNCTION FOR SHOW MODAL---
// Show dialog modal with auto-close timer

export const showModal = (modal, duration = 3000) => {
  if (!modal) return;
  showLoader(); 

  const loadTimer = setTimeout(() => {
    hideLoader(); 
    modal.showModal;
  }, 2000);

  //auto close modals//
  const timeOutId = setTimeout(() => {
    modal.close();
  }, duration);

  modal.addEventListener(
    "close",
    () => {
      clearTimeout(timeOutId);
      clearTimeout(loadTimer);
      hideLoader();
    },
    { once: true },
  );
};

// ---HELPER FUNCTION FOR MODAL CLOSERS---
const closeIcons = document.querySelectorAll(".close-icon");
closeIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const modalId = icon.dataset.modal;
    const modal = $(modalId);
    if (modal) modal.close();
  });
});

// ---HELPER FUNCTION FOR NAVIGATION---

export const showForm = (activeForm) => {
  if (!activeForm) return;

  showLoader();

  // ---EXTRACT VALUE FROM OBJECT SOURCE---
  // ---FORMS ARE SET HIDDEN BY DEFAULT---

  Object.values(UI.forms).forEach((form) => {
    if (!form) return;
    form.classList.remove("show");
  });

  setTimeout(() => {
    activeForm.classList.add("show");
    landingContainer?.classList.add("hidden");
    hideLoader();
  }, 500);
};



