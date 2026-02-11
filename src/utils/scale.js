const linearScale = (value, inputMin, inputMax, outputMin, outputMax) => {
  if (inputMin === inputMax) {
    return inputMin;
  }
  const percentInput = (value-inputMin)  / (inputMax - inputMin);
  return Math.round(outputMin + (percentInput * (outputMax - outputMin)));
}

const autoScale = (dataArray, maxHeight) => {
  const min = Math.min(...dataArray);
  const max = Math.max(...dataArray);
  return dataArray.map((x) => linearScale(x, min, max, 0, maxHeight));
}

const normalizeData = (dataArray) => {
  const min = Math.min(...dataArray);
  const max = Math.max(...dataArray);
  if (max - min === 0) {
    return dataArray;
  }
  return dataArray.map((x) => (x - min) / (max - min));
}

export { linearScale, autoScale, normalizeData };
