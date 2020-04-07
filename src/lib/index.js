import equals from 'equals';


class DataModel {
  constructor(storeParams) {
    this.storeParams = storeParams;
    this.handle = {
      preClearDataHandle: [],
    };
    this.store = {};
  }
}

function handleTrigger(handleList) {
  handleList.forEach((fn) => {
    try {
      fn();
    } catch (e) {
      // empty
    }
  });
}

/**
 * @description 数据缓存器
 * @constructor
 * @typedef {object} CompareFuncMap - 包含用于属性值比较的compare函数
 * @property {function} ?prop - 将两个plainObject进行equal比较时，如果自定义了比较函数，
 * 那么将用该函数比较对应的属性值，否则使用@equals 进行比较。
 * @typedef {object} Option
 * @property {CompareFuncMap} compareFuncMap - 用于进行查询
 *
 * @param {Option} option
 */
export default class DataCacher {
  constructor(option) {
    this.cache = [];
    const { compareFuncMap } = option || {};
    this.compareFuncMap = Object.assign({}, compareFuncMap);
  }

  /**
   *
   * @param {plainObject} searchParams - 通过查询参数查询缓存中的数据
   *
   * @returns {object|null}
   */
  finder(searchParams) {
    if (!searchParams) return null;
    const searchParamsKeyLength = Object.values(searchParams)
      .filter(item => item !== undefined).length;
    return this.cache.find((dataModel) => {
      const storeParamsKeyLength = Object.values(dataModel.storeParams)
        .filter(item => item !== undefined).length;
      if (storeParamsKeyLength !== searchParamsKeyLength) return false;
      const storeParamsEntries = Object.entries(dataModel.storeParams);
      return storeParamsEntries.every(([storeParamsKey, storeParamsValue]) => {
        const compareFunc = this.compareFuncMap[storeParamsKey];
        if (compareFunc) {
          // 比较时searchParams的值在前，storeParams的值在后
          return compareFunc(searchParams[storeParamsKey], storeParamsValue);
        }
        return equals(searchParams[storeParamsKey], storeParamsValue);
      });
    });
  }

  /**
   *
   * @description 通过storeParams设置指定key的value
   *
   * @param {plainObject} storeParams
   * @param {string} key
   * @param {*} value
   */

  setData(storeParams, key, value) {
    if (typeof key !== 'string') return;
    let dataModel = this.finder(storeParams);
    if (!dataModel) {
      dataModel = new DataModel(storeParams);
      this.cache.push(dataModel);
    }
    dataModel.store[key] = value;
  }

  /**
   *
   * @description 通过storeParams设置clearData前的回调，不可重复设置相同的回调
   *
   * @param {plainObject} storeParams
   * @param {function} fn
   *
   * @returns {boolean} hasSet - 是否设置成功。
   */

  setClearDataHandle(storeParams, fn) {
    if (typeof fn !== 'function') return false;
    let dataModel = this.finder(storeParams);
    if (!dataModel) {
      dataModel = new DataModel(storeParams);
      this.cache.push(dataModel);
    }
    const handleList = dataModel.handle.preClearDataHandle;
    if (handleList.indexOf(fn) === -1) {
      handleList.push(fn);
      return true;
    }
    return false;
  }

  /**
   * @description 通过searchParams查询缓存的数据
   *
   * @param {object} searchParams
   * @param {?string} key - 获取缓存数据store中的指定值，不传值时获取整个store
   *
   * @returns {*} data
   */
  getData(searchParams, key) {
    const dataModel = this.finder(searchParams);
    if (!dataModel) return undefined;
    return !key ? dataModel.store : dataModel.store[key];
  }

  clearData() {
    const { cache } = this;
    while (cache.length) {
      const dataModel = cache.pop();
      handleTrigger(dataModel.handle.preClearDataHandle);
    }
  }
}
