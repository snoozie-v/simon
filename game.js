var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var playingPattern = false;

var greenSound = new Audio('./sounds/green.mp3');
var redSound = new Audio('./sounds/red.mp3');
var yellowSound = new Audio('./sounds/yellow.mp3');
var blueSound = new Audio('./sounds/blue.mp3');
var wrongSound = new Audio('./sounds/wrong.mp3')

function playSound(color) {
    switch (color) {
        case "green":
            greenSound.play();
            break;
        case "red":
            redSound.play();
            break;
        case "yellow":
            yellowSound.play();
            break;
        case "blue":
            blueSound.play();
            break;
    }
}

function showPattern() {
    playingPattern = true;
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    gamePattern.forEach(function (color, index) {
        setTimeout(function () {
            $("#" + color).addClass("flash");
            playSound(color);
            setTimeout(function () {
                $("#" + color).removeClass("flash");
            }, 100);
        }, 500 * index);
    });
    setTimeout(function () {
        playingPattern = false;
    }, 500 * gamePattern.length);
}

$(".btn").click(function () {
    if (playingPattern) return;

    var userColor = $(this).attr("id");
    console.log(userColor)
    userPattern.push(userColor);
    playSound(userColor);

    if (userPattern.length === gamePattern.length) {
        if (JSON.stringify(userPattern) === JSON.stringify(gamePattern)) {
            setTimeout(function () {
                showPattern();
            }, 1000);
        } else {
            wrongSound.play()
            $("#level-title").text("Game Over, Click to Restart.");

            gamePattern = [];
            userPattern = [];
            level = 0;
            playingPattern = false;
        }
    } else {
        if (userPattern[userPattern.length - 1] !== gamePattern[userPattern.length - 1]) {
            wrongSound.play()
            $("#level-title").text("Game Over, Click to Restart.");
 
            gamePattern = [];
            userPattern = [];
            level = 0;
            playingPattern = false;
        }
    }
    }
);

$("#start-button").click(function () {
    if (!playingPattern && level === 0) {
        showPattern();
    }
});