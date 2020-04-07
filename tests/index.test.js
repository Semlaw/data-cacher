import DataCacher from '../src';
import { boundsIncludeTest } from '../src/lib/compare';


test('get data by searchParams and key ', () => {
  const dataCacher = new DataCacher();

  const sotreParams = {
    name: 'tom',
    gender: 1,
    model: { country: 'UAS', age: 20 }
  };

  const sotreParams2 = {
    age: 25
  };

  dataCacher.setData(sotreParams, 'tel', 10010);
  dataCacher.setData(sotreParams2, 'age', 10);

  const searchParams = { name: 'tom', gender: 1, model: { age: 20, country: 'UAS' } };
  expect(dataCacher.getData(searchParams, 'tel')).toBe(10010);
  expect(dataCacher.getData({ age: 25 }, 'age')).toBe(10);
});

test('get data by searchParams', () => {
  const dataCacher = new DataCacher();
  const sotreParams = {
    name: 'tom',
    gender: 1,
    model: { age: 20, country: 'UAS' }
  };
  dataCacher.setData(sotreParams, 'tel', 10010);

  const sotreParams2 = {
    customId: 10,
    score: 99,
  };
  const obj = { age: 1 };
  dataCacher.setData(sotreParams, 'tel', 10010);
  dataCacher.setData(sotreParams2, 'obj', obj);

  const searchParams = { name: 'tom', gender: 1, model: { age: 20, country: 'UAS' } };
  expect(dataCacher.getData(searchParams).tel).toBe(10010);
  expect(dataCacher.getData({ customId: 10, score: 99 }).obj).toBe(obj);
});


test('get data by searchParams with empty value', () => {
  const dataCacher = new DataCacher();
  const sotreParams = {
    name: 'lisa',
    gender: 0,
    addrese: undefined,
    model: { age: 20, country: 'UAS' }
  };

  dataCacher.setData(sotreParams, 'score', 99);
  const searchParams = {
    name: 'lisa',
    gender: 0,
    addrese: undefined,
    model: { age: 20, country: 'UAS' }
  };
  expect(dataCacher.getData(searchParams, 'score')).toBe(99);
});


test('test clearData', () => {
  const dataCacher = new DataCacher();
  const sotreParams = {
    name: 'lisa',
    gender: 0,
    addrese: undefined,
    model: { age: 20, country: 'UAS' }
  };
  const sotreParams2 = {
    name: 'tom',
    gender: 1,
  };
  dataCacher.setData(sotreParams, 'score', 99);
  dataCacher.setData(sotreParams2, 'score2', 100);
  dataCacher.clearData();
  expect(dataCacher.getData({
    name: 'lisa',
    gender: 0,
    addrese: undefined,
    model: { age: 20, country: 'UAS' }
  }, 'score')).toBe(undefined);
  expect(dataCacher.getData({
    name: 'tom',
    gender: 1,
  }, 'score')).toBe(undefined);
});


test('test clearDataHandle', () => {
  const dataCacher = new DataCacher();
  const sotreParams = {
    name: 'lisa',
    gender: 0,
    model: { age: 20, country: 'UAS' }
  };
  const sotreParams2 = {
    name: 'tom',
    gender: 1,
  };
  const obj = {
    callTimes: 0,
    callTimes2: 0,
  };
  dataCacher.setData(sotreParams, 'score', 99);
  dataCacher.setClearDataHandle({
    name: 'lisa',
    gender: 0,
    model: { age: 20, country: 'UAS' }
  }, () => {
    obj.callTimes += 1;
  });

  dataCacher.setClearDataHandle(sotreParams2, () => {
    obj.callTimes2 += 1;
  });

  dataCacher.clearData();
  expect(obj.callTimes).toBe(1);
  expect(obj.callTimes2).toBe(1);
});

test('test repeat add clearDataHandle', () => {
  const dataCacher = new DataCacher();
  const sotreParams = {
    name: 'lisa',
    gender: 0,
    model: { age: 20, country: 'UAS' }
  };
  const obj = {
    callTimes: 0,
    callTimes2: 0,
  };
  function fn() {
    obj.callTimes += 1;
  }
  dataCacher.setData(sotreParams, 'score', 99);
  dataCacher.setClearDataHandle(sotreParams, fn);
  dataCacher.setClearDataHandle(sotreParams, fn);
  dataCacher.setClearDataHandle(sotreParams, fn);

  dataCacher.clearData();
  expect(obj.callTimes).toBe(1);
});

test('get data by searchParams with boundsIncludeTest ', () => {
  const dataCacher = new DataCacher({
    compareFuncMap: {
      bounds: boundsIncludeTest,
    }
  });

  const bounds = {
    northeast: [121.345, 31.678],
    southwest: [121.123, 31.234],
  };

  const containerBounds = {
    northeast: [121.545, 31.878],
    southwest: [121.023, 31.204],
  };

  const sotreParams = {
    name: 'tom',
    gender: 1,
    bounds: containerBounds,
    model: { age: 20, country: 'UAS' }
  };
  const searchParams = {
    name: 'tom',
    gender: 1,
    bounds,
    model: { age: 20, country: 'UAS' }
  };


  dataCacher.setData(sotreParams, 'tel', 10010);

  expect(dataCacher.getData(searchParams, 'tel')).toBe(10010);
});


test('get data by searchParams with boundsIncludeTest ', () => {
  const dataCacher = new DataCacher({
    compareFuncMap: {
      bounds: boundsIncludeTest,
    }
  });

  const bounds = {
    northeast: [99.123, 21.678],
    southwest: [88.456, 20.445],
  };

  const containerBounds = {
    northeast: [99.123, 21.677],
    southwest: [88.456, 20.445],
  };

  const sotreParams = {
    name: 'tom',
    gender: 1,
    bounds: containerBounds,
    model: { age: 20, country: 'UAS' }
  };
  const searchParams = {
    name: 'tom',
    gender: 1,
    bounds,
    model: { age: 20, country: 'UAS' }
  };


  dataCacher.setData(sotreParams, 'tel', 10010);

  expect(dataCacher.getData(searchParams, 'tel')).not.toBe(10010);
});
