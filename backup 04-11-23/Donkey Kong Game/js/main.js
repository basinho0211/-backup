// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  // player speed
  this.playerSpeed = 200;
  this.jumpSpeed = -345;

  // bounds
  this.physics.world.bounds.width = 360;
  this.physics.world.bounds.height = 700;

  // level data
  this.levelData = {
    "platforms": [
      {
        "x": 72,
        "y": 450,
        "numTiles": 6,
        "key": "block"
      },
      {
        "x": 0,
        "y": 330,
        "numTiles": 8,
        "key": "block"
      },
      {
        "x": 72,
        "y": 210,
        "numTiles": 8,
        "key": "block"
      },
      {
        "x": 0,
        "y": 90,
        "numTiles": 7,
        "key": "block"
      },
      {
        "x": 0,
        "y": 560,
        "numTiles": 1,
        "key": "block"
      },
    ]
  }
};

// load asset files for our game
gameScene.preload = function() {

  // load images
  this.load.image('ground', 'assets/images/ground.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('block', 'assets/images/block.png');
  this.load.image('goal', 'assets/images/gorilla3.png');
  this.load.image('barrel', 'assets/images/barrel.png');

  // load spritesheets
  this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
    frameWidth: 28,
    frameHeight: 30,
    margin: 1,
    spacing: 1
  });

  this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', {
    frameWidth: 20,
    frameHeight: 21,
    margin: 1,
    spacing: 1
  });
};

// executed once, after assets were loaded
gameScene.create = function() {

  // create platforms group
  this.platforms = this.add.group();

  // enable cursor keys
  this.cursors = this.input.keyboard.createCursorKeys();

  // player animation
  this.anims.create({
    key: 'walking',
    frames: this.anims.generateFrameNames('player', {
      frames: [0, 1, 2]
    }),
    frameRate: 12,
    yoyo: true,
    repeat: -1
  });
  
  // creating AND adding sprites to physics system
    // ground
    let ground = this.physics.add.sprite(180, 300, 'ground', true);
    // let ground2 = this.physics.add.sprite(180, -100, 'ground');
    this.platforms.add(ground);

    // platform
    let platform = this.add.tileSprite(180, 200,4 * 36 ,1 * 30 , 'block');
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);

    // player
    this.player = this.add.sprite(180, -100, 'player', 3);
    this.physics.add.existing(this.player);

  // disable ground gravity / make immovable
  ground.body.allowGravity = false;
  ground.body.immovable = true;

  // collision detection
  // this.physics.add.collider(ground, ground2);
  this.physics.add.collider(this.player, this.platforms)

  // create game bounds
  this.player.body.setCollideWorldBounds(true);


};

gameScene.update = function() {
  // make sure player is on ground before jumping
  let onGround = this.player.body.touching.down;
  // movement to the left
    if(this.cursors.left.isDown) {
      this.player.body.setVelocityX(-this.playerSpeed);

      // flips player
      this.player.flipX = false;

      // starts animation
      if(!this.player.anims.isPlaying){
        this.player.anims.play('walking');
      };
    }
  // movement to the right
  else if(this.cursors.right.isDown) {
    this.player.body.setVelocityX(this.playerSpeed);

    // flips player
    this.player.flipX = true;

    // starts animation
    if(!this.player.anims.isPlaying){
      this.player.anims.play('walking');
    };
  }
  // causes player to stop
  else {
    this.player.body.setVelocityX(0);

    // stops animation
    this.player.anims.stop('walking');

    // set idle frame
    if (onGround) {
    this.player.setFrame(3);
    }
  }

  // jumping

  if(onGround && (this.cursors.up.isDown || this.cursors.space.isDown)) {
    // give player jumping velocity (Y-axis)
    this.player.body.setVelocityY(this.jumpSpeed);

    // stop animation
    this.player.anims.stop('walking');

    // set frame
    this.player.setFrame(2);
  }
};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'The man with a mustache, blue shirt, suspenders, red pants, and black boots is immortal. His cells autoregenerate with a 100% success rate and with a 10^-109 chance of mutation. He does not require food or water as he derives his energy from the slow release of gravitational radiation being given off by the thousands of trillions of stars in the universe. He uses 10^1000 percent less energy than the average bacteria due to his cells going into a near energyless state whenever the man stands still, which he will do for 99.999999999% of his existance. The man was created by the random and perfect alignment of molecules and atoms in a random point in space (similar to a boltzmann brain). This occured 11.78 billion years ago, and the man has only moved for 2 Earth years of his existance, even a human toddler has moved more than he has in his entire billion years of pointless "living," the rest were spent standing still, storing the gravitational radiation in his cellular medium. YOU were choosen to move him for the first time in over 311 million years. He has stored enough energy to move around for nearly half an hour, so I hope you enjoy this once in a human lifetime experience.',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 700},
      debug: true
    }
  }
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
