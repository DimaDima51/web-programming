function createCarousel(imagesList, parentElementSelector) {
    const parent = document.querySelector(parentElementSelector);

    const carousel = document.createElement("div");
    carousel.classList.add("carousel-container");

    const slides = imagesList.map((url, i) => {
        const img = document.createElement("img");
        img.src = url;
        img.classList.add("carousel-image");
        if (i === 0) img.classList.add("active");
        carousel.appendChild(img);
        return img;
    });

    let current = 0;

    function showNext() {
        slides[current].classList.remove("active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("active");
    }

    setInterval(showNext, 3000);

    parent.appendChild(carousel);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-send-catinfo");
    form.addEventListener("submit", (ev) => {
        ev.preventDefault();

        const nameCatValid = validateCatName(form.cat_name);
        const emailValid = validateEmail(form.email);
        const descriptionValid = validateDescription(form.description);
        const linkValid = validateLink(form.link);

        if (nameCatValid && emailValid && descriptionValid && linkValid) {
            console.log("Форма успешно прошла проверку");
        } else {
            console.log("Форма содержит ошибки...");
        }
    });

    // Имя кота не менее 4 символов 
    function validateCatName(input) {
        if (!input) return false;
        const value = input.value.trim();
        toggleError(input, value.length >= 4);
        return value.length >= 4;
    }

    // Валидация email (наличие @ и доменного расширения)
    function validateEmail(input) {
        if (!input) return false;
        const value = input.value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        toggleError(input, pattern.test(value));
        return pattern.test(value);
    }

    // Описание не менее 5 символов
    function validateDescription(input) {
        if (!input) return false;
        const value = input.value.trim();
        toggleError(input, value.length >= 5);
        return value.length >= 5;
    }

    // Ссылки должны начинаться с https:// или http://
    function validateLink(input) {
        if (!input) return false;
        const value = input.value.trim();
        const pattern = /^https?:\/\//;
        toggleError(input, pattern.test(value));
        return pattern.test(value);
    }

    function toggleError(input, isValid) {
        if (!isValid) {
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    }
});

