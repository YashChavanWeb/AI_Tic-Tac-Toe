// Selecting DOM elements
let boxes = document.querySelectorAll('.box'); // use selector all which I don't do and make a common mistake
const playAgain = document.querySelector('.play-again');
const message = document.querySelector('.message');
const winner = document.querySelector('#winner');
const newGame = document.querySelector('#new-game');

let play_x = true;
let turn = "X";

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("Box was clicked");

        if (play_x) { // X turn
            box.textContent = "X";
            box.style.transition = "0.5s ease";
            play_x = false;
        } else { // O turn
            box.textContent = "O";
            box.style.transition = "0.5s ease";
            play_x = true;
        }
        box.disabled = true; // this will disable the button once clicked, very useful

        // Note: this also changes the text / background color so we need to change it in style

        // Now after each turn we need to check whether the user has won or not
        box.classList.add('clicked'); // Add the 'clicked' class for the flip effect
        count++;

        changeBg();
        isWinner();
    });
});

function changeBg() {
    if (turn === "X") {
        turn = "O";
        document.querySelector('#two').style.backgroundColor = "white";
        document.querySelector('#one').style.backgroundColor = "#DC143C";
    } else {
        turn = "X";
        document.querySelector('#one').style.backgroundColor = "white";
        document.querySelector('#two').style.backgroundColor = "#DC143C";
    }
}

const displayWinner = (tell) => {
    winner.innerText = `Winner is ${tell}`; // Use the parameter winnerText
    message.classList.remove("hide");
    stopButtons();
};

const stopButtons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const startButtons = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.textContent = "";
    }
};

let count = 0;

const isWinner = () => {
    for (let condition of winCondition) {
        // the condition that is in the loop is basically an array of all the patterns of 0, 1, ... index




        /*
        console.log(condition)     // we get array of all the indexes 

        console.log(condition[0], condition[1], condition[2])     // we get values of all the indexes in integer 

        console.log(boxes[condition[0]], boxes[condition[1]], boxes[condition[2]])     
        // here for example condition 0 has 1 2 3
        // then with boxes we get - boxes ke 1st index, 2nd index and 3rd index do 
        // we need them for comparison

        console.log(
            boxes[condition[0]].textContent, 
            boxes[condition[1]].textContent, 
            boxes[condition[2]].textContent
            )     
        // with this we can access the inner text of the box if nothing is there then no value on that index
        */



        let val1 = boxes[condition[0]].textContent;
        let val2 = boxes[condition[1]].textContent;
        let val3 = boxes[condition[2]].textContent;

        if (val1 !== "" && val2 !== "" && val3 !== "") {
            if (val1 === val2 && val2 === val3) {
                console.log("winner", val1);

                displayWinner(val1);
                return;
            }
        }
    }
    if (count === 9) {
        winner.textContent = "It's a Draw";
        message.classList.remove("hide");
    }
};

const resetGame = () => {
    play_x = true;
    count = 0;
    startButtons();

    // Clear text content and enable all boxes
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
        box.classList.remove('clicked');
    });

    // Hide the message
    message.classList.add('hide');
    winner.textContent = "";

    // Reset background colors
    document.querySelector('#one').style.backgroundColor = "white";
    document.querySelector('#two').style.backgroundColor = "#e32047";
};

newGame.addEventListener('click', resetGame);
playAgain.addEventListener('click', resetGame);
