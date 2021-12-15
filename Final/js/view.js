//import Details from './details.js';
//const details = new Details('detailItem');

//import { url } from "inspector";


export function renderSearchResultsList(r, userInput, displayInput) {
    console.log(userInput);
    console.log(r);
    const searchResultsDisplay = document.getElementById('searchResultsList');
    //results.then(r => { 
      searchResultsDisplay.innerHTML = `<h2>There were <i>${r.totalResults} records found.</i></h2>
<p>Some information is unavailable due to incomplete records.</p><hr class = "detailLine">`;
      r.items.forEach(function(result) {
        //let recordId = result.id;
        const searchResultItem = document.createElement('li');
        searchResultItem.classList.add('list-display');
        searchResultItem.innerHTML = `
        <img class = "thumbnailImg" src = "${result.edmPreview[0]}"><br>
        <span class ="hoverMessage">Hover over image to expand</span><br>
        Title: ${result.title}<br>
        Artist: ${result.dcCreator}<br>
        Record Provider: ${result.provider}<br>
        Country: ${result.country}<br>
        <hr class = "detailLine">`;
        //details.addDetailListener(recordId);
        searchResultsDisplay.appendChild(searchResultItem);
        //<a href = "details.html" target = "blank" id = "detailsHyperlink" class = "detailHyperlink">Details</a>
      });  
    //});
}

// searchResultItem.addEventListener('click', e => {
//     clickedItem = e.currentTarget;
//     this.showDetailWindow(e.currentTarget.dataset.name);
//   });


// export function renderListItemDetail(result) {
//   const detailItem = document.getElementById('.detailItem');
//   detailItem.innerHTML = `
//     <a href="${result.items.edmPreview}"></a><br>
//     Full Image: ${result.items.edmIsShownBy}<br>
//     Title: ${result.dcTitleLangAware.en}<br>
//     Subjecct: ${result.dcSubjectLangAware.en}<br>
//     Artist: ${result.dcCreatorLangAware.en}<br>
//     Description: ${result.dcDescriptionLangAware.en}<br>
//     Current Location: ${result.edmCurrentLocation.en}<br>
//     Creation Date: ${result.year.en}<br>
//     Art Medium: ${result.edmConceptPrefLabelLangAware.en}<br>
//     Country: ${result.edmCountry.en}<br>
//     <button type="button" onclick="javascript:window.close()">Close Details</button>
//     `;
// }

export function renderPreviousSearches(storageSearches) {
  const previousSearchElement = document.getElementById('previousSearchItems');
  const previousSearchHeaderElement = document.getElementById('previousSearchHeader');
  previousSearchHeaderElement.innerHTML = `<h3 class ="previousSearchesHeader">Previous Searches</h3>`;
  storageSearches.forEach(storageItem => {
    let listItem = document.createElement('li');
    listItem.classList.add('previousSearchItem');
    listItem.innerHTML = storageItem;
    previousSearchElement.appendChild(listItem);
    //return previousSearchElement;
  });
}




 //test for undefined
        //test preview for undefined
        // if (result.edmPreview[0] != undefined) {
        //     let preview = result.edmPreview[0];
        //     return preview;
        // }
        // else {
        //     let preview = "A Preview Image is unavailable";
        //     return preview;
        // };
    //test title for undefined
    // if (result.dcTitleLangAware.en != undefined) {
    //     let title = result.dcTitleLangAware.en;
    //     return title;
    // }
    // else if (result.title[0] != undefined) {
    //         let title = result.title[0];
    //         return title;
    //     }
    // else {
    //     let title = "unavailable";
    //     return title;
    // };
