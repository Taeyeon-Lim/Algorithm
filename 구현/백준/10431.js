// [S5] 백준 10431 - 줄세우기

function solution(input) {
  const [_, ...cases] = input
    .split('\n')
    .map(child => child.split(' ').map(Number));
  const result = [];

  cases.forEach(testCase => {
    const [caseNumber, ...children] = testCase;
    let backStep = 0;

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < i; j++) {
        if (children[j] > children[i]) backStep++;
      }
    }

    result.push(caseNumber + ' ' + backStep);
  });

  console.log(result.join('\n'));
}

// 테스트 코드
const testCase = `5\n1 900 901 902 903 904 905 906 907 908 909 910 911 912 913 914 915 916 917 918 919\n2 919 918 917 916 915 914 913 912 911 910 909 908 907 906 905 904 903 902 901 900\n3 901 902 903 904 905 906 907 908 909 910 911 912 913 914 915 916 917 918 919 900\n4 918 917 916 915 914 913 912 911 910 909 908 907 906 905 904 903 902 901 900 919\n5 19 20 17 18 15 16 13 14 11 12 9 10 7 8 5 6 3 4 1 2`;

solution(testCase.toString().trim());

console.log(`answer : \n1 0\n2 190\n3 19\n4 171\n5 180`);
