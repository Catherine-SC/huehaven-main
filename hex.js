function hexToHue(hex) {
  // Remove the '#' if present.
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values.
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // Normalize the RGB values to the range [0, 1].
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate lightness.
  const lightness = (max + min) / 2;

  // Calculate saturation.
  let saturation = 0;
  if (delta === 0) {
    saturation = 0; // Achromatic, no saturation.
  } else {
    saturation = lightness < 0.5 ? (delta / (max + min)) : (delta / (2 - max - min));
  }

  // If saturation is below 5%, return -1.
  if (saturation < 0.05) {
    return -1;
  }

  // Calculate hue.
  let hue = 0;
  if (delta === 0) {
    hue = 0; // Undefined hue for gray; we use 0.
  } else if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = ((b - r) / delta) + 2;
  } else if (max === b) {
    hue = ((r - g) / delta) + 4;
  }
  
  hue = Math.round(hue * 60);
  if (hue < 0) {
    hue += 360;
  }
  
  return hue;
}



function getColorName(hex) {
  if (typeof hex !== 'string') {
    alert("Generate the color.\n");
  }
  const hue = hexToHue(hex);
  if (hue < 15 || hue >= 345) {
    return 'Red';
  } else if (hue >= 15 && hue < 45) {
    return 'Orange';
  } else if (hue >= 45 && hue < 75) {
    return 'Yellow';
  } else if (hue >= 75 && hue < 165) {
    return 'Green';
  } else if (hue >= 165 && hue < 255) {
    return 'Blue';
  } else if (hue >= 255 && hue < 345) {
    return 'Purple';
  }
  
}


function savePalette() {
  // let colorBoxes = document.querySelectorAll(".color-box span");
  // let colors = Array.from(colorBoxes).map(box => box.textContent);
  // localStorage.setItem("savedPalette", JSON.stringify(colors));
  // alert("Palette saved!");
  const keyword = getColorName(currentRandom);
  pinterestSearchUrl = getPinterestSearchLink(keyword);
  window.location.href = pinterestSearchUrl;
}
function generateAccessiblePalette() {
  let baseHex = document.getElementById("baseColorAccessibility").value.trim();
  if (!tinycolor(baseHex).isValid()) {
      alert("Invalid HEX Code! Please enter a valid color (e.g., #4285F4).");
      return;
  }

  document.getElementById("paletteDisplayAccessibility").innerHTML = "";
  document.getElementById("simulationDisplay").innerHTML = "";

  let baseColor = tinycolor(baseHex);
  let accessiblePalette = [
      baseColor.toHexString(),
      baseColor.lighten(20).toHexString(),
      baseColor.darken(20).toHexString(),
      baseColor.desaturate(30).toHexString(),
      baseColor.complement().toHexString()
  ];

  accessiblePalette.forEach(hex => {
      let colorBox = document.createElement("div");
      colorBox.className = "color-box";
      colorBox.style.backgroundColor = hex;
      colorBox.innerHTML = `<p>${hex}</p>`;
      document.getElementById("paletteDisplayAccessibility").appendChild(colorBox);
  });

  // Color Blindness Simulations
  let colorBlindSimulations = {
      "Normal Vision": baseColor.toHexString(),
      "Deuteranopia (Red-Green)": simulateColorBlindness(baseHex, "deuteranopia"),
      "Protanopia (Red Weakness)": simulateColorBlindness(baseHex, "protanopia"),
      "Tritanopia (Blue-Yellow)": simulateColorBlindness(baseHex, "tritanopia"),
      "Monochromacy (Total Color Blindness)": "#808080"
  };

  Object.entries(colorBlindSimulations).forEach(([type, hex]) => {
      let simBox = document.createElement("div");
      simBox.className = "color-box";
      simBox.style.backgroundColor = hex;
      simBox.innerHTML = `<p>${type}</p><p>${hex}</p>`;
      document.getElementById("simulationDisplay").appendChild(simBox);
  });
}

// Function to Simulate Color Blindness
function simulateColorBlindness(hex, type) {
  let color = tinycolor(hex);
  switch (type) {
      case "deuteranopia":
          return color.desaturate(50).toHexString();
      case "protanopia":
          return color.desaturate(60).toHexString();
      case "tritanopia":
          return color.spin(30).desaturate(40).toHexString();
      default:
          return color.toHexString();
  }
}