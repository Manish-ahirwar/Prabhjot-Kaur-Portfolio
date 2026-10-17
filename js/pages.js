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

const galleryImages = Array.from(document.querySelectorAll(".gallery-image"));

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
      src: "./assets/images/Comic Books/baccho ka kitanuon per waar AI 05-05-2025.webp",
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
      src: "./assets/images/Comic Books/captain solar and his solar powers!ai.webp",
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

  njPopup: [
    {
      src: "./assets/images/Comic Books/nj-pop-up-english-artwork/cover.webp",
      alt: "NJ Pop-Up English cover",
    },
    {
      src: "./assets/images/Comic Books/nj-pop-up-english-artwork/page-1.webp",
      alt: "NJ Pop-Up English page 1",
    },
    {
      src: "./assets/images/Comic Books/nj-pop-up-english-artwork/page-2.webp",
      alt: "NJ Pop-Up English page 2",
    },
    {
      src: "./assets/images/Comic Books/nj-pop-up-english-artwork/page-3.webp",
      alt: "NJ Pop-Up English page 3",
    },
    {
      src: "./assets/images/Comic Books/nj-pop-up-english-artwork/page-4.webp",
      alt: "NJ Pop-Up English page 4",
    },
    {
      src: "./assets/images/Comic Books/nj-pop-up-english-artwork/page-5.webp",
      alt: "NJ Pop-Up English page 5",
    },
  ],

  cindy: [
    {
      src: "./assets/images/Comic Books/with-cindy-the-windy-comic/cover.webp",
      alt: "With Cindy the Windy cover",
    },
    {
      src: "./assets/images/Comic Books/with-cindy-the-windy-comic/page-1.webp",
      alt: "With Cindy the Windy page 1",
    },
    {
      src: "./assets/images/Comic Books/with-cindy-the-windy-comic/page-2.webp",
      alt: "With Cindy the Windy page 2",
    },
    {
      src: "./assets/images/Comic Books/with-cindy-the-windy-comic/page-3.webp",
      alt: "With Cindy the Windy page 3",
    },
    {
      src: "./assets/images/Comic Books/with-cindy-the-windy-comic/page-4.webp",
      alt: "With Cindy the Windy page 4",
    },
    {
      src: "./assets/images/Comic Books/with-cindy-the-windy-comic/page-5.webp",
      alt: "With Cindy the Windy page 5",
    },
  ],

  waterWorld: [
    {
      src: "./assets/images/Comic Books/wat-er-wonderful-world/cover.webp",
      alt: "Wat-er Wonderful World cover",
    },
    {
      src: "./assets/images/Comic Books/wat-er-wonderful-world/page-1.webp",
      alt: "Wat-er Wonderful World page 1",
    },
    {
      src: "./assets/images/Comic Books/wat-er-wonderful-world/page-2.webp",
      alt: "Wat-er Wonderful World page 2",
    },
    {
      src: "./assets/images/Comic Books/wat-er-wonderful-world/page-3.webp",
      alt: "Wat-er Wonderful World page 3",
    },
    {
      src: "./assets/images/Comic Books/wat-er-wonderful-world/page-4.webp",
      alt: "Wat-er Wonderful World page 4",
    },
    {
      src: "./assets/images/Comic Books/wat-er-wonderful-world/page-5.webp",
      alt: "Wat-er Wonderful World page 5",
    },
  ],

  physicalActivity: [
    {
      src: "./assets/images/Comic Books/physical-activity-book/cover.webp",
      alt: "Physical Activity Book cover",
    },
    {
      src: "./assets/images/Comic Books/physical-activity-book/page-1.webp",
      alt: "Physical Activity Book page 1",
    },
    {
      src: "./assets/images/Comic Books/physical-activity-book/page-2.webp",
      alt: "Physical Activity Book page 2",
    },
    {
      src: "./assets/images/Comic Books/physical-activity-book/page-3.webp",
      alt: "Physical Activity Book page 3",
    },
    {
      src: "./assets/images/Comic Books/physical-activity-book/page-4.webp",
      alt: "Physical Activity Book page 4",
    },
    {
      src: "./assets/images/Comic Books/physical-activity-book/page-5.webp",
      alt: "Physical Activity Book page 5",
    },
  ],

  tortoiseHare: [
    {
      src: "./assets/images/Comic Books/the-tortoise-and-the-hare/cover.webp",
      alt: "The Tortoise and the Hare cover",
    },
    {
      src: "./assets/images/Comic Books/the-tortoise-and-the-hare/page-1.webp",
      alt: "The Tortoise and the Hare page 1",
    },
    {
      src: "./assets/images/Comic Books/the-tortoise-and-the-hare/page-2.webp",
      alt: "The Tortoise and the Hare page 2",
    },
    {
      src: "./assets/images/Comic Books/the-tortoise-and-the-hare/page-3.webp",
      alt: "The Tortoise and the Hare page 3",
    },
    {
      src: "./assets/images/Comic Books/the-tortoise-and-the-hare/page-4.webp",
      alt: "The Tortoise and the Hare page 4",
    },
    {
      src: "./assets/images/Comic Books/the-tortoise-and-the-hare/page-5.webp",
      alt: "The Tortoise and the Hare page 5",
    },
  ],

  lullaby: [
    {
      src: "./assets/images/Comic Books/lullaby-book-third/cover.webp",
      alt: "Lullaby Book cover",
    },
    {
      src: "./assets/images/Comic Books/lullaby-book-third/page-1.webp",
      alt: "Lullaby Book page 1",
    },
    {
      src: "./assets/images/Comic Books/lullaby-book-third/page-2.webp",
      alt: "Lullaby Book page 2",
    },
    {
      src: "./assets/images/Comic Books/lullaby-book-third/page-3.webp",
      alt: "Lullaby Book page 3",
    },
    {
      src: "./assets/images/Comic Books/lullaby-book-third/page-4.webp",
      alt: "Lullaby Book page 4",
    },
    {
      src: "./assets/images/Comic Books/lullaby-book-third/page-5.webp",
      alt: "Lullaby Book page 5",
    },
  ],

  washUp: [
    {
      src: "./assets/images/Comic Books/wash-up-book/cover.webp",
      alt: "Wash-Up Book cover",
    },
    {
      src: "./assets/images/Comic Books/wash-up-book/page-1.webp",
      alt: "Wash-Up Book page 1",
    },
    {
      src: "./assets/images/Comic Books/wash-up-book/page-2.webp",
      alt: "Wash-Up Book page 2",
    },
    {
      src: "./assets/images/Comic Books/wash-up-book/page-3.webp",
      alt: "Wash-Up Book page 3",
    },
    {
      src: "./assets/images/Comic Books/wash-up-book/page-4.webp",
      alt: "Wash-Up Book page 4",
    },
    {
      src: "./assets/images/Comic Books/wash-up-book/page-5.webp",
      alt: "Wash-Up Book page 5",
    },
  ],

  superTasters: [
    {
      src: "./assets/images/Comic Books/super-tasters/cover.webp",
      alt: "Super Tasters cover",
    },
    {
      src: "./assets/images/Comic Books/super-tasters/page-1.webp",
      alt: "Super Tasters page 1",
    },
    {
      src: "./assets/images/Comic Books/super-tasters/page-2.webp",
      alt: "Super Tasters page 2",
    },
    {
      src: "./assets/images/Comic Books/super-tasters/page-3.webp",
      alt: "Super Tasters page 3",
    },
    {
      src: "./assets/images/Comic Books/super-tasters/page-4.webp",
      alt: "Super Tasters page 4",
    },
    {
      src: "./assets/images/Comic Books/super-tasters/page-5.webp",
      alt: "Super Tasters page 5",
    },
  ],

  njCover: [
    {
      src: "./assets/images/Comic Books/nj-cover-english-artwork/cover.webp",
      alt: "NJ Cover English cover",
    },
    {
      src: "./assets/images/Comic Books/nj-cover-english-artwork/page-1.webp",
      alt: "NJ Cover English page 1",
    },
  ],

  njBook: [
    {
      src: "./assets/images/Comic Books/nj-book-english-artwork/cover.webp",
      alt: "NJ Book English cover",
    },
    {
      src: "./assets/images/Comic Books/nj-book-english-artwork/page-1.webp",
      alt: "NJ Book English page 1",
    },
    {
      src: "./assets/images/Comic Books/nj-book-english-artwork/page-2.webp",
      alt: "NJ Book English page 2",
    },
    {
      src: "./assets/images/Comic Books/nj-book-english-artwork/page-3.webp",
      alt: "NJ Book English page 3",
    },
    {
      src: "./assets/images/Comic Books/nj-book-english-artwork/page-4.webp",
      alt: "NJ Book English page 4",
    },
    {
      src: "./assets/images/Comic Books/nj-book-english-artwork/page-5.webp",
      alt: "NJ Book English page 5",
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
    (currentLightboxIndex - 1 + currentGallery.length) % currentGallery.length;

  updateLightboxImage();
}

function showNextImage() {
  if (!currentGallery.length) return;

  currentLightboxIndex = (currentLightboxIndex + 1) % currentGallery.length;

  updateLightboxImage();
}

function updateLightboxImage() {
  const image = currentGallery[currentLightboxIndex];

  lightboxImage.style.opacity = "0";

  setTimeout(() => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentGallery.length}`;

    lightboxImage.style.opacity = "1";
  }, 120);
}

/* Open project image lightbox */

galleryImages.forEach((item, index) => {
  item.addEventListener("click", () => {
    /* Comic / Educational gallery */
    if (item.dataset.gallery) {
      const galleryName = item.dataset.gallery;
      openLightbox(galleryName);
      return;
    }

    /* Normal project images */
    const img = item.querySelector("img");

    if (!img) return;

    currentGallery = galleryImages.map((galleryItem) => {
      const image = galleryItem.querySelector("img");

      return {
        src: image.src,
        alt: image.alt || "",
      };
    });

    currentLightboxIndex = index;

    updateLightboxImage();

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");
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

const galleryItems = Array.from(document.querySelectorAll(".gallery-image"));

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

/* =========================================
   EDUCATIONAL & PUBLICATION BOOK VIEWER
   Scoped only to Educational page
========================================= */

if (document.body.classList.contains("educational-publication-page")) {
  const educationalBookGalleries = {
    calendar: [
      {
        src: "./assets/images/Educational & Publication Design/2026 CALENDER ABBOTT.webp",
        alt: "2026 Calendar Abbott cover",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/2026 CALENDER ABBOTT/page-02.webp",
        alt: "2026 Calendar Abbott page 2",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/2026 CALENDER ABBOTT/page-03.webp",
        alt: "2026 Calendar Abbott page 3",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/2026 CALENDER ABBOTT/page-04.webp",
        alt: "2026 Calendar Abbott page 4",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/2026 CALENDER ABBOTT/page-05.webp",
        alt: "2026 Calendar Abbott page 5",
      },
    ],

    care: [
      {
        src: "./assets/images/Educational & Publication Design/Care Of Young Children.webp",
        alt: "Care Of Young Children cover",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Care Of Young Children/page-02.webp",
        alt: "Care Of Young Children page 2",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Care Of Young Children/page-03.webp",
        alt: "Care Of Young Children page 3",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Care Of Young Children/page-04.webp",
        alt: "Care Of Young Children page 4",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Care Of Young Children/page-05.webp",
        alt: "Care Of Young Children page 5",
      },
    ],

    daddy: [
      {
        src: "./assets/images/Educational & Publication Design/Daddy Cool-Reflection Card 1-8 2023-ARTWORK.webp",
        alt: "Daddy Cool Reflection Card cover",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Daddy Cool-Reflection Card 1-8 2023-ARTWORK/page-02.webp",
        alt: "Daddy Cool Reflection Card page 2",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Daddy Cool-Reflection Card 1-8 2023-ARTWORK/page-03.webp",
        alt: "Daddy Cool Reflection Card page 3",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Daddy Cool-Reflection Card 1-8 2023-ARTWORK/page-04.webp",
        alt: "Daddy Cool Reflection Card page 4",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Daddy Cool-Reflection Card 1-8 2023-ARTWORK/page-05.webp",
        alt: "Daddy Cool Reflection Card page 5",
      },
    ],

    activity: [
      {
        src: "./assets/images/Educational & Publication Design/EnglishActivity.webp",
        alt: "English Activity Book cover",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/English Activity Book 5+ Book_Ai/page-02.webp",
        alt: "English Activity Book page 2",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/English Activity Book 5+ Book_Ai/page-03.webp",
        alt: "English Activity Book page 3",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/English Activity Book 5+ Book_Ai/page-04.webp",
        alt: "English Activity Book page 4",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/English Activity Book 5+ Book_Ai/page-05.webp",
        alt: "English Activity Book page 5",
      },
    ],

    english5: [
      {
        src: "./assets/images/Educational & Publication Design/English 5+ Instruction Card_AI.webp",
        alt: "English 5+ Instruction Card cover",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/English 5+ Instruction Card_AI/page-02.webp",
        alt: "English 5+ Instruction Card page 2",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/English 5+ Instruction Card_AI/page-03.webp",
        alt: "English 5+ Instruction Card page 3",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/English 5+ Instruction Card_AI/page-04.webp",
        alt: "English 5+ Instruction Card page 4",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/English 5+ Instruction Card_AI/page-05.webp",
        alt: "English 5+ Instruction Card page 5",
      },
    ],

    flash: [
      {
        src: "./assets/images/Educational & Publication Design/Flash Cards 19-2-2025.webp",
        alt: "Flash Cards cover",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Flash Cards 19-2-2025/page-02.webp",
        alt: "Flash Cards page 2",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Flash Cards 19-2-2025/page-03.webp",
        alt: "Flash Cards page 3",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Flash Cards 19-2-2025/page-04.webp",
        alt: "Flash Cards page 4",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Flash Cards 19-2-2025/page-05.webp",
        alt: "Flash Cards page 5",
      },
    ],

    health: [
      {
        src: "./assets/images/Educational & Publication Design/Health flash card.webp",
        alt: "Health Flash Card cover",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Health flash card/page-02.webp",
        alt: "Health Flash Card page 2",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Health flash card/page-03.webp",
        alt: "Health Flash Card page 3",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Health flash card/page-04.webp",
        alt: "Health Flash Card page 4",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/Health flash card/page-05.webp",
        alt: "Health Flash Card page 5",
      },
    ],

    tamil5: [
      {
        src: "./assets/images/Educational & Publication Design/TAMIL 5+ Instruction Card_AI.webp",
        alt: "TAMIL 5+ Instruction Card cover",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/TAMIL 5+ Instruction Card_AI/page-02.webp",
        alt: "TAMIL 5+ Instruction Card page 2",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/TAMIL 5+ Instruction Card_AI/page-03.webp",
        alt: "TAMIL 5+ Instruction Card page 3",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/TAMIL 5+ Instruction Card_AI/page-04.webp",
        alt: "TAMIL 5+ Instruction Card page 4",
      },
      {
        src: "./assets/images/Educational & Publication Design/book-pages/TAMIL 5+ Instruction Card_AI/page-05.webp",
        alt: "TAMIL 5+ Instruction Card page 5",
      },
    ],
  };

  const educationalBookCards = document.querySelectorAll(
    ".educational-book-card",
  );

  educationalBookCards.forEach((card) => {
    card.addEventListener("click", () => {
      const bookName = card.dataset.bookGallery;
      const book = educationalBookGalleries[bookName];

      if (!book) return;

      currentGallery = book;
      currentLightboxIndex = 0;

      updateLightboxImage();

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");

      document.body.classList.add("lightbox-open");
    });
  });
}
