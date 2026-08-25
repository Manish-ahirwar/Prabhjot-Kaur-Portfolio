const projects = [
  {
    title: "Branding & Commercial Design",
    category: "branding",
    label: "Commercial Design",
    description:
      "Branding, merchandise, packaging and commercial visual design projects.",
    image: "./assets/images/Commercial%20Design/1.webp",
    link: "branding-commercial.html",
  },

  {
    title: "Comic Books",
    category: "comic",
    label: "Comic Books",
    description:
      "Illustrated comic and storytelling projects created through characters and visual narratives.",
    image: "./assets/images/Comic%20Books/heroes%20of%20energy.webp",
    link: "comic-books.html",
  },

  {
    title: "Educational & Publication Design",
    category: "education",
    label: "Educational & Publication",
    description:
      "Educational materials, publications and communication designs created for clear and engaging learning.",
    image:
      "./assets/images/Educational%20%26%20Publication%20Design/2026%20CALENDER%20ABBOTT.webp",
      link: "educational-publication.html",
  },

  {
    title: "Illustration & Art",
    category: "illustration",
    label: "Illustration & Art",
    description:
      "Character illustration, digital artwork and expressive visual storytelling.",
    image: "./assets/images/Illustration%20%26%20Art/50.webp",
    link: "illustration-art.html",
  },

  {
    title: "Logo Design",
    category: "logo",
    label: "Logo Design",
    description:
      "Logo concepts and identity work developed for brands and creative projects.",
    image: "./assets/images/Logo%20Design/ChaloSesame%20Street%20Logo-02.webp",
    link: "logo-design.html",
  },

  {
    title: "Newspaper Design",
    category: "newspaper",
    label: "Newspaper Design",
    description:
      "Editorial and newspaper layouts designed around strong hierarchy and readability.",
    image:
      "./assets/images/Newspaper%20Design/Screenshot%202026-08-21%20at%2012.43.21%E2%80%AFPM.webp",
      link: "newspaper-design.html",
  },

  {
    title: "Poster Design",
    category: "poster",
    label: "Poster Design",
    description:
      "Campaign, awareness and communication posters designed for strong visual impact.",
    image: "./assets/images/Poster%20Design/posters-03.webp",
    link: "poster-design.html",
  },

  {
    title: "Social Media & Digital Design",
    category: "social",
    label: "Social Media & Digital",
    description:
      "Social media creatives and digital campaign artwork created for different audiences.",
    image:
      "./assets/images/Social%20Media%20%26%20Digital%20Design/happy%20holi-05.webp",
      link: "social-media.html",
  },

  {
    title: "UI/UX Design",
    category: "uiux",
    label: "UI/UX Design",
    description:
      "Digital interface concepts focused on usability, hierarchy and visual experience.",
    image: "./assets/images/UI%20UX%20Design/phone%20design.webp",
    link: "uiux.html",
  },
];

const projectGrid = document.querySelector("#projectGrid");
const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalImage = document.querySelector("#modalImage");

function renderProjects(filter = "all") {
  const filtered =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  projectGrid.innerHTML = filtered
    .map(
      (project, index) => `
  <article
    class="project-card reveal visible"
    data-index="${projects.indexOf(project)}"
  >

    <div class="project-visual">

      <img
        src="${project.image}"
        alt="${project.title}"
        loading="lazy"
      />

      <div class="project-mark">
        ${project.title}
      </div>

    </div>

    <div class="project-info">

      <span class="project-category">
        ${project.label}
      </span>

      <h3>
        ${project.title}
      </h3>

      <p>
        ${project.description}
      </p>

    </div>

  </article>
`,
    )
    .join("");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const project = projects[Number(card.dataset.index)];

      if (project.link) {
        window.location.href = project.link;
      }
    });
  });
}

function openProject(index) {
  const project = projects[index];
  modalTitle.textContent = project.title;
  modalCategory.textContent = project.label;
  modalDescription.textContent = project.description;
  modalImage.innerHTML = `
  <img
    src="${project.image}"
    alt="${project.title}"
    class="modal-project-image"
  />
`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

document.querySelector(".modal-close").addEventListener("click", closeProject);
document
  .querySelector("[data-close-modal]")
  .addEventListener("click", closeProject);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProject();
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const header = document.querySelector(".site-header");
window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  },
  { passive: true },
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelector("#year").textContent = new Date().getFullYear();
renderProjects();
