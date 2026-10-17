
from pathlib import Path
import fitz
import subprocess

BASE = Path("assets/images/Comic Books")

BOOKS = {
    "Lullaby Book Third.pdf": "lullaby-book-third",
    "NJ Book-English-ARTWORK.pdf": "nj-book-english-artwork",
    "NJ Cover-English ARTWORK.pdf": "nj-cover-english-artwork",
    "NJ Pop-Up-English ARTWORK.pdf": "nj-pop-up-english-artwork",
    "Physical Activity Book 30-04-2025.pdf": "physical-activity-book",
    "Super Tasters.pdf": "super-tasters",
    "the tortoise and the hare.pdf": "the-tortoise-and-the-hare",
    "Wash-Up Book 24-ARTWORK.pdf": "wash-up-book",
    "wat-er wonderful world.pdf": "wat-er-wonderful-world",
    "with cindy the windy comic 2revised.pdf": "with-cindy-the-windy-comic",
}

SCALE = 1.5

for pdf_name, folder_name in BOOKS.items():
    pdf_path = BASE / pdf_name
    output_dir = BASE / folder_name

    if not pdf_path.exists():
        print(f"PDF NOT FOUND: {pdf_name}")
        continue

    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        with fitz.open(pdf_path) as pdf:
            total_pages = min(5, len(pdf))
            print(f"\nConverting: {pdf_name} ({total_pages} pages)")

            for index in range(total_pages):
                page = pdf[index]
                pix = page.get_pixmap(
                    matrix=fitz.Matrix(SCALE, SCALE),
                    alpha=False
                )

                # Save a temporary PNG, then convert it to WebP.
                temp_png = output_dir / f"temp-page-{index + 1}.png"
                pix.save(temp_png)

                if index == 0:
                    cover_output = output_dir / "cover.webp"
                    page_output = output_dir / "page-1.webp"

                    subprocess.run(
                        ["magick", str(temp_png), "-quality", "82",
                         str(cover_output)],
                        check=True
                    )
                    subprocess.run(
                        ["magick", str(temp_png), "-quality", "82",
                         str(page_output)],
                        check=True
                    )
                else:
                    page_output = output_dir / f"page-{index + 1}.webp"
                    subprocess.run(
                        ["magick", str(temp_png), "-quality", "82",
                         str(page_output)],
                        check=True
                    )

                temp_png.unlink(missing_ok=True)

            print(f"SUCCESS: {folder_name}")

    except Exception as error:
        print(f"FAILED: {pdf_name}: {error}")

print("\nConversion finished. Verify all folders before deleting PDFs.")
