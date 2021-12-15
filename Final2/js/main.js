import Results from './data.js';

//create a new instance of the Results class
const artData = new Results ('searchResultsList');

//create an event listener onload for the previous searches from Local Storage.
window.addEventListener('load', artData.showPreviousSearches());
