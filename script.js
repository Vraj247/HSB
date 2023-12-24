const startColorInput = document.getElementById("startColor");
const endColorInput = document.getElementById("endColor");
const numStepsInput = document.getElementById("numSteps");
const generateGradientButton = document.getElementById("generateGradient");
const gradientDiv = document.getElementById("gradient");

generateGradientButton.addEventListener("click", generateGradient);

function generateGradient() {
    const startColor = startColorInput.value;
    const endColor = endColorInput.value;
    const numSteps = parseInt(numStepsInput.value, 10);

    // Calculate intermediate colors
    const intermediateColors = calculateIntermediateColors(startColor, endColor, numSteps);

    // Display the gradient
    gradientDiv.innerHTML = "";
    intermediateColors.forEach(color => {
        const colorBox = document.createElement("div");
        colorBox.style.backgroundColor = color;
        colorBox.className = "color-box";
        gradientDiv.appendChild(colorBox);
    });
}

function calculateIntermediateColors(startColorHex, endColorHex, numSteps) {
    // Convert HEX to RGB for both colors
    const startColorRGB = hexToRGB(startColorHex);
    const endColorRGB = hexToRGB(endColorHex);

    // Calculate step size for each channel
    const stepSizeR = (endColorRGB.r - startColorRGB.r) / numSteps;
    const stepSizeG = (endColorRGB.g - startColorRGB.g) / numSteps;
    const stepSizeB = (endColorRGB.b - startColorRGB.b) / numSteps;

    // Initialize the array to store intermediate colors
    const intermediateColors = [];

    // Generate intermediate colors
    for (let i = 0; i < numSteps; i++) {
        const intermediateColor = {
            r: Math.round(startColorRGB.r + i * stepSizeR),
            g: Math.round(startColorRGB.g + i * stepSizeG),
            b: Math.round(startColorRGB.b + i * stepSizeB)
        };
        // Convert RGB to HEX and add to the array
        intermediateColors.push(rgbToHex(intermediateColor));
    }

    return intermediateColors;
}

// Convert HEX to RGB
function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// Convert RGB to HEX
function rgbToHex(rgb) {
    const rHex = rgb.r.toString(16).padStart(2, '0');
    const gHex = rgb.g.toString(16).padStart(2, '0');
    const bHex = rgb.b.toString(16).padStart(2, '0');
    return `#${rHex}${gHex}${bHex}`;
}
