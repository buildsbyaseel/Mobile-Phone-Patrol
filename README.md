# Trees in the Trunk — Fallen Tree Cleanup Website

This repository hosts a clean, responsive static website for *Trees in the Trunk*, a tree cleanup and removal service serving Northwest Indiana.

## Files

- `index.html` — main website
- `styles.css` — styling and responsive layout
- `script.js` — navigation + Formspree submission logic
- `netlify.toml` — optional Netlify configuration

## Formspree setup

1. Create a form on Formspree and copy its endpoint URL (looks like `https://formspree.io/f/abcd1234`).
2. Open `script.js` and replace the `FORM_ENDPOINT` placeholder with your Formspree URL.

Example (in `script.js`):
```js
const FORM_ENDPOINT = 'https://formspree.io/f/abcd1234';
```

3. Test locally by opening `index.html`. To receive emails, ensure `FORM_ENDPOINT` is set before testing.

## Deploy

Deploy to Netlify (drag & drop or connect a Git repo). The site is static — no build step required.

## Contact

- Phone: 219-333-6778
- Service area: Northwest Indiana

---

Version: 1.0 — Rebranded August 2026
