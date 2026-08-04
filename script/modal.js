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