// [G5] 백준 5430 - AC

function solution(input) {
  // T : 테스트케이스 수
  // R : 배열의 순서를 뒤집는 함수
  // D : 첫번째 수를 버리는 함수 (빈 배열이면, 에러)
  const [T, ...testCases] = input;
  const result = [];

  for (let i = 0; i < T * 3; i += 3) {
    // p = 수행할 함수 목록
    const p = testCases[i];
    // n = 배열의 길이
    const n = +testCases[i + 1];

    // 빈 배열일 경우
    if (!n) {
      // D 함수가 있으면, 에러
      result.push(p.indexOf('D') === -1 ? '[]' : 'error');
      continue;
    }

    const nums = JSON.parse(testCases[i + 2]);
    let isShift = true;
    let shift = 0;
    let pop = 0;

    for (const func of p) {
      if (func === 'R') {
        isShift = !isShift;
      } else {
        // 정방향(shift) or 역방향(pop)
        isShift ? shift++ : pop++;
      }
    }

    // D 함수 실행수 > 배열의 길이 (= 빈 배열에서 D 함수 실행 = 에러)
    if (shift + pop > n) {
      result.push('error');
      continue;
    }

    const caseResult = nums.slice(shift, n - pop);

    result.push(JSON.stringify(isShift ? caseResult : caseResult.reverse()));
  }

  return result.join('\n');
}

// 테스트 코드
const testCase = [
  [
    `4\nRDD\n4\n[1,2,3,4]\nDD\n1\n[42]\nRRD\n6\n[1,1,2,3,5,8]\nD\n0\n[]`,
    `[2,1]\nerror\n[1,2,3,5,8]\nerror`,
  ],
  [`1\nDR\n1\n[1]`, `[]`],
  [`1\nR\n0\n[]`, `[]`],
  [`1\nD\n0\n[]`, `error`],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
