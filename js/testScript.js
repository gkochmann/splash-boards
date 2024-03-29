var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { // parameters: height, width, others
    transparent: true,
    //backgroundColor: '0x6bf442',
    antialias: true,
    autoResize: true
});

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
PIXI.loader.add("flyer1", "img/flyerexample1.gif")
           .load(setup);

function setup() {
    var list = [];

    // create a video texture from a path
    var video = document.createElement("video");
    video.preload = "auto";
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    video.src = "img/testVideo2.mp4";
    var videoTexture = PIXI.Texture.fromVideo(video);

    // create a new Sprite using the video texture
    // for (i = 0; i < 50; i++) {
        list.push(new PIXI.Sprite(videoTexture));
    // }
    // for (i = 0; i < 50; i++) { // set width & height
    //     list[i].width = 100;
    //     list[i].height = 100;
    // }

    // var xPos = 0;
    // var yPos = 0;
    // for (i = 1; i < 50; i++) {
    //     if (i % 10 != 0) {
    //         xPos += 100;
    //     } else {
    //         yPos += 100;
    //         xPos = 0;
    //     }
    //     list[i].x = xPos;
    //     list[i].y = yPos;
    // }
    
    
    // // add to stage
    // for (i = 0; i < 50; i++) {
    //     stage.addChild(list[i]);
    // }
    //stage.addChild(videosList[0]);
    list[0].width = 100;
    list[0].height = 100;
    list[0].x = 300;
    list[0].y = 300;
    stage.addChild(list[0]);

    // flyer 1
    flyer = new PIXI.Sprite(
        PIXI.loader.resources["flyer1"].texture
    );
    flyer.scale.set(0.25, 0.25);
    flyer.x = 50;
    flyer.y = 50;
    stage.addChild(flyer);
    
    animationLoop();
}

function animationLoop() {
    requestAnimationFrame(animationLoop);
    renderer.resize(window.innerWidth, window.innerHeight);
    // video

    render();
}

function render() {
    renderer.render(stage);
}
