var buttonColors = ["red","blue","green","yellow"];

var level = 0;
var gameStarted = false;
var numberOfKeyPressed = 0;

var gamePattern = [];
var userClickedPattern = [];

//Change title at game start
$(document).keydown(function(){
    if(!gameStarted){
        gameStarted = true;

    }
    $("#level-title").text("Level "+level);
})

//user clicks button..
$(".btn").click(function(){
    //get which color is chosen by user and push in userChosenColor
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    //play sound and animate user click on button
    playSound(userChosenColor);
    animatePress(userChosenColor);

    //call check answer
    checkAnswer(userClickedPattern.length-1);   
});

//play Sound
function playSound(colorName){
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

//animation for user click on button
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}

//start game on first key press
$(document).keydown(function(){
    numberOfKeyPressed++ ;
    if(numberOfKeyPressed === 1){
        nextSequence();
    }
});

//check answer and pass to next level when level passed
function checkAnswer(currentIndex){
    if(userClickedPattern[currentIndex] === gamePattern[currentIndex]){

        if(userClickedPattern.length === gamePattern.length){
            level++;
            console.log("new lvl = "+level);
            setTimeout(function(){
                nextSequence();
            }, 500);
        }
    }
    else{
        console.log("failed");
        wrongAnswer();
        restart();
    }
}

//wrong answer
function wrongAnswer(){
    //play wrong audio
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    //animate for wrong answer
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 100);

    //change title
    $("#level-title").text("Game Over :( Press any Key to restart.");
}

//restart
function restart(){
    gamePattern = [];
    level = 0;
    gameStarted = false;
    anyKeyPressed = 0;
}

//start next sequence, a new random color is picked by game and added to gamePattern
function nextSequence() {
    console.log("next sequence called");

    //empty userClickedPattern
    userClickedPattern = [];
    console.log("userClickedPattern emptied");

    //update title level
    $("#level-title").text("Level "+level);

    //choose random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    //push new color in gamePattern
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    
    //animation and sound for new chosen color by game
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
