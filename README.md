# AVTasks - Arslan Ventures Task Manager

A modern, clean PWA (Progressive Web App) task manager with AI agent integration.

![AVTasks](https://img.shields.io/badge/status-live-success)
![PWA](https://img.shields.io/badge/PWA-enabled-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb)

## 🌐 Live App

**https://smetools.github.io/avtasks/**

- ✅ Works offline (PWA)
- ✅ Installable on mobile & desktop
- ✅ Shows user tasks + AI agent tasks
- ✅ Auto-syncs agent tasks every 10 seconds

## ✨ Features

### User Tasks
- ➕ Add tasks quickly
- ✓ Mark complete/incomplete
- 🗑️ Delete tasks
- 💾 Saves locally (localStorage)
- 📊 Shows pending/completed counts

### Agent Tasks 🤖
- View AI agent's current tasks
- Status indicators: Pending | In Progress | Done
- Pulsing animation for active tasks
- Relative timestamps ("5m ago", "2h ago")
- Collapsible section with task count badge

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Open http://localhost:5173/avtasks/

### Build

```bash
npm run build
```

Output in `dist/` directory.

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 🤖 Agent Tasks Integration

Agent tasks are stored in `public/agent-tasks.json` and automatically fetched by the app.

### Helper Script

```bash
# Add a task
python3 /home/molt/openclaw/hassan/scripts/update_agent_tasks.py add "Deploying feature X" "in-progress"

# Update status
python3 /home/molt/openclaw/hassan/scripts/update_agent_tasks.py update 1 "done"

# List all tasks
python3 /home/molt/openclaw/hassan/scripts/update_agent_tasks.py list

# Remove a task
python3 /home/molt/openclaw/hassan/scripts/update_agent_tasks.py remove 1
```

See [AGENT_TASKS_API.md](./AGENT_TASKS_API.md) for complete documentation.

## 📱 APK Build

Want an installable Android APK? See [BUILD_APK.md](./BUILD_APK.md) for:

- **PWABuilder Online** (no SDK required) - Recommended
- **Local Build with Capacitor** (requires Android Studio)
- **GitHub Actions** (cloud build)

### Quick APK via PWABuilder

1. Visit https://www.pwabuilder.com/
2. Enter: `https://smetools.github.io/avtasks/`
3. Generate Android package
4. Download signed APK

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Capacitor 7** - Native wrapper (for APK)
- **Workbox** - Service worker & offline support
- **PWA** - Progressive Web App features

## 📁 Project Structure

```
avtasks/
├── src/
│   ├── App.jsx           # Main app component
│   ├── App.css           # Styles
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── public/
│   ├── agent-tasks.json  # AI agent tasks (auto-synced)
│   ├── icon-192.png      # PWA icon
│   └── icon-512.png      # PWA icon
├── android/              # Capacitor Android project
├── dist/                 # Build output
├── BUILD_APK.md          # APK build guide
└── AGENT_TASKS_API.md    # Agent tasks documentation
```

## 🎨 Design

- **Dark theme** - Comfortable for long use
- **Gradient accents** - Purple/blue gradients
- **Mobile-first** - Optimized for touch
- **Safe areas** - Respects notches and home indicators
- **Smooth animations** - Subtle transitions and effects

## 🔧 Configuration

### PWA Manifest

- **Name:** AVTasks - Arslan Ventures
- **Short Name:** AVTasks
- **Theme:** #0f172a (dark blue)
- **Display:** Standalone
- **Scope:** /avtasks/

### Capacitor Config

```json
{
  "appId": "com.arslanventures.avtasks",
  "appName": "AVTasks",
  "webDir": "dist"
}
```

## 🧪 Testing

### Test PWA Features

1. Open in Chrome/Edge
2. Install prompt should appear
3. Install to home screen
4. Test offline mode (disconnect network)
5. Tasks should persist

### Test Agent Tasks

1. Update agent-tasks.json
2. Wait 10 seconds (or refresh)
3. New tasks appear in 🤖 section
4. Status changes reflect in UI

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run lint` | Run ESLint |

## 🐛 Troubleshooting

### PWA not installing?

- Check manifest.webmanifest is accessible
- Verify HTTPS (required for PWA)
- Check browser console for errors

### Agent tasks not showing?

- Verify agent-tasks.json is valid JSON
- Check network tab for 404 errors
- Wait 10 seconds for auto-refresh

### Build fails?

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📄 License

Built for Hassan • Arslan Ventures

## 🔗 Links

- **Live App:** https://smetools.github.io/avtasks/
- **Repository:** [smetools/avtasks](https://github.com/smetools/avtasks)
- **PWABuilder:** https://www.pwabuilder.com/

---

**Made with ❤️ by AI Agent for Hassan**
