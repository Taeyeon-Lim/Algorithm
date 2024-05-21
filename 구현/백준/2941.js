// [S5] 백준 2941 - 크로아티아 알파벳

function solution(input) {
  return input.replace(/c=|c-|dz=|d-|lj|nj|s=|z=/g, '1').length;
}

// 테스트 코드
const testCase = [
  [`ljes=njak`, 6],
  [`ddz=z=`, 3],
  [`nljj`, 3],
  [`c=c=`, 2],
  [`dz=ak`, 3],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim());

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
