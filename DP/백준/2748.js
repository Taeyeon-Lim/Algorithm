// [B1] 백준 2748 - 피보나치 수 2

// 피보나치 함수, Fn = Fn-1 + Fn-2 (n ≥ 2)
// F(n) = ?

/**
 * ★ Bigint ★ : '정수'를 안전하게 계산 할 수 있는 내장 객체
 *
 * Number로 가능한 원시 값의 표현 숫자 범위 (2**53 - 1)
 * => Number.MIN_SAFE_INTEGER ~ Number.MAX_SAFE_INTEGER (-9007199254740991 ~ 9007199254740991)
 * => 범위 초과 시, 값이 정상적으로 출력되지 않음
 * => (true) Number.isSafeInteger(Number.MAX_SAFE_INTEGER)
 * => (false) Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)
 *
 * 조건문 or 논리식에서는 Number와 같이 동작
 * => 0n ? 2 : -2 조건문은 0n을 0으로 보고 -2을 반환
 * => (true) 1n < 2 와 같은 비교 가능
 * => (true, 동등하지만) 0n == 0
 * => (false, 불일치) 0n === 0
 *
 * 유의할 점
 * 1. 정수가 아닌 소수점은 소실 주의
 * => Bigint(5) / Bigint(2) = Bigint(2)
 * 2. Math 객체 사용 불가
 * => (x) Math.max(5n, 2n)
 * 3. 내장 정렬 메소드(sort) 사용 가능
 *
 * safari 호환성(mdn) - v14, 2020.09 이후
 */

// bottom-up
function solution(input) {
  const N = Number(input);
  const memo = [0, 1];

  for (let i = 2; i <= N; i++) {
    memo[i] = BigInt(memo[i - 1]) + BigInt(memo[i - 2]);
  }

  return memo[N].toString();
}

// top-down
function solution2(input) {
  const memo = [0, 1];

  const recursion = n => {
    if (memo[n] !== undefined) return memo[n];

    memo[n] = BigInt(recursion(n - 1)) + BigInt(recursion(n - 2));

    return memo[n];
  };

  return recursion(+input).toString();
}

// 테스트 코드
const testCase = [
  [`10`, '55'],
  [`17`, '1597'],
  [`90`, '2880067194370816120'], // over Number range => BigInt
];

testCase.forEach(input => {
  //   const result = solution(input[0].toString().trim());
  const result = solution2(input[0].toString().trim());

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
