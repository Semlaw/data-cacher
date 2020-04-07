import { boundsIncludeTest } from '../src/lib/compare';


/**
 *
 * @description boundsIncludeTest 判断 E-F-G-H（bounds）是否包含于A-B-C-D（containerBounds），默认两者都和坐标系平行。
 *
 * A--------B
 * | E----F |
 * | |    | |
 * | |    | |
 * | H----G |
 * D--------C
 *
 * @typedef {array<number>} lnglat - 一个坐标点，数组第一位表示x轴坐标，数组第二位标识y轴坐标，例如 [121.212,31.322]
 * @typedef {object} bounds - 一个矩形范围（和坐标轴平行）
 * @property {lnglat} northeast
 * @property {lnglat} southwest
 *
 * @param {bounds} bounds
 * @param {bounds} containerBounds
 *
 * @returns {boolean} isInclude
 *
 */
const bounds = {
  northeast: [121.345, 31.678],
  southwest: [121.123, 31.234],
};

const containerBounds = {
  northeast: [121.545, 31.878],
  southwest: [121.023, 31.204],
};

test('containerBounds 包含 bounds', () => {
  expect(boundsIncludeTest(bounds, containerBounds)).toBe(true);
});

test('containerBounds 包含 containerBounds', () => {
  expect(boundsIncludeTest(containerBounds, containerBounds)).toBe(true);
});

test('bounds 包含 bounds', () => {
  expect(boundsIncludeTest(bounds, bounds)).toBe(true);
});


const bounds2 = {
  northeast: [99.123, 21.678],
  southwest: [88.456, 20.445],
};

const containerBounds2 = {
  northeast: [99.123, 21.677],
  southwest: [88.456, 20.445],
};

test('containerBounds2 不包含 bounds2', () => {
  expect(boundsIncludeTest(bounds2, containerBounds2)).not.toBe(true);
});
