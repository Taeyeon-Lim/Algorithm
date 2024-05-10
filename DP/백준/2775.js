// [B1] 백준 2775 - 부녀회장이 될테야

// k층 n호 거주민 수 = k-1층 1~n호 까지의 거주민 수의 합
// k층 n호에는 몇 명 = ? (1 ≤ k, n ≤ 14)
// 빈 집X / 0층 i호 = i명
function solution(input) {
  const [T, ...kn] = input.map(Number);
  // 0층(0) ~ 14층(14)까지 => 15층
  // 1호(0) ~ 14호(13)까지 => 14호
  const memo = Array.from({ length: 15 }, () => Array(14).fill(0));
  const result = [];

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 14; j++) {
      if (i === 0) {
        // 0층 j호 = j + 1명 거주
        memo[i][j] = j + 1;
      } else if (j === 0) {
        // 각층 0호 = 1명 거주
        memo[i][j] = 1;
      } else {
        // i층 j호 = 바로 아래층 + 바로 앞호
        memo[i][j] = memo[i - 1][j] + memo[i][j - 1];
      }
    }
  }

  for (let i = 0; i < T; i++) {
    const k = kn[i * 2];
    const n = kn[i * 2 + 1] - 1;

    result.push(memo[k][n]);
  }

  return result.join('\n');
}
// 테스트 코드
const testCase = [[`2\n1\n3\n2\n3`, `6\n10`]];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
