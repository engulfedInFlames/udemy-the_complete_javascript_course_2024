"use strict";

const MODAL_TOP_COEFFICIENT = 10;

const container = document.querySelector(".container");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Handlers
const getScrollbarWidth = () =>
    window.innerWidth - document.documentElement.clientWidth;

const adjustToScrollbarWidth = () => {
    const scrollbarWidth =
        document.body.style.getPropertyValue("overflow") === "hidden"
            ? 0
            : -(getScrollbarWidth() / 2);
    container.style.transform = `translateX(${scrollbarWidth}px)`;
};

const handleScrollbar = () => {
    adjustToScrollbarWidth();
    if (document.body.style.getPropertyValue("overflow") === "hidden") {
        document.body.style.overflow = "";
        return;
    }
    document.body.style.overflow = "hidden";
};

const emToPx = (emValue) => {
    const { fontSize } = getComputedStyle(document.documentElement);
    const fontSizeinPx = parseInt(fontSize, 10) || 10;
    return emValue * fontSizeinPx;
};

const centerModal = () => {
    modal.style.top = `${emToPx(MODAL_TOP_COEFFICIENT) + window.scrollY}px`;
};

const toggleModal = () => {
    handleScrollbar();
    if (modal.classList.contains("hidden")) centerModal();
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
};

// AddEventListener]
btnCloseModal.addEventListener("click", toggleModal);
btnOpenModal.addEventListener("click", toggleModal);

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "escape" && !modal.classList.contains("hidden"))
        toggleModal();
});
