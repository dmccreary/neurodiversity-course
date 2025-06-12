// global variables for width and height
let containerWidth; // calculated by container
let containerHeight = 600; // fixed height on page

// Variables for the visualization
let currentHover = -1;
let levels = [];

function setup() {
    // Create a canvas to match the parent container's size
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    
    // Define the literacy framework pillars
    levels = [
        {
            level: "Phonemic Awareness",
            color: "#6A5ACD", // Slate Blue
            tcolor: "white",
            description: "The ability to hear, identify, and manipulate individual sounds (phonemes) in spoken words. This is foundational for decoding skills."
        },
        {
            level: "Phonics",
            color: "#1E90FF", // Dodger Blue
            tcolor: "white",
            description: "The understanding of letter-sound relationships to decode and spell words. Systematic phonics instruction is a core component of early reading."
        },
        {
            level: "Fluency",
            color: "#3CB371", // Medium Sea Green
            tcolor: "black",
            description: "The capacity to read text accurately, quickly, and with proper expression. Fluency helps bridge word recognition and comprehension."
        },
        {
            level: "Vocabulary",
            color: "#FFD700", // Gold
            tcolor: "black",
            description: "Instruction in word meanings, morphology, and word-learning strategies to boost comprehension and expressive language."
        },
        {
            level: "Comprehension",
            color: "#FF8C00", // Dark Orange
            tcolor: "black",
            description: "The ability to understand and interpret text. Strategies include summarizing, questioning, predicting, and connecting ideas."
        }
    ];
}

function draw() {
    background('aliceblue');

    const baseWidth = min(containerWidth * 0.8, 500);
    const triangleHeight = min(containerHeight * 0.65, 450);
    const startX = (containerWidth - baseWidth) / 2;
    const startY = triangleHeight + 70;

    for (let i = 0; i < levels.length; i++) {
        const sectHeight = triangleHeight / levels.length;
        const currentY = startY - (i * sectHeight);
        const currentWidth = baseWidth * (1 - (i / levels.length));
        const currentX = startX + (baseWidth - currentWidth) / 2;

        levels[i].coords = {
            x: currentX,
            y: currentY - sectHeight,
            w: currentWidth,
            h: sectHeight
        };

        fill(levels[i].color);
        if (i === currentHover) {
            stroke('black');
            strokeWeight(3);
        } else {
            noStroke();
        }

        beginShape();
        vertex(currentX, currentY);
        vertex(currentX + currentWidth, currentY);
        vertex(currentX + currentWidth, currentY - sectHeight);
        vertex(currentX, currentY - sectHeight);
        endShape(CLOSE);

        fill(levels[i].tcolor);
        noStroke();
        textAlign(CENTER, CENTER);
        let levelTextSize = constrain(containerWidth * 0.04, 10, 24);
        textSize(levelTextSize);
        text(levels[i].level, currentX + currentWidth/2, currentY - sectHeight/2);
    }

    fill('black');
    noStroke();
    let titleSize = constrain(containerWidth * 0.04, 16, 24);
    textSize(titleSize);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("Five Pillars of the Groves Literacy Framework", containerWidth/2, 30);

    const descriptionY = min(triangleHeight + 110, containerHeight - 90);

    const keyBoxHeight = 40;
    const keyBoxY = descriptionY - keyBoxHeight;
    const keyBoxWidth = 100;
    const keyBoxX = 10;

    noStroke();
    fill('aliceblue');
    rect(keyBoxX, keyBoxY, keyBoxWidth, keyBoxHeight, 5);

    if (currentHover !== -1) {
        const keySquareSize = 30;
        const keyPadding = 10;

        fill(levels[currentHover].color);
        rect(keyBoxX + keyPadding, keyBoxY + (keyBoxHeight - keySquareSize) / 2, 
             keySquareSize, keySquareSize);

        fill('black');
        noStroke();
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        let keyTextSize = constrain(containerWidth * 0.025, 12, 14);
        textSize(keyTextSize);
        text(levels[currentHover].level, 
             keyBoxX + keyPadding + keySquareSize + 10, 
             keyBoxY + keyBoxHeight / 2);
    }

    if (currentHover !== -1) {
        fill('black');
        noStroke();
        let descSize = constrain(containerWidth * 0.025, 12, 14);
        textSize(descSize);
        textAlign(LEFT, TOP);
        textStyle(NORMAL);
        const descWidth = containerWidth - 40;
        text(levels[currentHover].description, 20, descriptionY, descWidth);
    } else {
        fill('#666666');
        noStroke();
        let instructSize = constrain(containerWidth * 0.025, 12, 14);
        textSize(instructSize);
        textAlign(CENTER, TOP);
        textStyle(NORMAL);
        text("Hover over each level to see detailed description", containerWidth/2, descriptionY);
    }
}

function mouseMoved() {
    currentHover = -1;
    for (let i = 0; i < levels.length; i++) {
        const coords = levels[i].coords;
        if (coords && 
            mouseX >= coords.x && 
            mouseX <= coords.x + coords.w && 
            mouseY >= coords.y && 
            mouseY <= coords.y + coords.h) {
            currentHover = i;
            break;
        }
    }
}

function touchStarted() {
    mouseMoved();
    return false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
}
