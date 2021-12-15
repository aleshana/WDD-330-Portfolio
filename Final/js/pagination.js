export default class Pagination {
    constructor(buttons) {
        this.parentElement = document.getElementById(buttons);   //  save the reference to the div element
        this.childElementNext = document.getElementById('next'); 
        this.childElementPrevious = document.getElementById('previous'); 
        
        this.pageNumber = 1;
        this.recordsPerPage = 12;
        this.lastPageNumber = 0;
        this.urlRecordNumber = 1;
    } 
  
  calculatePageNumber(pageNumber) {
    this.recordsPerPage = 12;
    this.urlRecordNumber = (this.pageNumber * this.recordsPerPage) - this.recordsPerPage + 1;

    return this.urlRecordNumber;
  }
  
  
  initNextPreviousButtons(resultsObject, totalResults) {
    this.resultsObject = resultsObject;
    this.pageNumber = 1;
    this.recordsPerPage = 12;
    this.lastPageNumber = Math.ceil(totalResults / this.recordsPerPage);
  }
      
    buildPreviousButton() {
      //If this is the first page and there are no previous pages, 
      //disable the previous button; otherwise add an event listener to it.
      const previousButton = document.querySelector("#previous"); 
      if (this.pageNumber == 1) {
        previousButton.disabled = true;
      } else {
        previousButton.disabled = false;
        previousButton.onclick = () => this.getPrevious();
      }
    }
     
    buildNextButton() {
      //If this is the last page and there are no next pages, disable the next button; 
      //otherwise add an event listener to it.
      const nextButton = document.querySelector("#next");
      if (this.pageNumber == this.lastPageNumber) {
        nextButton.disabled = true;
      } else {
        nextButton.disabled = false;
        nextButton.onclick = () => this.getNext();
      }
    }
  
    //Function for getting the previous page's results
    getPrevious() {
        console.log("getPrevious Called");
        if ((this.pageNumber - 1) > 0) {
            this.pageNumber--;
            this.urlRecordNumber = this.calculatePageNumber(this.pageNumber);
            this.resultsObject.addPageNumbertoUrl(this.urlRecordNumber);
            this.resultsObject.showSearchResults();
            this.topFunction();
        }
    }
      
    //Function for getting the next page's results
    getNext() {
        if (this.pageNumber < this.lastPageNumber) {
            this.pageNumber++;
            this.urlRecordNumber = this.calculatePageNumber(this.pageNumber);
            this.resultsObject.addPageNumbertoUrl(this.urlRecordNumber);
            this.resultsObject.showSearchResults();
            this.topFunction();
        }
    }
  
    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 1000;
      }

  } // end of class