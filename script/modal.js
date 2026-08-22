//MODAL SCRIPT MODULE//

// Show dialog modal with auto-close timer
export const showModal = (modal, duration = 3000) => {
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
// Global event listener for close buttons
    export const closeIcons = document.querySelectorAll(".close-icon"); 

    closeIcons.forEach(icon => {
        icon.addEventListener("click", ()=> {
            const modalId = icon.dataset.modal; 
            const modal = document.getElementById(modalId);

            if(modal) modal.close();
        });
    });
