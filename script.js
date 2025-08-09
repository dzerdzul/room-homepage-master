const header = document.querySelector(".header");
const openMenu = document.querySelector(".header__button");
const navigation = document.querySelector(".navigation");
const navigationLinks = document.querySelectorAll(".navigation__link");
const noScrollBody = document.querySelector("body");

//NAVIGATION
openMenu.addEventListener("click", () => {
    if (navigation.getAttribute("data-visible") === "false") {
        navigation.setAttribute("data-visible", "true");
        openMenu.setAttribute("aria-expanded", "true");
        noScrollBody.style.overflowY = "hidden";
    } else {
        navigation.setAttribute("data-visible", "false");
        openMenu.setAttribute("aria-expanded", "false");
        noScrollBody.style.overflowY = "initial";
    }
})

navigation.addEventListener("click", (event) => {
    let clickElement = event.target;
    if (clickElement.classList.contains("navigation__link")) {
        navigationLinks.forEach(el => {
            el.classList.remove("navigation__link_active");
            el.removeAttribute("aria-current");
        })
        clickElement.classList.add("navigation__link_active");
        clickElement.setAttribute("aria-current", "page");
    }
})

header.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
        if (navigation.getAttribute("data-visible") === "true") {
            navigation.setAttribute("data-visible", "false");
            openMenu.setAttribute("aria-expanded", "false");
            noScrollBody.style.overflowY = "initial";
            openMenu.focus();
        }
    }

    if (navigation.getAttribute("data-visible") === "true") {
        if (!event.target.classList.contains("navigation__link") && !event.target.classList.contains("header__button")) {
            navigation.setAttribute("data-visible", "false");
            openMenu.setAttribute("aria-expanded", "false");
            noScrollBody.style.overflowY = "initial";
        }
    }
})
//NAVIGATION

//SWIPER
let swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    grabCursor: true,
    speed: 800,
    navigation: {
        nextEl: ".mySwiper2-next", // my button element for navigation
        prevEl: ".mySwiper2-prev", // my button element for navigation
    },
    a11y: {
        slideLabelMessage: "{{index}} of {{slidesLength}}",
    },
    on: {
        afterInit: function (swiper) {
            ariaHiddenState(swiper);
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                swiper.params.speed = 0;
            }
        },
        slideChangeTransitionStart: function (swiper) {
            ariaHiddenState(swiper);
        },
        slideChangeTransitionEnd: function (swiper) {
            //use .swiper-notification element to invoke aria-live
            document.querySelector('.swiper-notification').textContent = "item " + (swiper.activeIndex + 1) + " of 3";
        },
    },
    touchEventsTarget: "container",
});

function ariaHiddenState(swiper) {
    swiper.slides.forEach(el => {
        el.setAttribute('aria-hidden', 'true');
    })
    swiper.el.querySelector('.swiper-slide-active').removeAttribute('aria-hidden');
}

//SWIPER
