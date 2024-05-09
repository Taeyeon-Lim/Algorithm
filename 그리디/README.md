# 그리디

<details>
    <summary>[S4] 백준 11047 - 동전 0</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const [NK, ...coins] = input.split('\n');
let [N, K] = NK.split(' ').map(Number);
const coinValues = coins.map(Number);
let result = 0;

for (let i = N - 1; i >= 0; i--) {
  result += Math.floor(K / coinValues[i]);
  K %= coinValues[i];
}

console.log(result);
```

</details>

<details>
    <summary>[G5] 백준 11000 - 강의실 배정</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const rooms = [];
let openClassCount = 0;
let result = 0;

for (let i = 1; i <= N; i++) {
  const time = input[i].split(' ').map(Number);

  rooms.push(time[0], -time[1]);
}

rooms
  .sort((a, b) =>
    Math.abs(a) === Math.abs(b) ? a - b : Math.abs(a) - Math.abs(b)
  )
  .forEach(room => {
    room < 0 ? openClassCount-- : openClassCount++;

    result = Math.max(result, openClassCount);
  });

console.log(result);
```

</details>

<details>
    <summary>[G5] 백준 12904 - A와 B</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const [S, T] = input.split('\n');
const TtoS = [...T];
let direction = true;
let current = '';

for (let i = 0; i < T.length - S.length; i++) {
  current = direction ? TtoS.pop() : TtoS.shift();

  if (current === 'B') direction = !direction;
}

if (!direction) TtoS.reverse();

console.log(TtoS.join('') === S ? 1 : 0);
```

</details>

<details>
    <summary>[Lv.1] 프로그래머스 - 체육복</summary>

```js
function solution(n, lost, reserve) {
  const realReserve = reserve.filter(n => !lost.includes(n));
  const realLost = lost.filter(n => !reserve.includes(n)).sort((a, b) => a - b);
  let noWearStudent = 0;

  for (let i = 0; i < realLost.length; i++) {
    if (!realReserve.length) {
      noWearStudent += realLost.length - i;
      break;
    }

    const lostNum = realLost[i];

    if (realReserve.includes(lostNum - 1)) {
      const prev = realReserve.indexOf(lostNum - 1);

      realReserve.splice(prev, 1);
    } else if (realReserve.includes(lostNum + 1)) {
      const next = realReserve.indexOf(lostNum + 1);

      realReserve.splice(next, 1);
    } else {
      noWearStudent++;
    }
  }

  return n - noWearStudent;
}
```

</details>
