//MODAL SCRIPT MODULE//

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

    export const closeIcons = document.querySelectorAll(".close-icon"); 

    closeIcons.forEach(icon => {
        icon.addEventListener("click", ()=> {
            const modalId = icon.dataset.modal; 
            const modal = document.getElementById(modalId);

            if(modal) modal.close();
        });
    });
