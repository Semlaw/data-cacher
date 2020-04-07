# data-cacher

a data caching tool

## Usage

## `setData`-`getData`

```js
import DataCacher from 'data-cacher';

const dataCacher = new DataCacher();
const sotreParams = {
  name: 'tom',
  gender: 1,
  model: { age: 20, country: 'UAS' },
};
const searchParams = {
  name: 'tom',
  gender: 1,
  model: { country: 'UAS', age: 20 },
};
dataCacher.setData(sotreParams, 'tel', 10010);
dataCacher.getData(searchParams, 'tel'); // 10010
```

## `getData` with nokey

```js
import DataCacher from 'data-cacher';

const dataCacher = new DataCacher();
const sotreParams = {
  name: 'tom',
  gender: 1,
  model: { age: 20, country: 'UAS' },
};
const searchParams = {
  name: 'tom',
  gender: 1,
  model: { country: 'UAS', age: 20 },
};
dataCacher.setData(sotreParams, 'tel', 10010);
dataCacher.getData(searchParams); // {tel:10010}
```

## `clearData`

```js
const dataCacher = new DataCacher();
const sotreParams = {
  name: 'lisa',
  gender: 0,
  model: { age: 20, country: 'UAS' },
};
dataCacher.setData(sotreParams, 'score', 99);
dataCacher.clearData();
dataCacher.getData(
  {
    name: 'lisa',
    gender: 0,
    model: { age: 20, country: 'UAS' },
  },
  'score'
); // undefined
```

## `setClearDataHandle`

```js
const dataCacher = new DataCacher();
const sotreParams = {
  name: 'lisa',
  gender: 0,
  model: { age: 20, country: 'UAS' },
};
const obj = {
  callTimes: 0,
};
dataCacher.setData(sotreParams, 'score', 99);
const cb = () => {
  obj.callTimes += 1;
}
dataCacher.setClearDataHandle(sotreParams, cb); // true
dataCacher.setClearDataHandle(sotreParams, cb); // false  (Cannot be added repeatedly)

dataCacher.clearData();
obj.callTimes // 1
```
