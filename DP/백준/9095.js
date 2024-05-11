// [S3] 백준 9095 - 1, 2, 3 더하기

// 1, 2, 3 중 하나 이상을 사용하여 n을 만드는 경우의 수 = ?
// 0 < n < 11
function solution(input) {
  const [_, ...nums] = input;
  // 점화식에 필요한 기본항
  // f(1) = 1, f(2) = 2, f(3) = 4
  const dp = [0, 1, 2, 4];
  const result = [];

  // n = 4를 표현하려면...
  // f(1) + ★3 = 4 (1개 경우, '1')
  // ㄴ ★3 + '1'
  // f(2) + ★2 = 4 (2개 경우, '2', '1+1')
  // ㄴ ★2 + '2', ★2 + '1+1'
  // f(3) + ★1 = 4 (4개 경우, '3', '1+2', '2+1', '1+1+1')
  // ㄴ ★1 + '3', ★1 + '1+2', ★1 + '2+1', ★1 + '1+1+1'

  // 즉, f(n)은 1, 2, 3을 더했을 때 현재의 n이 나오는 이전 항들의 경우의 합
  // f(n) = f(n-1) + f(n-2) + f(n-3)
  for (let i = 4; i < 11; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  nums.forEach(n => result.push(dp[+n]));

  return result.join('\n');
}

// 테스트 코드
const testCase = [[`3\n4\n7\n10`, `7\n44\n274`]];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
