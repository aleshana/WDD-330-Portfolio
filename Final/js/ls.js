export default class OldSearches {
    constructor(previousSearchDiv) {
        this.element = document.getElementById(previousSearchDiv);                 //  save the reference to the div element
       // this.previousSearchEvent = this.addSearchButtonEventListener();  //  save the reference to the search button
    } 

    //  add the search to the local storage
    writeToStorage(key,newSearch) {
        console.log("writeToStorage Called");
        console.log(key + " " + newSearch);
        let text = JSON.stringify(newSearch);     //  convert JSON to text
        localStorage.setItem(key,text);      //  write to LS 
        //console.log(localStorage.key(5));
        this.trimLocalStorageSearches(); //  keep only the last 5 searches
    }

    //read all searches from LS
    readAllStorage() {
        let keys = Object.keys(localStorage);
        if(keys.length > 0) {
            let values=[];
            let i = 0;
            while(i<keys.length) {
                let storageItem = localStorage.getItem(keys[i]);
                let parseValue = JSON.parse(storageItem);
                values.push(parseValue);
                i++;
            }
            return values;
        }
        else {
            let values = 0;
            return values;
        }
    }

// //Sort the searches by date
//     sortSearchesById() {
//     const pairs = Object.entries(storage)
//     .map(([key, value]) => ({
//     key: parseInt(key),
//     value: JSON.parse(value)
//   }))
//     .sort(({ key: keyA }, { key: keyB }) => keyA - keyB);
//     console.log(pairs);
//     return pairs[0];
//     }

    //  keep only the last 5 searches
    trimLocalStorageSearches() {
        //let oldPair = this.sortSearchesById();
        console.log("trimLocalStorageSearches Called");
        if (localStorage.length > 5) {
            localStorage.removeItem(localStorage.key(0));
        }
    }
} //  end of Local Storage class
