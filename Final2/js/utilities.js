//let url = "https://api.europeana.eu/record/v2/search.json?media=true&profile=standard&query=Renior&rows=12&start=1&wskey=riaboadi";

export function getJSON(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
  }

 // console.log("the export fetch data function was read");

  //Temporary test url

  
//    console.log(getJSON(url));

//const baseUrl = "https://api.europeana.eu/record/v2/search.json?wskey=riaboadi&query=";
//const query = "who:\"Leonardo+da+Vinci\"";

    
    
   