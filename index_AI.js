/* ============================================================
   Todo App — index.js
   Features:
   - Add / delete todos
   - Mark complete / uncomplete
   - Filter: All / Active / Completed
   - Clear completed
   - Light / Dark theme toggle (persisted)
   - State persisted to localStorage
============================================================ */

// ─── State ───────────────────────────────────────────────
let todos = [];
let currentFilter = 'all';

// ─── DOM Refs ─────────────────────────────────────────────
const taskForm        = document.getElementById('taskForm');
const taskInput       = document.getElementById('taskInput');
const taskList        = document.getElementById('taskList');
const itemsLeftEl     = document.getElementById('itemsLeft');
const clearCompletedBtn = document.getElementById('clearCompleted');
const themeToggle     = document.querySelector('.header__theme-toggle');
const themeImage      = document.querySelector('.header__themeImage');
const htmlEl          = document.documentElement;

// All filter button groups (desktop + mobile)
const allFilterBtns   = document.querySelectorAll('.taskContainer__filterButton');

// ─── Init ─────────────────────────────────────────────────
function init() {
  loadFromStorage();
  applyTheme(getSavedTheme());
  renderTasks();
  updateItemsLeft();
}

// ─── Storage ──────────────────────────────────────────────
function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromStorage() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  } else {
    // Default seed tasks matching the design
    todos = [
      { id: uid(), text: 'Complete online JavaScript course', completed: true },
      { id: uid(), text: 'Jog around the park 3x',          completed: false },
      { id: uid(), text: '10 minutes meditation',            completed: false },
      { id: uid(), text: 'Read for 1 hour',                  completed: false },
      { id: uid(), text: 'Pick up groceries',                completed: false },
      { id: uid(), text: 'Complete Todo App on Frontend Mentor', completed: false },
    ];
  }
}

function getSavedTheme() {
  return localStorage.getItem('theme') || 'light';
}

function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

// ─── Theme ────────────────────────────────────────────────
function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  themeImage.src = theme === 'dark' ? 'images/icon-sun.svg' : 'images/icon-moon.svg';
  themeImage.alt = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
});

// ─── Helpers ──────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function getFilteredTodos() {
  switch (currentFilter) {
    case 'active':    return todos.filter(t => !t.completed);
    case 'completed': return todos.filter(t => t.completed);
    default:          return todos;
  }
}

function updateItemsLeft() {
  const count = todos.filter(t => !t.completed).length;
  itemsLeftEl.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
}

// ─── Render ───────────────────────────────────────────────
function renderTasks() {
  taskList.innerHTML = '';
  const filtered = getFilteredTodos();

  if (filtered.length === 0) {
    taskList.innerHTML = `
      <li class="tasksContainer__empty">
        ${currentFilter === 'completed' ? 'No completed tasks yet.' :
          currentFilter === 'active'    ? 'No active tasks — nice work!' :
                                          'No tasks yet. Add one above!'}
      </li>`;
    return;
  }

  filtered.forEach(todo => {
    const li = createTaskElement(todo);
    taskList.appendChild(li);
  });
}

function createTaskElement(todo) {
  const li = document.createElement('li');
  li.className = `taskItem${todo.completed ? ' completed' : ''}`;
  li.dataset.id = todo.id;

  li.innerHTML = `
    <div class="taskItem__leftSide">
      <div class="checkButton" role="checkbox" aria-checked="${todo.completed}" tabindex="0" aria-label="Toggle complete">
        <img class="checkButton__icon" src="images/icon-check.svg" alt="">
      </div>
      <span class="taskItem__text">${escapeHtml(todo.text)}</span>
    </div>
    <div class="taskItem__rightSide">
      <button class="taskItem__deleteButton" aria-label="Delete task" tabindex="0">
        <img class="taskItem__deleteButtonImage" src="images/icon-cross.svg" alt="Delete">
      </button>
    </div>
  `;

  // Toggle complete
  const checkBtn = li.querySelector('.checkButton');
  checkBtn.addEventListener('click', () => toggleComplete(todo.id));
  checkBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleComplete(todo.id);
    }
  });

  // Delete
  const deleteBtn = li.querySelector('.taskItem__deleteButton');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTodo(todo.id);
  });

  return li;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Actions ──────────────────────────────────────────────
function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  todos.push({ id: uid(), text: trimmed, completed: false });
  saveToStorage();
  renderTasks();
  updateItemsLeft();
}

function toggleComplete(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  saveToStorage();
  renderTasks();
  updateItemsLeft();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveToStorage();
  renderTasks();
  updateItemsLeft();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  saveToStorage();
  renderTasks();
  updateItemsLeft();
}

function setFilter(filter) {
  currentFilter = filter;

  // Sync all filter buttons (desktop + mobile)
  allFilterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  renderTasks();
}

// ─── Event Listeners ──────────────────────────────────────
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo(taskInput.value);
  taskInput.value = '';
});

// Allow Enter key in input to submit
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTodo(taskInput.value);
    taskInput.value = '';
  }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

allFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

// ─── Start ────────────────────────────────────────────────
init();
