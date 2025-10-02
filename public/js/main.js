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
    const cols = 3;
    const rows = 3;
    const imgWidth = imageOfTheDay.width;
    const imgHeight = imageOfTheDay.height;
    const cellWidth = imgWidth / cols;
    const cellHeight = imgHeight / rows;

    for (let i = 0; i < 9; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * cellWidth;
        const y = row * cellHeight;

        // Create a copy of the sector and blur it
        let sectorImg = createImage(cellWidth, cellHeight);
        sectorImg.copy(imageOfTheDay, x, y, cellWidth, cellHeight, 0, 0, cellWidth, cellHeight);
        sectorImg.filter(BLUR, blur);

        blurredSectors.push(sectorImg);
    }
}

function draw() {
    background(24);

    // Draw background image
    if (imageOfTheDay) {
        image(imageOfTheDay, 0, 0, width, height);
    }

    // Calculate grid dimensions based on canvas (which scales the image)
    const cols = 3;
    const rows = 3;
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    // Draw each puzzle sector
    puzzles.forEach((puzzle, index) => {
        // Convert flat index to row/col
        const col = index % cols;
        const row = Math.floor(index / cols);

        // Calculate position on canvas
        const x = col * cellWidth;
        const y = row * cellHeight;

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
