// [Lv.3] 프로그래머스 - 등굣길

// O(nm)
function solution(m, n, puddles) {
  // 오른쪽 or 아래로'만' 움직일 수 있음 => 도착만 하면 최단 거리
  // n x m 배열 puddles의 웅덩이 위치 = [index +1, index +1]
  // 최단 경로의 수 % 1000000007 = ?

  // 경로 수 저장
  const memo = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  puddles.forEach(([x, y]) => (memo[y][x] = -1)); // 웅덩이 표시

  memo[1][1] = 1; // 시작 위치

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      // 웅덩이 여부 확인
      if (memo[i][j] === -1) continue;
      if (memo[i][j - 1] !== -1) memo[i][j] += memo[i][j - 1] % 1000000007;
      if (memo[i - 1][j] !== -1) memo[i][j] += memo[i - 1][j] % 1000000007;
    }
  }

  return memo[n][m] % 1000000007;
}
