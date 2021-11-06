//Building an array manual of all the weeks, including a label and url.
//Create a for each item in the array, insert it into the HTML document as a link.

const weeksArray = [
    {label: "Week 1 Work", url: "week01/index.html"},
    {label: "Week 2 Work", url: "week02/index.html"},
    {label: "Week 3 Work", url: "week03/index.html"},
    {label: "Week 4 Work", url: "week04/index.html"},
    {label: "Week 5 Work", url: "week05/index.html"},
    {label: "Week 6 Work", url: "week06/index.html"},
    {label: "Week 7 Work", url: "week07/index.html"},
    {label: "Week 8 Work", url: "week07/index.html"},
    {label: "Week 9 Work", url: "week07/index.html"},
    {label: "Week 10 Work", url: "week07/index.html"},
    {label: "Week 11 Work", url: "week07/index.html"},
    {label: "Week 12 Work", url: "week07/index.html"}
]

const weeks = document.querySelector('ol.homepageWeeks');

weeksArray.forEach(weekItem => {
    let listItem = document.createElement('li');  
    listItem.innerHTML = `<a href = ${weekItem.url}>${weekItem.label}</a>`;
    console.log(listItem);
    weeks.append(listItem);
    
});