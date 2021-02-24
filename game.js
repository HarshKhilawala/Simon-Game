buttonColors = ["red","blue","green","yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;
started = false;

function startOver(){
  level=0;
  gamePattern=[];
  started=0;
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press any Key to restart");
    startOver();
  }
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function playSound(name){
  if(buttonColors.includes(name)){
    var audioElement = new Audio("./sounds/"+name+".mp3")
  }
}

function nextSequence(){
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function(event) {
  var userChosenColor = this.getAttribute("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keyup(function(event){
    if(!started){
      $("level-title").text("Level 0");
      nextSequence();
      started = true;
    }
  });
