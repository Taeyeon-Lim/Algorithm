// [G5] 백준 14503 - 로봇 청소기

function solution(input) {
  const [size, robot, ...room] = input.map(v => v.split(' ').map(Number));
  const [N, M] = size;
  // 정방향 기준
  const dydx = {
    0: [-1, 0], // 북
    1: [0, 1], // 동
    2: [1, 0], // 남
    3: [0, -1], // 서
  };
  // 가로 위치, 세로 위치, 보는 방향
  let [x, y, d] = robot;
  let result = 0;

  while (true) {
    // room[x][y] = 0(빈 칸), 1(벽), 2(청소 O)
    if (!room[x][y]) {
      room[x][y] = 2;
      result++;
    }

    // 현재 위치의 동서남북 이동 가능 여부
    if (
      (0 < x - 1 && !room[x - 1][y]) ||
      (0 < y - 1 && !room[x][y - 1]) ||
      (x + 1 < N && !room[x + 1][y]) ||
      (y + 1 < M && !room[x][y + 1])
    ) {
      // 3-1. 반시계 방향 90도 회전
      d === 0 ? (d = 3) : d--;

      const [dx, dy] = dydx[d];
      const [nx, ny] = [x + dx, y + dy]; // 정방향 전진

      // 방 이탈
      if (nx <= 0 || N <= nx || ny <= 0 || M <= ny) continue;

      // 3-2. 1칸 전진
      if (!room[nx][ny]) {
        x = nx;
        y = ny;
      }
    } else {
      const [dx, dy] = dydx[d];
      const [nx, ny] = [x + -dx, y + -dy]; // 역방향 후진

      if (room[nx][ny] === 1 || nx <= 0 || N <= nx || ny <= 0 || M <= ny) {
        // 2-2. 작동 정지 (벽 or 방 이탈)
        break;
      } else {
        // 2-1. 1칸 후진
        x = nx;
        y = ny;
      }
    }
  }

  return result;
}

// 테스트 코드
const testCase = [
  [`3 3\n1 1 0\n1 1 1\n1 0 1\n1 1 1`, 1],
  [
    `11 10\n7 4 0\n1 1 1 1 1 1 1 1 1 1\n1 0 0 0 0 0 0 0 0 1\n1 0 0 0 1 1 1 1 0 1\n1 0 0 1 1 0 0 0 0 1\n1 0 1 1 0 0 0 0 0 1\n1 0 0 0 0 0 0 0 0 1\n1 0 0 0 0 0 0 1 0 1\n1 0 0 0 0 0 1 1 0 1\n1 0 0 0 0 0 1 1 0 1\n1 0 0 0 0 0 0 0 0 1\n1 1 1 1 1 1 1 1 1 1`,
    57,
  ],
  [
    `6 6\n1 1 0\n1 1 1 1 1 1\n1 0 0 0 0 1\n1 0 1 0 0 1\n1 0 0 1 0 1\n1 0 0 0 0 1\n1 1 1 1 1 1`,
    13,
  ],
  [`3 6\n1 1 0\n1 1 1 1 1 1\n1 0 0 0 0 1\n1 1 1 1 1 1`, 4],
  [`6 3\n1 1 0\n1 1 1\n1 0 1\n1 0 1\n1 0 1\n1 0 1\n1 1 1`, 4],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
