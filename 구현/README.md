# 구현

<details>
    <summary>[S5] 백준 2941 - 크로아티아 알파벳</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

console.log(input.replace(/c=|c-|dz=|d-|lj|nj|s=|z=/g, '1').length);
```

</details>

<details>
    <summary>[S5] 백준 1316 - 그룹 단어 체커</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [_, ...words] = input;
let result = 0;

words.forEach(word => {
  const chars = new Set();
  let prev = '';

  for (const char of word) {
    if (prev === char) continue; // 이전과 동일
    if (chars.has(char)) return; // 전에 나온 철자

    chars.add(char);
    prev = char;
  }

  result++;
});

console.log(result);
```

</details>

<details>
    <summary>[S5] 백준 4673 - 셀프 넘버</summary>

```js
const generator = num =>
  [...num.toString()].reduce((acc, cur) => acc + Number(cur), num);
const selfNumbers = new Set();
const result = [];

for (let i = 1; i < 10001; i++) {
  selfNumbers.add(generator(i));
}

for (let i = 1; i < 10001; i++) {
  if (!selfNumbers.has(i)) result.push(i);
}

console.log(result.join('\n'));
```

</details>

<details>
    <summary>[S5] 백준 8979 - 올림픽</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const [target, ...goverments] = input.split('\n').map(v => v.split(' '));

goverments.sort((a, b) => b[1] - a[1] || b[2] - a[2] || b[3] - a[3]);

const [_, g, s, b] = goverments.find(g => g[0] === target[1]);

const ranking = goverments.findIndex(
  ([_, gG, gS, gB]) => gG === g && gS === s && gB === b
);

console.log(ranking + 1);
```

</details>

<details>
    <summary>[S5] 백준 10431 - 줄세우기</summary>

```js
const fs = require('fs');
const input = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(v => v.split(' ').map(Number));

const [_, ...cases] = input;
let result = [];

cases.forEach(testCase => {
  const [caseNumber, ...children] = testCase;
  let backStep = 0;

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < i; j++) {
      if (children[j] > children[i]) backStep++;
    }
  }

  result.push(caseNumber + ' ' + backStep);
});

console.log(result.join('\n'));
```

</details>

<details>
    <summary>[S4] 백준 10828 - 스택</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const [repeat, ...orders] = input.split('\n');
const result = [];

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.length = 0;
    this.topNode = null;
  }
  empty() {
    return this.topNode === null ? 1 : 0;
  }
  push(element) {
    const node = new Node(element);
    node.next = this.topNode;
    this.topNode = node;
    this.length++;
  }
  pop() {
    if (this.empty()) return -1;

    const value = this.topNode.data;
    this.topNode = this.topNode.next;
    this.length--;

    return value;
  }
  size() {
    return this.length;
  }
  top() {
    if (this.empty()) return -1;

    return this.topNode.data;
  }
}

const stack = new Stack();

for (let i = 0; i < repeat; i++) {
  const [order, element] = orders[i].split(' ');

  if (element) {
    stack[order](element);
  } else {
    result.push(stack[order]());
  }
}

console.log(result.join('\n'));
```

</details>

<details>
    <summary>[S3] 백준 2108 - 통계학</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const [N, ...numbers] = input.split('\n');
const nums = numbers.map(Number).sort((a, b) => a - b);
const maxFrequency_nums = [];
const map = new Map();
const result = [];
let max = 0;
let sum = 0;

for (const n of nums) {
  sum += n;
  max = Math.max(max, (map.get(n) || 0) + 1);
  map.set(n, (map.get(n) || 0) + 1);
}

result.push(Math.round(sum / N));

result.push(nums[Math.floor(N / 2)]);

for (const [key, value] of map) {
  if (value === max) maxFrequency_nums.push(key);
}
result.push(maxFrequency_nums[maxFrequency_nums.length === 1 ? 0 : 1]);

result.push(nums[N - 1] - nums[0]);

console.log(result.join('\n'));
```

</details>

<details>
    <summary>[S3] 백준 1051 - 숫자 정사각형</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [size, ...rect] = input;
const [N, M] = size.split(' ').map(Number);
let result = 1;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const number = rect[i][j];

    for (let k = j + 1; k < M; k++) {
      if (number !== rect[i][k]) continue;

      const currentRow = i + k - j;

      if (currentRow >= N) continue;
      if (number !== rect[currentRow][j]) continue;
      if (number !== rect[currentRow][k]) continue;

      result = Math.max(result, k - j + 1);
    }
  }
}

console.log(result ** 2);
```

</details>

