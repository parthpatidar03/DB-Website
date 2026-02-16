# DataByte Frontend - Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:
- Node.js 18 or higher: `node --version`
- npm or yarn: `npm --version` or `yarn --version`

## Installation Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- React Router DOM
- Framer Motion
- Tailwind CSS
- Lucide React (icons)
- Recharts
- Vite

### Step 2: Start Development Server

```bash
npm run dev
```

The app should now be running at `http://localhost:3000`

### Step 3: Verify Everything Works

Open your browser and check:
- ✅ Homepage loads with animated hero section
- ✅ Navigation works (Projects, Members, Blogs)
- ✅ System metrics ticker is updating in navbar
- ✅ Press Ctrl+K to open command palette
- ✅ Member and project cards display correctly

## Project Structure Overview

```
src/
├── assets/main.css          → Tailwind + custom animations
├── components/
│   ├── common/              → Navbar, Footer, Terminal
│   ├── members/             → MemberCard, SkillRadar
│   └── projects/            → ProjectCard
├── hooks/useDataFetch.js    → API integration (currently dummy data)
├── pages/                   → Home, Projects, Members, Blogs
├── utils/
│   ├── constants.js         → Configuration & data
│   └── animations.js        → Framer Motion variants
├── App.jsx                  → Routing & layout
└── main.jsx                 → Entry point
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Customization Quick Start

### 1. Update Club Information

Edit `src/utils/constants.js`:
```javascript
export const CONTACT_INFO = {
  email: 'your-email@domain.com',
  location: {
    name: 'Your Institution Name',
    coordinates: { lat: XX.XXXX, lng: XX.XXXX }
  }
};
```

### 2. Add Your Logo

Replace the logo in `src/components/common/Navbar.jsx`:
```javascript
<Link to="/" className="...">
  <img src="/your-logo.svg" alt="Logo" />
</Link>
```

### 3. Connect Real Backend

Update `src/hooks/useDataFetch.js`:
```javascript
const API_BASE_URL = 'https://your-api.com';

const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  const data = await response.json();
  setData(data);
};
```

### 4. Modify Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'your-brand': '#HEXCODE',
}
```

## Keyboard Shortcuts

- `Ctrl+K` or `Cmd+K` - Open command palette
- `Ctrl+/` or `Cmd+/` - Toggle wireframe mode
- `Esc` - Close modal/palette

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

### Tailwind styles not applying
```bash
# Rebuild
npm run dev
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Verify dummy data displays correctly
2. ⚙️ Customize colors and branding
3. 🔌 Integrate with your backend API
4. 📝 Add your actual content
5. 🎨 Fine-tune animations and effects
6. 🚀 Deploy to production

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Support

For issues or questions:
- Check README.md for detailed documentation
- Review component comments in source code
- Contact: data@nitt.edu

---

**Version:** 2.0.26 | **Status:** Ready for Development
