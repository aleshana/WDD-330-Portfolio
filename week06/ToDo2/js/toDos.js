import * as lsH from './ls.js';

export default class Tasks {
  constructor(elementId, footerID) {
    this.parentElement = document.getElementById(elementId);
    this.footerElement = document.getElementById(footerID);
  }

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

    getTaskByTitle(taskTitle) {
    return this.getAllTasks().find(task => task.title === taskTitle);
  }

  getTaskById(taskId) {
    console.log(taskId);
    console.log(toDoList[0].id);
    return this.getAllTasks().find(task => task.id === taskId);
  }

  showAllTasksList() {
    console.log("showAllTasksList-test");
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getAllTasks(), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
    
  }

    showTodoList() {
    console.log("showTodoTasksList-test");
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getTodoTasks(), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
    
  }

   showCompletedList() {
    console.log("showCompletedTasksList-test");
    this.parentElement.innerHTML = '';
    renderTaskList(this.parentElement, this.getCompletedTasks(), this);
    this.addTaskListener();
    this.renderListFooter(this.footerElement);
 }

   showOneTask(taskTitle) {
    const task1 = this.getTaskByTitle(taskTitle);
    this.parentElement.innerHTML = "";
    this.parentElement.appendChild(renderOneTaskFull(task1));
    this.backButton.classList.remove('hidden');
  }

addTaskListener() {
    const childrenArray = Array.from(this.parentElement.children);
      childrenArray.forEach(child => {
        child.addEventListener('touchend', e => {
        this.showOneTask(e.currentTarget.dataset.title);  //change to Edit, Delete or Add
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
      title: newTaskField.value,
      description: "Make my bed, pick-up laundry, and vaccuum the floor.", 
      completed: false,
      priority: "normal",
    };

    toDoList.push(newTask); ///create new Task
    localStorage.setItem(newTask);
  }

  removeTask(taskId){
    let task = this.getTaskById(taskId);
     storage.removeItem(task);
    };

    removeItem(taskId) {
      let task = toDoList.findIndex(task => task.id == taskId);     //  find the matching id
      toDoList.splice(task, 1);                        //  remove from the big list of todos
      lsH.writeToLS(this.key, toDoList);                          //  save main list of todos to LS
      this.showToDoList();                                        //  show updated list on the page
  }
  

  completedToggle(taskId) {
   
    // let taskId = parseInt(taskIdString, 10);
    let task = this.getTaskById(taskId);
    console.log(task);
    toDoList.forEach(function(part, index) {
      if (toDoList[index].id === taskId) {
        console.log(index);
        toDoList[index].completed = !toDoList[index].completed;
        console.log(toDoList[index]);
        console.log(taskId);
        let elementId = document.getElementById(taskId);
        let elementId2 = document.getElementById("completedItem")
        elementId.classList.toggle("taskCompletedRow");
        elementId.setAttribute("checked", "");
        elementId2.classList.toggle("taskCompletedRow");
        console.log(elementId);
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

function convertTimestampToDate(taskId) {
  let dateNum = parseInt(taskId, 10)
  let date = new Date(dateNum);
  // let convertDate = new Date(task.id);
  console.log(date);
  const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", 
  "September", "October", "November", "December"];
  const month = monthsArray[date.getMonth()];
  console.log(month);
  const day =  date.getDate();
  console.log(day);
  const year =  date.getFullYear();
  console.log(year);
  // const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  const readableDate = month + ", " + day + ", " + year;
  console.log(readableDate);
  return readableDate;
}

  // methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
  function renderTaskListHeader() {
    const heading = document.createElement("tr");
    heading.classList.add('taskRowHeading');
    heading.innerHTML = `<th>Completed</th><th>Task</th><th>Created</th><th>Delete</th>`
    console.log('test header function');
    return heading
  }
  
  function renderTaskList(parent, tasks, myThis) { 
      console.log("test for each task list");
        parent.appendChild(renderTaskListHeader());
        tasks.forEach(task => {
          let newTask = renderOneTask(task);
          console.log(task.id);
          parent.appendChild(newTask);
          let checkboxElement = document.getElementById(task.id);
          console.log(checkboxElement);
          checkboxElement.addEventListener('click', e => {
            myThis.completedToggle(e.target.id);
          });
          let deleteButtonElement = document.getElementById(task.id+"Delete");///Id for each Button
          console.log(deleteButtonElement);
          deleteButtonElement.addEventListener('click', e => {
          myThis.removeTask(e.target.id);
          });
        });      
  }

  function renderOneTask(task) {
    const dateId = convertTimestampToDate(task.id);
    const item = document.createElement("tr");
    console.log(task.id);
    const inputTd = document.createElement("td");
    const inputField = document.createElement("input")    
    inputField.setAttribute("type", "checkbox");
    inputField.setAttribute("id", task.id);
    inputField.setAttribute("name", "completedCheckBox");
    if (task.completed === true) {
      item.setAttribute("id", "completedItem")
      item.setAttribute("class", "taskCompletedRow");
      inputField.setAttribute("class", 'taskCompletedBox');
      inputField.setAttribute("checked", "");
    }
    inputTd.appendChild(inputField);
    const td2 = document.createElement("td");
    td2.innerHTML = task.title;
    const td3 = document.createElement("td");
    td3.innerHTML = dateId;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X"
    deleteButton.setAttribute ("id", task.id+"Delete");
    deleteButton.setAttribute("class", "deleteButton");
    console.log(deleteButton);  
    console.log(inputField);
    item.appendChild(inputTd);
    console.log(inputTd);
    // item.appendChild(inputField);
    item.appendChild(td2);
    item.appendChild(td3);
    item.appendChild(deleteButton);
    console.log(item);
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

