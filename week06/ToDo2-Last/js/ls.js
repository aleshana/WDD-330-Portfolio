export function readFromLS(key) {
    let ls = localStorage.getItem(key); 
    ls = JSON.parse(ls);

    return ls === null ? [] : ls;
//    return ls;          
}

export function writeToLS(key, data) {
        let text = JSON.stringify(data);        // prepare our data to be saved to LS. Convert it to text
        localStorage.setItem(key, text);        
}

// export function removeFromLS(key) {
//         if (confirm('Do you really want to delete this task?')) {
//             localStorage.removeItem(key);        
//         } else {
//           return
//         }
    
// }

