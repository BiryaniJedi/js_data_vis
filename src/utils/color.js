const hexToRgb = (hex) => {
  hex = (hex.length === 4 || hex.length === 7) ? hex.slice(1) : hex;
  if (hex.length !== 3 && hex.length !== 6) {
    return [0, 0, 0];
  }
  if (hex.length === 3) {
    return [...hex].map((str) => parseInt(str + str, 16));
  }
  let ret = [];
  for (let i = 0; i < 6; i += 2) {
    ret.push(parseInt(hex.substring(i, i + 2), 16));
  }
  return ret;
}

const rgbToHex = (rgb) => {
  return rgb
    .map((num) => Math.max(0, Math.min(255, num)))
    .reduce((retStr, base10num) => {
      const hexStr = base10num.toString(16);
      return hexStr.length === 2 ? retStr + hexStr : retStr + '0' + hexStr;
    }, '#')
}

const generatePalette = (baseColorHex, count) => {
  if (count === 1) {
    return [baseColorHex];
  }
  const baseRgb = hexToRgb(baseColorHex);
  let iterations = 1;
  let scales = [1];
  while (iterations < count) {
    if (iterations % 2 === 0) {
      scales.push(scales.at(-1) + 0.25);
    } else {
      scales = [scales[0] - 0.25, ...scales];
    }
    iterations++;
  }
  console.log(`scales: ${scales}`);
  return scales.map((scale) => {
    const scaledAndMapped = baseRgb
      .map((num) => Math.round(num * scale))
      .map((num) => Math.max(0, Math.min(255, num)));

    return rgbToHex(scaledAndMapped);
  })
}

const interpolateColor = (color1Hex, color2Hex, factor) => {
  const rgb1 = hexToRgb(color1Hex);
  const rgb2 = hexToRgb(color2Hex);
  let ret = [];
  for (let i = 0; i < 3; i++) {
    ret.push(Math.round(rgb1[i] + (rgb2[i] - rgb1[i]) * factor));
  }
  console.log(ret);
  return rgbToHex(ret);
}
console.log(`interpolateColor: ${interpolateColor('#ff0000', '#0000ff', 1)}`);
export { hexToRgb, rgbToHex, generatePalette, interpolateColor }
