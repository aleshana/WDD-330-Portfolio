import * as lsH from './ls.js';

let toDoList = [];

export default class Tasks {
  constructor(elementId, footerID) {
    this.parentElement = document.getElementById(elementId);
    this.footerElement = document.getElementById(footerID);
    this.key = elementId;
    this.toDoList = lsH.readFromLS(this.key);
  }
  
  getAllTasks(key) {
    let ls = lsH.readFromLS(key);
    toDoList = ls === null ? [] : ls;   
    return toDoList;
  }

  getTodoTasks() {
    let rArray = [];
    this.toDoList.forEach(task => {
      if (task.completed === false) {
        rArray.push(task);
      }
    });
    return rArray;
  }

  getCompletedTasks() {
    let rArray = [];
    this.toDoList.forEach(task => {
      if (task.completed === true) {
        rArray.push(task);
      }
    });
    return rArray;
  }

  // getTaskByToDo(taskToDo1) {
  //   return this.getAllTasks(this.key).find(task => task.taskToDo === taskToDo1);
  // }

  getTaskById(taskId) {
    // let task = todoList.findIndex(task => task.id == itId);
    let taskI = toDoList.findIndex(task => task.id === taskId);
    return toDoList[taskI];
  }
  

  showAllTasksList() {
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getAllTasks(this.key), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
  }

  showTodoList() {
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getTodoTasks(), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
  }

  showCompletedList() {
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getCompletedTasks(), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
  }

  showOneTask(taskId) {
    const task1 = this.getTaskById(taskId);
    this.parentElement.innerHTML = "";
    this.parentElement.appendChild(renderOneTask(task1, this));
  }

  addTaskListener() {
    const childrenArray = Array.from(this.parentElement.children);
      childrenArray.forEach(child => {
        child.addEventListener('touchend', e => {
          let inputField = e.currentTarget.querySelector('input');
          this.showOneTask(inputField.id);      
        });
      });
  }

  addNewTask(){
    let newTaskField = document.getElementById("enterNewTask");
    console.log(newTaskField.value);
    let idDate= Date.now()
    let stringDate = idDate.toString();    

    let newTask = {
      id: stringDate,  
      taskToDo: newTaskField.value,
      completed: false,
    };

    this.toDoList.push(newTask);

    lsH.writeToLS(this.key, this.toDoList);
    this.toDoList = this.getAllTasks(this.key);
  }

  removeTask(taskId){
    let taskIndex = this.toDoList.map(e => e.id).indexOf(taskId);
    console.log("Index = " + taskIndex);

    this.toDoList.splice(taskIndex, 1); 
    lsH.writeToLS(this.key, this.toDoList);
    this.toDoList = this.getAllTasks(this.key);
    this.showAllTasksList();//change to showTodoTaskList
  };

  completedToggle(taskId) {
    let task = this.getTaskById(taskId);
    task.completed = !task.completed;
    lsH.writeToLS(this.key, toDoList);
    this.toDoList = this.getAllTasks(this.key);

    let elementId = document.getElementById(taskId);
    elementId.classList.add("taskCompletedRow");
    elementId.setAttribute("checked", "");
  }

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
      this.showAllTasksList();//change to showTodoTaskList
    });

    // Add event listener to listCompletedTasks button.
    let completedTasksButton = document.getElementById("listCompletedTasks");
    completedTasksButton.addEventListener('click', e => {
      this.showCompletedList();
    });

    // Add event listener to Enter Task button.
    let enterTasksButton = document.getElementById("enterTaskBtn");
    enterTasksButton.addEventListener('click', e => {
      this.addNewTask();  //change to Edit, Delete or Add
      this.showAllTasksList();
     });
  }
}

function convertTimestampToDate(taskId) {
  let dateNum = parseInt(taskId, 10)
  let date = new Date(dateNum);
  // let convertDate = new Date(task.id);
  const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", 
  "September", "October", "November", "December"];
  const month = monthsArray[date.getMonth()];
  const day =  date.getDate();
  const year =  date.getFullYear();
  // const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  const readableDate = month + ", " + day + ", " + year;
  return readableDate;
}

  // methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
  function renderTaskListHeader() {
    const heading = document.createElement("tr");
    heading.classList.add('taskRowHeading');
    heading.innerHTML = `<th>Completed</th><th>Task</th><th>Created</th><th>Delete</th>`
    return heading
  }
  
  function renderTaskList(parent, tasks, taskListObject) { 
        parent.appendChild(renderTaskListHeader());
        tasks.forEach(task => {
          let newTask = renderOneTask(task, taskListObject);
          parent.appendChild(newTask);

          // Setup checkbox.
          let checkboxElement = document.getElementById(task.id);
          checkboxElement.addEventListener('click', e => {
            taskListObject.completedToggle(e.target.id);
          });

          // Setup delete button.
          let deleteButtonElement = document.getElementById("deleteButton" + task.id);
          deleteButtonElement.addEventListener('click', e => {
            let id = e.target.id.replace("deleteButton", "");
            taskListObject.removeTask(id);
          });
        });      
  }

  function renderOneTask(task, taskListObject) {
    const dateId = convertTimestampToDate(task.id);
    const item = document.createElement("tr");
    const inputTd = document.createElement("td");

    //Create Checkbox
    const checkBoxField = document.createElement("input")    
    checkBoxField.setAttribute("type", "checkbox");
    checkBoxField.setAttribute("id", task.id);
    checkBoxField.setAttribute("class", task.id);
    checkBoxField.setAttribute("name", "completedCheckBox");

    //Checkbox is checked if task is completed
    if (task.completed === true) {
      item.setAttribute("id", "completedItem")
      item.setAttribute("class", "taskCompletedRow");
      checkBoxField.setAttribute("class", 'taskCompletedBox');
      checkBoxField.setAttribute("checked", "");
    }
    inputTd.appendChild(checkBoxField);

    //create Task for Html
    const td2 = document.createElement("td");
    td2.innerHTML = task.taskToDo;
    const td3 = document.createElement("td");
    td3.innerHTML = dateId;

    //Add Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X"
    deleteButton.setAttribute ("id", "deleteButton" + task.id);
    deleteButton.setAttribute("class", "deleteButton");
    item.appendChild(inputTd);
    
    item.appendChild(td2);
    item.appendChild(td3);
    item.appendChild(deleteButton);

    return item;
  }


  // Creating a timestamp
let timestamp = Date.now();


let timeString = timestamp.toString();

    
// Converting it back to human-readable date and time
let taskTimestamp = new Date(timestamp).toString();


