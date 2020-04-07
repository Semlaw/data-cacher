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

// eslint-disable-next-line import/prefer-default-export
export function boundsIncludeTest(bounds, containerBounds) {
  const [right, top] = bounds.northeast;
  const [left, bottom] = bounds.southwest;
  const [containerRight, containerTop] = containerBounds.northeast;
  const [containerLeft, containerBottom] = containerBounds.southwest;
  return (right <= containerRight
    && left >= containerLeft && top <= containerTop && bottom >= containerBottom);
}
