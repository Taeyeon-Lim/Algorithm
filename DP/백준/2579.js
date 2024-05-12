// [S3] 백준 2579 - 계단 오르기

// 규칙1 - 한 번에 1 or 2칸씩 오를 수 있음
// 규칙2 - 시작점을 제외한, 연속된 계단을 3개 이상 밟지 말 것
// 규칙3 - 마지막 계단은 반드시 밟아야 함
// 밟은 계단 점수의 합은 최대 얼마 = ?
// (계단 수 <= 300, 점수는 자연수)
function solution(input) {
  const [stairsCount, ...scores] = input.map(Number);

  // 계단 1 = 바닥부터 시작 = scores[0]
  // 계단 2 = 점수가 자연수이므로 비교 X = scores[0] + scoes[1]
  const result = [scores[0], scores[0] + scores[1]];

  // 계단 3 = scores[2]
  // 계단 1, 2의 점수 중 큰 값 + scores[2] = result[2]
  result.push(Math.max(scores[0], scores[1]) + scores[2]);

  // 마지막 계단을 밟는 경우 2가지
  // ㄴ 2칸 > 마지막 계단
  // ㄴ 2칸 > 1칸 > 마지막 계단 (현재 위치 - 3의 위치 값을 미리구해야 함 = result[0 ~ 2])
  for (let i = 3; i < stairsCount; i++) {
    // 4번째 계단(index = 3)부터
    result.push(
      // + 최댓값 (2칸 뛰어올라온 경우 vs 2칸 뛴다음 1칸 올라온 경우)
      scores[i] + Math.max(result[i - 2], scores[i - 1] + result[i - 3])
    );
  }

  return result[stairsCount - 1];
}

// 테스트 코드
const testCase = [
  [`6\n10\n20\n15\n25\n10\n20`, 75],
  [`4\n1\n10\n10\n1`, 12],
  [`3\n1\n5\n100`, 105],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
