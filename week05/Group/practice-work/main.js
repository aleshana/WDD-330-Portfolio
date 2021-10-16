import Hikes from './hikes.js';
const hikesObject = new Hikes('hikes');
console.log(hikesObject.getAllHikes());
window.addEventListener("load", ()=> {
  hikesObject.showHikeList();
});




// console.log(hikesList.getAllHikes());
// const listArray = Array.from(hike.getAllHikes());
// console.log(listArray);
// console.log(showHikeList());

// console.log(hike.getHikeByName('Denanda Falls'));  
// methods responsible for building HTML.  Why aren't these in the class?  
//They don't really need to be, and by moving them outside of the exported class, 
//they cannot be called outside the module...they become private.


// parentElement.innerHTML = renderOneHikeLight(hike.getHikeByName("Bechler Falls"));
// console.log(hike.parentElement);