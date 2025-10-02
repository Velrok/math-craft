const images = ['castle.webp', 'farm.webp', 'painting.webp', 'shipwreck.webp'];
let imageOfTheDay;
let blurredSectors = [];
const blur = 50;
let timesTables = [];

let puzzles = [
  {sector: 1, solved: false},
  {sector: 2, solved: false},
  {sector: 3, solved: false},
  {sector: 4, solved: true},
  {sector: 5, solved: false},
  {sector: 6, solved: false},
  {sector: 7, solved: true},
  {sector: 8, solved: false},
  {sector: 9, solved: false}
]

function forEachPuzzle(callback, useWidth = width, useHeight = height) {
    const cols = 3;
    const rows = 3;
    const cellWidth = useWidth / cols;
    const cellHeight = useHeight / rows;

    puzzles.forEach((puzzle, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * cellWidth;
        const y = row * cellHeight;

        callback(puzzle, index, x, y, cellWidth, cellHeight);
    });
}

async function setup() {
    // Seed with current date (same for whole day)
    let today = new Date();
    let seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    randomSeed(seed);

    // Generate times tables (2-10)
    for (let i = 2; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            timesTables.push({
                query: `${i} × ${j}`,
                result: i * j
            });
        }
    }

    puzzles.forEach((puzzle, idx) => {
        puzzle.challenge = random(timesTables)
    })

    let iotd = random(images);
    console.log('Loading image:', iotd);
    imageOfTheDay = await loadImage('/images/' + iotd);

    let canvas = createCanvas(1024, 768);
    canvas.parent('sketch-container');
    background(24);
    textAlign(CENTER, CENTER);
    textSize(32);

    // Pre-create blurred sector images based on original image dimensions
    forEachPuzzle((puzzle, index, x, y, cellWidth, cellHeight) => {
        // Create a copy of the sector and blur it
        let sectorImg = createImage(cellWidth, cellHeight);
        sectorImg.copy(imageOfTheDay, x, y, cellWidth, cellHeight, 0, 0, cellWidth, cellHeight);
        sectorImg.filter(BLUR, blur);

        blurredSectors.push(sectorImg);
    }, imageOfTheDay.width, imageOfTheDay.height);
}

function draw() {
    background(24);

    // Draw background image
    if (imageOfTheDay) {
        image(imageOfTheDay, 0, 0, width, height);
    }

    // Draw each puzzle sector
    forEachPuzzle((puzzle, index, x, y, cellWidth, cellHeight) => {
        // Draw sector overlay (only if not solved)
        if (!puzzle.solved) {
            // Draw blurred sector (scaled to canvas dimensions)
            image(blurredSectors[index], x, y, cellWidth, cellHeight);

            // Add glassy overlay
            fill(255, 255, 255, 60);
            rect(x, y, cellWidth, cellHeight);
        }

        // Draw grid lines
        noFill();
        stroke(255, 255, 255, 100);
        strokeWeight(1);
        rect(x, y, cellWidth, cellHeight);
    });
}
