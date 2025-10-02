const images = ['castle.webp', 'farm.webp', 'painting.webp', 'shipwreck.webp'];
let imageOfTheDay;

let puzzles = [
  {sector: 1, solved: false},
  {sector: 2, solved: false},
  {sector: 3, solved: false},
  {sector: 4, solved: false},
  {sector: 5, solved: false},
  {sector: 6, solved: false},
  {sector: 7, solved: false},
  {sector: 8, solved: false},
  {sector: 9, solved: false}
]

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

    // Draw background image
    if (imageOfTheDay) {
        image(imageOfTheDay, 0, 0, width, height);
    }

    // Calculate grid dimensions
    const cols = 3;
    const rows = 3;
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    // Draw each puzzle sector
    puzzles.forEach((puzzle, index) => {
        // Convert flat index to row/col
        const col = index % cols;
        const row = Math.floor(index / cols);

        // Calculate position
        const x = col * cellWidth;
        const y = row * cellHeight;

        // Draw sector overlay (only if not solved)
        if (!puzzle.solved) {
            fill(0, 0, 0, 180);
            rect(x, y, cellWidth, cellHeight);
        }

        // Draw grid lines
        noFill();
        stroke(255, 255, 255, 100);
        strokeWeight(2);
        rect(x, y, cellWidth, cellHeight);
    });
}
