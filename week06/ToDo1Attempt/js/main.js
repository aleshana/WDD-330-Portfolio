import Tasks from './toDos.js';
const task = new Tasks('content1');  //Tasks is the class template
console.log(task.getAllTasks()); 

window.addEventListener('load', () => {
    task.showToDoList();
//    task.showCompletedList();
  });
    