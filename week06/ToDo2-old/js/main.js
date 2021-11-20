import Tasks from './toDos.js';
const task = new Tasks('tasksElement', 'footerDiv');
console.log(task.getAllTasks('tasksElement'));

window.addEventListener('load', () => {
  task.showAllTasksList();
});
  