
import { todos, setTodos } from './state.js';

export function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}


export function loadFromStorage() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    setTodos(JSON.parse(saved));
  } 
}


export function getSavedTheme() {
  return localStorage.getItem('theme') || 'light';
}


export function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}
