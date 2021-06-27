const knnClassifier = ml5.KNNClassifier(modelLoaded, 2, 1);
features = ml5.featureExtractor('MobileNet', modelLoaded);
state = 'prediction'; // set to 'training' to enable training the data
data = null;

function preload() {
    data = loadJSON('plantHealthDataset2.json');
}

function setup() {

    frameRate(12);
    //cnv = createCanvas(720, 454);
    let videoWidth = windowWidth/4;
    cnv = createCanvas((windowWidth/3) * (4/3), windowWidth/3);
    video = createCapture(VIDEO);
    background(0);
    //video.size(360, 227);
    video.size(videoWidth * (4/3), videoWidth);
    video.hide();

    cnv.parent('cnvContainer');

    video.elt.addEventListener('loadeddata', (event) => {
        if (data != null) {
            knnClassifier.load('plantHealthDataset2.json', function () {
                console.log('dataset loaded');
    
                classify();
                state = 'prediction';
            });
        } else {
            console.log('failed to load JSON data');
        }
    }); 
}

function draw() {
    background(0);
    image(video, 0, 0, width, height);
}