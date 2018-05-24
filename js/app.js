// Enemies Player must avoid
var Enemy = function(x, y, speed) {
    // Variables for Enemy
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Updated Enemy's position, required method for game
//Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -100;
    }
    // Checks for collision between Enemy and resets Player when collision occurs
    // Source for collisions from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (this.x < player.x + 60 &&
      this.x + 60 > player.x &&
      this.y < player.y + 40 &&
      40 + this.y > player.y) {
        player.reset();
    }
};

// Draws Enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Variables for Player
var Player = function() {
  this.sprite = 'images/char-cat-girl.png';
  this.x = 200;
  this.y = 400;
}

// Update method for Player
Player.prototype.update = function() {

};

// Draws Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles input for Player and prevents Player from going offscreen
Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > 0) {
  this.x -= 100;
  }
  else if (key === 'right' && this.x < 400) {
    this.x += 100;
  }
  else if (key === 'up' && this.y > 0) {
    if (this.y < 81) {
      this.reset();
    }
    else {
      this.y -= 80;
    }
  }
  else if (key === 'down' && this.y < 400) {
    this.y += 80;
  }
}

//Resets Player location after reaching water
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Variables for Lives
var Lives = function(x, y) {
  this.sprite = 'images/Heart.png';
  this.x = x;
  this.y = y;
}

// Draws Lives
Lives.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 50);
};

// Instantiates objects
// Places all Enemy objects in an array called allEnemies
// Places Player object in a variable called player
var allEnemies = [new Enemy(0, 60, 125), new Enemy(-200, 60, 100), new Enemy(-100, 140, 175), new Enemy(-225, 140, 125), new Enemy(0, 220, 100), new Enemy(-250, 220, 150)];
var player = new Player();
var allLives = [new Lives(10, 0), new Lives(65, 0), new Lives(120,0)];

// Listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
