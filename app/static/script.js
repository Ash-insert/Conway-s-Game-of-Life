let grid;
let cols;
let rows;
let resolution = 20;
let simulationRunning = false;
let startButton;
let stopButton;
let randomButton;
let resolutionButton;
let resolutionInput;
let probabilityInput; 
let framerateInput;

function setup() {
    canvas = createCanvas(800, 600);
    canvas.parent('CanvasContainer'); // This sets the parent element for the canvas
    cols = floor(width / resolution);
    rows = floor(height / resolution);
    grid = createGrid(cols, rows);

    // Start Stop Simulation
    startButton = document.getElementById('startButton');
    stopButton = document.getElementById('stopButton');
    startButton.addEventListener('click', startSimulation);
    stopButton.addEventListener('click', stopSimulation);

    // Random Fill
    randomButton = document.getElementById('randomButton');
    probabilityInput = document.getElementById('probabilityInput'); // Get the value of probability
    probabilityInput.addEventListener('input', updateProbabilityValue);
    randomButton.addEventListener('click', randomFillGrid);

    // Change the speed of the simulation
    framerateInput = document.getElementById('framerateInput');
    framerateInput.addEventListener('input', updateFrameRateValue);

    // Change grid size
    resolutionInput = document.getElementById('ResolutionInput');
    resolutionButton = document.getElementById('ResolutionButton');
    resolutionButton.addEventListener('click', updateGridSize);
 }

function updateGridSize() {
    resolution = parseInt(resolutionInput.value);
    cols = floor(width / resolution);
    rows = floor(height / resolution);
    grid = createGrid(cols, rows);
}

function updateProbabilityValue() {
    let value = probabilityInput.value;
    document.getElementById('probabilityValue').textContent = value; // Update span with selected value
}

function updateFrameRateValue() {
    let value = framerateInput.value;
    document.getElementById('framerateValue').textContent = value;
}

function draw() {
    background(51);
    drawGridLines();
    drawGrid();
    frameRate(parseInt(framerateInput.value))
    if (simulationRunning) {
        let next = createEmptyGrid(cols, rows);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                let neighbors = countNeighbors(grid, i, j);
                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }
        grid = next;
    }
}

function mousePressed() {
    if (mouseX < width && mouseY < height) {
        let i = floor(mouseX / resolution);
        let j = floor(mouseY / resolution);
        grid[i][j] = 1 - grid[i][j]; // toggle cell state
    }
}

function drawGridLines() {
    for (let i=0; i<width; i+=resolution) {
        for(let j=0; j<height; j+=resolution) {
            stroke(0)
            strokeWeight(1)
            line(i, 0, i, height)
            line(0, j, width, j)
        }
    }
}

function drawGrid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(0,100,0);
                stroke(255);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }
}

function createGrid(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows).fill(0);
    }
    return grid;
}

function createEmptyGrid(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows).fill(0);
    }
    return grid;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function startSimulation() {
    simulationRunning = true;
}

function stopSimulation() {
    simulationRunning = false;
}

function randomFillGrid() {
    let probability = parseFloat(probabilityInput.value);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = random() < probability ? 1 : 0; // Randomly fill cells with 50% probability
        }
    }
}
 