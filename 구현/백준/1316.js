// [S5] 백준 1316 - 그룹 단어 체커

function solution(input) {
  const [_, ...words] = input;
  let result = 0;

  words.forEach(word => {
    const chars = new Set();
    let prev = '';

    for (const char of word) {
      if (prev === char) continue;
      if (chars.has(char)) return;

      chars.add(char);
      prev = char;
    }

    result++;
  });

  return result;
}

// 테스트 코드
const testCase = [
  [`3\nhappy\nnew\nyear`, 3],
  [`4\naba\nabab\nabcabc\na`, 1],
  [`5\nab\naa\naca\nba\nbb`, 4],
  [`2\nyzyzy\nzyzyz`, 0],
  [`1\nz`, 1],
  [`9\naaa\naaazbz\nbabb\naazz\nazbz\naabbaa\nabacc\naba\nzzaz`, 2],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
