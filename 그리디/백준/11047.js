// [S4] 백준 11047 - 동전 0

function solution(input) {
  // 동전의 종류 수 = N, 목표 가치
  // coins = 동전 가치 오름차순 배열 (i ≥ 2인 경우, A[i]는 A[i-1]의 배수)
  // K를 만드는 가장 적은 동전 수 = ?
  const [NK, ...coins] = input.split('\n');
  let [N, K] = NK.split(' ').map(Number);
  const coinValues = coins.map(Number);
  let result = 0;

  // a[i] = a[i-1] 배수이므로, 큰 가치 동전부터 우선 담는 경우만 고려
  for (let i = N - 1; i >= 0; i--) {
    result += Math.floor(K / coinValues[i]);
    K %= coinValues[i];
  }

  return result;
}

// 테스트 코드
const testCase = [
  [`10 4200\n1\n5\n10\n50\n100\n500\n1000\n5000\n10000\n50000`, 6],
  [`10 4790\n1\n5\n10\n50\n100\n500\n1000\n5000\n10000\n50000`, 12],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim());

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
