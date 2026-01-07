# Aurum Funnel - Static Referral Website

A mobile-first, dark fintech-styled static website for Aurum AI trading bots with integrated referral tracking.

## Features

- 🤖 **EX-AI Bot Spotlight**: Featured flagship AI trading bot
- 📱 **Mobile-First Design**: Fully responsive, optimized for all devices
- 🎨 **Dark Fintech Styling**: Modern, professional dark theme with gold accents
- 🔗 **Smart Referral System**: Automatic URL parameter tracking and persistence
- ⚡ **Static & Fast**: No backend required, compatible with GitHub Pages and Vercel
- 🎯 **Dynamic CTAs**: All call-to-action buttons automatically include referral codes

## Project Structure

```
/
├── index.html              # Landing page with EX-AI Bot spotlight
├── assets/
│   ├── ref.js             # Core referral tracking system
│   └── styles.css         # Global styles (dark fintech theme)
├── pages/
│   ├── bots.html          # Bot showcase page
│   └── onboarding.html    # Personalized onboarding flow
└── vercel.json            # Vercel deployment config
```

## Referral System

The referral system (`assets/ref.js`) automatically:

1. **Captures referral codes** from URL parameters (`?ref=CODE`)
2. **Persists codes** in localStorage for future visits
3. **Propagates referral codes** to all CTAs using `data-ref-cta` attribute
4. **Handles edge cases** with fallback to generic signup URL
5. **Provides copy functionality** for users to share their referral links

### Usage in HTML

```html
<!-- Automatically includes referral code -->
<a href="#" class="btn" data-ref-cta="https://app.aurum.com/signup">Sign Up</a>

<!-- Copy referral link button -->
<button data-copy-ref-link>Copy My Referral Link</button>
```

## Deployment

### GitHub Pages

1. Push to your repository
2. Go to Settings > Pages
3. Select branch and root directory
4. Your site will be live at `https://username.github.io/repository-name/`

### Vercel

1. Connect your GitHub repository to Vercel
2. Deploy automatically with the included `vercel.json` configuration
3. Your site will be live at your custom Vercel domain

## Development

No build process required! Simply:

1. Clone the repository
2. Open `index.html` in a browser
3. Or use a local server: `python -m http.server 8000`

## Pages

- **Home (index.html)**: EX-AI Bot spotlight with key features and stats
- **Bots (pages/bots.html)**: Showcase of all available trading bots
- **Onboarding (pages/onboarding.html)**: Interactive personalization flow

## Customization

### Colors

Edit CSS variables in `assets/styles.css`:

```css
:root {
  --color-gold: #fbbf24;
  --color-bg-primary: #0a0e1a;
  /* ... more variables */
}
```

### Referral URLs

Update the default signup URL in `assets/ref.js`:

```javascript
const DEFAULT_SIGNUP_URL = 'https://app.aurum.com/signup';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

All rights reserved © 2026 Aurum