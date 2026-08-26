document.querySelector("#year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav
    .querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => mainNav.classList.remove("open")),
    );
}

const header = document.querySelector(".site-header");
window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("scrolled", window.scrollY > 10);
  },
  { passive: true },
);

/* =========================================
   PROJECT IMAGE LIGHTBOX
========================================= */

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCounter = document.querySelector("#lightboxCounter");

const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

const galleryImages = Array.from(
  document.querySelectorAll(".gallery-image")
);

/*
  Each comic has:
  Cover + Page 1 + Page 2 + Page 3 + Page 4
*/

const comicGalleries = {
  heroes: [
    {
      src: "./assets/images/Comic Books/heroes of energy.webp",
      alt: "Heroes of Energy cover",
    },
    {
      src: "./assets/images/Comic Books/heroes-of-energy/page-1.webp",
      alt: "Heroes of Energy page 1",
    },
    {
      src: "./assets/images/Comic Books/heroes-of-energy/page-2.webp",
      alt: "Heroes of Energy page 2",
    },
    {
      src: "./assets/images/Comic Books/heroes-of-energy/page-3.webp",
      alt: "Heroes of Energy page 3",
    },
    {
      src: "./assets/images/Comic Books/heroes-of-energy/page-4.webp",
      alt: "Heroes of Energy page 4",
    },
  ],

  baccho: [
    {
      src:
        "./assets/images/Comic Books/baccho ka kitanuon per waar AI 05-05-2025.webp",
      alt: "Baccho Ka Kitanuon Per Waar cover",
    },
    {
      src: "./assets/images/Comic Books/comic-baccho-ka-kitanuon-webp/page-1.webp",
      alt: "Baccho Ka Kitanuon Per Waar page 1",
    },
    {
      src: "./assets/images/Comic Books/comic-baccho-ka-kitanuon-webp/page-2.webp",
      alt: "Baccho Ka Kitanuon Per Waar page 2",
    },
    {
      src: "./assets/images/Comic Books/comic-baccho-ka-kitanuon-webp/page-3.webp",
      alt: "Baccho Ka Kitanuon Per Waar page 3",
    },
    {
      src: "./assets/images/Comic Books/comic-baccho-ka-kitanuon-webp/page-4.webp",
      alt: "Baccho Ka Kitanuon Per Waar page 4",
    },
  ],

  captain: [
    {
      src:
        "./assets/images/Comic Books/captain solar and his solar powers!ai.webp",
      alt: "Captain Solar cover",
    },
    {
      src: "./assets/images/Comic Books/comic-captain-solar-webp/page-1.webp",
      alt: "Captain Solar page 1",
    },
    {
      src: "./assets/images/Comic Books/comic-captain-solar-webp/page-2.webp",
      alt: "Captain Solar page 2",
    },
    {
      src: "./assets/images/Comic Books/comic-captain-solar-webp/page-3.webp",
      alt: "Captain Solar page 3",
    },
    {
      src: "./assets/images/Comic Books/comic-captain-solar-webp/page-4.webp",
      alt: "Captain Solar page 4",
    },
  ],
};

let currentGallery = [];
let currentLightboxIndex = 0;

function openLightbox(galleryName) {
  currentGallery = comicGalleries[galleryName];

  if (!currentGallery || !currentGallery.length) return;

  currentLightboxIndex = 0;

  updateLightboxImage();

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("lightbox-open");

  lightboxImage.src = "";
}

function showPreviousImage() {
  if (!currentGallery.length) return;

  currentLightboxIndex =
    (currentLightboxIndex - 1 + currentGallery.length) %
    currentGallery.length;

  updateLightboxImage();
}

function showNextImage() {
  if (!currentGallery.length) return;

  currentLightboxIndex =
    (currentLightboxIndex + 1) % currentGallery.length;

  updateLightboxImage();
}

function updateLightboxImage() {
  const image = currentGallery[currentLightboxIndex];

  lightboxImage.style.opacity = "0";

  setTimeout(() => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCounter.textContent =
      `${currentLightboxIndex + 1} / ${currentGallery.length}`;

    lightboxImage.style.opacity = "1";
  }, 120);
}

/* Open the correct comic gallery */

galleryImages.forEach((item) => {
  item.addEventListener("click", () => {
    const galleryName = item.dataset.gallery;

    openLightbox(galleryName);
  });
});

/* Close */

lightboxClose?.addEventListener("click", closeLightbox);

/* Navigation */

lightboxPrev?.addEventListener("click", showPreviousImage);

lightboxNext?.addEventListener("click", showNextImage);

/* Click outside image */

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

/* Keyboard */

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showPreviousImage();
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }
});

/* Keyboard */

// document.addEventListener("keydown", (event) => {
//   if (!lightbox.classList.contains("is-open")) {
//     return;
//   }

//   if (event.key === "Escape") {
//     closeLightbox();
//   }

//   if (event.key === "ArrowLeft") {
//     showPreviousImage();
//   }

//   if (event.key === "ArrowRight") {
//     showNextImage();
//   }
// });

/* =========================================
   VIEW MORE PROJECT IMAGES
========================================= */

const galleryItems = Array.from(
  document.querySelectorAll(".gallery-image")
);

const viewMoreBtn = document.querySelector("#viewMoreBtn");

if (viewMoreBtn) {

  // Agar 6 ya usse kam images hain,
  // button ki zarurat nahi hai.
  if (galleryItems.length <= 6) {

    viewMoreBtn.parentElement.classList.add("is-hidden");

  } else {

    viewMoreBtn.addEventListener("click", () => {

      galleryItems.forEach((item, index) => {

        if (index >= 6) {
          item.classList.add("is-visible");
        }

      });

      viewMoreBtn.parentElement.classList.add("is-hidden");

    });

  }

}
