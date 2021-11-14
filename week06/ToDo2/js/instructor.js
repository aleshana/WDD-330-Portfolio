// import * as lsH from './ls.js';
//  import * as uH from './utilities.js';       //  not using but they are a good reference for exports

let todoList = [];      //  initialize the todoList to be an empty array

/**
 *  The Todos object will have all of the data and methods to manage a Todo object
 *      not that that is much. Mostly we just need the reference to the UL element for our todo LIs
 */
// export default class Todos {
//     constructor(id) {
//         this.element = document.getElementById(id);                 //  save the reference to the UL
//         this.key = id;                                              //  LS key this also matches the UL id
//         this.error = document.getElementById("error");     //  reference to an error div
//         todoList = getToDo(this.key);                               //  get list of todos from LS and empty array if LS is not there
//     }

    /**
     *      showToDoList
     *          Get the list of todos from LS
     *          put them in the UL
     *          add the event listeners
     *
     */
    showToDoList(){
        renderToDoList(this.element, todoList); //  pass a list of todos to the render function
        this.addEventListeners();               //  when we wipe out the old LIs and create new ones the event listeners must be added
    }

    /**
     *      addToDo
     *          get text from input field and use to create a new todo item
     */
    addToDo(){
        this.error.innerHTML = "";                                      //  clear the error message
        const task = document.getElementById('new-task');      //  get reference to task input field
        if ( task.value === "") {                                       //  if the field is empty
            this.error.innerHTML = "No text entered for task";          //  put a message on the screen
            return;                                                     //  leave
        }
        saveTodo(task, this.key);                                       //  save this new task to LS
        this.showToDoList();                                            //  render all LIs to the user
    }

    /**
     *      addEventListeners
     *          for each task there are two events we need to track
     *          child 0 of the LI is the check box to indicate completed or not
     *          child 2 of the LI is the delete button
     */
    addEventListeners() {
        const ls = Array.from(this.element.children);       //  get an array of the LIs in the UL (the children)
        ls.forEach(item => {                                //  even if the list is empty the forEach will be fine
            item.children[0].addEventListener('click', event =>  this.completeToDo(item.id) );
            item.children[2].addEventListener('click', event =>  this.removeItem(item.id)   );
        })
    }

    /**
     *      completeToDo
     *          toggle the completed status of the selected task item
     * @param itId          element selected by the user
     */
    completeToDo(itId) {
        let task = todoList.findIndex(task => task.id == itId);     //  find the desired task using the unique timestamp for this LI
        todoList[task].completed = !todoList[task].completed;       //  toggle the completed status
        lsH.writeToLS(this.key, todoList);                          //  update LS
        markDone(itId);                                             //  change the class for this element to reflect the new status
    }

    /**
     *      removeItem
     *          an LI has been clicked. remove from screen, LS and todoList
     *          notice the similarities to the completeToDo function
     * @param itID
     */
    removeItem(itID) {
        let task = todoList.findIndex(task => task.id == itID);     //  find the matching id
        todoList.splice(task, 1);                        //  remove from the big list of todos
        lsH.writeToLS(this.key, todoList);                          //  save main list of todos to LS
        this.showToDoList();                                        //  show updated list on the page
    }

    /**
     *      filterToDos
     *          depending on the button pressed filter the list of todos
     * @param category      the id of the button pressed 'all', 'completed', 'active'
     */
    filterToDos(category){
        category = filterBy(category);          //  category param is the id of the button pushed convert to T/F or NULL
        const f = todoList.filter(task =>  (category != null) ? task.completed === category : task );
        renderToDoList(this.element, f);        //  now we have a list todos of the desired type
        this.addEventListeners();               //  since we wiped out all of the old HTML we need at attach event listeners for the new LIs
    }

    /**
     *      addTabListeners
     *          scan the page elements for any elements with class containing 'tab'
     *          these are our all, active and completed buttons.
     *          they need to respond by rendering a list of todos that match the category type
     */
    addTabListeners() {
        const actionButtons = Array.from(document.querySelectorAll('.tab'));
        actionButtons.forEach(tab => {
            tab.addEventListener('click', event => {
                for (let btn of actionButtons) {
                    btn.classList.remove('selected-tab');
                }
                event.currentTarget.classList.add('selected-tab');
                this.filterToDos(event.currentTarget.id);
            });
        });
    }
}               //  end of the Todos object


