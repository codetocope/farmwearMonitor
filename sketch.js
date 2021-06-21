const knnClassifier = ml5.KNNClassifier(modelLoaded, 2, 1);
features = ml5.featureExtractor('MobileNet', modelLoaded);
state = 'prediction'; // set to 'training' to enable training the data
data = null;

function preload() {
    data = loadJSON('plantHealthDataset2.json');
}

function setup() {
    cnv = createCanvas(720, 454);
    video = createCapture(VIDEO);
    background(0);
    video.size(360, 227);
    video.hide();

    cnv.parent('cnvContainer');

    video.elt.addEventListener('loadeddata', (event) => {
        if (data != null) {
            knnClassifier.load('plantHealthDataset2.json', function () {
                console.log('dataset loaded');
    
                classify();
                state = 'prediction';
            });
        }
    }); 
}

function draw() {
    background(0);
    image(video, 0, 0, width, height);
}