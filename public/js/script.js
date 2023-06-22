/* const { completeStep } = require("../../controllers/api/apiController"); */

document.addEventListener('DOMContentLoaded', function () {
    const closeFlashButton = document.querySelector('span.close-flash');
    if (closeFlashButton) {
        closeFlashButton.addEventListener('click', closeFlashMessage);
    }

    const completeStepCheckboxes = document.querySelectorAll(
        'input.complete-step'
    );
    if (completeStepCheckboxes) {
        completeStepCheckboxes.forEach((x) =>
            x.addEventListener('change', completeStep)
        );
    }

    calculateAllProgress();
});

const closeFlashMessage = (e) => {
    const flashMessage = e.target.parentElement;
    flashMessage.remove();
};

const completeStep = async (e) => {
    const checkbox = e.target;
    const pathId = checkbox.dataset.pathId;
    const stepId = checkbox.dataset.stepId;
    const done = checkbox.dataset.done === 'true';

    console.log({ done });

    const response = await fetch('/api/profile/complete-step', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathId, stepId, done: !done }),
    });
    if (response.ok) {
        console.log(done);
        checkbox.dataset.done = done ? 'false' : 'true';
        calculateAllProgress();
    }
};

const calculateAllProgress = () => {
    const paths = document.querySelectorAll('.path');
    if (paths) {
        paths.forEach((x) => calculateProgress(x));
    }
};

const calculateProgress = (el) => {
    const steps = el.querySelectorAll('input.complete-step');
    const totalSteps = steps.length;
    const completedSteps = el.querySelectorAll(
        'input.complete-step[data-done="true"]'
    ).length;

    const progress = el.querySelector('.progress-bar');
    progress.style.width = `${(completedSteps / totalSteps) * 100}%`;

    const stepsCount = el.querySelector('.steps-count');
    stepsCount.innerText = `${completedSteps}/${totalSteps}`;

    const progressPercent = el.querySelector('.progress-percent');
    progressPercent.innerText = `${Math.round(
        (completedSteps / totalSteps) * 100
    )}`;
};
