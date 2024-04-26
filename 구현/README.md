# 구현

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
