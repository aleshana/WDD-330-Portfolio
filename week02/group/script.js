function read(){
    let value1 = document.getElementById("value1").value;
    if (parseInt(value1)){ //checks to see if the value is a number
        summation(value1);
    } else {
        //displays the value into the div in Html
        document.getElementById("results").innerHTML=`<p>Not a number.</p>`;
    }
}

//Requirement 2
function summation(value1){
    let result = 0;
    // Adds all the numbers together
    for (let i = 0; i <= value1; i++) { 
        result += i;
    }
    document.getElementById("results").innerHTML=`<p>Summation: ${result} </p>`;
    return result;
}

//Requirement 3
const onAdd = () => {
    let value2 = document.getElementById("value2").value;
    let value3 = document.getElementById("value3").value;
    //Converting input value to numbers ... Number()
    let result = Number(value2)+ Number(value3);
    document.getElementById("result2").innerHTML=`<p>answer: ${result} </p>`;
    
}

const onSub = () => {
    let value2 = document.getElementById("value2").value;
    let value3 = document.getElementById("value3").value;
    let result = Number(value2)- Number(value3);
    document.getElementById("result2").innerHTML=`<p>answer: ${result} </p>`;
}

const onMult = () => {
    let value2 = document.getElementById("value2").value;
    let value3 = document.getElementById("value3").value;
    let result = Number(value2)* Number(value3);
    return result;
}

// Callback
function solve(calculate) {
    // button calls this solve function while passing the operations (onMult, onSub, onAdd)
    // and displaying the results.
    // *note This is only implemented on the onMult since it has a return.
    const result = calculate()
    document.getElementById("result2").innerHTML=`<p>Solved: ${result} </p>`;
}