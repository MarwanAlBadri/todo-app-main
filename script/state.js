
export let todos = [];
export let currentFilter = 'all';

export function setTodos(newTodos) {
  todos = newTodos;
}

export function setCurrentFilter(filter) {
  currentFilter = filter;
}
