const projects = [
  {
    title: "Yoga Book",
    category: "illustration",
    label: "Illustration",
    description: "An illustrated educational book project combining storytelling, characters and colorful visual communication for young audiences."
  },
  {
    title: "Abby's Magical Afternoon",
    category: "illustration",
    label: "Illustration",
    description: "A playful illustrated storybook project focused on expressive characters, visual rhythm and engaging storytelling."
  },
  {
    title: "Abelardo Family Day",
    category: "illustration",
    label: "Illustration",
    description: "A family-focused illustration project created with a warm, friendly visual language and character-led storytelling."
  },
  {
    title: "Brand Identity Study",
    category: "branding",
    label: "Branding",
    description: "A visual identity exploration focused on creating a memorable brand language across logo, color and communication."
  },
  {
    title: "Social Media Campaign",
    category: "social",
    label: "Social Media",
    description: "Creative campaign artwork designed for digital platforms with strong visual hierarchy and audience-focused storytelling."
  },
  {
    title: "Educational Print Series",
    category: "print",
    label: "Print Design",
    description: "Educational and print communication designed to make information approachable, structured and visually engaging."
  },
  {
    title: "Character Design",
    category: "illustration",
    label: "Character Design",
    description: "Character exploration developed around expressive forms, personality and a flexible illustration style."
  },
  {
    title: "Campaign & Marketing",
    category: "social",
    label: "Campaign",
    description: "A collection of marketing visuals created to communicate campaign messages clearly across digital touchpoints."
  },
  {
    title: "Interface Concept",
    category: "uiux",
    label: "UI/UX",
    description: "A clean interface concept balancing usability, visual hierarchy and a distinctive creative direction."
  }
];

const projectGrid = document.querySelector("#projectGrid");
const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalImage = document.querySelector("#modalImage");

function renderProjects(filter = "all") {
  const filtered = filter === "all"
    ? projects
    : projects.filter(project => project.category === filter);

  projectGrid.innerHTML = filtered.map((project, index) => `
    <article class="project-card reveal visible" data-index="${projects.indexOf(project)}">
      <div class="project-visual">
        <div class="project-mark">${project.title}</div>
      </div>
      <div class="project-info">
        <span class="project-category">${project.label}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => openProject(Number(card.dataset.index)));
  });
}

function openProject(index) {
  const project = projects[index];
  modalTitle.textContent = project.title;
  modalCategory.textContent = project.label;
  modalDescription.textContent = project.description;
  modalImage.innerHTML = `<div class="project-mark">${project.title}</div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

document.querySelector(".modal-close").addEventListener("click", closeProject);
document.querySelector("[data-close-modal]").addEventListener("click", closeProject);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeProject();
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelector("#year").textContent = new Date().getFullYear();
renderProjects();
