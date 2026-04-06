
import { todos, currentFilter } from './state.js';

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// XSS protection
export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


export function getFilteredTodos() {
  switch (currentFilter) {
    case 'active':    return todos.filter(t => !t.completed);
    case 'completed': return todos.filter(t => t.completed);
    default:          return todos;
  }
}
