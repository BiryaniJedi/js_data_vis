import test from 'node:test';
import assert from 'node:assert/strict';
import * as color from '../utils/color.js';

test('hexToRgb', (t) => {
  t.test('regular hex', () => {
    assert.deepStrictEqual(color.hexToRgb('#ff5733'), [255, 87, 51]);
  });

  t.test('short hex', () => {
    assert.deepStrictEqual(color.hexToRgb('#abc'), [170, 187, 204]);
  });

  t.test('no hash', () => {
    assert.deepStrictEqual(color.hexToRgb('ff5733'), [255, 87, 51]);
  });
});

test('rgbToHex', (t) => {
  t.test('regular colors', () => {
    assert.strictEqual(color.rgbToHex([255, 87, 51]), '#ff5733');
  });

  t.test('black', () => {
    assert.strictEqual(color.rgbToHex([0, 0, 0]), '#000000');
  });

  t.test('white', () => {
    assert.strictEqual(color.rgbToHex([255, 255, 255]), '#ffffff');
  });
});

test('generatePalette', (t) => {
  t.test('generates correct count', () => {
    const palette = color.generatePalette('#3498db', 5);
    assert.strictEqual(palette.length, 5);
    assert.strictEqual(palette[2], '#3498db'); // Middle should be base color
  });
});

test('interpolateColor', (t) => {
  t.test('at 0', () => {
    assert.strictEqual(color.interpolateColor('#ff0000', '#0000ff', 0), '#ff0000');
  });

  t.test('at 1', () => {
    assert.strictEqual(color.interpolateColor('#ff0000', '#0000ff', 1), '#0000ff');
  });

  t.test('at 0.5', () => {
    const result = color.interpolateColor('#ff0000', '#0000ff', 0.5);
    const rgb = color.hexToRgb(result);
    assert.ok(rgb[0] > 100 && rgb[0] < 150); // Should be around 127
    assert.strictEqual(rgb[1], 0);
    assert.ok(rgb[2] > 100 && rgb[2] < 150); // Should be around 127
  });
});
