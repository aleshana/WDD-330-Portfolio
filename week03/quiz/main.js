const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
];

// View Object
const view = {
    
    start: document.getElementById('start'),
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
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

const game = {
    start(quiz){
        view.hide(view.start);
        this.questions = [...quiz];
        this.score = 0;
        // main game loop
        for(const question of this.questions){
            this.question = question;
            this.ask();
        }
        // end of main game loop
        this.gameOver();
    },
    ask(){
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question,question);
        const response =  prompt(question);
        this.check(response);
    },
    check(response){
        const answer = this.question.realName;
        if(response === answer){
            view.render(view.result,'Correct!',{'class':'correct'});
            alert('Correct!');
            this.score++;
            view.render(view.score,this.score);
        } else {
            view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
            alert(`Wrong! The correct answer was ${answer}`);
        }
    },
    gameOver(){
        view.show(view.start);
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    }
}

view.start.addEventListener('click', () => game.start(quiz), false);