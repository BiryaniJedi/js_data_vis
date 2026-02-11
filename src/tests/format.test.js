import test from 'node:test';
import assert from 'node:assert/strict';
import * as format from '../utils/format.js';

test('formatNumber', (t) => {
  t.test('default decimals', () => {
    assert.strictEqual(format.formatNumber(1234.5678), '1234.57');
  });

  t.test('zero decimals', () => {
    assert.strictEqual(format.formatNumber(1234.5678, 0), '1235');
  });

  t.test('three decimals', () => {
    assert.strictEqual(format.formatNumber(1234.5678, 3), '1234.568');
  });
});

test('formatCurrency', (t) => {
  t.test('default currency', () => {
    assert.strictEqual(format.formatCurrency(1234.56), '$1,234.56');
  });

  t.test('large number', () => {
    assert.strictEqual(format.formatCurrency(1234567.89), '$1,234,567.89');
  });

  t.test('custom currency', () => {
    assert.strictEqual(format.formatCurrency(1234.56, '£'), '£1,234.56');
  });

  t.test('small number', () => {
    assert.strictEqual(format.formatCurrency(999), '$999.00');
  });
});

test('formatPercent', (t) => {
  t.test('default decimals', () => {
    assert.strictEqual(format.formatPercent(0.1234), '12.3%');
  });

  t.test('two decimals', () => {
    assert.strictEqual(format.formatPercent(0.1234, 2), '12.34%');
  });

  t.test('whole percent', () => {
    assert.strictEqual(format.formatPercent(1), '100.0%');
  });
});

test('truncate', (t) => {
  t.test('truncates long text', () => {
    assert.strictEqual(format.truncate('Hello World', 8), 'Hello Wo');
  });

  t.test('keeps short text', () => {
    assert.strictEqual(format.truncate('Hello World', 20), 'Hello World');
  });
});

test('padString', (t) => {
  t.test('left align', () => {
    assert.strictEqual(format.padString('Hi', 5, 'left'), 'Hi   ');
  });

  t.test('right align', () => {
    assert.strictEqual(format.padString('Hi', 5, 'right'), '   Hi');
  });

  t.test('center align', () => {
    assert.strictEqual(format.padString('Hi', 5, 'center'), ' Hi  ');
  });

  t.test('no padding if too long', () => {
    assert.strictEqual(format.padString('Hello', 3, 'left'), 'Hello');
  });
});

test('createLabel', (t) => {
  t.test('basic label', () => {
    const label = format.createLabel('Sales', 1234.56);
    assert.strictEqual(label.length, 20);
    assert.ok(label.startsWith('Sales: '));
    assert.ok(label.includes('1234.56'));
  });

  t.test('custom width', () => {
    const label = format.createLabel('Revenue', 999, 15);
    assert.strictEqual(label.length, 15);
    assert.ok(label.startsWith('Revenue: '));
  });
});
