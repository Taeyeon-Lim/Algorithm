// [G5] 백준 12904 - A와 B

// 규칙1 : 문자열 뒤에 A 추가
// 규칙2 : 문자열 뒤집은 뒤, 뒤에 B 추가
// S => T로 만들 수 있으면 1, 아니면 0을 출력
function solution(input) {
  const [S, T] = input;
  const TtoS = [...T];
  let direction = true;
  let current = '';

  // T => S로 역산
  for (let i = 0; i < T.length - S.length; i++) {
    // 마지막은 우측에서 종료 (pop 우선 = direction 초기값 true)
    current = direction ? TtoS.pop() : TtoS.shift();

    // 왼쪽이나 오른쪽 끝 문자가 'B'이면, 규칙2(direction != direction)
    if (current === 'B') direction = !direction;
  }

  if (!direction) TtoS.reverse();

  return TtoS.join('') === S ? 1 : 0;
}

// 테스트 코드
const testCase = [
  [`B\nABBA`, 1],
  [`AB\nABB`, 0],
  [`B\nBBBBBB`, 1],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
