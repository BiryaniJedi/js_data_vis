import Chart from './Chart.js';
import { autoScale } from '../utils/scale.js';
import { formatNumber, padString } from '../utils/format.js';

class HorizontalBarChart extends Chart {
    constructor(data, labels, width = 50, height = 50) {
        if (!Array.isArray(labels)) {
            throw new Error('Labels must be an array');
        }
        if (!Chart.validateNumericData(data)) {
            throw new Error('Data must be valid numberic data')
        }
        if (labels.length !== data.length) {
            throw new Error('There must be as many labels as data points')
        }
        if (width < 30) {
            throw new Error('Minimum width 30');
        }
        super(data, width, height);
        this.labels = labels;
    }

    render() {
        const n = this.data.length;
        const labelPadding = this.__maxLabelPadding();
        const valPadding = this.__maxValPadding();
        const scalePoint = this.drawingWidth - valPadding - labelPadding;
        const scaled = autoScale(this.data, scalePoint);
        if (Math.min(...scaled) < 0) {
            throw new Error(`Width too low, minimum required for dataset and labels: ${valPadding + labelPadding}`);
        }
        let chartStr = '';
        for (let i = 0; i < n; i++) {
            chartStr += this.__makeLine(scaled, i);
        }
        return chartStr;
    }

    __maxLabelPadding() {
        return Math.max(Math.max(...this.labels.map((label) => label.length)), 3) + 1;
    }

    __maxValPadding() {
        return Math.max(...this.data.map((val) => formatNumber(val, 2).length)) + 1;
    }

    __makeLine(scaledVals, index) {
        const valStr = formatNumber(this.data[index], 2);
        return `${padString(this.labels[index], this.__maxLabelPadding(), 'right')}┃${'█'.repeat(scaledVals[index])} ${valStr}\n`;
    }

}

export default HorizontalBarChart;
