//alert("hello");

var gamePattern = [];

var userClickedpattern = [];

var buttoncolors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }

});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedpattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedpattern.length-1);
});

function checkAnswer(currentLevel)
{
    if( gamePattern[currentLevel] === userClickedpattern[currentLevel] )
    {
        console.log("success");

        if(userClickedpattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }



}

function nextSequence()
{
    userClickedpattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttoncolors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}


function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");

    }, 100);
}

function startOver()
{
    gamePattern = [];
    started = false;
    level = 0;
}





