# Trees in the Trunk — Storm Tree Cleanup Website
 
Static HTML/CSS/JS website for a Northwest Indiana fallen-tree and storm-debris cleanup service.
 
## Files
 
- `index.html` — main website
- `style.css` — all styling
- `script.js` — mobile navigation, footer year, and form submission
- `netlify.toml` — tells Netlify how to deploy (no build step, just publishes the folder)
## The form (already working)
 
The quote form uses **Netlify Forms**, not a third-party service — no account or API
key needed. Netlify detects it automatically at deploy time because the `<form>` tag
in `index.html` has `data-netlify="true"` and a `name`.
 
- Visitors can attach photos directly (`Photos of the tree` file field), or paste a
  link instead if that's easier for them.
- Submissions, including uploaded photos, show up under **Site settings → Forms** in
  your Netlify dashboard.
- Turn on **email notifications** there (Forms → your form → Settings & notifications)
  so you get a text/email the moment someone submits.
- There's a hidden honeypot field (`bot-field`) to filter out spam bots.
This only works once the site is deployed on Netlify — it won't submit anywhere if
hosted elsewhere (e.g. GitHub Pages) unless you swap in a different form backend.
 
## Before going live
 
1. ✅ Phone number is set to 219-333-6778 throughout (nav, hero, contact section, footer).
2. Double-check the service-area cities and pricing ranges match what you actually want to offer.
3. Deploy to Netlify (drag-and-drop the folder into Netlify, or connect the GitHub repo) —
   the form won't work until it's live there.
4. After your first deploy, go to Netlify → Forms and turn on notifications so leads
   don't sit unseen in the dashboard.
## GitHub
 
Push these files to your site's repository root:
 
```bash
git add index.html style.css script.js netlify.toml README.md
git commit -m "Fix mobile card overlap, wire up working form with photo upload, unify branding"
git push
```
 
If the repo is connected to Netlify, it will redeploy automatically.
 