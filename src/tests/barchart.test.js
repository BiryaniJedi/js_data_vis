import test from 'node:test';
import assert from 'node:assert/strict';
import BarChart from '../charts/BarChart.js';

test('BarChart constructor', (t) => {
  t.test('creates bar chart with numeric data and labels', () => {
    const chart = new BarChart([10, 20, 30], ['A', 'B', 'C']);
    assert.deepStrictEqual(chart.data, [10, 20, 30]);
    assert.deepStrictEqual(chart.labels, ['A', 'B', 'C']);
  });

  t.test('throws error for non-numeric data', () => {
    assert.throws(() => new BarChart(['10', 20, 30], ['A', 'B', 'C']), {
      message: 'Data must be valid numberic data'
    });
  });

  t.test('throws error when labels is not an array', () => {
    assert.throws(() => new BarChart([10, 20, 30], null), {
      message: 'Labels must be an array'
    });
  });

  t.test('throws error when labels length does not match data', () => {
    assert.throws(() => new BarChart([10, 20, 30], ['A', 'B']), {
      message: 'There must be as many labels as data points'
    });
  });
});

test('BarChart inherits from Chart', (t) => {
  t.test('has Chart methods', () => {
    const chart = new BarChart([10, 20, 30], ['A', 'B', 'C']);
    assert.strictEqual(typeof chart.setTitle, 'function');
    assert.strictEqual(typeof chart.setColors, 'function');
    assert.strictEqual(typeof chart.getData, 'function');
  });

  t.test('can use Chart setters', () => {
    const chart = new BarChart([10, 20, 30], ['A', 'B', 'C']);
    chart.setTitle('Test Chart');
    assert.strictEqual(chart.title, 'Test Chart');
  });

  t.test('can chain methods', () => {
    const chart = new BarChart([10, 20, 30], ['X', 'Y', 'Z']);
    const result = chart.setTitle('Test').setColors(['red', 'blue']);
    assert.strictEqual(result, chart);
  });
});

test('BarChart render method', (t) => {
  t.test('renders without crashing', () => {
    const chart = new BarChart([10, 20, 30], ['A', 'B', 'C']);
    assert.doesNotThrow(() => chart.render());
  });

  t.test('handles single data point', () => {
    const chart = new BarChart([42], ['X']);
    assert.doesNotThrow(() => chart.render());
  });

  t.test('renders different heights for different values', () => {
    const chart = new BarChart([5, 10, 15, 20], ['A', 'B', 'C', 'D']);
    assert.doesNotThrow(() => chart.render());
  });
});

test('BarChart visual output (manual check)', (t) => {
  t.test('renders example chart to console', () => {
    console.log('\n--- Example Bar Chart ---');
    const chart = new BarChart([10, 25, 15, 30, 20], ['Q1', 'Q2', 'Q3', 'Q4', 'Q5']);
    chart.setTitle('Quarterly Sales');
    chart.render();
    console.log('--- End of Chart ---\n');
  });

  t.test('renders chart with equal values', () => {
    console.log('\n--- Equal Values Chart ---');
    const chart = new BarChart([20, 20, 20], ['A', 'B', 'C']);
    chart.setTitle('All Equal');
    chart.render();
    console.log('--- End of Chart ---\n');
  });

  t.test('renders chart with one tall bar', () => {
    console.log('\n--- One Tall Bar ---');
    const chart = new BarChart([5, 100, 10], ['Low', 'High', 'Med']);
    chart.setTitle('Wide Range');
    chart.render();
    console.log('--- End of Chart ---\n');
  });
});
