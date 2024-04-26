// [S3] 백준 2108 - 통계학

function solution(input) {
  const [N, ...numbers] = input;
  const nums = numbers.map(Number).sort((a, b) => a - b); // 오름차순 정렬
  const maxFrequency_nums = [];
  const map = new Map();
  const result = [];
  let max = 0;
  let sum = 0;

  for (const n of nums) {
    sum += n;
    max = Math.max(max, (map.get(n) || 0) + 1);
    map.set(n, (map.get(n) || 0) + 1);
  }

  // 산술평균 : 모든 수의 합 / N
  result.push(Math.round(sum / N));

  // 중앙값 : 오름차순 정렬 후, 중앙에 위치하는 값
  result.push(nums[Math.floor(N / 2)]);

  // 최빈값 : 가장 많이 나타나는 값 ( 2개 이상이면, 두번째로 작은값 )
  for (const [key, value] of map) {
    if (value === max) maxFrequency_nums.push(key);
  }
  result.push(maxFrequency_nums[maxFrequency_nums.length === 1 ? 0 : 1]);

  // 범위 : 최댓값 - 최솟값
  result.push(nums[N - 1] - nums[0]);

  return result.join('\n');
}

// 테스트 코드
const testCase = [
  [`5\n1\n3\n8\n-2\n2`, `2\n2\n1\n10`],
  [`1\n4000`, `4000\n4000\n4000\n0`],
  [`5\n-1\n-2\n-3\n-1\n-2`, `-2\n-2\n-1\n2`],
  [`3\n0\n0\n-1`, `0\n0\n0\n1`],
  [`3\n-1\n-2\n-2`, `-2\n-2\n-2\n1`],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
