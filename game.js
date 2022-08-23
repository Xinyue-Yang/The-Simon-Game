var gamePattern = [];
var userClickedPattern = [];

var gameStart = false;
var gameLevel = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

//start the game if any key is pressed
$(document).keypress(function() {
    if (!gameStart) {
        $("#level-title").text("Level " + gameLevel);
        nextSequence();
        gameStart = true;
    }
});

//detect if any buttons are clicked; add to user array
$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

//add a random color to game pattern
function nextSequence() {
    //reset the user pattern
    userClickedPattern = [];

    gameLevel++;
    $("#level-title").text("Level " + gameLevel);

    var randomNumber = Math.floor(Math.random() * 4);
    var newColor = buttonColors[randomNumber];
    gamePattern.push(newColor);

    flash(newColor);
    playSound(newColor);
}

//play sound
function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

//flash the selected color
function flash(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
}

//create animation when a button is pressed
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//play sound & change background after wrong click
function wrongClick() {
    //play sound
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();

    //flash background
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);    

    //change title to "game over"
    $("#level-title").text("Game Over 🤯 Press Any Key to Restart");
}

//reset the data
function startOver() {
    gameLevel = 0;
    gamePattern = [];
    gameStart = false;
}

//check user pattern with game pattern
function checkAnswer(currentLevel) {
    //if the answer is correct, go to next level
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        wrongClick();
        startOver();
    }
}