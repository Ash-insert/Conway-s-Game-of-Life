let grid;
let cols;
let rows;
let resolution = 15;
let simulationRunning = false;
let startButton;
let stopButton;
let randomButton;
let resolutionButton;
let resolutionInput;
let probabilityInput; 
let framerateInput;
let selectPattern;
let emptyGridButton;
let loadPattern;
let savePatternButton;

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

    // Select and Load pattern
    selectPattern = document.getElementById('SelectPattern');
    loadPattern = document.getElementById('LoadPattern');
    loadPattern.addEventListener('click', LoadPattern);

    // Empty Grid
    emptyGridButton = document.getElementById('emptyGridButton');
    emptyGridButton.addEventListener('click', emptyGrid);

    //Save Pattern
    savePatternButton = document.getElementById('SavePatternButton');
    savePatternButton.addEventListener('click', savePattern);
 }

function emptyGrid() {
    grid = createEmptyGrid(cols, rows);
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

function createPulsar() {
    let pulsarPattern = Array(13);
    let pulsarRow1 = [0, 0, 1, 1, 1, 0, 0, 0, 1 ,1, 1, 0, 0];
    let pulsarRow2 = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1];
    pulsarPattern[0] = pulsarRow1;
    pulsarPattern[1] = Array(13).fill(0);
    pulsarPattern[2] = pulsarRow2;
    pulsarPattern[3] = pulsarRow2;
    pulsarPattern[4] = pulsarRow2;
    pulsarPattern[5] = pulsarRow1;
    pulsarPattern[6] = Array(13).fill(0);
    pulsarPattern[7] = pulsarRow1;
    pulsarPattern[8] = pulsarRow2;
    pulsarPattern[9] = pulsarRow2;
    pulsarPattern[10] = pulsarRow2;
    pulsarPattern[11] = Array(13).fill(0);
    pulsarPattern[12] = pulsarRow1;
    return pulsarPattern;
}

function LoadPattern() {
    let gliderPattern = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ];
    let toadPattern = [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
    ];
    let beaconPattern = [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1]
    ];
    let  pentaDecathlon = [
        [1, 1, 1, 1, 1, 1, 1, 1] ,
        [1, 0, 1, 1, 1, 1, 0, 1] ,
        [1, 1, 1, 1, 1, 1, 1, 1] 
    ];
    let LWSS =  [
        [0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ];
    let MWSS = [
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 0, 1, 0]
    ];
    let HWSS = [
        [0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0, 0]
    ];
    let Rpentomino = [
        [0, 1, 1],
        [1, 1, 0],
        [0, 1, 0]
    ];
    let Diehard = [
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [1, 0, 1],
        [1, 0, 0]
    ];
    let Acorn = [
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 0, 1, 1, 1]
    ];
    let BLSE = [
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0]
    ];
    let pulsarPattern = createPulsar();
    
    var dict = {
        'Glider' : gliderPattern,
        'Toad' : toadPattern,
        'Pulsar' : pulsarPattern,
        'Beacon' : beaconPattern,
        'Penta-Decathlon' : pentaDecathlon,
        'LWSS' : LWSS,
        'MWSS' : MWSS,
        'HWSS' : HWSS,
        'R-pentomino' : Rpentomino,
        'Diehard' : Diehard,
        'Acron' : Acorn,
        'BLSE' : BLSE
    }

    if (selectPattern.value == 'Select Pattern') {
        alert('Please select a pattern.')
    }
    else {
        let Pattern = dict[selectPattern.value];

        let startX = floor(cols/2) - floor(Pattern.length/2);
        let startY = floor(rows/2) - floor(Pattern[0].length/2);
    
        for (let i=0 ; i < Pattern.length; i++ ) {
            for (let j=0; j < Pattern[i].length; j++) {
                grid[startX + i][startY + j] = Pattern[i][j];
            }
        }
    }
}

function savePattern(){
    const usernameInput = document.getElementById('UsernameInput').value;
    const patternNameInput = document.getElementById('PatternNameInput').value;
    const patternDetails = document.getElementById('PatternDetails').value;

    if (simulationRunning == true) {
        alert('Stop the simulation before saving.')
        return;
    }
    
    //extract data
    const gridData = extractGridData();
    
    // options for fetch 
    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( {
            username : usernameInput,
            patternName : patternNameInput,
            patternDetails : patternDetails,
            gridData : gridData
        }
        )
    };
    
    //Send data to server (route "save-pattern")using fetch method
    fetch('/save-pattern', options)
    .then(Response => {
        if (Response.ok) {
            alert("Pattern Saved Succesfully.");
        }
        else {
            alert("Failed to save the pattern.");
        }
    })

    .catch( error => {
        console.error('Error saving pattern:', error);
        alert("An error occured while saving pattern");
    });  
}

// Function to extract grid data
function extractGridData() {
    const gridData = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) { 
                gridData.push({ x: i, y: j }); // Store position of live cell
            }
        }
    }
    return gridData;
}

function loadSavedPattern(gridData){
    alert("loading grid data");
}

function dummy()
{
    alert("dummy function is working");
}
