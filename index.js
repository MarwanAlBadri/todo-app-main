
import { loadFromStorage }                            from './script/storage.js';
import { renderTasks, updateItemsLeft }               from './script/render.js';
import { addTodo, toggleComplete, deleteTodo,clearCompleted, setFilter }   from './script/actions.js';
import { initTheme }                                  from './script/theme.js';
import { initDragAndDrop }                            from './script/dragAndDrop.js';

const taskForm          = document.getElementById('taskForm');
const taskInput         = document.getElementById('taskInput');
const clearCompletedBtn = document.getElementById('clearCompleted');
const allFilterBtns     = document.querySelectorAll('.taskContainer__filterButton');

const onToggle = (id) => toggleComplete(id, onToggle, onDelete);
const onDelete = (id) => deleteTodo(id, onToggle, onDelete);

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo(taskInput.value, onToggle, onDelete);
  taskInput.value = '';
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTodo(taskInput.value, onToggle, onDelete);
    taskInput.value = '';
  }
});

clearCompletedBtn.addEventListener('click', () => clearCompleted(onToggle, onDelete));

allFilterBtns.forEach(btn => {
  btn.addEventListener('click', () =>
    setFilter(btn.dataset.filter, allFilterBtns, onToggle, onDelete)
  );
});

function init() {
  loadFromStorage();
  initTheme();
  renderTasks(onToggle, onDelete);
  updateItemsLeft();
  initDragAndDrop();
}

init();

