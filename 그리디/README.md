# 그리디

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
