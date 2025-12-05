# PDF Compression Workflow

Use `scripts/compress_pdfs.sh` to create smaller copies of PDFs without overwriting the originals.

## What the script does
- Compresses PDFs found directly inside `assets/pdfs` (or a custom input folder).
- Writes compressed copies into `assets/pdfs/compressed` by default, naming them with a `-compressed` suffix.
- Skips replacement when compression does not reduce the file size, so originals stay untouched.
- Lets you adjust quality with the `GS_QUALITY` environment variable (defaults to `/ebook`).

## Running in Codespaces
1. Ensure Ghostscript is installed. If it is missing, install it inside the Codespace:
   ```bash
   sudo apt-get update && sudo apt-get install -y ghostscript
   ```
2. Run the script with defaults:
   ```bash
   ./scripts/compress_pdfs.sh
   ```
3. Specify custom folders if needed:
   ```bash
   ./scripts/compress_pdfs.sh assets/pdfs assets/pdfs/compressed
   ```
4. Choose a different quality preset (e.g., smaller but lower quality):
   ```bash
   GS_QUALITY=/screen ./scripts/compress_pdfs.sh
   ```

## Pointing the site to compressed PDFs
After reviewing the compressed files in `assets/pdfs/compressed`, update page links to reference the compressed versions (e.g., `assets/pdfs/compressed/your-file-compressed.pdf`). Keep the originals available for reference, and only switch links once you are satisfied with the compressed output.
