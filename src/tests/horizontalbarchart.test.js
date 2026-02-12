import test from 'node:test';
import assert from 'node:assert/strict';
import HorizontalBarChart from '../charts/HorizontalBarChart.js';

test('HorizontalBarChart constructor', (t) => {
    t.test('creates horizontal bar chart with data and labels', () => {
        const chart = new HorizontalBarChart([10, 20, 30], ['A', 'B', 'C']);
        assert.deepStrictEqual(chart.data, [10, 20, 30]);
        assert.deepStrictEqual(chart.labels, ['A', 'B', 'C']);
    });

    t.test('accepts custom width and height', () => {
        const chart = new HorizontalBarChart([10, 20], ['A', 'B'], 100, 200);
        assert.strictEqual(chart.width, 100);
        assert.strictEqual(chart.height, 200);
    });

    t.test('uses default dimensions', () => {
        const chart = new HorizontalBarChart([10, 20], ['A', 'B']);
        assert.strictEqual(chart.width, 50);
        assert.strictEqual(chart.height, 50);
    });

    t.test('throws error for width too small', () => {
        assert.throws(() => new HorizontalBarChart([10, 20], ['A', 'B'], 20), {
            message: 'Minimum width 30'
        });
    });

    t.test('throws error for non-numeric data', () => {
        assert.throws(() => new HorizontalBarChart(['10', 20, 30], ['A', 'B', 'C']), {
            message: 'Data must be valid numberic data'
        });
    });

    t.test('throws error when labels is not an array', () => {
        assert.throws(() => new HorizontalBarChart([10, 20, 30], null));
    });

    t.test('throws error when labels length does not match data', () => {
        assert.throws(() => new HorizontalBarChart([10, 20, 30], ['A', 'B']));
    });
});

test('HorizontalBarChart inherits from Chart', (t) => {
    t.test('has Chart methods', () => {
        const chart = new HorizontalBarChart([10, 20, 30], ['A', 'B', 'C']);
        assert.strictEqual(typeof chart.setTitle, 'function');
        assert.strictEqual(typeof chart.setColors, 'function');
        assert.strictEqual(typeof chart.getData, 'function');
    });

    t.test('can use Chart setters', () => {
        const chart = new HorizontalBarChart([10, 20, 30], ['A', 'B', 'C']);
        chart.setTitle('Test Chart');
        assert.strictEqual(chart.title, 'Test Chart');
    });

    t.test('can chain methods', () => {
        const chart = new HorizontalBarChart([10, 20, 30], ['X', 'Y', 'Z']);
        const result = chart.setTitle('Test').setColors(['red', 'blue']);
        assert.strictEqual(result, chart);
    });
});

test('HorizontalBarChart render method', (t) => {
    t.test('returns a string', () => {
        const chart = new HorizontalBarChart([10, 20, 30], ['A', 'B', 'C']);
        const output = chart.render();
        assert.strictEqual(typeof output, 'string');
        assert.ok(output.length > 0);
    });

    t.test('renders without crashing', () => {
        const chart = new HorizontalBarChart([10, 20, 30], ['A', 'B', 'C']);
        assert.doesNotThrow(() => chart.render());
    });

    t.test('includes labels in output', () => {
        const chart = new HorizontalBarChart([10, 20, 30], ['First', 'Second', 'Third']);
        const output = chart.render();
        assert.ok(output.includes('First'));
        assert.ok(output.includes('Second'));
        assert.ok(output.includes('Third'));
    });

    t.test('handles single data point', () => {
        const chart = new HorizontalBarChart([42], ['Single']);
        const output = chart.render();
        assert.ok(output.length > 0);
    });

    t.test('longer bars for larger values', () => {
        const chart = new HorizontalBarChart([10, 100, 20], ['Low', 'High', 'Mid']);
        const output = chart.render();

        // Split into lines and find the bars
        const lines = output.split('\n');
        const lowLine = lines.find(l => l.includes('Low'));
        const highLine = lines.find(l => l.includes('High'));
        const midLine = lines.find(l => l.includes('Mid'));

        // High should have the longest line
        assert.ok(highLine.length >= lowLine.length);
        assert.ok(highLine.length >= midLine.length);
    });
});

test('HorizontalBarChart visual output (manual check)', (t) => {
    t.test('renders example chart to console', () => {
        console.log('\n--- Horizontal Bar Chart Example ---');
        const chart = new HorizontalBarChart(
            [450, 720, 320, 580, 410],
            ['Q1 Sales', 'Q2 Sales', 'Q3 Sales', 'Q4 Sales', 'Q5 Sales']
        );
        chart.setTitle('Quarterly Revenue');
        console.log(chart.render());
        console.log('--- End of Chart ---\n');
    });

    t.test('renders chart with wide canvas', () => {
        console.log('\n--- Wide Canvas Example ---');
        const chart = new HorizontalBarChart(
            [30, 50, 20],
            ['Category A', 'Category B', 'Category C'],
            100  // Wide canvas
        );
        chart.setTitle('Wide Canvas Demo');
        console.log(chart.render());
        console.log('--- End of Chart ---\n');
    });

    t.test('renders chart with varying label lengths', () => {
        console.log('\n--- Varying Label Lengths ---');
        const chart = new HorizontalBarChart(
            [100, 75, 90, 60],
            ['A', 'Medium Label', 'VeryLongLabelName', 'Avg']
        );
        chart.setTitle('Label Alignment Test');
        console.log(chart.render());
        console.log('--- End of Chart ---\n');
    });
});
