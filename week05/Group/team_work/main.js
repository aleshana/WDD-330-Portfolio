import Hikes from './hikes.js';
const hike = new Hikes(document.getElementById('hikes'));
console.log(hike.getAllHikes());

window.addEventListener('load', () => {
  // 
  const hikeListElement = document.getElementById('hikes');
  hikeListElement.innerHTML = "";
  renderHikeList(hikeListElement, hike.getAllHikes());
});
  
// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
function renderHikeList(parent, hikes) {
  hikes.forEach(hike => {
    parent.appendChild(renderOneHikeLight(hike));
  });
}

function renderOneHikeLight(hike) {
  const item = document.createElement("li");
  item.innerHTML = ` <h2>${hike.name}</h2>
  <div class="image"><img src="https://byui-cit.github.io/cit261/examples/${hike.imgSrc}" alt="${hike.imgAlt}"></div>
  <div>
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
  </div>`;
  return item;
}
function renderOneHikeFull(hike) {
  const item = document.createElement("li");
  item.innerHTML = ` <h2>${hike.name}</h2>
  <div class="image"><img src="https://byui-cit.github.io/cit261/examples/${hike.imgSrc}" alt="${hike.imgAlt}"></div>
  <div>
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
          <div>
            <h3>Description</h3>
            <p>${hike.description}</p>
          </div>
          <div>
            <h3>Directions</h3>
            <p>${hike.directions}</p>
        </div>
  </div>`;
  return item;
}

