// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    var myArray = [60,130,220]
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    this.x = rand;
    this.y = rand;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x > 500)
    {
        this.x = 0;
    }
    else{
    this.x += 50*dt;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x =  200;
    this.y =  380;
};

Player.prototype.update = function() {
    for(var i =0;i<allEnemies.length;i++)
    {
        if (player.x < allEnemies[i].x + 171/4 &&
            player.x + 171/4 > allEnemies[i].x &&
            player.y < allEnemies[i].y + 101/5 &&
            player.y + 101/5 > allEnemies[i].y)
        {
            player.x = 200;
            player.y = 380;
        }
    }
};

Player.prototype.handleInput = function(e){
    if(e == 'left'){
        if( this.x == 0 ){
            this.x = this.x;
        }
        else{
            this.x -= 100;
        }
    }
    else if(e == 'up'){
        if( this.y < 80){
            this.y = this.y;
            console.log("ooops");
        } 
        else {
            this.y -= 80;
        }
    }
    else if(e == 'right'){
        if( this.x == 400 ){
            this.x = this.x;
        }
        else{
            this.x += 100;
        }
    }
    else{
        if( this.y == 380){
            this.y = this.y;
            console.log("ooops");
        } 
        else {
            this.y += 80;
        }
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];
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
