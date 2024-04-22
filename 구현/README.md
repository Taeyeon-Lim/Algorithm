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
