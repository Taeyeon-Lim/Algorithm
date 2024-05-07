// [Lv.3] 프로그래머스 - 정수 삼각형

function solution(triangle) {
  const memo = [...triangle];

  for (let i = memo.length - 2; 0 <= i; i--) {
    for (let j = 0; j < memo[i].length; j++) {
      memo[i][j] += Math.max(memo[i + 1][j], memo[i + 1][j + 1]);
    }
  }

  return memo[0][0];
}
