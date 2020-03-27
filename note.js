const arr = [9, 2, 3, 6];

function findMin(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    if (current < min) {
      min = current;
    }
  }
  return min;
}

console.log(findMin(arr));
