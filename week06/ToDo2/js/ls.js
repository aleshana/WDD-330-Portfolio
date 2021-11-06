export function readFromLS(key) {
    let ls = JSON.parse(localStorage.getItem(key));     //  convert LS text to JSON
    return ls;          //  yes we could do this in one line of code but let's show what we are doing
}

export function writeToLS(key, data) {
        let text = JSON.stringify(data);        // prepare our data to be saved to LS. Convert it to text
        localStorage.setItem(key, text);        // yes this could have all been done in a single line but let's show waht we are doing

}
export const toDoList = [
    {
      id: "1635728124000",  
      title: "Clean My Bedroom",
      description: "Make my bed, pick-up laundry, and vaccuum the floor.", 
      completed: true,
      priority: "normal",
    }, 
    {
      id: "1635984472011",  
      title: "Wash Laundry",
      description: "Gather laundry from all the rooms, sort it by colors, load in the washer.", 
      completed: false,
      priority: "normal",
    }, 
    {
      id: "1635382524000",  
      title: "Wash Dishes",
      description: "Clear dishes from table, clear and rinse them, load in dishwasher.", 
      completed: true,
      priority: "normal",
    }, 
    {
      id: "1635984529886",  
      title: "Finish Homework",
      description: "Review and edit GE report, build app, study for test.", 
      completed: false,
      priority: "normal",
    },
    {
      id: "1635814524000",  
      title: "2 Clean My Bedroom",
      description: "Make my bed, pick-up laundry, and vaccuum the floor.", 
      completed: true,
      priority: "normal",
    }, 
    {
      id: "1635984572264",  
      title: "2 Wash Laundry",
      description: "Gather laundry from all the rooms, sort it by colors, load in the washer.", 
      completed: true,
      priority: "normal",
    }, 
    {
      id: "1635468924000",  
      title: "2 Wash Dishes",
      description: "Clear dishes from table, clear and rinse them, load in dishwasher.", 
      completed: false,
      priority: "normal",
    }, 
    {
      id: "1635641724000",  
      title: "2 Finish Homework",
      description: "Review and edit GE report, build app, study for test.", 
      completed: true,
      priority: "normal",
    }
      ];

