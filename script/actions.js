

import { todos, setTodos, setCurrentFilter } from './state.js';
import { uid } from './helpers.js';
import { saveToStorage } from './storage.js';
import { renderTasks, updateItemsLeft } from './render.js';


function refresh(onToggle, onDelete) {
  renderTasks(onToggle, onDelete);
  updateItemsLeft();
}


export function addTodo(text, onToggle, onDelete) {
  const trimmed = text.trim();
  if (!trimmed) return;
  setTodos([...todos, { id: uid(), text: trimmed, completed: false }]);
  saveToStorage();
  refresh(onToggle, onDelete);
}


export function toggleComplete(id, onToggle, onDelete) {
  setTodos(todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  ));
  saveToStorage();
  refresh(onToggle, onDelete);
}


export function deleteTodo(id, onToggle, onDelete) {
  setTodos(todos.filter(t => t.id !== id));
  saveToStorage();
  refresh(onToggle, onDelete);
}

/**
 * بتمسح كل الـ completed todos
 */
export function clearCompleted(onToggle, onDelete) {
  setTodos(todos.filter(t => !t.completed));
  saveToStorage();
  refresh(onToggle, onDelete);
}

/**
 * بتغير الـ filter الحالي وبتحدث الـ buttons والـ list
 */
export function setFilter(filter, allFilterBtns, onToggle, onDelete) {
  setCurrentFilter(filter);
  allFilterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTasks(onToggle, onDelete);
}
