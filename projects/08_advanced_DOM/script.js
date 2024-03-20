const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

const openModal = (e) => {
  e.preventDefault(); // Page will not jump to the top
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////
/////////////////////////////////////////////
// Button Scrolling

btnScrollTo.addEventListener("click", (e) => {
  // Scrolling (New way)
  section1.scrollIntoView({ behavior: "smooth" });
});

// Nav Scrolling
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();

  // Matcing Strategy
  if (e.target.classList.contains("nav__link")) {
    const selector = e.target.getAttribute("href");
    document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed Component
tabsContainer.addEventListener("click", (e) => {
  const targetTab = e.target.closest(".operations__tab");

  // Guard clause
  if (!targetTab) return;

  // Active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  targetTab.classList.add("operations__tab--active");

  // Activate content area
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${targetTab.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu fade animation
// mouseenter does not invoke bubble
// mouseenter <=> mouseleave, mouseover <=> mouseout
const handleNavHover = function (e) {
  if (!e.target.classList.contains("nav__link")) return;

  const { target } = e;
  const _nav = target.closest(".nav");
  // Using `closest` is more robust way than finding parent orderly
  const siblings = _nav.querySelectorAll(".nav__link");
  const logo = _nav.querySelector(".nav__logo");

  siblings.forEach((s) => {
    if (s !== target) s.style.opacity = this;
  });

  if (logo) logo.style.opacity = this;
};
// nav.addEventListener("mouseover", (e) => handleNavHover(e, 0.5));
nav.addEventListener("mouseover", handleNavHover.bind(0.5));

// Passing "argument" into handler
nav.addEventListener("mouseout", handleNavHover.bind(1));

// Sticky navigtaion
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove("sticky");
  else nav.classList.add("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // '%' and 'rem' doesn't work
});

headerObserver.observe(header);

// Reveal sections
// ❗ Fix the bug when reloading the page
const allSections = document.querySelectorAll(".section");

const revealSection = (entries, observer) => {
  // const [entry] = entries;
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserverOpts = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  sectionObserverOpts
);

allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add("section--hidden");
});

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const { target } = entry;
    target.src = target.dataset.src;
    target.onload = () => target.classList.remove("lazy-img");

    observer.unobserve(target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
// Comment out the image slides in index.html
// Don't pollute global variables
const activateSlider = () => {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  const SLIDE_LENGTH = slides.length;
  let curSlide = 0;

  const createDots = () => {
    const createDot = (i) =>
      `<button class="dots__dot" data-slide="${i}"></button>`;
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML("beforeend", createDot(i));
    });
  };

  const activateDot = (slide) => {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const showSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
    activateDot(slide);
  };

  const showNextSlide = () => {
    if (curSlide >= SLIDE_LENGTH - 1) curSlide = 0;
    else curSlide++;

    showSlide(curSlide);
  };

  const showPreviousSlide = () => {
    if (curSlide <= 0) curSlide = SLIDE_LENGTH - 1;
    else curSlide--;

    showSlide(curSlide);
  };

  // Initialize the elements of slider
  (() => {
    // Show the first slide when the page is reloaded.
    createDots(); // Showing 1st slide before creating dots causes an error.
    showSlide(0);
  })();

  document.addEventListener("keydown", (e) => {
    e.key === "ArrowLeft" && showPreviousSlide();
    e.key === "ArrowRight" && showNextSlide();
  });
  btnRight.addEventListener("click", showNextSlide);
  btnLeft.addEventListener("click", showPreviousSlide);
  dotContainer.addEventListener("click", (e) => {
    const { slide } = e.target.dataset;

    if (!slide) return;
    showSlide(slide);
  });
};

activateSlider();
