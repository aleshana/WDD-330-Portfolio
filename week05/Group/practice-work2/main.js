import Hikes from './hikes.js';
const hike = new Hikes('hikes');
console.log(hike.getAllHikes());

window.addEventListener('load', () => {
  hike.showHikeList();
});
  

