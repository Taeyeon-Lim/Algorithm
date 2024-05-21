// [S2] 백준 3085 - 사탕 게임

// NxN 보드 (3 <= N <= 50)
// 빨C, 파P, 초Z, 노Y
// 색이 다른 인접한 2칸을 서로 교환 후, 같은 색인 행 or 열에 있는 사탕의 최댓값 = ?
function solution(input) {
  const N = input.shift();
  const initBoard = input.map(color => [...color]);
  const checkMaxCandy = (rowCol, ij, board) => {
    let count = 1;
    let current = rowCol === 'row' ? board[ij][0] : board[0][ij];

    for (let k = 1; k < N; k++) {
      const next = rowCol === 'row' ? board[ij][k] : board[k][ij];

      if (current === next) {
        count++;
      } else {
        result = Math.max(result, count);
        current = next;
        count = 1;
      }
    }

    result = Math.max(result, count);
  };
  let result = 0;

  // 초기 보드 가로x세로 체크
  for (let i = 0; i < N; i++) {
    checkMaxCandy('row', i, initBoard);
    checkMaxCandy('col', i, initBoard);
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 오른 범위 내 + 인접 색 여부
      if (j + 1 < N && input[i][j] !== input[i][j + 1]) {
        const B = initBoard.map(v => [...v]);

        [B[i][j], B[i][j + 1]] = [B[i][j + 1], B[i][j]];

        // 가로
        checkMaxCandy('row', i, B);
        // 세로
        checkMaxCandy('col', j, B);
        checkMaxCandy('col', j + 1, B);
      }

      // 아래 범위 내 + 인접 색 여부
      if (i + 1 < N && input[i][j] !== input[i + 1][j]) {
        const B = initBoard.map(v => [...v]);

        [B[i][j], B[i + 1][j]] = [B[i + 1][j], B[i][j]];

        // 가로
        checkMaxCandy('row', i, B);
        checkMaxCandy('row', i + 1, B);
        // 세로
        checkMaxCandy('col', j, B);
      }
    }
  }

  return result;
}

// 테스트 코드
const testCase = [
  [`3\nCCP\nCCP\nPPC`, 3],
  [`4\nPPPP\nCYZY\nCCPY\nPPCC`, 4],
  [`5\nYCPZY\nCYZZP\nCCPPP\nYCYZC\nCPPZZ`, 4],
  [`4\nCPZY\nZYPC\nPCZY\nPZCY`, 3],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
