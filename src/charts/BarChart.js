import Chart from './Chart.js';
import { autoScale, linearScale } from '../utils/scale.js';
import { formatNumber, createLabel, padString } from '../utils/format.js';

class BarChart extends Chart {
    constructor(data, labels, barThickness = 5, width = 400, height = 300, alignBars = 'left') {
        if (!Array.isArray(labels)) {
            throw new Error('Labels must be an array');
        }
        if (!Chart.validateNumericData(data)) {
            throw new Error('Data must be valid numberic data')
        }
        if (labels.length !== data.length) {
            throw new Error('There must be as many labels as data points')
        }
        if (typeof barThickness !== 'number' || isNaN(barThickness)) {
            throw new Error('barThickness must be a number')
        }
        const validAligns = {
            'left': 0,
            'center': 0,
            'right': 0,
        }
        if (!alignBars in validAligns) {
            throw new Error(`alignBars option must be one of 'left' (default), 'center', or 'right'.`)
        }
        super(data, width, height);
        this.labels = labels;
        this.barThickness = Math.max(3, barThickness);
        this.alignBars = alignBars;
    }

    render() {
        const thisHeight = this.drawingHeight;
        const chartPointWidth = Math.max(Math.max(...this.labels.map((label) => label.length)), 3) + 2 + this.barThickness; //maximum label width + 2
        const scaled = autoScale(this.data, thisHeight);
        const maxOgVal = Math.max(...this.data);
        const maxScaledVal = Math.max(...scaled);
        const refNumPad = formatNumber(maxOgVal, 2).length;
        const numLines = Math.max(0, Math.floor(thisHeight / 5));

        const scaledToOg = (scaledVal) => linearScale(scaledVal, 0, maxScaledVal, 0, maxOgVal);

        const indStep = numLines === 0 ? 0 : Math.floor(thisHeight / numLines + 1);
        let indCounter = thisHeight - indStep * (numLines + 1);
        let chartStr = '';
        for (let currHeight = thisHeight - 1; currHeight >= 0; currHeight--) {
            if (currHeight !== thisHeight - 1 && indCounter !== indStep - 1) {
                chartStr += ' '.repeat(refNumPad + 2);
            } else {
                chartStr += padString(scaledToOg(currHeight + 1).toFixed(2), refNumPad, 'right') + ' ‾';
                indCounter = 0;
            }
            chartStr += '┃'
            chartStr += scaled.reduce((acc, val) => {
                return val > currHeight ? acc + padString('█'.repeat(this.barThickness), chartPointWidth, this.alignBars) : acc + ' '.repeat(chartPointWidth);
            }, '') + '\n';

            if (indStep !== 0) {
                indCounter++;
            }
        }

        chartStr += padString('0', refNumPad + 1, 'right') + '  ' + '‾'.repeat(scaled.length * chartPointWidth) + '\n';
        chartStr += this.labels.reduce((acc, label) => {
            return acc + padString(label, chartPointWidth, this.alignBars);
        }, ' '.repeat(refNumPad + 3));

        return chartStr;
    }

}
const chart = new BarChart([1, 1, 2], ['A', 'B', 'C'], 10, 30, 15, 'left');
console.log(chart.render());

export default BarChart;
