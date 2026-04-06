
import { todos, setTodos } from './state.js';
import { saveToStorage }   from './storage.js';

const taskList = document.getElementById('taskList');


export function initDragAndDrop() {
  let draggedItem = null;

  taskList.addEventListener('dragstart', (e) => {
    draggedItem = e.target.closest('.taskItem');
    if (!draggedItem) return;
    setTimeout(() => draggedItem.classList.add('dragging'), 0);
  });

  taskList.addEventListener('dragend', () => {
    if (!draggedItem) return;
    draggedItem.classList.remove('dragging');

    const newOrder = [...taskList.querySelectorAll('.taskItem')]
      .map(li => li.dataset.id);
    setTodos(newOrder.map(id => todos.find(t => t.id === id)).filter(Boolean));

    saveToStorage();
    draggedItem = null;
  });

  taskList.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    if (!draggedItem) return;

    const target = e.target.closest('.taskItem');
    if (!target || target === draggedItem) return;

    
    const rect = target.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;

    if (e.clientY < midY) {
      taskList.insertBefore(draggedItem, target);             
      taskList.insertBefore(draggedItem, target.nextSibling); 
    }
  });
}
