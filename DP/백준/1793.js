// [S2] 백준 1793 - 타일링

// 2 x n 직사각형을
// 2x1 or 1x2 or 2x2 중 1가지로 '채우는' 경우의 수 = ?
function solution(input) {
  const ns = input.map(Number);
  const memo = [];
  let result = '';

  // 가로 n의 직사각형을 주어진 타일(3가지)로 채우는 경우 3가지
  // 1. [n - 1] <- 오른쪽에 2x1 타일 1개 붙이는 경우
  // 2. [n - 2] <- 오른쪽에 2x2 타일 1개 붙이는 경우
  // 3. [n - 2] <- 오른쪽에 1x2 타일 2개 붙이는 경우
  // => f[n] = [n - 1] + [n - 2] * 2

  // n = 0, 아무것도 놓치 않아도 채워짐 => 1개 경우
  memo.push(1);
  // n = 1, 2x1 타일 1개 => 1개 경우
  memo.push(1);
  // n = 2, 2x1 or 1x2 타일 2개 + 2x2 타일 1개 => 3개 경우
  memo.push(3);

  // n = 3부터, f[n] = f[n-1] + f[n-2] * 2
  for (const n of ns) {
    if (memo[n] === undefined) {
      for (let i = memo.length; i <= n; i++) {
        memo.push(BigInt(memo[i - 1]) + BigInt(memo[i - 2]) * 2n);
      }
    }

    result += memo[n].toString() + '\n';
  }

  return result.trimEnd();
}

// 테스트 코드
const testCase = [
  [
    `0\n1\n2\n8\n100\n200\n12`,
    `1\n1\n3\n171\n845100400152152934331135470251\n1071292029505993517027974728227441735014801995855195223534251\n2731`,
  ],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
