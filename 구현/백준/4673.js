function solution() {
  // 생성자 함수
  const generator = num =>
    [...num.toString()].reduce((acc, cur) => acc + Number(cur), num);
  const selfNumbers = new Set();
  const result = [];

  for (let i = 1; i < 10001; i++) {
    selfNumbers.add(generator(i)); // 생성자가 있는 수
  }

  for (let i = 1; i < 10001; i++) {
    if (!selfNumbers.has(i)) result.push(i); // 셀프 넘버
  }

  console.log(result.join('\n'));
}

solution();
