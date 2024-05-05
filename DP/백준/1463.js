// [S3] 백준 1463 - 1로 만들기

// Bottom - up

// O(n)
function solution(input) {
  const X = Number(input);
  const memo = Array(X + 1).fill(0);

  for (let i = 2; i <= X; i++) {
    // X - 1인 경우
    // 2 => 1, 3 => 2, 4 => 3......[x]=[x-1]+1
    memo[i] = memo[i - 1] + 1; // i에 1을 뺀 경우의 수 = +1

    // X / 2로 나누어 지는 경우
    // 2 => 1, 4 => 2, 6 => 3......[x]=[x/2]+1
    if (i % 2 === 0) memo[i] = Math.min(memo[i], memo[i / 2] + 1);

    // X / 3으로 나누어 지는 경우
    // 3 => 1, 6 => 2, 9 => 3......[x]=[x/3]+1
    if (i % 3 === 0) memo[i] = Math.min(memo[i], memo[i / 3] + 1);
  }

  return memo[X];
}

// O(2^n)
function solution2(input) {
  const memo = [0, 0]; // 0과 1은 계산 되지 않음

  // 재귀 함수
  const recursion = n => {
    if (memo[n] !== undefined) return memo[n];

    // ★ 2와 3 모두 나누어지는 수 중 최적인 경우 비교 ★
    if (n % 6 === 0) memo[n] = Math.min(recursion(n / 3), recursion(n / 2)) + 1;
    else if (n % 3 === 0)
      // 3으로 나누어 떨어지는 경우 vs 1을 뺀 경우
      memo[n] = Math.min(recursion(n / 3), recursion(n - 1)) + 1;
    else if (n % 2 === 0)
      // 2으로 나누어 떨어지는 경우 vs 1을 뺀 경우
      memo[n] = Math.min(recursion(n / 2), recursion(n - 1)) + 1;
    else memo[n] = recursion(n - 1) + 1; // 1만 뺀 경우

    return memo[n];
  };

  return recursion(Number(input));
}

// 테스트 코드
const testCase = [
  [`2`, 1],
  [`10`, 3],
  [`100007`, 21],
];

console.time();
testCase.forEach(input => {
  //   const result = solution(input[0].toString().trim());
  const result = solution2(input[0].toString().trim());

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
console.timeEnd();
