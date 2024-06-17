# Heap(힙) 
`완전 이진 트리` 형태를 가진 자료 구조

- `heapify(힙화)`: 특정 자료구조를 힙으로 변환하는 과정   
- `Max Heap`: 부모노드 값이 자식보다 크거나 같은 힙   
- `Min Heap`: 부모노드 값이 자식보다 작거나 같은 힙
  
![mn](https://github.com/Taeyeon-Lim/Algorithm/assets/54977412/c6b1b7c2-0097-417e-b41f-2c16bf6da61f)
<br/>

---
<br/>

## 원소 추가 (Max Heap의 경우)
힙에서 원소를 추가하는 것은 `마지막 노드`에 값을 넣고, 힙 종류(Max, Min)에 따라 정렬한다는 의미 

![Group 37](https://github.com/Taeyeon-Lim/Algorithm/assets/54977412/cda58719-1147-4c3f-9531-9322626795a9)

<br/><br/>

## 원소 제거 (Max Heap의 경우)
힙에서 원소를 제거하는 것은 `루트 노드의 값(의미 있는 유일한 값)만` 제거한다는 의미
> 이 때, 실제로 루트 노드를 제거하는 것이 아님(X)

![원소 삭제 과정](https://github.com/Taeyeon-Lim/Algorithm/assets/54977412/0ca40abd-3ab1-4911-b26e-e98f97bc027f)
