var currentRandom;


function generateRandomPalette() {
    let colors = document.querySelectorAll(".color-box");
    colors.forEach(box => {
        let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        currentRandom = randomColor;
        box.style.backgroundColor=randomColor;
        box.children[0].textContent = randomColor; 
    });
}

function copyColor(element) {
    let colorCode = element.children[0].textContent;
    navigator.clipboard.writeText(colorCode);
    alert("Copied: " + colorCode);
}

// Generate a random palette when the page loads
window.onload = generatePalette;
// Function to suggest color palettes based on profession
function generateProfessionalPalette() {
    const profession = document.getElementById("profession-selector").value;
    let colors;

    // Define color palettes for different professions
    if (profession === "social-media") {
        colors = ["#FF1493", "#8A2BE2", "#00CED1", "#FFFF00", "#1E90FF"]; // Bright, vibrant colors
    } else if (profession === "corporate") {
        colors = ["#003366", "#D3D3D3", "#FFFFFF", "#FFD700"];// Professional, muted colors
    } else if (profession === "health") {
        colors = ["#98FB98", "#ADD8E6", "#F5F5DC", "#D8BFD8"]; // Calming, nature-based colors
    } else if (profession === "ecommerce") {
        colors = ["#FF6347", "#FFD700", "#32CD32", "#FFA500"]; // Bold, action-oriented colors
    } else if (profession === "education") {
        colors = ["#4682B4", "#32CD32", "#FAFAD2", "#9B30FF"]; // Soothing, intellectual colors
    }else if(profession==="Gaming"){
        colors=["00E5FF","8A2BE2","FFD700","1A1A1A"];
    }else if(profession==="Photography"){
        colors=["333333","F5F5F5","704214","C2A878"];
    }else if(profession==="Interior D"){
        colors=["00E5FF","8A2BE2","FFD700","1A1A1A"];
    }else if(profession==="Publishing"){
        colors=["FFFFFF","A8A29E","8B0000","000000"];
    }else if(profession==="Game Development"){
        colors=["00E5FF","8A2BE2","FFD700","1A1A1A"];
    }

    // Apply the color palette to the color boxes
    let colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box, index) => {
        if (colors[index]) {
            box.style.backgroundColor = colors[index];
            box.children[0].textContent = colors[index]; // Show hex code inside box
        }
    });
}
document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    // document.getElementById("body-div").classList.toggle("dark-mode");
});
function copyAllColors() {
    let colorBoxes = document.querySelectorAll(".color-box span");
    let colors = Array.from(colorBoxes).map(box => box.textContent).join(", ");
    navigator.clipboard.writeText(colors);
    alert("Copied: " + colors);
}

function getPinterestSearchLink(keyword) {
    // Replace spaces with URL-encoded spaces (%20)
    const encodedKeyword = encodeURIComponent(keyword);
    
    // Construct the Pinterest search URL
    const pinterestSearchUrl = `https://www.pinterest.com/search/pins/?q=${encodedKeyword}`;
    
    return pinterestSearchUrl;
}


function sharePalette() {
    let colorBoxes = document.querySelectorAll(".color-box span");
    let colors = Array.from(colorBoxes).map(box => box.textContent).join(", ");
    let shareText = `Check out my color palette: ${colors}`;
    let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, "_blank");
}


function generatePalette() {
    let baseHex = document.getElementById("baseColor").value.trim();
    if (!tinycolor(baseHex).isValid()) {
        // alert("Invalid HEX Code! Please enter a valid color (e.g., #4285F4).");
        return;
    }

    // Clear previous results
    document.getElementById("paletteDisplay").innerHTML = "";

    // Create palette based on color theory
    let baseColor = tinycolor(baseHex);
    let palette = {
        "Base Color": baseColor.toHexString(),
        "Complementary": baseColor.complement().toHexString(),
        "Analogous 1": baseColor.analogous()[1].toHexString(),
        "Analogous 2": baseColor.analogous()[2].toHexString(),
        "Triadic 1": baseColor.triad()[1].toHexString(),
        "Triadic 2": baseColor.triad()[2].toHexString(),
        "Monochromatic 1": baseColor.monochromatic()[1].toHexString(),
        "Monochromatic 2": baseColor.monochromatic()[2].toHexString()
    };

    // Display the generated color palette
    Object.entries(palette).forEach(([name, hex]) => {
        let colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = hex;
        colorBox.innerHTML = `<p>${name}</p><p>${hex}</p>`;
        document.getElementById("paletteDisplay").appendChild(colorBox);
    });
}