<details>
    <summary>[S2] 백준 3085 - 사탕 게임</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = input.shift();
const initBoard = input.map(color => [...color]);
const checkMaxCandy = (rowCol, ij, board) => {
  let count = 1;
  let current = rowCol === 'row' ? board[ij][0] : board[0][ij];

  for (let k = 1; k < N; k++) {
    const next = rowCol === 'row' ? board[ij][k] : board[k][ij];

    if (current === next) {
      count++;
    } else {
      result = Math.max(result, count);
      current = next;
      count = 1;
    }
  }

  result = Math.max(result, count);
};
let result = 0;

for (let i = 0; i < N; i++) {
  checkMaxCandy('row', i, initBoard);
  checkMaxCandy('col', i, initBoard);
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (j + 1 < N && input[i][j] !== input[i][j + 1]) {
      const B = initBoard.map(v => [...v]);

      [B[i][j], B[i][j + 1]] = [B[i][j + 1], B[i][j]];

      checkMaxCandy('row', i, B);
      checkMaxCandy('col', j, B);
      checkMaxCandy('col', j + 1, B);
    }

    if (i + 1 < N && input[i][j] !== input[i + 1][j]) {
      const B = initBoard.map(v => [...v]);

      [B[i][j], B[i + 1][j]] = [B[i + 1][j], B[i][j]];

      checkMaxCandy('row', i, B);
      checkMaxCandy('row', i + 1, B);
      checkMaxCandy('col', j, B);
    }
  }
}

console.log(result);
```

</details>

<details>
    <summary>[S2] 백준 18111 - 마인크래프트</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [NMB, ...earth] = input.map(v => v.split(' ').map(Number));
const [N, M, B] = NMB;
const result = [Number.MAX_SAFE_INTEGER, 0];
const heightCount = new Array(257).fill(0);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    heightCount[earth[i][j]]++;
  }
}

for (let target = 256; target >= 0; target--) {
  let addBlock = 0;
  let removeBlock = 0;

  heightCount.forEach((count, height) => {
    if (height > target) {
      removeBlock += (height - target) * count;
    } else if (height < target) {
      addBlock += (target - height) * count;
    }
  });

  if (addBlock - removeBlock > B) continue;
  const time = addBlock + removeBlock * 2;

  if (time < result[0]) {
    result[0] = time;
    result[1] = target;
  } else if (time > result[0]) break;
}

console.log(result.join(' '));
```

</details>

<details>
    <summary>[G5] 백준 14503 - 로봇 청소기</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const [size, robot, ...room] = input
  .split('\n')
  .map(v => v.split(' ').map(Number));
const [N, M] = size;
const dydx = {
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};
let [x, y, d] = robot;
let result = 0;

while (true) {
  if (!room[x][y]) {
    room[x][y] = 2;
    result++;
  }

  if (
    (0 < x - 1 && !room[x - 1][y]) ||
    (0 < y - 1 && !room[x][y - 1]) ||
    (x + 1 < N && !room[x + 1][y]) ||
    (y + 1 < M && !room[x][y + 1])
  ) {
    d === 0 ? (d = 3) : d--;

    const [dx, dy] = dydx[d];
    const [nx, ny] = [x + dx, y + dy];

    if (nx <= 0 || N <= nx || ny <= 0 || M <= ny) continue;

    if (!room[nx][ny]) {
      x = nx;
      y = ny;
    }
  } else {
    const [dx, dy] = dydx[d];
    const [nx, ny] = [x + -dx, y + -dy];

    if (room[nx][ny] === 1 || nx <= 0 || N <= nx || ny <= 0 || M <= ny) {
      break;
    } else {
      x = nx;
      y = ny;
    }
  }
}

console.log(result);
```

</details>

<details>
    <summary>[G5] 백준 5430 - AC</summary>

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const [T, ...testCases] = input.split('\n');
const result = [];

for (let i = 0; i < T * 3; i += 3) {
  const p = testCases[i];
  const n = +testCases[i + 1];

  if (!n) {
    result.push(p.indexOf('D') === -1 ? '[]' : 'error');
    continue;
  }

  const nums = JSON.parse(testCases[i + 2]);
  let isShift = true;
  let shift = 0;
  let pop = 0;

  for (const func of p) {
    if (func === 'R') {
      isShift = !isShift;
    } else {
      isShift ? shift++ : pop++;
    }
  }

  if (shift + pop > n) {
    result.push('error');
    continue;
  }

  const caseResult = nums.slice(shift, n - pop);

  result.push(JSON.stringify(isShift ? caseResult : caseResult.reverse()));
}

console.log(result.join('\n'));
```

</details>
