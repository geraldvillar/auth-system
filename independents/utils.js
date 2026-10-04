// ---HELPER FUNCTION FOR ID---
export const $ = (id) => document.getElementById(id);

// ---HELPER FOR SHOW LOADER---
const formLoader = $("form-loader");
export const showLoader = () => {
  formLoader?.classList.remove("hidden");
};

export const hideLoader = () => {
  formLoader?.classList.add("hidden");
};

// ---HELPER FUNCTION FOR SHOWING FORMS

// ---NAVIGATION BUTTONS AND FORMS---
export const showForm = (activeForm) => {
  if (!activeForm) return;
};
