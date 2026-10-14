
// ---UTILITY & HELPER FUNCTIONS SECTION---
export const $ = (id) => document.getElementById(id);

// ---HELPER FUNCTION FOR FORM LOADER---
export const showLoader = () => {
  formLoader?.classList.remove("hidden");
};

export const hideLoader = () => {
  formLoader?.classList.add("hidden");
};

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

// ---HELPER FUNCTION FOR INDEX REDIRECTION---
export const indexRedirection = () => {
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 3000);
};

// Show dialog modal with auto-close timer
export const showModal = (modal, duration = 3000) => {
  if (!modal) return;
  modal.showModal();

  //auto close modals//
  const timeOutId = setTimeout(() => {
    modal.close();
  }, duration);

  modal.addEventListener(
    "close",
    () => {
      clearTimeout(timeOutId);
    },
    { once: true },
  );
};
// event listener for close buttons
const closeIcons = document.querySelectorAll(".close-icon");

closeIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const modalId = icon.dataset.modal;
    const modal = document.getElementById(modalId);

    if (modal) modal.close();
  });
});
