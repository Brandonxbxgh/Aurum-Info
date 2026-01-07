# Aurum-Info

A production-ready static referral funnel website built with HTML, CSS, and vanilla JavaScript.

## 🌟 Features

- **URL-based Referral Tracking**: Capture and persist referral codes via `?ref=` parameter
- **Dynamic CTAs**: All call-to-action buttons automatically update with referral links
- **Mobile-First Design**: Fully responsive with iPhone-friendly layout
- **Dark Theme**: Professional design with gold accents (#D4AF37)
- **Zero Dependencies**: Pure static site, no build process required
- **Deployment Ready**: Compatible with GitHub Pages, Vercel, and any static host

## 📁 Structure

```
aurum-funnel/
├── index.html          # Overview page
├── partner.html        # Partner program details
├── get-started.html    # Onboarding guide
├── set.html           # Referral settings
└── assets/
    ├── ref.js         # Referral logic
    └── style.css      # Styles
```

## 🚀 Quick Start

1. Clone this repository
2. Open `index.html` in a browser or serve with any static file server
3. Test referrals by visiting: `index.html?ref=YOUR_CODE`

## 🔧 Configuration

Update the `DEFAULT_LINK` in `assets/ref.js` with your actual signup URL:

```javascript
DEFAULT_LINK: 'https://your-domain.com/signup',
```

## 📱 Referral Flow

1. User visits any page with `?ref=CODE` parameter
2. Code is stored in localStorage
3. User navigates across pages - referral persists
4. All CTA buttons automatically include the referral code
5. User can manage referral in `/set.html`

## 🌐 Deployment

### GitHub Pages
```bash
git push origin main
# Enable GitHub Pages in repository settings
```

### Vercel
```bash
vercel deploy
```

### Custom Server
```bash
python -m http.server 8000
# Or any static file server
```

## 🧪 Testing

Open the site and test:
- Visit `/?ref=TEST123` to set a referral
- Navigate to different pages - referral persists
- Check CTA buttons contain `?ref=TEST123`
- Visit `/set.html` to manage referrals

## 📄 License

All rights reserved © 2026 Aurum