// [G5] 백준 16935 - 배열 돌리기 3

// NxM 배열에 R번 연산한 결과 = ?
// 2 <= N, M <= 100 (짝수)
// 연산 종류는 6가지
// - 상하반전, 좌우반전, 좌우 90도 회전
// - (N/2)x(M/2)인 4개 부분 수열을 사분면으로 나누어 시계or반시계 방향으로 회전

function solution(input) {
  let [_, ...nums] = input.split('\n').map(v => v.split(' '));
  const acc = nums.pop();
  let newNums = [];
  let row = 0;
  let col = 0;

  // 6가지 연산 수행 함수
  const calculation = {
    1: () => nums.reverse(),
    2: () => nums.forEach(ns => ns.reverse()),
    3: () => {
      row = nums.length;
      col = nums[0].length;
      newNums = Array.from({ length: col }, () => Array(row).fill(0));

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          newNums[j][row - i - 1] = nums[i][j];
        }
      }

      nums = newNums;
    },
    4: () => {
      row = nums.length;
      col = nums[0].length;
      newNums = Array.from({ length: col }, () => Array(row).fill(0));

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          newNums[col - j - 1][i] = nums[i][j];
        }
      }

      nums = newNums;
    },
    5: () => {
      row = nums.length;
      col = nums[0].length;
      newNums = Array.from({ length: row }, () => Array(col).fill(0));

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          if (i < row / 2 && j < col / 2) {
            newNums[i][j + col / 2] = nums[i][j];
          } else if (i < row / 2 && j >= col / 2) {
            newNums[i + row / 2][j] = nums[i][j];
          } else if (i >= row / 2 && j >= col / 2) {
            newNums[i][j - col / 2] = nums[i][j];
          } else {
            newNums[i - row / 2][j] = nums[i][j];
          }
        }
      }

      nums = newNums;
    },
    6: () => {
      row = nums.length;
      col = nums[0].length;
      newNums = Array.from({ length: row }, () => Array(col).fill(0));

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          if (i < row / 2 && j < col / 2) {
            newNums[i + row / 2][j] = nums[i][j];
          } else if (i < row / 2 && j >= col / 2) {
            newNums[i][j - col / 2] = nums[i][j];
          } else if (i >= row / 2 && j >= col / 2) {
            newNums[i - row / 2][j] = nums[i][j];
          } else {
            newNums[i][j + col / 2] = nums[i][j];
          }
        }
      }

      nums = newNums;
    },
  };

  acc.forEach(accType => calculation[accType]());

  // 연산이 수행된 배열 => 문자열
  return nums.map(n => n.join(' ')).join('\n');
}

// 테스트 코드
const testCase = [
  [
    `6 8 1\n3 2 6 3 1 2 9 7\n9 7 8 2 1 4 5 3\n5 9 2 1 9 6 1 8\n2 1 3 8 6 3 9 2\n1 3 2 8 7 9 2 1\n4 5 1 9 8 2 1 3\n1 1`,
    `4 5 1 9 8 2 1 3\n1 3 2 8 7 9 2 1\n2 1 3 8 6 3 9 2\n5 9 2 1 9 6 1 8\n9 7 8 2 1 4 5 3\n3 2 6 3 1 2 9 7`,
  ],
  [
    `6 8 1\n13 2 6 3 99999 2 9 7\n9 7 8 2 1 4 5 3\n5 9 2 1 9 6 1 8\n2 1 3 8 6 3 9 2\n1 3 2 8 7 9 2 1\n4 5 1 9 8 2 1 3\n2`,
    `7 9 2 99999 3 6 2 13\n3 5 4 1 2 8 7 9\n8 1 6 9 1 2 9 5\n2 9 3 6 8 3 1 2\n1 2 9 7 8 2 3 1\n3 1 2 8 9 1 5 4`,
  ],
  [
    `6 8 1\n3 2 6 3 1 2 9 7\n9 7 8 2 1 4 5 3\n5 9 2 1 9 6 1 8\n2 1 3 8 6 3 9 2\n1 3 2 8 7 9 2 1\n4 5 1 9 8 2 1 3\n3`,
    `4 1 2 5 9 3\n5 3 1 9 7 2\n1 2 3 2 8 6\n9 8 8 1 2 3\n8 7 6 9 1 1\n2 9 3 6 4 2\n1 2 9 1 5 9\n3 1 2 8 3 7`,
  ],
  [
    `6 8 1\n3 2 6 3 1 2 9 70000\n9 7 8 2 1 4 5 3\n5 9 2 1 9 6 1 800000\n2 1 3 8 6 3 9 2\n1 3 2 8 7 9 2 1\n4 5 1 9 8 2 1 3\n4`,
    `70000 3 800000 2 1 3\n9 5 1 9 2 1\n2 4 6 3 9 2\n1 1 9 6 7 8\n3 2 1 8 8 9\n6 8 2 3 2 1\n2 7 9 1 3 5\n3 9 5 2 1 4`,
  ],
  [
    `6 8 1\n3 2 6 3 1 2 9 7\n9 7 8 2 1 4 5 3\n5 9 2 1 9 6 1 8\n2 1 3 8 6 3 9 2\n1 3 2 8 7 9 2 1\n4 5 1 9 8 2 1 3\n5`,
    `2 1 3 8 3 2 6 3\n1 3 2 8 9 7 8 2\n4 5 1 9 5 9 2 1\n6 3 9 2 1 2 9 7\n7 9 2 1 1 4 5 3\n8 2 1 3 9 6 1 8`,
  ],
  [
    `6 8 1\n3 2 6 3 1 2 9 7\n9 7 8 2 1 4 5 3\n5 9 2 1 9 6 1 8\n2 1 3 8 6 3 9 2\n1 3 2 8 7 9 2 1\n4 5 1 9 8 2 1 3\n6`,
    `1 2 9 7 6 3 9 2\n1 4 5 3 7 9 2 1\n9 6 1 8 8 2 1 3\n3 2 6 3 2 1 3 8\n9 7 8 2 1 3 2 8\n5 9 2 1 4 5 1 9`,
  ],
  [
    `6 8 6\n3 2 6 3 1 2 9 7\n9 7 8 2 1 4 5 3\n5 9 2 1 9 6 1 8\n2 1 3 8 6 3 9 2\n1 3 2 8 7 9 2 1\n4 5 1 9 8 2 1 3\n1 2 3 4 5 6`,
    `3 1 2 8 9 1 5 4\n1 2 9 7 8 2 3 1\n2 9 3 6 8 3 1 2\n8 1 6 9 1 2 9 5\n3 5 4 1 2 8 7 9\n7 9 2 1 3 6 2 3`,
  ],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim());

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
