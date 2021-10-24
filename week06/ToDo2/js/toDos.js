const toDoList = [
{
  id: Date.now(),  
  title: "Clean My Bedroom",
  description: "Make my bed, pick-up laundry, and vaccuum the floor.", 
  completed: false,
  priority: "normal",
}, 
{
  id: Date.now(),  
  title: "Wash Laundry",
  description: "Gather laundry from all the rooms, sort it by colors, load in the washer.", 
  completed: false,
  priority: "normal",
}, 
{
  id: Date.now(),  
  title: "Wash Dishes",
  description: "Clear dishes from table, clear and rinse them, load in dishwasher.", 
  completed: false,
  priority: "normal",
}, 
{
  id: Date.now(),  
  title: "Finish Homework",
  description: "Review and edit GE report, build app, study for test.", 
  completed: false,
  priority: "normal",
},
{
  id: Date.now(),  
  title: "2 Clean My Bedroom",
  description: "Make my bed, pick-up laundry, and vaccuum the floor.", 
  completed: true,
  priority: "normal",
}, 
{
  id: Date.now(),  
  title: "2 Wash Laundry",
  description: "Gather laundry from all the rooms, sort it by colors, load in the washer.", 
  completed: true,
  priority: "normal",
}, 
{
  id: Date.now(),  
  title: "2 Wash Dishes",
  description: "Clear dishes from table, clear and rinse them, load in dishwasher.", 
  completed: true,
  priority: "normal",
}, 
{
  id: Date.now(),  
  title: "2 Finish Homework",
  description: "Review and edit GE report, build app, study for test.", 
  completed: true,
  priority: "normal",
}
  ];

export default class Tasks {
  constructor(elementId, footerID) {
    this.parentElement = document.getElementById(elementId);
    this.footerElement = document.getElementById(footerID);
  }

  // why is this function necessary?  taskList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of tasks outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
  getAllTasks() {
    return toDoList;
  }

  getTodoTasks() {
    let rArray = [];
    toDoList.forEach(task => {
      if (task.completed === false) {
        console.log(task.id);
        rArray.push(task);
      }
    });
    return rArray;
  }

  getCompletedTasks() {
    let rArray = [];
    toDoList.forEach(task => {
      if (task.completed === true) {
        console.log(task.id);
        rArray.push(task);
      }
    });
    return rArray;
  }

  // For the first stretch we will need to get just one task.
  getTaskByName(taskName) {
    return this.getAllTasks().find(task => task.name === taskName);
  }

  //show a list of tasks in the parentElement
  showAllTasksList() {
    console.log("showAllTasksList-test");
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getAllTasks(), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
    // this.allButton.classList.add('hidden');
  }

  //show a list of todo tasks in the parentElement
  showTodoList() {
    console.log("showTodoTasksList-test");
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getTodoTasks(), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
    // this.allButton.classList.add('hidden');
  }

  //show a list of completed tasks in the parentElement
  showCompletedList() {
    console.log("showCompletedTasksList-test");
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getCompletedTasks(), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
    // this.allButton.classList.add('hidden');
  }

  // show one task with full details in the parentElement
  showOneTask(taskName) {
    const task1 = this.getTaskByName(taskName);
    this.parentElement.innerHTML = "";
    this.parentElement.appendChild(renderOneTaskFull(task1));
    this.backButton.classList.remove('hidden');
  }

  // in order to show the details of a task ontouchend we will need to attach a listener AFTER the list of tasks has been built. The function below does that.
  addTaskListener() {
    const childrenArray = Array.from(this.parentElement.children);
      childrenArray.forEach(child => {
        child.addEventListener('touchend', e => {
            this.showOneHike(e.currentTarget.dataset.name);  //change to Edit, Delete or Add
        });
      });
    // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
  }

  addNewTask(){
    let newTaskField = document.getElementById("enterNewTask");
    console.log(newTaskField.value);

    let newTask = {
      id: Date.now(),  
      title: newTaskField.value,
      description: "Make my bed, pick-up laundry, and vaccuum the floor.", 
      completed: false,
      priority: "normal",
    };

    toDoList.push(newTask); ///create new Task
  }

