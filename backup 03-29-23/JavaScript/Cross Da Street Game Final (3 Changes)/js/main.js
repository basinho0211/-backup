// game.js in notes

//create a new scene

let gameScene= new Phaser.Scene('Game');

gameScene.init=function() {
    //speed for the player
    this.goodSpeed=-4.42069;

    //speed ranges for the enemies
    this.evilMinSpeed=30;
    this.evilMaxSpeed=35;

    this.evil2MinSpeed=25;
    this.evil2MaxSpeed=30;

    this.evil3MinSpeed=20;
    this.evil3MaxSpeed=25;

    this.evil4MinSpeed=15;
    this.evil4MaxSpeed=20;

    this.evil5MinSpeed=10;
    this.evil5MaxSpeed=15;

    this.evil6MinSpeed=7.5;
    this.evil6MaxSpeed=10;

    this.evil7MinSpeed=5;
    this.evil7MaxSpeed=7.5;

    //bounds
    this.evilMinX=-100;
    this.evilMaxX=1380;

    //flip cars when reaching border
    this.evilFlip = true
    this.evilFlip2 = true
    this.evilFlip3 = true
    this.evilFlip4 = true
    this.evilFlip5 = true
    this.evilFlip6 = true
    this.evilFlip7 = true

    // we are NOT terminating
    this.isTerminating = false;
};

gameScene.preload=function(){
    //load our sprites / images
    this.load.image('backdrop','assets/background.png');
    this.load.image('evil','assets/car.png');
    this.load.image('good','assets/deer.png');
    this.load.image('win','assets/babydeer.png');
    // this.load.audio('music',['assets/music.mp3']);
    this.load.audio('carHit',['assets/carHit.wav']);
    this.load.audio('carHorn',['assets/carHorn.wav']);
    this.load.audio('victory',['assets/victory.wav']);
    // this.load.audio('running',['assets/running.wav']);
    
};
//called once preload is over
gameScene.create=function(){
    this.backdrop=this.add.sprite(0,0,'backdrop');
    this.evil=this.add.sprite(0,0,'evil');
    this.evil2=this.add.sprite(0,0,'evil');
    this.evil3=this.add.sprite(0,0,'evil');
    this.evil4=this.add.sprite(0,0,'evil');
    this.evil5=this.add.sprite(0,0,'evil');
    this.evil6=this.add.sprite(0,0,'evil');
    this.evil7=this.add.sprite(0,0,'evil');
    this.good=this.add.sprite(0,0,'good');
    this.win=this.add.sprite(0,0,'win');
    // this.music = this.sound.add('music', {loop: false});
    this.carHit = this.sound.add('carHit', {loop: false});
    this.carHorn = this.sound.add('carHorn', {loop: false});
    this.victorySound = this.sound.add('victory', {loop: false});
    // this.running = this.sound.add('running', {loop: false});


    
    //positions
    this.backdrop.setPosition(1280/2, 720/2);
    this.evil.setPosition(700/2, 385/2);
    this.evil2.setPosition(700/2, 525/2);
    this.evil3.setPosition(700/2, 655/2);
    this.evil4.setPosition(700/2, 785/2);
    this.evil5.setPosition(700/2, 890/2);
    this.evil6.setPosition(700/2, 1000/2);
    this.evil7.setPosition(700/2, 1120/2);
    this.good.setPosition(1280/2, 1300/2);
    this.win.setPosition(1280/2, 200/2);

    //enemy direction
    let dir = Math.random() < 0.5 ? 1 : -1;
    let dir2 = Math.random() < 0.5 ? 1 : -1;
    let dir3 = Math.random() < 0.5 ? 1 : -1;
    let dir4 = Math.random() < 0.5 ? 1 : -1;
    let dir5 = Math.random() < 0.5 ? 1 : -1;
    let dir6 = Math.random() < 0.5 ? 1 : -1;
    let dir7 = Math.random() < 0.5 ? 1 : -1;
    
    //enemy speed
    let speed = this.evilMinSpeed + Math.random() * (this.evilMaxSpeed - this.evilMinSpeed);
    let speed2 = this.evil2MinSpeed + Math.random() * (this.evil2MaxSpeed - this.evil2MinSpeed);
    let speed3 = this.evil3MinSpeed + Math.random() * (this.evil3MaxSpeed - this.evil3MinSpeed);
    let speed4 = this.evil4MinSpeed + Math.random() * (this.evil4MaxSpeed - this.evil4MinSpeed);
    let speed5 = this.evil5MinSpeed + Math.random() * (this.evil5MaxSpeed - this.evil5MinSpeed);
    let speed6 = this.evil6MinSpeed + Math.random() * (this.evil6MaxSpeed - this.evil6MinSpeed);
    let speed7 = this.evil7MinSpeed + Math.random() * (this.evil7MaxSpeed - this.evil7MinSpeed);

    //enemy movement
    this.evil.speed = dir * speed;
    this.evil2.speed = dir2 * speed2;
    this.evil3.speed = dir3 * speed3;
    this.evil4.speed = dir4 * speed4;
    this.evil5.speed = dir5 * speed5;
    this.evil6.speed = dir6 * speed6;
    this.evil7.speed = dir7 * speed7;

    //enemies
    this.evil.flipX = this.evilFlip;
    this.evil2.flipX = this.evilFlip2;
    this.evil3.flipX = this.evilFlip3;
    this.evil4.flipX = this.evilFlip4;
    this.evil5.flipX = this.evilFlip5;
    this.evil6.flipX = this.evilFlip6;
    this.evil7.flipX = this.evilFlip7;

    this.evil.scaleX = 0.7;
    this.evil.scaleY = 0.5;
    this.evil2.scaleX = 0.7;
    this.evil2.scaleY = 0.5;
    this.evil3.scaleX = 0.7;
    this.evil3.scaleY = 0.5;
    this.evil4.scaleX = 0.7;
    this.evil4.scaleY = 0.5;
    this.evil5.scaleX = 0.7;
    this.evil5.scaleY = 0.5;
    this.evil6.scaleX = 0.7;
    this.evil6.scaleY = 0.5;
    this.evil7.scaleX = 0.7;
    this.evil7.scaleY = 0.5;

    //player
    this.good.scaleX = 0.5;
    this.good.scaleY = 0.3;

    this.win.setScale(.5);
    
};

