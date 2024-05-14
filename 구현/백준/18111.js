// [S2] 백준 18111 - 마인크래프트

// 다음 2가지 방법으로 NxM 땅 내부의 높이를 일정하게 바꿔야 한다
// 1. 좌표(i, j)의 가장 위에 있는 블록 제거 후 인벤토리에 넣기 (=2초)
// 2. 인벤토리에서 블록 1개를 꺼내 좌표(i, j)의 가장 위에 놓는다 (=1초)

// 땅 고르기에 필요한 최소 시간이 걸리는 방법 중 가장 높은 땅의 높이는 = ?

// (땅 밑에 빈 공간 X, 작업 시작 시 인벤토리에 B개 블록 존재, 0 <= 땅 <= 256)
// (1 ≤ M, N ≤ 500 / 0 ≤ B ≤ 6.4 × 10^7)

function solution(input) {
  const [NMB, ...earth] = input.map(v => v.split(' ').map(Number));
  const [N, M, B] = NMB;
  const result = [Number.MAX_SAFE_INTEGER, 0]; // [작업 시간, 높이]
  const heightCount = new Array(257).fill(0);

  // 각 세로 블록의 최고층 카운트
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      heightCount[earth[i][j]]++;
    }
  }

  // 높이 256 ~ 0
  for (let target = 256; target >= 0; target--) {
    let addBlock = 0;
    let removeBlock = 0;

    // 높이 0 ~ 256
    heightCount.forEach((count, height) => {
      if (height > target) {
        // 현재 높이 > 목표 높이 ==> 블록 제거
        removeBlock += (height - target) * count;
      } else if (height < target) {
        // 현재 높이 < 목표 높이 ==> 블록 쌓기
        addBlock += (target - height) * count;
      }
    });

    // 인벤토리에서 사용해야 할 블록 수가 모자라면 성립 안됨
    if (addBlock - removeBlock > B) continue;

    const time = addBlock + removeBlock * 2; // 걸린 시간

    if (time < result[0]) {
      result[0] = time; // 최소 시간
      result[1] = target; // 최대 높이
    } else if (time > result[0]) break; // 기존 소요 시간 보다 더 걸리면 고려 X
    // time = result[0]은 제외
  }

  return result.join(' ');
}

// 테스트 코드
const testCase = [
  [`3 4 99\n0 0 0 0\n0 0 0 0\n0 0 0 1`, `2 0`],
  [`3 4 1\n64 64 64 64\n64 64 64 64\n64 64 64 63`, `1 64`],
  [`3 4 0\n64 64 64 64\n64 64 64 64\n64 64 64 63`, `22 63`],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
