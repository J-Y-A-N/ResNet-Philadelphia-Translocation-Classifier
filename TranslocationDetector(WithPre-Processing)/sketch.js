let classifier;
// A variable to hold the image we want to classify
let img;

function preload() {
 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hv8GjPMTv/' + 'model.json');
}

function setup() {
   const c = createCanvas(710, 400);
  background(100);
  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
  
  var drawButton = createButton("Classify Image");
  drawButton.mousePressed(classify);
}

function classify() {
  classifier.classify(img, gotResult);
}

function gotResult(error, results) {
  console.log('Model Ready');
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  var resultField = document.getElementById('result');
  var confidenceField = document.getElementById('confidence');
  resultField.innerText = "Result: " + results[0].label;
  confidenceField.innerText = "Confidence Level: " + nf(results[0].confidence, 0, 2)
  //createDiv("Label:" + results[0].label);
  //createDiv("Confidence: " + nf(results[0].confidence, 0, 2));
}

function draw() {
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text('Drag an image of chromosome 9 and 22 combined onto the canvas.', width / 2, height / 2);
  noLoop();
}

function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    img = createImg(file.data).hide();
    // Draw the image onto the canvas
    image(img, 0, 0, width, height);
  } else {
    alert('Not an image file/You have not put an image!');
  }
}
