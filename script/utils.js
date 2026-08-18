//SCRIPT FOR ID RETRIEVAL MODULE//
export const $ = (id) => document.getElementById(id); 

export const showLoader = (el) => {
        el?.classList.remove("hidden");
    };

export const hideLoader = (el) => {
        el?.classList.add("hidden");
    };