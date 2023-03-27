// game.js in notes

//create a new scene

let gameScene= new Phaser.Scene('Game');

gameScene.init=function() {
    //speed for the player
    this.goodSpeed=3.69;

    //speed for the enemies
    this.evilMinSpeed=2;
    this.evilMaxSpeed=4;

    //bounds
    this.evilMinY=80;
    this.evilMaxY=280;
};

gameScene.preload=function(){
    //load our sprites / images
    this.load.image('backdrop','assets/background.png');
    this.load.image('evil','assets/player.png');
    this.load.image('good','assets/dragon.png');
    this.load.image('gold','assets/treasure.png')
};
//called once preload is over
gameScene.create=function(){
    this.backdrop=this.add.sprite(0,0,'backdrop');
    this.evil=this.add.sprite(0,0,'evil');
    this.evil2=this.add.sprite(0,0,'evil');
    this.evil3=this.add.sprite(0,0,'evil');
    this.good=this.add.sprite(0,0,'good');
    this.treasure=this.add.sprite(0,0,'gold')
    //set origin point
    // backdrop.setOrigin(0,0);
    
    //positions
    this.backdrop.setPosition(640/2, 360/2);
    // this.evil.setPosition(590/2, 360/2);
    // this.evil2.setPosition(790/2, 360/2);
    // this.evil3.setPosition(990/2, 360/2);
    this.good.setPosition(100/2, 380/2);
    this.treasure.setPosition(1125/2, 360/2);
    
    //enemies
    this.evils = this.add.group({
        key: 'evil',
        repeat: 5,
        setXY: {
            x: 110,
            y: 100,
            stepX: 80,
            stepY: 20
        },
        setScale: {
            x: 0.7,
            y: 0.7
        }
        
    });

    //set flipX & speed
    Phaser.Actions.Call(this.evils.getChildren(), function(evil) {
        //flipx
        evil.flipX = true;

        //enemy direction
        let dir = Math.random() < 0.5 ? 1 : -1;
        //enemy speed
        // let speed = this.evilMinSpeed + Math.random() * (this.evilMaxSpeed - this.evilMinSpeed);
        let speed = 0.5;
        //enemy movement
        this.evil.speed = dir * speed;
    }, this);

    // this.evil.flipX = true;
    // this.evil2.flipX = true;
    // this.evil3.flipX = true;

    // this.evil.scaleX = 0.7;
    // this.evil.scaleY = 0.7;
    // this.evil2.scaleX = 0.7;
    // this.evil2.scaleY = 0.7;
    // this.evil3.scaleX = 0.7;
    // this.evil3.scaleY = 0.7;

    //player
    this.good.scaleX = 0.5;
    this.good.scaleY = 0.3;

    this.treasure.setScale(.75);
    
};

//this will run up to 60 times per second
gameScene.update=function() {

    //get enemies

    let evils = this.evils.getChildren();
    let numEvils = evils.length;

    for(let i = 0; i < numEvils; i++) {
        evils[i].y += this.evil.speed;

        let conditionUp = evils[i].speed < 0 && evils[i].y <= 80;
        let conditionDown = evils[i].speed > 0 && evils[i].y >= 280;

        if (conditionUp || conditionDown) {
            evils[i].speed *= -1;
        }
        // if (evils[i].speed < 0 && evils[i].y <= this.evilMinY) {
        //     evils[i].speed *= -1;
        // }
        
        // if (evils[i].speed > 0 && evils[i].y >= this.evilMaxY) {
        //     evils[i].speed *= -1;
        // }
    }
    //make enemeies move up AND down (and spin!!!)
    // this.evil.y += this.evil.speed;
    // this.evil2.y += this.evil.speed;
    // this.evil3.y += this.evil.speed;
    // this.evil.angle+=3;
    // this.evil2.angle+=3;
    // this.evil3.angle+=3;

    //check if enemies have reached min/max y position
    

    
    if(this.input.activePointer.isDown){
        this.good.x+=this.goodSpeed;
    };
    let goodRect=this.good.getBounds();
    let treasureRect=this.treasure.getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(goodRect,treasureRect)) {
        console.log('YOU WIN! YOU ARE AN EPIC GAMER!!!!!!!');
        this.scene.restart()
        return;
    }

    

};



//set up config

let config={
    type: Phaser.AUTO,  //Phaser will use your WebGL if avalible automatically, if it's not, it will use the canvas we set up in our index.html file
    width: 640,
    height: 360,
    scene: gameScene
};

let game= new Phaser.Game(config);