// [Lv.1] 프로그래머스 - 체육복

function solution(n, lost, reserve) {
  // 전체 학생 수 = n, 도난당한 학생 번호 배열 = lost, 여벌 학생 번호 배열 = reserve
  // (조건 1) 학생 번호에서 직전 or 직후 번호의 학생만 빌려 줄 수 있음
  // (조건 2) 도난 당한 본인이 여벌이 있으면 자신이 입어야 함
  // 최대 몇 명까지 체육복을 입을 수 있는 지?

  // 체육복을 빌려줄 수 있는 학생 번호
  const realReserve = reserve.filter(n => !lost.includes(n));
  // 정말로 입을 체육복이 없는 학생 번호
  const realLost = lost.filter(n => !reserve.includes(n)).sort((a, b) => a - b);
  // 체육복을 못 입는 학생 수
  let noWearStudent = 0;

  for (let i = 0; i < realLost.length; i++) {
    // 빌려 줄 수 있는 학생이 없는 경우
    if (!realReserve.length) {
      noWearStudent += realLost.length - i;
      break;
    }

    const lostNum = realLost[i];

    if (realReserve.includes(lostNum - 1)) {
      // 앞 번호 학생에게 빌림

      const prev = realReserve.indexOf(lostNum - 1);
      realReserve.splice(prev, 1);
    } else if (realReserve.includes(lostNum + 1)) {
      // 뒷 번호 학생에게 빌림

      const next = realReserve.indexOf(lostNum + 1);
      realReserve.splice(next, 1);
    } else {
      // 못 빌림
      noWearStudent++;
    }
  }

  return n - noWearStudent;
}
