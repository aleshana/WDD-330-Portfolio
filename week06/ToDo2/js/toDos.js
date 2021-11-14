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
    console.log(rArray);
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
    console.log(taskId);  
    console.log(toDoList);
    let taskI = toDoList.findIndex(task => task.id === taskId);
    console.log(toDoList[taskI]);
    return toDoList[taskI];

    // return toDoList.find(({id}) => id === taskId);
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
    console.log(taskId);
    const task1 = this.getTaskById(taskId);
    // console.log(this.getAllTasks(task1.id));
    console.log(task1);
    this.parentElement.innerHTML = "";
    this.parentElement.appendChild(renderOneTask(task1, this));
    // this.backButton.classList.remove('hidden');
  }

  addTaskListener() {
    const childrenArray = Array.from(this.parentElement.children);
      childrenArray.forEach(child => {
        child.addEventListener('touchend', e => {
          let inputField = e.currentTarget.querySelector('input');
          console.log(e.currentTarget);
          console.log(inputField.id);
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

    toDoList.push(newTask); ///create new Task
    lsH.writeToLS(this.key, toDoList);
  }

  removeTask(taskId){
    let task = this.getTaskById(taskId);
    toDoList.splice(task, 1); 
    lsH.writeToLS(this.key, toDoList);
    this.showAllTasksList();//change to showTodoTaskList
  };

  
  completedToggle(taskId) {
   
    // let taskId = parseInt(taskIdString, 10);
    let task = this.getTaskById(taskId);
    task.completed = !task.completed;
    console.log(task);
    console.log(toDoList);
    lsH.writeToLS(this.key, toDoList);

    let elementId = document.getElementById(taskId);
//    let elementId2 = document.getElementById("completedItem")
    elementId.classList.add("taskCompletedRow");
    elementId.setAttribute("checked", "");
//    elementId2.classList.toggle("taskCompletedRow");

    // toDoList.forEach(function(part, index) {
    //   if (toDoList[index].id === taskId) {
    //     console.log(index);
    //     toDoList[index].completed = !toDoList[index].completed;
    //     console.log(toDoList[index]);
    //     console.log(taskId);
    //     let elementId = document.getElementById(taskId);
    //     let elementId2 = document.getElementById("completedItem")
    //     elementId.classList.toggle("taskCompletedRow");
    //     elementId.setAttribute("checked", "");
    //     elementId2.classList.toggle("taskCompletedRow");
    //     console.log(elementId);
    //   }
    // });
  }
  

/*
  removeTask(tasks){
    for( var i = 0; i < tasks.length; i++){ 
      if ( tasks.taskToDo === removeTask) { 
  
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
  
  function renderTaskList(parent, tasks, taskListObject) { 
      console.log(tasks);
        parent.appendChild(renderTaskListHeader());
        tasks.forEach(task => {
          let newTask = renderOneTask(task, taskListObject);
          console.log(task.id);
          parent.appendChild(newTask);
          let checkboxElement = document.getElementById(task.id);
          console.log(checkboxElement);
          checkboxElement.addEventListener('click', e => {
            taskListObject.completedToggle(e.target.id);
          });
          let deleteButtonElement = document.getElementById(task.id);///Id for each Button
          console.log(deleteButtonElement);
          deleteButtonElement.addEventListener('click', e => {
            taskListObject.removeTask(e.target.id);
          console.log(e.target.id);
          });
        });      
  }

  function renderOneTask(task, taskListObject) {
    console.log(taskListObject);
    console.log(task);
    const dateId = convertTimestampToDate(task.id);
    console.log(task.id);
    const item = document.createElement("tr");
    const inputTd = document.createElement("td");
    //Create Checkbox
    const checkBoxField = document.createElement("input")    
    checkBoxField.setAttribute("type", "checkbox");
    checkBoxField.setAttribute("id", task.id);
    checkBoxField.setAttribute("class", task.id);
    checkBoxField.setAttribute("name", "completedCheckBox");
    //Checkbox is checked if task is completed
    // if (task.completed === true) {
    //   item.setAttribute("id", "completedItem")
    //   item.setAttribute("class", "taskCompletedRow");
    //   checkBoxField.setAttribute("class", 'taskCompletedBox');
    //   checkBoxField.setAttribute("checked", "");
    // }
    inputTd.appendChild(checkBoxField);
    //create Task for Html
    const td2 = document.createElement("td");
    td2.innerHTML = task.taskToDo;
    const td3 = document.createElement("td");
    td3.innerHTML = dateId;
    //Add Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X"
    deleteButton.setAttribute ("id", task.id);
    deleteButton.setAttribute("class", "deleteButton");
    console.log(deleteButton);  
    console.log(checkBoxField);
    item.appendChild(inputTd);
    console.log(inputTd);
    // item.appendChild(inputField);
    item.appendChild(td2);
    item.appendChild(td3);
    item.appendChild(deleteButton);
    console.log(item);

    // Add event listener to Complete button.
    checkBoxField.addEventListener('touchstart', e => {  
      console.log(e.target.id); 
      taskListObject.completedToggle(e.target.id);
      });

    
    // Add event listener to Delete button.
    deleteButton.addEventListener('touchstart', e => { 
      console.log(e.target.id); 
      taskListObject.removeTask(e.target.id);
    });


    return item;
  }


  // Creating a timestamp
let timestamp = Date.now();


let timeString = timestamp.toString();

    
// Converting it back to human-readable date and time
let taskTimestamp = new Date(timestamp).toString();


