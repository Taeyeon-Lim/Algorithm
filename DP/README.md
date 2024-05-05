# DP

<details>
    <summary>[S3] 백준 1463 - 1로 만들기</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const memo = [0, 0];

const recursion = n => {
  if (memo[n] !== undefined) return memo[n];

  if (n % 6 === 0) memo[n] = Math.min(recursion(n / 3), recursion(n / 2)) + 1;
  else if (n % 3 === 0)
    memo[n] = Math.min(recursion(n / 3), recursion(n - 1)) + 1;
  else if (n % 2 === 0)
    memo[n] = Math.min(recursion(n / 2), recursion(n - 1)) + 1;
  else memo[n] = recursion(n - 1) + 1;

  return memo[n];
};

console.log(recursion(Number(input)));
```

</details>
