// ---- ---- document ---- ----
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// ---- ---- Selecting Elements ---- ----
// querySelector, querySelectorAll
// getElementById, getElementsByTagName
// getElementsByClassName

// ---- ---- Creating and Inserting Elements
/* 
const header = document.querySelector("header");
const cookieMessage = document.createElement("div");
cookieMessage.classList.add("cookie-message");
cookieMessage.innerHTML = `We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

cookieMessage.style.backgroundColor = "#37383d";
cookieMessage.style.width = "120%";

// Create a child
header.prepend(cookieMessage); 
// header.append(cookieMessage.cloneNode(true));
// Create a sibling
// header.before(cookieMessage)
// header.after(cookieMessage)

cookieMessage.style.height =
  Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 24 + "px";

// Delete elements
document.querySelector(".btn--close-cokie").addEventListener("click", () => {
  cookieMessage.remove();
})
*/

// ---- ---- Styles ---- ----
cookieMessage.style.color = "#37383d";
cookieMessage.style.width = "120%";

// At this point, you can only access to the inline style. To access to the actual style in browser, using getComputedStyle is a good option.
// console.log(getComputedStyle(cookieMessage).height);

cookieMessage.style.height =
  Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 24 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

// ---- ---- Data Attributes ---- ----
// data-version-number
console.log(logo.dataset.versionNumber);

// ---- ---- Scrolling ---- ----
btnScrollTo.addEventListener("click", (e) => {
  // const s1coords = section1.getBoundingClientRect();
  /* 
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log(window.scrollX, window.scrollY);
  console.log("width/height viewprot", document.documentElement.clientHeight, document.documentElement.clientHeight); // Does not consider scrollbar
  */

  // Scrolling (Old way)
  /* 
    window.scrollTo({
    left: s1coords.left * window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: "smooth",
  });
  */

  // Scrolling (New way)
  section1.scrollIntoView({ behavior: "smooth" });
});

// ---- ---- Bubbling and Capturing ---- ----
// rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// Event Propagation
document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation(); // In general, not a good idea to stop propagation like this.
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("NAV", e.target, e.currentTarget);
    console.log(e.currentTarget === this);
  },
  true
); // The third argument decides whether the event handler is executred on capturing phase or not. Not used nowadays

// Event Delegation
// Nav Scrolling (Not fashioned)
/* 
document.querySelectorAll(".nav__link").forEach((el) => {
  el.addEventListener("click", (e) => {
    // (1) URL no longer change
    // (2) Page doen't scroll down
    e.preventDefault();
    const selector = e.currentTarget.getAttribute("href");
    document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
  });
});
// ↑ Attaching event handlers with forEach can make performance problem when there are a lot of elements.
*/

// Nav Scrolling (Delegation)
// 1. Add event listener to common parent element
// 2. Determin what element originated the event
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();

  // Matcing Strategy
  if (e.target.classList.contains("nav__link")) {
    const selector = e.target.getAttribute("href");
    document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
  }
});
// ↑ Event delegation is much more important when the element doesn't exist on runtime

// ---- ---- DOM Traversing ---- ----
/*
// Going downwards: child
const h1 = document.querySelector("h1");
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.computedStyleMap.color = "white";
h1.lastElementChild.computedStyleMap.color = "orangered";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(".header").style.background = "var(--gradient-secondary)";

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // Get all siblings
[...h1.parentElement.children].forEach((el) => {
  if (el !== h1) el.style.transform = "scale(2)";
});
*/

// Tabbed Component
/* 
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

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
*/

// ---- ---- Menu fade animation ---- ----
// mouseenter does not bubble
// mouseenter <=> mouseleave, mouseover <=> mouseout
const handleNavHover = function (e) {
  if (!e.target.classList.contains("nav__link")) return;

  const link = e.target;
  // Using `closest` is more robust way than finding parent orderly
  const siblings = link.closest(".nav").querySelectorAll(".nav__link");
  const logo = link.closest(".nav").querySelector(".nav__logo");

  siblings.forEach((s) => {
    if (s !== link) s.style.opacity = this;
  });
  logo.style.opacity = this;
};
// nav.addEventListener("mouseover", (e) => handleNavHover(e, 0.5));
nav.addEventListener("mouseover", handleNavHover.bind(0.5));

// Passing "argument" into handler
nav.addEventListener("mouseout", handleNavHover.bind(1));

// ---- ---- Sticky Navigation ---- ----
// Not a good way
/*
const initialCoords = section1.getBoundingClientRect();

window.addEventListener("scroll", (e) => {
  // Implementing sticky navigation like this causes performance problem.
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});
*/

// ---- ---- Observer API ---- ----
const obsCallback = (entries, observer) => {
  // entries are an array of thresholds
  entries.forEach((entry) => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, // Observer within the entire view port
  threshold: 0.1,
  // threshold: [0, 0.2],
  // Threshold '0' means 'into the view' & 'out of the view'
  // Threshold '1' means that the entire element is visible in the viewport. If the element is bigger than viewport, intersection doesn't happen.
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

// ---- ---- Better Sticky Nav ---- ----
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) nav.classList.remove("sticky");
  else nav.classList.add("sticky");
};

const headerObserverOpts = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // '%' and 'rem' doesn't work
};

const headerObserver = new IntersectionObserver(stickyNav, headerObserverOpts);
headerObserver.observe(header);

// ---- ---- One More IntersectionObserver ---- ----
// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
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

// ---- ---- Slider ---- ----
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

// ---- ---- Lifecycle DOM Events---- ----
// ↓ We don't need to this as long as importing script at the bottom
document.addEventListener("DOMContentLoaded", () => {
  // This event doesn't wait for the external sources like css, imgs
  console.log("DOM contents are loaded");
});

window.addEventListener("load", (e) => {
  // This event wait for the external sources like css, imgs
  console.log("Page fully loaded", e);
});

// Fired right before the user leave the page
// Do not use this event as possible as except warning the user who is working on the page
// window.addEventListener("beforeunload", (e) => {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });
