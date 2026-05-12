# Mobile Phone Patrol - Business Website

A professional, clean, and trustworthy website for Mobile Phone Patrol, serving Northwest Indiana with mobile phone repair services.

## Features

✨ **Beautiful & Clean Design**
- Light, professional color palette (soft blues, whites, grays)
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Fast loading with optimized images

📱 **Interactive Booking System**
- Step-by-step appointment booking
- Device selection (iPhone, Samsung, Android, iPad)
- Repair type selection with dynamic pricing
- Automatic 2-day minimum booking window
- Real-time price display

💰 **Transparent Pricing**
- iPhone screen repair prices (LCD vs OLED)
- Clear price differences by device and repair type
- Estimate system for custom repairs
- Easy-to-read pricing cards

📧 **Contact & Form Integration**
- Formspree integration for booking submissions
- Email confirmations sent to: aseelibrahim2003@gmail.com
- Phone number: 219-333-6778
- Service areas: Schererville, Dyer, Saint John, Highland, Griffith

## Project Structure

```
MPP/
├── index.html          # Main page (HTML structure)
├── styles.css          # All styling (light palette, responsive)
├── script.js           # Booking form logic & interactivity
├── netlify.toml        # Netlify deployment configuration
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## Local Development

1. **Open in Browser**
   - Simply open `index.html` in any web browser
   - No build process or dependencies required

2. **Test Booking Form**
   - Fill out the booking form
   - Device selection updates repair types
   - Repair type displays price or "Estimate"
   - Date picker enforces 2-day minimum

## Deployment to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to [Netlify](https://app.netlify.com)
2. Log in with GitHub or email
3. Drag and drop the `MPP` folder to deploy
4. Your site is live!

### Option 2: GitHub Integration (Recommended)
1. Push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Mobile Phone Patrol website"
   git remote add origin https://github.com/YOUR_USERNAME/MPP.git
   git push -u origin main
   ```

2. In Netlify:
   - Click "New site from Git"
   - Connect to GitHub
   - Select the MPP repository
   - Build command: Leave empty (static site)
   - Publish directory: `.` (current folder)
   - Deploy!

3. Your site will auto-deploy on every GitHub push

### Option 3: Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## Formspree Setup

The booking form sends emails to your inbox via Formspree (free tier).

**To activate email notifications:**
1. Form submissions automatically work
2. First submission may require confirmation
3. All future submissions will go to: **aseelibrahim2003@gmail.com**

**To upgrade or manage:**
- Visit [Formspree Dashboard](https://formspree.io)
- Manage form submissions and settings

## Customization Guide

### Update Phone Number
Open `index.html` and search for `219-333-6778` to find all instances. Replace with your number.

### Update Email Address
Search for `aseelibrahim2003@gmail.com` and replace throughout the site.

### Modify Pricing
Edit the `repairPrices` object in `script.js`:
```javascript
iPhone: {
    "Screen Repair (LCD)": { price: 179, ... },
    "Screen Repair (OLED)": { price: 329, ... },
    ...
}
```

### Add More Services
Add new device types or repair types to the `repairPrices` object in `script.js`.

### Change Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
    --primary-light: #E8F4F8;      /* Light blue background */
    --accent-teal: #4ECDC4;        /* Teal accent color */
    --text-dark: #2C3E50;          /* Dark text */
    /* ... other colors ... */
}
```

### Update Images
All images are from Unsplash (free, no attribution required). To use your own photos:
1. Create an `assets/images/` folder
2. Replace image URLs in `index.html` with local paths
3. Example: `src="https://..." → src="assets/images/photo.jpg"`

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Fully responsive

## Performance

- Load time: < 2 seconds (typical)
- Responsive design: Mobile-first approach
- Optimized images: Lazy-loaded from Unsplash CDN
- No build process needed: Pure HTML/CSS/JavaScript

## Security & Privacy

✅ HTTPS enabled automatically on Netlify
✅ Formspree handles form data securely
✅ No backend server required
✅ Client-side validation for all inputs
✅ Phone numbers and emails protected

## Support & Troubleshooting

**Booking Form Not Working?**
- Check browser console (F12) for errors
- Ensure JavaScript is enabled
- Clear browser cache and reload

**Emails Not Received?**
- Check spam/junk folder
- Verify email in Formspree dashboard
- Test with a fresh submission

**Website Not Displaying?**
- Ensure all files are in the same folder
- Check that `index.html`, `styles.css`, `script.js` exist
- Verify file permissions are readable

## Future Enhancements

- [ ] Customer testimonials section
- [ ] Before/after gallery
- [ ] Blog for repair tips
- [ ] SMS appointment reminders
- [ ] Payment integration
- [ ] Online reviews section

## License

This website is proprietary to Mobile Phone Patrol. All rights reserved.

## Contact

**Mobile Phone Patrol**
- Phone: 219-333-6778
- Email: aseelibrahim2003@gmail.com
- Service Areas: Schererville, Dyer, Saint John, Highland, Griffith
- Region: Northwest Indiana

---

**Website Version:** 1.0
**Last Updated:** May 2026
**Hosting:** Netlify (Free Tier)