//this will run up to 60 times per second
gameScene.update=function() {

// dosen't occur if termination is occuring (aka game is being played)
if(this.isTerminating) return;

//bounce enemies
        
        let conditionUp = this.evil.speed < 0 && this.evil.x <= this.evilMinX;
        let conditionDown = this.evil.speed > 0 && this.evil.x >= this.evilMaxX;

        if (conditionUp || conditionDown) {
            this.evil.speed *= -1;
            this.evilFlip *= -1; 
        }
        let conditionUp2 = this.evil2.speed < 0 && this.evil2.x <= this.evilMinX;
        let conditionDown2 = this.evil2.speed > 0 && this.evil2.x >= this.evilMaxX;

        if (conditionUp2 || conditionDown2) {
            this.evil2.speed *= -1;
            this.evilFlip2 *= -1; 
        }
        let conditionUp3 = this.evil3.speed < 0 && this.evil3.x <= this.evilMinX;
        let conditionDown3 = this.evil3.speed > 0 && this.evil3.x >= this.evilMaxX;

        if (conditionUp3 || conditionDown3) {
            this.evil3.speed *= -1;
            this.evilFlip3 *= -1; 
        }
        let conditionUp4 = this.evil4.speed < 0 && this.evil4.x <= this.evilMinX;
        let conditionDown4 = this.evil4.speed > 0 && this.evil4.x >= this.evilMaxX;

        if (conditionUp4 || conditionDown4) {
            this.evil4.speed *= -1;
            this.evilFlip4 *= -1; 
        }
        let conditionUp5 = this.evil5.speed < 0 && this.evil5.x <= this.evilMinX;
        let conditionDown5 = this.evil5.speed > 0 && this.evil5.x >= this.evilMaxX;

        if (conditionUp5 || conditionDown5) {
            this.evil5.speed *= -1;
            this.evilFlip5 *= -1; 
        }
        let conditionUp6 = this.evil6.speed < 0 && this.evil6.x <= this.evilMinX;
        let conditionDown6 = this.evil6.speed > 0 && this.evil6.x >= this.evilMaxX;

        if (conditionUp6 || conditionDown6) {
            this.evil6.speed *= -1;
            this.evilFlip6 *= -1; 
        }
        let conditionUp7 = this.evil7.speed < 0 && this.evil7.x <= this.evilMinX;
        let conditionDown7 = this.evil7.speed > 0 && this.evil7.x >= this.evilMaxX;

        if (conditionUp7 || conditionDown7) {
            this.evil7.speed *= -1;
            this.evilFlip7 *= -1; 
        }
        
    // make enemeies move up AND down (and spin!!!)
    this.evil.x += this.evil.speed;
    this.evil2.x += this.evil2.speed;
    this.evil3.x += this.evil3.speed;
    this.evil4.x += this.evil4.speed;
    this.evil5.x += this.evil5.speed;
    this.evil6.x += this.evil6.speed;
    this.evil7.x += this.evil7.speed;
    // this.evil.angle+=3;
    // this.evil2.angle+=3;
    // this.evil3.angle+=3;
    // this.evil4.angle+=3;
    // this.evil5.angle+=3;
    // this.evil6.angle+=3;
    // this.evil7.angle+=3;
    
    // movement
    if(this.input.activePointer.isDown == true){
        this.good.y+=this.goodSpeed;
     // this.running.play();
    };
    

    // win condition
    let goodRect=this.good.getBounds();
    let treasureRect=this.win.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,treasureRect)) {
        console.log('YOU WIN! YOU AND YOUR YOUNG HAVE BEEN REUNITED!!!!');
        this.victorySound.play();
        
        return this.youLived();
    }

    // lose conditions (with very harsh console.logs)

    let evilRect=this.evil.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,evilRect)) {
        console.error('SERIOUSLY? DYING AT THE BEGINNING IS ONE THING, BUT DYING AT THE END? NOW THAT IS A LOW POINT IN YOUR GAMING CAREER... DO YOU EVEN CARE ABOUT YOUR YOUNG? NOW THEY ARE GOING TO NOT HAVE THE SURVIVAL SKILLS TO LEAD THEM INTO ADULTHOOD. WHAT A BAD PARENT YOU ARE...');
        this.carHorn.play();
        this.carHit.play();
        
        return this.youDied();
    }
    let evil2Rect=this.evil2.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,evil2Rect)) {
        console.error('...');
        this.carHorn.play();
        this.carHit.play();
        
        return this.youDied();
    }
    let evil3Rect=this.evil3.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,evil3Rect)) {
        console.error('PFFT... EVEN A TODDLER CAN CROSS THE ROAD BETTER THAN YOU!');
        this.carHorn.play();
        this.carHit.play();
        
        return this.youDied();
    }
    let evil4Rect=this.evil4.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,evil4Rect)) {
        console.error('GO AHEAD, BLAME IT ON THE RNG.');
        this.carHorn.play();
        this.carHit.play();
        
        return this.youDied();
    }
    let evil5Rect=this.evil5.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,evil5Rect)) {
        console.error('NATURAL SELECTION HAS ITS WAYS');
        this.carHorn.play();
        this.carHit.play();
        
        return this.youDied();
    }
    let evil6Rect=this.evil6.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,evil6Rect)) {
        console.error('RULE #1: LOOK BOTH WAYS BEFORE CROSSING THE STREET. DIDNT YOU LEARN THIS IN 1ST GRADE?');
        this.carHorn.play();
        this.carHit.play();
        
        return this.youDied();
    }
    let evil7Rect=this.evil7.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,evil7Rect)) {
        console.error('YOU DIED AT THE FIRST LANE? WOOOOOOOW, NOT EVEN SUPRISED.');
        this.carHorn.play();
        this.carHit.play();
        
        return this.youDied();
    }


    

};

gameScene.youDied = function() {
    // Game over initilized
    this.isTerminating = true;

    // Add camera shake and flash
    this.cameras.main.shake(250);
    this.cameras.main.flash();

    // 'Listen' for event completion
    this.cameras.main.on('cameraflashcomplete', function(camera, effect) {

        // Fades out
        this.cameras.main.fade(1250);
    }, this);
    
    // 'Listen' for event completion
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {

        // Restarts
        this.scene.restart();
    }, this);


};

gameScene.youLived = function() {
    // Game over initilized
    this.isTerminating = true;

    // Camera Flashes
    this.cameras.main.flash();
    
    // 'Listen for event completion
    this.cameras.main.on('cameraflashcomplete', function(camera, effect) {

        // Camera Fades Out
        this.cameras.main.fade(500);

        // 'Listen' for event completion
        this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
            // Restarts
            this.scene.restart();
        }, this);
        
    }, this);


};



//set up config

let config={
    type: Phaser.AUTO,  //Phaser will use your WebGL if avalible automatically, if it's not, it will use the canvas we set up in our index.html file
    width: 1280,
    height: 720,
    scene: gameScene
};

let game= new Phaser.Game(config);