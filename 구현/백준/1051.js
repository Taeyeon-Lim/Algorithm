function solution(input) {
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

  return result ** 2;
}

// 테스트 코드
const testCase = [
  [`3 5\n42101\n22100\n22101`, 9],
  [`2 2\n12\n34`, 1],
  [`2 4\n1255\n3455`, 4],
  [`1 10\n1234567890`, 1],
  [
    `11 10\n9785409507\n2055103694\n0861396761\n3073207669\n1233049493\n2300248968\n9769239548\n7984130001\n1670020095\n8894239889\n4053971072`,
    49,
  ],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
