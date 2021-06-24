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

    screenshotBtn = select('#screenshotBtn');

    screenshotBtn.elt.addEventListener('click', (event) => {
        html2canvas(document.body).then(canvas => {
            saveAs(canvas.toDataURL(), 'screenshot.jpg');
        });
    });

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

function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        link.click();
        
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}
