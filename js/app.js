const levelUpSound = new sound("audio/level_up.wav");
const loseSound = new sound("audio/lose_sound.wav");

//listen to buttons clicks to change the player character
$('.character-image').on('click', function(e) {
    var img_button = document.getElementById(jQuery(this).attr("id")); //button
    var src = $(this).find('img').attr('src')
    player.sprite = src;
    $('#char-list').toggle();
});
// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    var rand = this.generateRandomEnimies(); // generate random y value
    this.x = -30;
    this.y = rand;
    this.speed = (Math.floor(Math.random() * 150) + 100); //generate random speed
};


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        var rand = this.generateRandomEnimies(); //generate enimies come from diffrent y axis
        this.y = rand;
        this.x = -30;
    }

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//ref: https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
Enemy.prototype.generateRandomEnimies = function() {
    var myArray = [60, 130, 220];
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    return rand;
}

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.level = 1;
    this.x = 200;
    this.y = 380;
};

//generate number of enimies as current level
Player.prototype.increaseEnemies = function() {
    allEnemies = [];
    for (var i = 0; i < this.level; i++) {
        allEnemies.push(new Enemy());
    }
};


Player.prototype.update = function() {
    this.checkCollision();
};

//choosen 171 & 101 based on the width of the pngs
//ref: https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
Player.prototype.checkCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 171 / 3 &&
            this.x + 171 / 3 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 101 / 3 &&
            this.y + 101 / 3 > allEnemies[i].y) {
            this.reset();
        }
    }
};

Player.prototype.handleInput = function(e) {
    if (e == 'left') {
        if (this.x == 0) {
            this.x = this.x;
        } else {
            this.x -= 100;
        }
    } else if (e == 'up') {
        if (this.y < 80) {
            this.y = this.y;
            this.levelUp();
        } else {
            this.y -= 80;
        }
    } else if (e == 'right') {
        if (this.x == 400) {
            this.x = this.x;
        } else {
            this.x += 100;
        }
    } else {
        if (this.y == 380) {
            this.y = this.y;
            console.log("ooops");
        } else {
            this.y += 80;
        }
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//when the player fail, the level will be reset to 1
Player.prototype.reset = function() {
    loseSound.play();
    this.level = 1;
    this.resetPlayer();
};

// level++ then reposition the player
Player.prototype.levelUp = function() {
    levelUpSound.play();
    this.level++;
    this.resetPlayer();
};

// reposition the player
Player.prototype.resetPlayer = function() {
    $('#level').html('Level ' + this.level);
    this.x = 200;
    this.y = 380;
    this.increaseEnemies();
};

var allEnemies = [new Enemy()];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//ref: w3school
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}