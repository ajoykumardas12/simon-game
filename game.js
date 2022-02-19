var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var pass;
var levelPass;

function nextSequence() {
    console.log("next sequence called");
    userClickedPattern = [];
    console.log("userClickedPattern emptied");
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    

    $(".btn").click(function(){
        var userChosenColor = $(this).attr("id");
        
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);

        playSound(userChosenColor);

        animatePress(userChosenColor);

        
        console.log(checkAnswer(userClickedPattern.length));
        console.log(userClickedPattern.length);
        console.log(level);
        if((userClickedPattern.length) === (level+1)){
            console.log(promoteLevel(level+1));
            promoteLevel(level+1);
            if(promoteLevel(level+1) === true){
                level++;
                console.log("new lvl = "+level);

                setTimeout(nextSequence(), 1000);
            }
        }
    });

    $("#level-title").text("Level "+level);
}

function playSound(colorName){
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}

var anyKeyPressed = 0;
$(document).keydown(function(){
    anyKeyPressed++ ;
    if(anyKeyPressed === 1){
        nextSequence();
    }
});


function checkAnswer(currentIndex){
    pass = true;
    if(userClickedPattern[currentIndex] !== gamePattern[currentIndex]){
        pass = false;
    }
    return pass;
}

function promoteLevel(levelValue){
    console.log("u called me?");
    levelPass = false;
    if(checkAnswer(levelValue) === true){
        levelPass = true;
        return levelPass;
    }
}


