
from pathlib import Path
import fitz
import subprocess

BASE = Path("assets/images/Comic Books")

BOOKS = {
    "abby's magical afternoon hindi.pdf": "abbys-magical-afternoon-hindi",
    "Abelardo's family day BOOK 4_Folder.pdf": "abelardos-family-day-book-4",
    "Elmo's exciting sleep.pdf": "elmos-exciting-sleep",
}

for pdf_name, folder_name in BOOKS.items():
    pdf_path = BASE / pdf_name
    output_dir = BASE / folder_name

    if not pdf_path.exists():
        print(f"PDF NOT FOUND: {pdf_path}")
        continue

    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        with fitz.open(pdf_path) as pdf:
            total_pages = min(5, len(pdf))
            print(f"\nConverting: {pdf_name} ({total_pages} pages)")

            for index in range(total_pages):
                page = pdf[index]
                pix = page.get_pixmap(
                    matrix=fitz.Matrix(1.5, 1.5),
                    alpha=False
                )

                temp_png = output_dir / f"temp-page-{index + 1}.png"
                pix.save(temp_png)

                if index == 0:
                    outputs = [
                        output_dir / "cover.webp",
                        output_dir / "page-1.webp",
                    ]
                else:
                    outputs = [output_dir / f"page-{index + 1}.webp"]

                for output in outputs:
                    subprocess.run(
                        ["magick", str(temp_png), "-quality", "82", str(output)],
                        check=True
                    )

                temp_png.unlink(missing_ok=True)

            print(f"SUCCESS: {folder_name}")

    except Exception as error:
        print(f"FAILED: {pdf_name}: {error}")

print("\nConversion finished. Verify images before deleting PDFs.")
