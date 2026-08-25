# Prabhjot Kaur — Portfolio

Multi-page static portfolio built with HTML, CSS and Vanilla JavaScript, inspired by the supplied Figma reference.

## Pages

- `index.html` — Home
- `about.html` — About
- `portfolio.html` — Portfolio categories
- `branding-commercial.html` — Branding & Commercial Design
- `comic-books.html` — Comic Books
- `educational-publication.html` — Educational & Publication Design
- `illustration-art.html` — Illustration & Art
- `logo-design.html` — Logo Design
- `newspaper-design.html` — Newspaper Design
- `poster-design.html` — Poster Design
- `social-media.html` — Social Media & Digital Design
- `uiux.html` — UI/UX Design
- `contact.html` — Contact

## Adding client project assets

The category pages currently contain placeholders. When a category ZIP is available, extract its optimized images into:

`assets/images/<category-slug>/`

Then replace the corresponding `.gallery-art` placeholder in that category HTML with an image, for example:

`<img src="assets/images/illustration-art/project-01.jpg" alt="Project title">`

Do not use huge source files directly on the live website. Export/resize portfolio images to WebP or optimized JPG/PNG first.

## Vercel

This is a static website. Push the project folder to GitHub, import the repository into Vercel, select the Other preset if asked, and leave build command/output directory empty.
