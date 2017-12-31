var level = 1;
levelUpSound = new sound("audio/level_up.wav");
loseSound = new sound("audio/lose_sound.wav");

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    var myArray = [60,130,220];
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    this.x = -30;
    this.y = rand;
    this.speed = (Math.floor(Math.random() * 150) + 100);
};


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
    if(this.x > 500)
    {
        var myArray = [60,130,220];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];
        this.y = rand; 
        this.x =-30;
    }

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.increaseEnemies = function(level){
    allEnemies = [];
    for(var i = 0 ;i<level;i++){
        allEnemies.push(new Enemy());
    }
};


var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x =  200;
    this.y =  380;
};

Player.prototype.update = function() {
    player.checkCollision();
};

Player.prototype.checkCollision = function(){
    for(var i =0;i<allEnemies.length;i++)
    {
        if (player.x < allEnemies[i].x + 171/3 &&
            player.x + 171/3 > allEnemies[i].x &&
            player.y < allEnemies[i].y + 101/3 &&
            player.y + 101/3 > allEnemies[i].y) {
                loseSound.play();
                level = 1;
                $('#level').html('Level '+level);
                Enemy.prototype.increaseEnemies(level);
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
            level++;
            $('#level').html('Level '+level);
            player.x = 200;
            player.y = 380;
            levelUpSound.play();
            Enemy.prototype.increaseEnemies(level);
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




//w3school
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
