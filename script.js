"use strict";

const btnScrollLearn = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

///////////////// Changing colour
document.documentElement.style.setProperty("--color-primary", "#228be6");

//////////// scrolling for learn more button

btnScrollLearn.addEventListener("click", function (e) {
  // scrolling in x and y direction realtive to current viewport of the page
  const s1coord = section1.getBoundingClientRect();
  console.log(s1coord);
  console.log(e.target.getBoundingClientRect());

  // scrolling in x and y direction relative to top of the page
  console.log("Current scroll X/Y", window.pageXOffset, window.pageYOffset);

  // height and width of corresponding view port of the page
  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // method 1 for scrolling
  // window.scrollTo(
  //   s1coord.left + window.pageXOffset,
  //   s1coord.top + window.pageYOffset
  // );

  // method 2 for scrolling
  // window.scrollTo({
  //   left: s1coord.left + window.pageXOffset,
  //   top: s1coord.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // method 3 for scrolling
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////// scrolling for nav bar links

// method 1
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault;
//     console.log(this);
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// method 2

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault;
  console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////// Operation: Tab Component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  if (!clicked) return;

  // remove class active from all the tabs
  tabs.forEach(function (tab) {
    tab.classList.remove("operations__tab--active");
  });

  // add class active only the tab which is clicked
  clicked.classList.add("operations__tab--active");

  // remove active class from all the content of the tab
  tabsContent.forEach(function (content) {
    content.classList.remove("operations__content--active");
  });

  // add class active only on the content of whose tab is clicked
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

////////////////// Navigation hover bar

const navHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const target = e.target;
    const links = target.closest(".nav").querySelectorAll(".nav__link");
    const logo = target.closest(".nav").querySelector("img");

    links.forEach((link) => {
      if (link !== target) link.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", navHover.bind(0.5));
nav.addEventListener("mouseout", navHover.bind(1));

/////////////////// sticky navigation

// const s1coords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   if (window.scrollY > s1coords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

//sticky navigation : IO API

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const headerFunction = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(headerFunction, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////Reveal section

const allSection = document.querySelectorAll(".section");

const sectionReveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/////////// lazy-img loading

const allLazyImages = document.querySelectorAll("img[data-src]");
// console.log(allLazyImages);

const lazyScroll = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const lazyObserver = new IntersectionObserver(lazyScroll, {
  root: null,
  threshold: 0,
  rootmargin: "300px",
});

allLazyImages.forEach((lazyImg) => lazyObserver.observe(lazyImg));

////////// Slider
const slider = function () {
  let curSlide = 0;
  const slides = document.querySelectorAll(".slide");
  // const slider = document.querySelector(".slider");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  const dotsContainer = document.querySelector(".dots");

  const maxSlide = slides.length;
  console.log(maxSlide);

  // slider.style.transform = "scale(0.4) TranslateX(-800px)";
  // slider.style.overflow = "visible";

  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelectorAll(`.dots__dot[data-slide="${slide}"]`)
      .forEach((dot) => dot.classList.add("dots__dot--active"));
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  /// event handlers

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// open account pop up
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
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
