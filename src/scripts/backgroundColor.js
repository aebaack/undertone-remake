import rgbHex from 'rgb-hex';

export function determineBackgroundColor() {
  const backgroundColors = [
      '#1976D2', // blue
      '#EF6C00', // orange
      '#7E57C2', // purple
      '#00897B' // teal
    ];

    if (!document.body.style.backgroundColor || !backgroundColors.includes('#' + rgbHex(document.body.style.backgroundColor).toUpperCase())) {
      document.body.style.backgroundColor = 
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    }
}