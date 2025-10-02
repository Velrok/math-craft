function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('sketch-container');
    background(240);
    textAlign(CENTER, CENTER);
    textSize(32);
}

function draw() {
    background(240);
    
    fill(50);
    text('Hello World!', width / 2, height / 2 - 50);
    
    fill(33, 150, 243);
    text('Welcome to MathCraft', width / 2, height / 2 + 20);
    
    fill(150);
    textSize(16);
    text('Your mathematical playground awaits...', width / 2, height / 2 + 80);
}