  completedToggle(taskIdString) {

    let taskId = parseInt(taskIdString, 10);
    toDoList.forEach(function(part, index) {
      if (toDoList[index].id === taskId) {
        toDoList[index].completed = !toDoList[index].completed;
      }
    });
  }

/*
  removeTask(tasks){
    for( var i = 0; i < tasks.length; i++){ 
      if ( tasks.title === removeTask) { 
  
          tasks.splice(i, 1); 
      }
    }
  }

  //Edit the Array

  editTask(tasks){
    let i = tasks.indexOf(editTask);
    if (i !== -1) {
      task[i] = newEditTask;
    }
  }
*/

  renderListFooter(parent) {
    parent.innerHTML = `<td colspan = "3"><div class="buttonDiv2">
    <input type="button" class="button2" value="To Do Tasks" id = "listTodoTasks">
    <input type="button" class="button2" value="All Tasks" id= "listAllTasks">
    <input type="button" class="button2" value="Completed Tasks" id= "listCompletedTasks">
    </div>
    <form>
    <div id = "taskNew" class = "requiredInputHome">
        <input id = "enterNewTask" type = "text" name ="enterTaskTitle" placeholder = "New Task" required>
    </div>

    <div class = "buttonDiv">
        <input type="button" class="button" value="&#x271A; Enter Task" id = "enterTaskBtn">
    </div>
    </form></td>`;

    // Add event listener to todoTasksButton button.
    let todoTasksButton = document.getElementById("listTodoTasks");
    todoTasksButton.addEventListener('click', e => {
      this.showTodoList();
    });

    // Add event listener to listAllTasks button.
    let allTasksButton = document.getElementById("listAllTasks");
    allTasksButton.addEventListener('click', e => {
      console.log("calling allTasksList");
      this.showAllTasksList();//change to showTodoTaskList
    });

    // Add event listener to listCompletedTasks button.
    let completedTasksButton = document.getElementById("listCompletedTasks");
    completedTasksButton.addEventListener('click', e => {
      console.log("calling showCompletedList");
      this.showCompletedList();
    });

    // Add event listener to listCompletedTasks button.
    let enterTasksButton = document.getElementById("enterTaskBtn");
    enterTasksButton.addEventListener('click', e => {
      this.addNewTask();  //change to Edit, Delete or Add
      this.showAllTasksList();
     });
  }

}

  // methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
  function renderTaskListHeader() {
    const heading = document.createElement("tr");
    heading.classList.add('taskRowHeading');
    heading.innerHTML = `<th>Completed</th><th>Task</th><th>Created</th>`
    console.log('test header function');
    return heading
  }
  
  function renderTaskList(parent, tasks, myThis) { 
      console.log("test for each task list");
        parent.appendChild(renderTaskListHeader());
        tasks.forEach(task => {
          let newTask = renderOneTask(task);
          parent.appendChild(newTask);
          let checkbox = document.getElementById(task.id);
          checkbox.addEventListener('click', e => {
            myThis.completedToggle(e.target.id);
          });
        });      
  }

  function renderOneTask(task) {
    const item = document.createElement("tr");
    item.classList.add('taskTableRow');
    item.innerHTML = `
    <td> <input type="checkbox" id=${task.id} name="completedCheckBox" class= "checkboxComplete"></td> 
    <td>${task.title}</td><td>${Date(task.id).toString()}</td>`;
    console.log("test renderOne Tasks");
    return item;
  }


  // function renderOneTaskFull(task) {
  //   const item = document.createElement("li");
  //   item.innerHTML = ` <div class = "taskHeader"><h2>${task.title}</h2></div>
  //   <div class = "taskData">
  //           <div>
  //               <h3>To Do Task</h3>
  //               <p>${task.title}</p>
  //           </div>
  //           <div>
  //               <h3>Description</h3>
  //               <p>${task.description}</p>
  //           </div>
  //           <div>
  //             <h3>Completed</h3>
  //             <p>${task.completed}</p>
  //           </div>
  //   </div>`;
  //   return item;
  // }

  // Creating a timestamp
let timestamp = Date.now();
console.log(timestamp);

let timeString = timestamp.toString();
console.log(timeString);
    
// Converting it back to human-readable date and time
let taskTimestamp = new Date(timestamp).toString();
console.log(taskTimestamp);

