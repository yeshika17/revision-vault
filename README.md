# RevisionVault 🧠

A fast, minimal revision tracker. Add subjects → topics → subtopics, check them off, add notes, track progress.

## Project Structure

```
revvault/
├── index.html                  # Vite entry point
├── package.json
├── vite.config.js
├── vercel.json                 # SPA routing for Vercel
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Root component, all state wiring
    ├── styles/
    │   └── globals.css         # CSS variables, resets
    ├── hooks/
    │   ├── useStore.js         # All state + localStorage persistence
    │   └── useToast.js         # Toast notification hook
    ├── utils/
    │   └── helpers.js          # uid(), calcProgress(), seed data
    └── components/
        ├── Navbar.jsx / .module.css
        ├── Button.jsx / .module.css
        ├── Modal.jsx / .module.css
        ├── Toast.jsx / .module.css
        ├── SubjectCard.jsx / .module.css
        ├── SubjectsPage.jsx / .module.css
        ├── TopicBlock.jsx / .module.css
        ├── TopicsPage.jsx / .module.css
        ├── AddSubjectModal.jsx / .module.css
        ├── AddTopicModal.jsx / .module.css
        └── NoteModal.jsx / .module.css
```

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy** ✓

All data is stored in `localStorage` — no backend needed.