//      everything below here is NOT a part of the ToDos object
//      they are the helper functions.
//      they do not need to know about the attributes of the object


/**
 *      filterBy
 *          We need to convert the id of the button pressed to match the category of the todo
 *              an active todo item has a completed status of false, completed has a status of true
 *              if we are looking for all todo tasks we will return null
 * @param category
 * @returns {null|boolean}
 */
function filterBy(category){
    switch(category){
        case 'active':      return  false;      //  the less code I write the less I have to debug
        case 'complete':    return  true;       //  so sue me if I have multiple return points in my method
        case 'all':         return  null;       //  null indicates show all todos
        default :           return  null;       //  which by the way is not a good practice.
    }                                           //  but in code this small it is worth the gamble
}

/**
 *      getToDo
 *          read local storage and retrieve the previously saved todos
 *          if the LS key returns nothing then init the toDoList to []
 *          otherwise the LS contained a array of JSON todos. assign that to the todoList
 * @param key
 * @returns {*[]}
 */
function getToDo(key) {
    let ls = lsH.readFromLS(key);       //  ask LS for the value associated with the key
    return ls === null ? [] : ls;       //  if nothing is returned init list to an empty array else assign it the list from LS
}

/**
 *      saveTodo
 *          create a new todo item and save to LS
 * @param task      the reference to our input field
 * @param key       key to our LS item where the todo list will be saved
 */
function saveTodo(task, key) {
    let timestamp = Date.now();     //  this unique value will serve as the id for our todo item
                    //  we need a unique identifier the timestamp is a fine thing to use
    const newTodo = {id: timestamp, content: task.value, completed: false};     //  default to NOT completed
    todoList.push(newTodo);         //  save new task item to our big list of todos
    lsH.writeToLS(key,todoList);    //  save our list of all todo items
    task.value = '';                //  clear the text of the input field
    task.focus();                   //  for a nice touch keep the focus in the input field
}

/**
 *      renderToDoList
 *          Give this function a list of todos and the UL to which they should be added
 * @param unorderedList
 * @param ls
 */
function renderToDoList(ul, ls) {
    ul.innerHTML = '';       //  let's clear out all old to-dos
                             //  one at a time grab a todo object an put it in our list
    ls.forEach(taskObject => ul.innerHTML += renderOneToDo(taskObject) );
    updateCount(ls);         //  show the count of the current list
}

/**
 *      renderOneToDo
 *          Some examples you will will show a combination of DOM methods (createElement) and plain old HTML
 *          I find that confusing.
 *          DOM is confusing by itself (I think)
 *          So I prefer just recreating HTML and stuffing that into the innerHTML of the target element
 * @param task          the task we are creating the HTML for
 * @returns {string}    the HTML for one todo item
 */
function renderOneToDo(task) {
    //      NOTE: I am using the back tick ` character which allows be to INTERPOLATE javascript with the text
    //          if you see ${} you can put any JS in there you like and let that insert your values for you
    //          MUCH better that "string" + variable + "plus another string"
    //      I do have some trickiness going on here. If the task is Complete then I want
    //          the class to be 'completed' and the checkbox to be marked with a check.
    //          So I do a 2fer1. I have the ternary operator (a.k.a. elvis operator)  ?:
    //          if the task is completed the class attribute will be 'completed' and the checkbox will be checked
    //          otherwise I just need an empty string
    return `<li id="${task.id}" ${task.completed ? 'class="completed"' : ''}>
        <input name="${task.content}" type="checkbox" value="none" ${task.completed ? 'checked' : ''}>
        <p>${task.content}</p>
        <div class="delete">X</div>
    </li>`;
}

/**
 *  updateCount
 *      for whatever list we are rendering show the count of items
 * @param ls
 */
function updateCount(ls){
    document.getElementById('num-task').innerHTML =  `${(ls != null) ? ls.length : 0}  tasks left`;
}

/**
 *  markDone
 *      using the element that was clicked get the parent.
 *      then toggle the completed class so the CSS can render the element correctly
 * @param itId      this is the clicked on text
 */
function markDone(itId){
    document.getElementById(itId).classList.toggle('completed');
}