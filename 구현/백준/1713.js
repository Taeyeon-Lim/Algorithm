// [S1] 백준 1713 - 후보 추천하기

function solution(input) {
  const [N, _, recomendNums] = input.map(v => v.split(' ').map(Number));
  const frame = new Map();

  recomendNums.forEach(number => {
    if (frame.size >= N && !frame.has(number)) {
      // 틀이 꽉찼는데, 새로운 후보 추천이 들어오면
      // 가장 적은 투표 수 중 가장 먼저 등록된 후보 1명 제거 후 등록
      const min = Math.min(...[...frame].map(v => v[1]));

      frame.delete([...frame].find(v => v[1] === min)[0]);
      frame.set(number, 1);
    } else if (frame.has(number)) {
      // 기존 후보 추천
      frame.set(number, frame.get(number) + 1);
    } else {
      // 새 후보 등록
      frame.set(number, 1);
    }
  });

  // 최종 후보 번호 (오름차순)
  return [...frame]
    .map(candidate => candidate[0])
    .sort((a, b) => a - b)
    .join(' ');
}

// 테스트 코드
const testCase = [
  [`3\n9\n2 1 4 3 5 6 2 7 2`, `2 6 7`],
  [`3\n8\n1 1 1 2 2 3 3 4`, `1 3 4`],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
