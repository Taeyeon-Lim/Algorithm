// [G5] 백준 11000 - 강의실 배정

function solution(input) {
  const N = Number(input[0]); // N = 강의실 수
  const rooms = [];
  let openClassCount = 0;
  let result = 0;

  // 수업의 시작과 끝을 모두 입력
  for (let i = 1; i <= N; i++) {
    const time = input[i].split(' ').map(Number);

    rooms.push(time[0], -time[1]);
  }

  rooms
    // 수업 시간 오름차순 정렬, 절댓값이 같으면 음수 우선
    .sort((a, b) =>
      Math.abs(a) === Math.abs(b) ? a - b : Math.abs(a) - Math.abs(b)
    )
    .forEach(room => {
      // '오름차순 정렬'된 시간ㄴ이 담긴 배열에서
      // => 양수(=수업 시작), 강의실 수 + 1
      // => 음수(=수업 종료), 강의실 수 - 1
      room < 0 ? openClassCount-- : openClassCount++;

      // 현재 강의실 수가 가장 많은 경우 = 최소 강의실 수
      result = Math.max(result, openClassCount);
    });

  return result;
}

// 테스트 코드
const testCase = [[`3\n1 3\n2 4\n3 5`, 2]];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
