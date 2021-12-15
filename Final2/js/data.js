import OldSearches from './ls.js';
//import Details from './details.js';
import * as searchData from './utilities.js';    // import searchData
import * as display from './view.js';       // import displays
import Pagination from './pagination.js'; 

const pagination = new Pagination("buttons");

const storedSearches = new OldSearches ('previousSearches');
//const details = new Details('detailItem');

let element = document.getElementById('searchResultsList');

//let searchResults = [];      //  initialize the searchListResults to be an empty array
// current search data and methods
export default class Results {
    constructor(divId) {
        element = document.getElementById(divId);                 //  save the reference to the div element
        this.searchButtonEvent = this.addSearchButtonEventListener();  //  save the reference to the search button
        //this.searchResults = {};                                       //  initialize the searchResults to be an empty object
        this.searchUrl = "";
       
    } 


    //get the search parameters from the user input
    getUserParameters() {
        const searchKeyword = document.getElementById('searchKeyword').value; //  get the search keyword
        const searchAnd = document.getElementById('searchAnd').value;       
        const searchOr = document.getElementById('searchOr').value;
        const searchNot = document.getElementById('searchNot').value;     
    
        const inputObject = {
        "Keyword":searchKeyword, 
        "AND": searchAnd, 
        "OR":searchOr, 
        "NOT":searchNot 
        }; 
        
        //console.log(inputObject);
        return inputObject;
    }


    //create url for the search *****search not working
    createSearchUrl() {
        const baseUrl = "https://api.europeana.eu/record/v2/search.json?wskey=riaboadi";
        let inputObject = this.getUserParameters();
        this.searchUrl = baseUrl;
        let parametersArray = [];
        let newParameter = ""; // don't need this--delete.
        for (const [key, value] of Object.entries(inputObject)) {
            //console.log("*****" + key + ": " + value);
            if ((key !== "" && value !== "")) {
                switch (key) {
                    case "Keyword": 
                        let queryKeyword = value.split(" ");
                        this.searchUrl = this.searchUrl + "&query=" + queryKeyword.join("+");
                        newParameter = "Keyword: " + value;
                        parametersArray.push(newParameter);
                        break;
        
                    case "AND":
                        let queryTitle = value.split(" ");
                        this.searchUrl = this.searchUrl + "&query=" + queryTitle.join("+");
                        newParameter = "AND: " + value;
                        parametersArray.push(newParameter);
                        break;
                            
                    case "OR":
                        let queryName = value.split(" ");
                        this.searchUrl = this.searchUrl + '&query=' + queryName.join("+");
                        newParameter = "OR: " + value;
                        parametersArray.push(newParameter);
                        break;
                            
                    case "NOT":
                        let queryYear = value.split(" ");
                        this.searchUrl = this.searchUrl + '&query=' + queryYear.join("+");
                        newParameter = "NOT: " + value;
                        parametersArray.push(newParameter);
                        break;
                            
                            
                    default:
                        console.log("Error: No parameter found");
                        this.searchParametersError();
                        break;   
                }
            }
        }

        this.pushToStorage(parametersArray);
        if (baseUrl == this.searchUrl) {
            this.searchParametersError();
        } 
        //this.addPageNumbertoUrl(1, this.searchUrl); 
        //console.log(parametersArray);          
        console.log(this.searchUrl);
        return this.searchUrl; 
    };

    addPageNumbertoUrl(urlRecordNumber) {
        let newUrl = this.searchUrl + "&q=:&rows12&start=" + urlRecordNumber;
        console.log("***" + newUrl);
       // this.showSearchResults();
        return newUrl;
    }

    pushToStorage(searchParameters) {
        let date = new Date();
        let dateKey = date.toString();
        storedSearches.writeToStorage(dateKey, searchParameters);
        console.log(dateKey);
        console.log(searchParameters);
    }

    //display error message if no search parameters are entered ******need to fix
    searchParametersError() {
        let errorMessage = document.getElementById('listResults');
    //    errorMessage.innerHTML = "<p>Please enter a search parameter</p>";
        console.log("Error: No search parameters entered");
        return;
    }

  
    //get the search results from the API
    getSearchResults(url) {
        let searchResults = searchData.getJSON(url);
        return searchResults; 
    }

    //when results are empty, display an error message
    searchResultsEmptyMessage() {
        element.innerHTML = "";
        const message = document.createElement('h2');
        message.classList = "noResultsMessage";
        message.textContent = "No results were found, please try again.";
        element.appendChild(message);
    }

    //add event listener to the search button
    addSearchButtonEventListener() {
        this.searchButton = document.getElementById('searchButton');
        this.searchButton.addEventListener('click', () => {
      //  this.formatSearchResults();
            this.showSearchResults();
        });   
    }

    //show the search results
    showSearchResults() {
        //this.getUserParameters();
        let searchUrl = this.createSearchUrl(); //  create the search url function
        let searchUrlpages = this.addPageNumbertoUrl(pagination.urlRecordNumber, searchUrl);
        let searchResults = this.getSearchResults(searchUrlpages);
        searchResults.then(r => {
            console.log("total results: " + r.totalResults);
            if (r.totalResults == 0) {
                this.searchResultsEmptyMessage();
            }
            else {
                let userInput = this.getUserParameters();
                //let displayInput = this.formatSearchResults(userInput);
                display.renderSearchResultsList(r, userInput);   //  display the search results
            }
            console.log("showPreviousSearches");
            this.showPreviousSearches();

            const nextButton = document.querySelector("#next");
            if (nextButton.onclick == null) {
                document.getElementById('previousSearchItems').innerHTML ="";
            
                pagination.initNextPreviousButtons(this, r.totalResults);
                pagination.buildNextButton();
            }

            const previousButton = document.querySelector("#previous");
            if ((previousButton.onclick == null) && (pagination.pageNumber > 1)){
                pagination.buildPreviousButton();
            }
            else if (pagination.pageNumber <= 1) {
                previousButton.disable = true;
            }
        });
    }

   
    //add a Local Storage List on load.---working
    showPreviousSearches() {
        let previousSearches = storedSearches.readAllStorage();
        if (previousSearches !== 0) {
            display.renderPreviousSearches(previousSearches);
        }
    }

} // end of class Results
        
    
        
//  add a new search to the list of previous searches

 
 
 
 //peopleList => {
      //Building the list of 10 Star Wars people
    //   const div = document.querySelector("div.people");
    //   div.innerHTML = " ";
    //   peopleList.results.forEach(person => {
    //     let personCard = renderOnePerson(person);
    //     div.append(personCard);
    //   });
      
