# Specaide Website (GitHub Pages)

A fast, clean static website you can drop into a GitHub repo and publish via GitHub Pages.

## What to edit first
1. **Logo**: replace `assets/img/logo.svg` with your real logo (same filename is easiest).
2. **Brand logos & project images**: add images into `assets/img/` and update `index.html` (search for `TODO:`).
3. **Contact form**:
   - Default behaviour is email fallback.
   - If you want submissions to go somewhere, add a Formspree (or similar) endpoint:
     - In `index.html`, find `data-form-endpoint` and paste your endpoint URL.

## Run locally
Just open `index.html` in a browser.

(Recommended) run a tiny local server so anchors and downloads behave consistently:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy on GitHub Pages
1. Push this folder into a GitHub repo (root of repo is fine).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or your default), folder: `/ (root)`
4. Save. Your site will go live at the provided GitHub Pages URL.

## Structure
- `index.html` — single-page site
- `assets/css/styles.css` — styling
- `assets/js/main.js` — behaviour (nav, filters, form)
- `assets/pdfs/` — your brochures/spec PDFs for download

## Notes
- WhatsApp button uses: `https://wa.me/918882941379`
- Tel link uses: `tel:+918882941379`

