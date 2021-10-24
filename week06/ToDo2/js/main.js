import Tasks from './toDos.js';
const task = new Tasks('tasksElement', 'footerDiv');
console.log(task.getAllTasks());

window.addEventListener('load', () => {
  task.showAllTasksList();
});
  