# DataByte Frontend

> The Official Machine Learning Club of NIT Trichy - Full Frontend Implementation

## 🎨 Design Philosophy

**"The Latent Space"** - A data-driven, mathematical, and kinetic web experience that embodies the essence of machine learning and computational science.

### Key Features

- **🔬 Scientific Dashboard Aesthetic**: High-Performance Computing (HPC) Interface inspired design
- **📊 Live System Metrics**: Real-time EPOCH, ACCURACY, and LOSS tracking in navbar
- **🎯 CV Detection Frames**: Member cards with bounding boxes and facial keypoint detection
- **📈 Training Logs**: Project cards displaying model performance metrics
- **⌨️ Terminal Command Palette**: Ctrl+K for quick navigation and commands
- **🌐 Wireframe Mode**: Toggle raw data view with Ctrl+/
- **✨ Matrix Effects**: Scanlines, glitch animations, and neon glows

## 🏗️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Recharts** - Data Visualization
- **Lucide React** - Icons

## 📁 Project Structure

```
databyte-frontend/
├── public/
│   └── assets/               # Static assets
├── src/
│   ├── assets/
│   │   └── main.css         # Global styles + Tailwind + Animations
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx   # Header with system metrics
│   │   │   ├── Footer.jsx   # EOF section with heatmap
│   │   │   └── Terminal.jsx # Command palette (Ctrl+K)
│   │   ├── members/
│   │   │   ├── MemberCard.jsx  # CV detection frame + scan effect
│   │   │   └── SkillRadar.jsx  # Radar chart for skills
│   │   └── projects/
│   │       ├── ProjectCard.jsx # Neuron card with training logs
│   │       ├── ProjectGrid.jsx # Grid layout (if needed)
│   │       └── FilterPipe.jsx  # Filter sidebar (if needed)
│   ├── hooks/
│   │   └── useDataFetch.js  # Custom hook for API calls (dummy data)
│   ├── pages/
│   │   ├── Home.jsx         # "The Input Layer"
│   │   ├── Projects.jsx     # "The Model Zoo"
│   │   ├── Members.jsx      # "The Neural Network"
│   │   └── Blogs.jsx        # "The Notebooks"
│   ├── utils/
│   │   ├── constants.js     # Nav links, categories, metrics
│   │   └── animations.js    # Framer Motion configurations
│   ├── App.jsx              # Main app with routing
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── tailwind.config.js       # Custom colors & animations
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd databyte-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

The build files will be in the `dist/` directory.

## 🎨 Color Palette

```css
Deep Obsidian: #050505  /* Primary background */
Data Blue: #00F0FF      /* Primary accent - neon cyan */
Neural Violet: #8A2BE2  /* Secondary accent - purple */
Terminal Green: #00FF41 /* Success states */
Matrix Black: #0D0208   /* Dark elements */
Grid Gray: #1A1A1A      /* Grid lines */
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` / `Cmd+K` | Open Command Palette |
| `Ctrl+/` / `Cmd+/` | Toggle Wireframe Mode |
| `Esc` | Close Modal/Palette |

## 🎯 Key Components

### Navbar - "The Header Array"
- System metrics ticker (EPOCH, ACCURACY, LOSS, STATUS)
- File system inspired navigation
- Breadcrumb path display
- Expandable logo (DB_ → [DataByte])

### Terminal - Command Palette
- Quick navigation: `goto projects`, `goto members`
- Theme controls: `theme dark`, `toggle wireframe`
- Help system: `help`

### MemberCard - "The Detection Frame"
- CV-style bounding box with corner brackets
- Confidence score label (Object: Member | Confidence: 0.99)
- Scan line animation on hover
- Facial keypoint detection effect
- Skills radar chart overlay
- Raw JSON data toggle

### ProjectCard - "The Neuron Card"
- Training log snippet with metrics
- Status badges (deployed, in-progress, completed, research)
- Tech stack weight visualization
- GitHub/Demo links
- Stars, contributors, and last updated stats

## 📊 Dummy Data API

Currently using dummy data from `useDataFetch` hook. To integrate with backend:

1. Replace `getDummyData()` function in `src/hooks/useDataFetch.js`
2. Update endpoint URLs to match your backend
3. Add authentication if required
4. Handle loading and error states

Example:
```javascript
// Replace in useDataFetch.js
const fetchData = async () => {
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();
    setData(data);
  } catch (err) {
    setError(err.message);
  }
  setLoading(false);
};
```

## 🎨 Customization

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/utils/constants.js`

### Modifying Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'your-color': '#HEX_CODE',
}
```

### Adding Animations

Add to `src/utils/animations.js`:
```javascript
export const yourAnimation = {
  initial: { ... },
  animate: { ... },
  transition: { ... }
};
```

## 🐛 Common Issues & Solutions

### Issue: Animations not working
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser console for errors

### Issue: Tailwind classes not applying
- Run `npm run dev` to rebuild
- Check `tailwind.config.js` for custom class paths

### Issue: Images not loading
- Verify image paths in dummy data
- Use placeholder services like `placeholder.com` for testing

## 📝 TODO / Future Enhancements

- [ ] Integrate real backend API
- [ ] Add authentication system
- [ ] Implement project detail pages
- [ ] Add blog post editor
- [ ] Create admin dashboard
- [ ] Add member profile pages
- [ ] Implement search functionality
- [ ] Add loading skeletons
- [ ] Optimize bundle size
- [ ] Add PWA support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

**DataByte** - The Official Machine Learning Club of NIT Trichy

- Website: [databyte-nitt.tech]
- Email: data@nitt.edu
- GitHub: [@databyte-nitt](https://github.com/databyte-nitt)

---

**Build:** v2.0.26 | **Hash:** 7d3f2a | **Status:** STABLE

*Built with 💙 by DataByte | Train hard, deploy harder*
