

import { todos, currentFilter }   from './state.js';
import { getFilteredTodos, escapeHtml } from './helpers.js';

const taskList    = document.getElementById('taskList');
const itemsLeftEl = document.getElementById('itemsLeft');


export function renderTasks(onToggle, onDelete) {
  taskList.innerHTML = '';
  const filtered = getFilteredTodos();

  if (filtered.length === 0) {
    taskList.innerHTML = `
      <li class="tasksContainer__empty">
        ${currentFilter === 'completed' ? 'No completed tasks yet.'      :
          currentFilter === 'active'    ? 'No active tasks — nice work!' :
                                          'No tasks yet. Add one above!' }
      </li>`;
    return;
  }

  filtered.forEach(todo => {
    const li = createTaskElement(todo, onToggle, onDelete);
    taskList.appendChild(li);
  });
}


export function createTaskElement(todo, onToggle, onDelete) {
  const li = document.createElement('li');
  li.className  = `taskItem${todo.completed ? ' completed' : ''}`;
  li.dataset.id = todo.id;
  li.draggable  = true;

  li.innerHTML = `
    <div class="taskItem__leftSide">
      <div class="checkButton"
           role="checkbox"
           aria-checked="${todo.completed}"
           tabindex="0"
           aria-label="Toggle complete">
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

  const checkBtn = li.querySelector('.checkButton');
  checkBtn.addEventListener('click', () => onToggle(todo.id));
  checkBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(todo.id);
    }
  });

  const deleteBtn = li.querySelector('.taskItem__deleteButton');
  deleteBtn.addEventListener('click', e => {
    e.stopPropagation();
    onDelete(todo.id);
  });

  return li;
}

export function updateItemsLeft() {
  const count = todos.filter(t => !t.completed).length;
  itemsLeftEl.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
}
