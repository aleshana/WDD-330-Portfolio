

//Chapter 3--Minimum

let x = 0;
let y;
let result = "";

function minimum (x, y) {
    
    if (x < y) {
        result = x + " is bigger than " + y;
    }
    else if (y > x) {
        result = y + " is bigger than " + x;
    } 
    else {
        result = "The numbers are equal."
    }
    return result;
}

minimum (5, 8);
console.log(minimum);

//Solution
/*function min(a, b) {
    if (a < b) return a;
    else return b;
  }*/
  
  console.log(min(0, 10));
  // → 0
  console.log(min(0, -10));
  // → -10

  //Recursion
  // Your code here.

