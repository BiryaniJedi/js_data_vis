import test from 'node:test';
import assert from 'node:assert/strict';
import * as scale from '../utils/scale.js';

test('linearScale', (t) => {
    t.test('regular', () => {
        assert.strictEqual(scale.linearScale(50, 0, 100, 0, 20), 10, 'Expected value: 10')
    });

    t.test('const range', () => {
        assert.strictEqual(scale.linearScale(50, 100, 100, 0, 20), 100, 'Expected value: 100')
    });
});

test('autoScale', (t) => {
    t.test('regular', () => {
        assert.deepStrictEqual(scale.autoScale([10, 20, 30, 40], 10), [3, 5, 8, 10], 'Expected value: [0, 3, 7, 10]')
    });

    t.test('const arr', () => {
        assert.deepStrictEqual(scale.autoScale([4, 4, 4]), [4, 4, 4], 'Expected value: [4, 4, 4]')
    });
});

test('normalizeData', (t) => {
    t.test('regular', () => {
        assert.deepStrictEqual(scale.normalizeData([10, 20, 30]), [0, 0.5, 1], 'Expected value: [0, 0.5, 1]')
    });

    t.test('const arr', () => {
        assert.deepStrictEqual(scale.normalizeData([4, 4, 4]), [4, 4, 4], 'Expected value: [4, 4, 4]')
    });
});
