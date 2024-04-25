// [S5] 백준 8979 - 올림픽

function solution(input) {
  const [target, ...goverments] = input.map(v => v.split(' '));

  // 메달별 내림차순 정렬
  goverments.sort((a, b) => b[1] - a[1] || b[2] - a[2] || b[3] - a[3]);

  // 등 수를 알고 싶은 국가 K = target[1]의 메달 정보
  const [_, g, s, b] = goverments.find(g => g[0] === target[1]);

  // 메달별 동일한 수를 가진 국가 중 첫번째 국가의 인덱스
  const ranking = goverments.findIndex(
    ([_, gG, gS, gB]) => gG === g && gS === s && gB === b
  );

  return ranking + 1;
}

// 테스트 코드
const testCase = [
  [`4 3\n1 1 2 0\n2 0 1 0\n3 0 1 0\n4 0 0 1`, 2],
  [`4 2\n1 3 0 0\n3 0 0 2\n4 0 2 0\n2 0 2 0`, 2],
  [`2 1\n1 0 0 0\n2 0 0 0`, 1],
  [`2 2\n1 1 10 0\n2 2 0 0`, 1],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
