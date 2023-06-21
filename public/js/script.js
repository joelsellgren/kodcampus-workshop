document.addEventListener('DOMContentLoaded', function () {
    const closeFlashButton = document.querySelector('span.close-flash');
    if (closeFlashButton) {
        closeFlashButton.addEventListener('click', closeFlashMessage);
    }
});

const closeFlashMessage = (e) => {
    const flashMessage = e.target.parentElement;
    flashMessage.remove();
};
