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

const galleryImages = Array.from(
  document.querySelectorAll(".gallery-image img"),
);

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCounter = document.querySelector("#lightboxCounter");

const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentLightboxIndex = 0;

function openLightbox(index) {
  if (!galleryImages.length) return;

  currentLightboxIndex = index;

  const image = galleryImages[currentLightboxIndex];

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || "";

  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("lightbox-open");
}

function showPreviousImage() {
  currentLightboxIndex =
    (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;

  updateLightboxImage();
}

function showNextImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;

  updateLightboxImage();
}

function updateLightboxImage() {
  const image = galleryImages[currentLightboxIndex];

  lightboxImage.style.opacity = "0";

  setTimeout(() => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "";

    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;

    lightboxImage.style.opacity = "1";
  }, 120);
}

/* Open */

galleryImages.forEach((image, index) => {
  image
    .closest(".gallery-image")
    .addEventListener("click", () => openLightbox(index));
});

/* Close */

lightboxClose.addEventListener("click", closeLightbox);

/* Navigation */

lightboxPrev.addEventListener("click", showPreviousImage);

lightboxNext.addEventListener("click", showNextImage);

/* Click outside image */

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

/* Keyboard */

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) {
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
