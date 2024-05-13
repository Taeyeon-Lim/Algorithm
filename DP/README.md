# DP

<details>
    <summary>[B1] 백준 2775 - 부녀회장이 될테야</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const [T, ...kn] = input.split('\n').map(Number);
const memo = Array.from({ length: 15 }, () => Array(14).fill(0));
const result = [];

for (let i = 0; i < 15; i++) {
  for (let j = 0; j < 14; j++) {
    if (i === 0) {
      memo[i][j] = j + 1;
    } else if (j === 0) {
      memo[i][j] = 1;
    } else {
      memo[i][j] = memo[i - 1][j] + memo[i][j - 1];
    }
  }
}

for (let i = 0; i < T; i++) {
  const k = kn[i * 2];
  const n = kn[i * 2 + 1] - 1;

  result.push(memo[k][n]);
}

console.log(result.join('\n'));
```

</details>

<details>
    <summary>[B1] 백준 2748 - 피보나치 수 2</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const memo = [0, 1];

const recursion = n => {
  if (memo[n] !== undefined) return memo[n];

  memo[n] = BigInt(recursion(n - 1)) + BigInt(recursion(n - 2));

  return memo[n];
};

console.log(recursion(Number(input)).toString());
```

</details>

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
    <summary>[S3] 백준 2579 - 계단 오르기</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [stairsCount, ...scores] = input.map(Number);
const result = [scores[0], scores[0] + scores[1]];

result.push(scores[2] + Math.max(scores[0], scores[1]));

for (let i = 3; i < stairsCount; i++) {
  result.push(
    scores[i] + Math.max(result[i - 2], scores[i - 1] + result[i - 3])
  );
}

console.log(result[stairsCount - 1]);
```

</details>

<details>
    <summary>[S3] 백준 9095 - 1, 2, 3 더하기</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [_, ...nums] = input.map(Number);
const dp = [0, 1, 2, 4];
const result = [];

for (let i = 4; i < 11; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

nums.forEach(n => result.push(dp[n]));

console.log(result.join('\n'));
```

</details>

<details>
    <summary>[S2] 백준 1793 - 타일링</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const ns = input.map(Number);
const memo = [];
let result = '';

memo.push(1);
memo.push(1);
memo.push(3);

for (const n of ns) {
  if (memo[n] === undefined) {
    for (let i = memo.length; i <= n; i++) {
      memo.push(BigInt(memo[i - 1]) + BigInt(memo[i - 2]) * 2n);
    }
  }

  result += memo[n].toString() + '\n';
}

console.log(result.trimEnd());
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
