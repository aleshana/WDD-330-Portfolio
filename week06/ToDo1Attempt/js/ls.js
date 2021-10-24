
const toDoList = [
    {
        id:"Date4",  
        title: "Clean My Bedroom",
        description: "Make my bed, pick-up laundry, and vaccuum the floor.", 
        completed: false,
        priority: "normal",
    }, 
    {
        id:"Date3",  
        title: "Wash Laundry",
        description: "Gather laundry from all the rooms, sort it by colors, load in the washer.", 
        completed: false,
        priority: "normal",
    }, 
    {
        id:"Date1",  
        title: "Wash Dishes",
        description: "Clear dishes from table, clear and rinse them, load in dishwasher.", 
        completed: false,
        priority: "normal",
    }, 
    {
        id:"Date2",  
        title: "Finish Homework",
        description: "Review and edit GE report, build app, study for test.", 
        completed: true,
        priority: "normal",
    }, 

]

//start with two...may add more later
/**
 * read a value from local storage and parse it as JSON
 * @param  {string} key The key under which the value is stored under in LS
  * @return {array}     The value as an array of objects
 */
function readFromLS(key) { }
/**
 * write an array of objects to local storage under the provided key
 * @param  {string} key The key under which the value is stored under in LS
* @param {array} data The information to be stored as an array of objects. Must be serialized.
 
 */
function writeToLS(key, data) { }


function createTimeStamp() {
    localStorage.timeStamp = Date.now();
  }

export {toDoList};

// export default class Tasks {
//     constructor(elementId) {
//       this.parentDiv = document.getElementById(elementId);
//       console.log(this.parentDiv);
//     // this.backButton = this.buildBackButton();
//     }
// }

