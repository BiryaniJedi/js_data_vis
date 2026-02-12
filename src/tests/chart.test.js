import test from 'node:test';
import assert from 'node:assert/strict';
import Chart from '../charts/Chart.js';

test('Chart constructor', (t) => {
    t.test('creates chart with valid data', () => {
        const chart = new Chart([1, 2, 3], 500, 400);
        assert.strictEqual(chart.width, 500);
        assert.strictEqual(chart.height, 400);
        assert.deepStrictEqual(chart.data, [1, 2, 3]);
    });

    t.test('uses default dimensions', () => {
        const chart = new Chart([1, 2, 3]);
        assert.strictEqual(chart.width, 400);
        assert.strictEqual(chart.height, 300);
    });

    t.test('throws error for non-array data', () => {
        assert.throws(() => new Chart('not an array'), {
            message: 'Data must be an array'
        });
    });

    t.test('throws error for empty array', () => {
        assert.throws(() => new Chart([]), {
            message: 'Data cannot be empty'
        });
    });

    t.test('throws error for invalid dimensions', () => {
        assert.throws(() => new Chart([1, 2, 3], -100, 200), {
            message: 'Width and height must be positive'
        });
    });
});

test('Chart getters', (t) => {
    t.test('drawingWidth accounts for margins', () => {
        const chart = new Chart([1, 2, 3], 500, 400);
        // Default margins are all 0
        assert.strictEqual(chart.drawingWidth, 500);

        // After setting margins
        chart.setMargins(40, 20, 40, 60);
        // width(500) - left(60) - right(20) = 420
        assert.strictEqual(chart.drawingWidth, 420);
    });

    t.test('drawingHeight accounts for margins', () => {
        const chart = new Chart([1, 2, 3], 500, 400);
        // Default margins are all 0
        assert.strictEqual(chart.drawingHeight, 400);

        // After setting margins
        chart.setMargins(40, 20, 40, 60);
        // height(400) - top(40) - bottom(40) = 320
        assert.strictEqual(chart.drawingHeight, 320);
    });
});

test('Chart methods', (t) => {
    t.test('setTitle updates title', () => {
        const chart = new Chart([1, 2, 3]);
        chart.setTitle('Test Chart');
        assert.strictEqual(chart.title, 'Test Chart');
    });

    t.test('setTitle returns this for chaining', () => {
        const chart = new Chart([1, 2, 3]);
        const result = chart.setTitle('Test');
        assert.strictEqual(result, chart);
    });

    t.test('setColors updates colors', () => {
        const chart = new Chart([1, 2, 3]);
        const newColors = ['red', 'blue', 'green'];
        chart.setColors(newColors);
        assert.deepStrictEqual(chart.colors, newColors);
    });

    t.test('setColors throws error for invalid input', () => {
        const chart = new Chart([1, 2, 3]);
        assert.throws(() => chart.setColors([]), {
            message: 'Colors must be a non-empty array'
        });
    });

    t.test('setMargins updates margins', () => {
        const chart = new Chart([1, 2, 3]);
        chart.setMargins(50, 30, 50, 70);
        assert.deepStrictEqual(chart.margins, { top: 50, right: 30, bottom: 50, left: 70 });
    });

    t.test('setData updates data', () => {
        const chart = new Chart([1, 2, 3]);
        chart.setData([4, 5, 6]);
        assert.deepStrictEqual(chart.data, [4, 5, 6]);
    });

    t.test('getData returns data', () => {
        const chart = new Chart([1, 2, 3]);
        assert.deepStrictEqual(chart.getData(), [1, 2, 3]);
    });

    t.test('getColor returns color by index', () => {
        const chart = new Chart([1, 2, 3]);
        assert.strictEqual(chart.getColor(0), '#3498db');
        assert.strictEqual(chart.getColor(1), '#e74c3c');
    });

    t.test('getColor wraps around for large indices', () => {
        const chart = new Chart([1, 2, 3]);
        // colors array has 5 items, so index 5 wraps to 0
        assert.strictEqual(chart.getColor(5), chart.getColor(0));
    });
});

test('Chart render method', (t) => {
    t.test('throws error when called directly', () => {
        const chart = new Chart([1, 2, 3]);
        assert.throws(() => chart.render(), {
            message: 'render() must be implemented by subclass'
        });
    });
});

test('Chart validation', (t) => {
    t.test('validateNumericData returns true for valid numbers', () => {
        const result = Chart.validateNumericData([1, 2, 3.5, -10]);
        assert.strictEqual(result, true);
    });

    t.test('validateNumericData returns false for non-numeric data', () => {
        const result = Chart.validateNumericData(['1', 2, 3]);
        assert.strictEqual(result, false);
    });

    t.test('validateNumericData returns false for NaN', () => {
        const result = Chart.validateNumericData([1, NaN, 3]);
        assert.strictEqual(result, false);
    });
});

test('Method chaining', (t) => {
    t.test('can chain multiple methods', () => {
        const chart = new Chart([1, 2, 3]);
        const result = chart
            .setTitle('Test Chart')
            .setColors(['red', 'blue'])
            .setMargins(50, 30, 50, 70)
            .setData([4, 5, 6]);

        assert.strictEqual(chart.title, 'Test Chart');
        assert.deepStrictEqual(chart.colors, ['red', 'blue']);
        assert.deepStrictEqual(chart.data, [4, 5, 6]);
        assert.strictEqual(result, chart);
    });
});
