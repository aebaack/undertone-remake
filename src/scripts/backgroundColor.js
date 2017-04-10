import rgbHex from 'rgb-hex';

export function determineBackgroundColor() {
  const backgroundColors = [
      '#1976D2', // blue
      '#EF6C00', // orange
      '#7E57C2', // purple
      '#00897B' // teal
    ];

    if (!document.body.style.backgroundColor || !backgroundColors.includes('#' + rgbHex(document.body.style.backgroundColor).toUpperCase())) {
      const newBodyColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
      document.body.style.backgroundColor = newBodyColor;
      
      changeFavicon(`/favicons/${newBodyColor.slice(1)}.ico`);
    }
}

// Change favicon to match body background color
// https://gist.github.com/mathiasbynens/428626
function changeFavicon(src) {
  const link = document.createElement('link');
  const oldLink = document.getElementById('dynamic-favicon');
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}