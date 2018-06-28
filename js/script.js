var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { // parameters: height, width, others
    transparent: true,
    //backgroundColor: '0x6bf442',
    antialias: true,
    autoResize: true
});

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

// image attempt
//PIXI.loader.add("pic1", "images/grant.png").load(setup);
PIXI.loader
    .add("flyer1", "images/flyerexample1.gif")
    .add("flyer2", "images/grant.png")
    .add("spritesheet1", "images/mario-jump.png")
    .add("video1", "images/testVideo.mp4")
    .load(setup);

var af = 0;
var df = 4; // fps
var maxFrame = 5;
var frames = [];
function setup() {
    // flyer 1
    flyer = new PIXI.Sprite(
        PIXI.loader.resources["flyer1"].texture
    );
    flyer.scale.set(0.25, 0.25);
    flyer.anchor.set(0.5, 0.5);
    
    
    // flyer 2
    grant = new PIXI.Sprite(
        PIXI.loader.resources["flyer2"].texture
    );
    grant.scale.set(0.25, 0.25);
    grant.x = grant.width;
    grant.y = grant.height;
    grant.anchor.set(0.5, 0.5);
    //stage.removeChild(grant); //or grant.visible = false;
    
    // flyer 3
    frames.push(new PIXI.Rectangle(0, 0, 90, 175),
               new PIXI.Rectangle(90, 0, 90, 175),
               new PIXI.Rectangle(190, 0, 90, 175),
               new PIXI.Rectangle(290, 0, 90, 175),
               new PIXI.Rectangle(190, 0, 90, 175));
    marioTexture = PIXI.loader.resources["spritesheet1"].texture;
    marioTexture.frame = frames[0];
    mario = new PIXI.Sprite(marioTexture);
    mario.x = window.innerWidth / 2;
    mario.y = window.innerHeight / 2;

    // video
    // create a video texture from a path
    var videoTexture = PIXI.Texture.fromVideo('Images/testVideo.mp4');
    // create a new Sprite using the video texture
    videoSprite = new PIXI.Sprite(videoTexture);
    videoSprite.width = screen.width;
    videoSprite.height = screen.height;
    
    // add to stage
    stage.addChild(flyer);
    stage.addChild(grant);
    stage.addChild(mario);
    //stage.addChild(videoSprite);

    animationLoop();
}

function animationLoop() {
    requestAnimationFrame(animationLoop);
    renderer.resize(window.innerWidth, window.innerHeight);
    
    // flyer 1
    flyer.x = renderer.width / 4;
    flyer.y = renderer.height / 4;
    
    // flyer 2
    grant.rotation += 0.01;

    // flyer 3
    if (af >= maxFrame) {
        af = 0;
    } else {
        af += 1/df;
    }
    
    marioTexture.frame = frames[Math.floor(af)];
    stage.removeChild(mario);
    mario = new PIXI.Sprite(marioTexture);
    mario.x = window.innerWidth - mario.width;
    mario.y = window.innerHeight - mario.height;
    stage.addChild(mario);

    // video

    render();
}

function render() {
    renderer.render(stage);
}
