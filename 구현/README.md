# 구현

<details>
    <summary>[S3] 백준 1051 - 숫자 정사각형</summary>

    ```js
      const fs = require('fs');
      const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

      const [size, ...rect] = input;
      const [N, M] = size.split(' ').map(Number);
      let result = 1;

      for (let i = 0; i < N; i++) {
          for (let j = 0; j < M; j++) {
              const number = rect[i][j];

              for (let k = j+1; k < M; k++) {
                  if (number !== rect[i][k]) continue;
                  const currentRow = i + k - j;

                  if (currentRow >= N) continue;
                  if (number !== rect[currentRow][j]) continue;
                  if (number !== rect[currentRow][k]) continue;

                  result = Math.max(result, k - j + 1);
              }

          }
      }

      console.log(result ** 2);
    ```

</details>
