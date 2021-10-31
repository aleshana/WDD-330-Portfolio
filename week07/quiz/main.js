// const url = 'http://spbooks.github.io/questions.json';

// fetch(url)
// .then(res => res.json())
// .then(quiz => {
//     view.start.addEventListener('click', () => game.start(quiz.questions), false);
//     view.response.addEventListener('click', (event) => game.check(event), false);
// });


const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
];

// View Object
const view = {

    setup(){
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score,game.score);
        this.render(this.result,'');
        this.render(this.info,'');
        this.resetForm();
    },

    resetForm(){
        this.response.answer.value = '';
        this.response.answer.focus();
    },

    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    },
    
    start: document.getElementById('start'),
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    response: document.querySelector('#response'),
    //target is the element that will display, 
    //content is the value to be updated with,
    //attributes is an object of attributes that can be added to HTML
    //for in pulls in the index number or user definied property
    render(target,content,attributes) {
        for(const key in attributes) {
            //key is the name of the attribute, attribute[key]is the value.
            target.setAttribute(key, attributes[key]);
            console.log(attributes[key]);
        }
        target.innerHTML = content;
    },

    show(element){
        element.style.display = "block";
        console.log(element);
    },
    hide(element){
        element.style.display = "none";
        console.log(element);
    },

};

function random(a,b=1) {
    // if only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
        [a,b] = [b,a];
    }
    return Math.floor((b-a+1) * Math.random()) + a;
}

function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = random(i)-1;
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}


const game = {
    start(quiz){
        console.log('start() invoked');
        this.score = 0;
        this.questions = [...quiz];
        view.setup();
        this.ask();
    },

    ask(name){
        console.log('ask() invoked');
        if(this.questions.length > 0) {
        shuffle(this.questions);
        this.question = this.questions.pop();
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question,question);
    }
},
check(event){
    console.log('check(event) invoked');
    event.preventDefault();
    const response = view.response.answer.value;
    const answer = this.question.realName;
    if(response === answer){
        view.render(view.result,'Correct!',{'class':'correct'});
        this.score++;
        view.render(view.score,this.score);
    } 
    else {
        view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
    }
    view.resetForm();
    this.ask();

},
gameOver(){
    console.log('gameOver() invoked');
    view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view.teardown();
},

}

view.start.addEventListener('click', () => game.start(quiz), false);

view.response.addEventListener('submit', (event) => game.check(event), false);
view.hide(view.response);