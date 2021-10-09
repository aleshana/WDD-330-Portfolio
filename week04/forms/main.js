// const form = document.forms.search;
// console.log(form);
// const input = form.elements.searchInput;  ///page 288
// console.log(input)
// input.addEventListener('focus', () => alert('focused'), false);

// input.addEventListener('blur', () => alert('blurred'), false);

// input.addEventListener('change', () => alert('changed'), false);

const form = document.forms['search'];
form.addEventListener ('submit', search, false);
function search() {
    alert(' Form Submitted');
}

function search(event) {
    alert(`You Searched for: ${input.value}`);
    event.preventDefault();
}

const input = form.elements.searchInput;
input.value = 'Search Here';

input.addEventListener('focus', function(){
    if (input.value==='Search Here') {
        input.value = '' 
    }
}, false);
input.addEventListener('blur', function(){
    if(input.value === '') {
        input.value = 'Search Here';
    } }, false);


    input.addEventListener('focus', function(){
        if (input.value==='Search Here') {
            input.value = '' 
        }
    }, false);
    input.addEventListener('blur', function(){
        if(input.value === '') {
            input.value = 'Search Here';
        } }, false);


