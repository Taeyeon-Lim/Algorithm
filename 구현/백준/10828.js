// [S4] 백준 10828 - 스택

function solution(input) {
  const [repeat, ...orders] = input;
  const result = [];

  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }

  class Stack {
    constructor() {
      this.length = 0;
      this.topNode = null;
    }
    empty() {
      return this.topNode === null ? 1 : 0;
    }
    push(element) {
      const node = new Node(element);
      node.next = this.topNode;
      this.topNode = node;
      this.length++;
    }
    pop() {
      if (this.empty()) return -1;

      const value = this.topNode.data;
      this.topNode = this.topNode.next;
      this.length--;

      return value;
    }
    size() {
      return this.length;
    }
    top() {
      if (this.empty()) return -1;

      return this.topNode.data;
    }
  }

  const stack = new Stack();

  for (let i = 0; i < repeat; i++) {
    const [order, element] = orders[i].split(' ');

    if (element) {
      stack[order](element);
    } else {
      result.push(stack[order]());
    }
  }

  return result.join('\n');
}

// 테스트 코드
const testCase = [
  [
    `14\npush 1\npush 2\ntop\nsize\nempty\npop\npop\npop\nsize\nempty\npop\npush 3\nempty\ntop`,
    `2\n2\n0\n2\n1\n-1\n0\n1\n-1\n0\n3`,
  ],
  [`7\npop\ntop\npush 123\ntop\npop\ntop\npop`, `-1\n-1\n123\n123\n-1\n-1`],
];

testCase.forEach(input => {
  const result = solution(input[0].toString().trim().split('\n'));

  result === input[1]
    ? console.log('Success')
    : console.log('Failed ::', result);
});
