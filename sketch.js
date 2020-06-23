let snake;
let rez = 20;
let food;
let w;
let h;
let audioControl;
let videoControl;
let video;
let label = '';
let flipVideo;
let audio;
let videoButton;
let audioButton;

function results(error, result) {

  if (error) {
    console.error(error)
  } else {

    label = result[0].label;
    controlSnake()

    console.log(result[0].label)
    
    document.querySelector('h3').innerHTML=label;
    


    classifyVideo();
  }
}

function videoReady() {

  console.log('the video is ready')
}

function preload() {
  audioControl = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/reNyBmqd_/model.json');


  videoControl = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NRcrewOR5/model.json');
// song=loadSong('/sound.mp3')

}

function classifyAudio() {



  audioControl.classify(results);

}


function classifyVideo() {

  flipVideo = ml5.flipImage(video)



  videoControl.classify(flipVideo, results);



}








function setup() {
  
   videoButton = createButton("Video Control");


  audioButton = createButton("Voice Control");
 // song.play(); 
  
  let canvas=createCanvas(500, 500);
  canvas.center();
  // canvas.position(0.3*width,500,'relative')



  //   videoButton= createButton('video controller');

 

   videoButton.mousePressed(function() {

    classifyVideo();
    console.log('Video control is on')
    document.getElementById('controls').innerHTML = " Video Control"

  })

audioButton.mousePressed(function() {

    classifyAudio();
    console.log('Audio control is on')
    document.getElementById('controls').innerHTML = " Voice Control"

  })

  video = createCapture(VIDEO, videoReady);
  video.size(500, 500);
  video.hide();

  //   classifyAudio();

  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(4);
  snake = new Snake();
  foodLocation();

}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function controlSnake() {
  if (label === 'left') {
    snake.setDir(1, 0);
  } else if (label === 'right') {
    snake.setDir(-1, 0);
  } else if (label === 'down') {
    snake.setDir(0, 1);
  } else if (label === 'up') {
    snake.setDir(0, -1);
    // } else if (key == ' ') {
    //   snake.grow();
    // } else if (keyCode === 32) {
    //   setup()
  }

}

function draw() {





  background(255);
 //  // image(video,0,0);  
 // image(video, 0, 0, 500, 500);
 
   
  translate(width,0); // move to far corner
  scale(-1.0,1.0);    // flip x-axis backwards
  image(video, 0, 0, width, height); //vid
 tint(255, 120);
 // document.querySelector('#directions').innerHTML=label;

  scale(rez);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();



  if (snake.endGame()) {
    print("END GAME");

    document.querySelector('h1').innerHTML='the game has ended';

    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}