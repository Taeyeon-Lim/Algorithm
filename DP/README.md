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

<details>
    <summary>[Lv.3] 프로그래머스 - 등굣길</summary>

```js
function solution(m, n, puddles) {
  const memo = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  puddles.forEach(([x, y]) => (memo[y][x] = -1));

  memo[1][1] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (memo[i][j] === -1) continue;
      if (memo[i][j - 1] !== -1) memo[i][j] += memo[i][j - 1] % 1000000007;
      if (memo[i - 1][j] !== -1) memo[i][j] += memo[i - 1][j] % 1000000007;
    }
  }

  return memo[n][m] % 1000000007;
}
```

</details>

<details>
    <summary>[Lv.3] 프로그래머스 - 정수 삼각형</summary>

```js
function solution(triangle) {
  const memo = [...triangle];

  for (let i = memo.length - 2; 0 <= i; i--) {
    for (let j = 0; j < memo[i].length; j++) {
      memo[i][j] += Math.max(memo[i + 1][j], memo[i + 1][j + 1]);
    }
  }

  return memo[0][0];
}
```

</details>
