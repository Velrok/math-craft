const images = ['castle.webp', 'farm.webp', 'painting.webp', 'shipwreck.webp'];
let imageOfTheDay;

async function setup() {
    // Seed with current date (same for whole day)
    let today = new Date();
    let seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    randomSeed(seed);

    let iotd = random(images);
    console.log('Loading image:', iotd);
    imageOfTheDay = await loadImage('/images/' + iotd);

    let canvas = createCanvas(1024, 768);
    canvas.parent('sketch-container');
    background(24);
    textAlign(CENTER, CENTER);
    textSize(32);
}

function draw() {
    background(24);

    if (imageOfTheDay) {
        image(imageOfTheDay, 0, 0, width, height);
    }

    fill(33, 150, 243);
    text('Welcome to MathCraft', width / 2, height / 2 + 20);
}
