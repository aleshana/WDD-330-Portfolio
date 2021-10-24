export default class Tasks {
    constructor(elementId) {
      this.parentDiv = document.getElementById(elementId);
      console.log(this.parentDiv);
    
    }
    function addToDo() {
        var newTaskEntered = document.getElementById("enterNewTask").value;
        return newTaskEntered
    }
}}

const todoList = null;

/**
 * build a todo object, add it to the todoList, and save the new list to local storage.
 * @param  {string} key The key under which the value is stored under in LS
* @param {string} task The text of the task to be saved. 

 */



function saveTodo(task, key) { 
    localStorage.setItem(addTodo());
    //reload html page list
}

/**
 * check the contents of todoList, a local variable containing a list of ToDos. If it is null then pull the list of todos from localstorage, update the local variable, and return it
 * @param  {string} key The key under which the value is stored under in LS
  * @return {array}     The value as an array of objects
 */
function getTodos(key) { }


//Add a method to the Todos class called addTodo. It should grab the input in the html where users enter the text of the task, 
//then send that along with the key to a SaveTodo() function.  Then update the display with the current list of tasks

//A todo should look like this: { id : timestamp, content: string, completed: bool }
