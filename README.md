# ✅ Todo App — Frontend Mentor Challenge

My solution to the [Todo app challenge](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW) on Frontend Mentor,
built with vanilla JavaScript (ES modules), SCSS and Vite.

**🔗 Live demo:** <https://todo-app-main-sand.vercel.app>

## ✨ Features

- Add, complete and delete todos
- Filter by **All / Active / Completed**
- Clear all completed todos and see how many items are left
- **Drag and drop** to reorder the list
- **Light / dark theme** toggle (remembered between visits)
- Todos saved in `localStorage`
- Responsive layout for mobile and desktop, with hover states

## 🛠 Tech stack

HTML5 · SCSS · Vanilla JavaScript (ES modules) · Vite · normalize.css

## 🚀 Getting started

```bash
git clone https://github.com/MarwanAlBadri/todo-app-main.git
cd todo-app-main
npm install
npm start        # starts the Vite dev server
npm run build    # production build
```

## 📂 Project structure

```
index.html
index.js            # App entry
style.scss          # All styles
script/
  state.js          # App state (todos, filter)
  actions.js        # Add / toggle / delete / clear
  render.js         # Renders the list & counters
  dragAndDrop.js    # Reordering with drag and drop
  storage.js        # localStorage helpers
  theme.js          # Light / dark mode
  helpers.js
```

The original challenge brief is kept in `README-template.md`.

## 👤 Author

**Marwan Al-Badri** — Junior Front-End Developer (React.js & TypeScript)

- GitHub: [@MarwanAlBadri](https://github.com/MarwanAlBadri)
