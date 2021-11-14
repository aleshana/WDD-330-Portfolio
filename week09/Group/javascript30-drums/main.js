

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
    // moveLetter(e);
}
    
    
function removeTransition(e) {
    console.log(e);
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keysObject = document.querySelectorAll('.key');
keysObject.forEach(keyItem => {keyItem.count = 0;});

function moveKey(key) {
    if (key.count<100){
    key.count = (key.count+10);
    key.style.transform= "translateY("+ key.count+"px)";
    }
    else {
        key.count = 0;
        key.style.transform= "translateY(0)";
    }
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);


   