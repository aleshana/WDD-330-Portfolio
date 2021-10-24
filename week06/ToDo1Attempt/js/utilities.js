import {toDoList} from './ls.js';
console.table(toDoList);



//DOM Maniputlation helper functions
//Two here for starters should be good as well...may add more later
/**
 * do a querySelector lookup
 * @param  {string} selector The selector passed to querySelector
  * @return {element}     The matching element or null if not found
 */
function qs(selector) { }
/**
 * add a touchend event listener to an element for mobile with a click event fallback for desktops
 * @param  {string} elementSelector The selector for the element to attach the listener to
* @param {function} callback The callback function to run
  
 */
function onTouch(elementSelector, callback) { }







//Methods for ToDo list

    getAllTasks() {
        return toDoList;
      }

    getTaskByTitle(taskTitle) {
        return this.getAllTask().find(task => task.title === taskTitle);
      }  

    getToDoTaskList (parent, tasks) {
        tasks.forEach(task => {
            if (task.completed === false){
               parent.appendChild(task);
            }
        });        
    }

    getCompletedTaskList (parent, tasks) {
        tasks.forEach(task => {
            if (task.completed === true){
                parent.appendChild(task);

            }
        }); 
    }
    

    // showOneTask(hikeTitle){
    //     const task1 = this.getTaskByTitle(taskTitle);
    //     this.parentDiv.innerHTML = "";
       

    // }



    // deleteTask(){

    // }


    // addTask(){
    // let newTaskTitle = document.getElementById("enterTaskTitle");
    // let newTaskDescription = document.getElementById("enterTaskDescription");
    // let newTaskDueDate = document.getElementById("enterTaskDueDate");
    // let newTaskPriority = document.getElementById("radioOption");
    // let newTaskCompleted = false;
    // console.log(newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority, newTaskCompleted);
    

    // toDoList.push("id: timeStamp", "Title: newTaskTitle", "Description: newTaskDescription",
    //     "completed: newTaskCompleted");
    // }

    // editTask(){}



    showToDoList (){
        this.parentDiv.innerHTML = "";
        renderToDoHeader(this.parentDiv);
        renderToDoTasks(this.parentDiv,this.getAllTasks());
        console.log("testing4");
    }

    showCompletedList (){
        this.parentDiv.innerHTML = "";
        renderCompletedTasks(this.parentDiv,this.getAllTasks());
        console.log("testing3");
    }
    
        // renderToDoTasks(parentDiv,tasks)

    // function filterTasks(compBoolean) {
    //     toDoList.forEach(task => {
    //     if (task.completed == false){
    //         return task;
    //     } 
    //     else {
    //         return true;
    //     }


    //Made Method
    // function renderToDoTasks(parentDiv, tasks) {
    //     tasks.forEach(task => {
    //         if (task.completed === false){
    //             parentDiv.appendChild(task);
    //         }
    //     }); 
    // }
}
    function renderToDoHeader() {
        console.log ("testing");
        const headerToDo = document.createElement("h2");
        headerToDo.setAttribute ('class', 'toDoListHeader');
        headerToDo.innerHTML = "Tasks To Do"
        const toDoTask = document.createElement("tr");
        toDoTask.innerHTML = `<th>Completed</th><th>Task Title</th><th>Priority</th>`
        return headerToDo + toDoTask
    }
    function renderToDoTasks(parent, tasks) {
        tasks.forEach (eachTask=> {
            parent.appendChild(renderOneTask(eachTask));
            //need checkbox coding
        });
        
    }


    function renderCompletedTasks(parent,tasks) {
        document.getElementById('content1').innerHTML = ``
        console.log("testing2");
        const headerCompleted = document.createElement("h3");
        headerCompleted.setAttribute ('class', 'completedListHeader');
        headerCompleted.innerHTML = "Completed Tasks"
        document.createElement('table');
        let completedTask = document.createElement("tr");
        completedTask.innerHTML = `<th>Completed</th><th>Task Title</th><th>Priority</th>`
        tasks.forEach (eachTask=> {
            parent.appendChild(renderOneTask(eachTask));
            //need checkbox coding
        });
    }

    function renderOneTask(task) {
        const oneTask = document.createElement("tr"); 
        oneTask.innerHTML = `<td>${task.completed}</td> <td>${task.title}</td><td>${task.priority}</td>`
        return oneTask;
    }
    

    // function renderHomeContent(parent, tasks) {
    //     tasks.forEach(task => {
    //       parent.appendChild(renderToDoTasks(task));
    //     });
    //   }
      
    
    // function renderHomePage(task) {
    //     const item = document.createElement("li");
    //     item.innerHTML = `<form>
    //     <div id = "taskTitle" class = "requiredInputHome">
    //         <input id = "enterTaskTitleHome" type = "text" name ="enterTaskTitle" placeholder = "Task Title" required>
    //     </div>

    //     <div class = "buttonDiv">
    //         <input type="button" class="button" value="&#x271A; Enter Task" id = "enterTaskBtn">
    //     </div>
    // </form>

    // <h3>ToDo Tasks</h3>

    // <ul id = "completedTasksHome">
    //     <tr>
    //         <th class = "headerRow">""</th>
    //         <th class = "headerRow">Tasks</th>
    //         <th class = "headerRow">Due Date</th>
    //     </tr>
    //     <div id = "todoListHome"></div>

    // </ul>
   
    // <h3>Completed Task</h3>
    // <ul id = "completedTasksHome">
    //     <tr>
    //         <th class = "headerRow">Tasks</th>
    //         <th class = "headerRow">Date Completed</th>
    //     </tr>
    //     <div id = "tableDateHome"></div>

    // </ul>`;
    //     return item;
    //   }