/**
 * @jsx jsx
 */
import { jsx, css } from "@emotion/core";
import { perf } from "../utils/perf";

const Course1 = () => {
  const arr1 = [1, 3, 5];
  console.log(arr1);
  arr1.pop();
  console.log(arr1);
  arr1.shift();
  console.log(arr1);
  arr1.unshift(7);
  console.log(arr1);
  arr1.reverse();
  console.log(arr1);
  arr1.splice(2, 0, 11);
  console.log(arr1);
  arr1.splice(0, 1);
  console.log(arr1);

  // slice() can be used to slice out a piece of an array into a new array
  const arr2 = [1, 2, 3, 4, 5, 6];
  const newArray2 = arr2.slice(0, 4);
  console.log({ arr2, newArray2 });

  // concat
  const arr3 = arr2.concat([7, 8, 9]);
  console.log(arr3);

  // I. remove even numbers from array
  const arr4 = [1, 2, 4, 5, 10, 6, 3];
  // const removeEven = (nums = []) => nums.filter(a => a % 2);
  // 이렇게 명시적인게 더 나은듯
  const removeEven = (nums = []) => nums.filter(a => a % 2 !== 0);
  const result = removeEven(arr4);
  console.log(result);

  // II. Implement a function that merges two sorted arrays into another sorted array. Name it mergeArrays(arr1, arr2).
  const mergeArrays = (nums = [], nums2 = []) =>
    [...nums, ...nums2].sort((a, b) => a - b);
  const arr01 = [1, 3, 4, 5];
  const arr02 = [2, 6, 7, 8];
  console.log(mergeArrays(arr01, arr02));

  const mergeArrays2 = (nums = [], nums2 = []) => {
    let merged = [];
    let i = 0;
    let j = 0;

    while (i < nums.length && j < nums2.length) {
      if (nums[i] < nums2[j]) {
        merged.push(nums[i]);
        i++;
      } else {
        merged.push(nums2[j]);
        j++;
      }
    }

    if (i <= nums.length - 1) {
      nums.splice(0, i);
      return [...merged, ...nums];
    } else if (j <= nums2.length - 1) {
      nums2.splice(0, j);
      return [...merged, ...nums2];
    }
  };
  console.log(mergeArrays2(arr01, arr02));
  console.log(mergeArrays2([4, 5, 6], [-2, -1, 0, 7]));

  // III. find two numbers that add up to "value"
  //
  // i) Brute Force
  // This is the most time-intensive, but yet an intuitive solution.
  // Traverse the whole array, and check if any of the two elements
  // add up to the given number `n`.
  // Use a nested for-loop and iterate over the entire array for
  // each element.
  // Time Complexity O(n^2)
  //
  const findSumBruteForce = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] + arr[j] === value) return [arr[i], arr[j]];
      }
    }
    return false;
  };

  const veryBigArr = [...Array(10000)].map(a => 1);
  perf(() => findSumBruteForce([...veryBigArr, 1, 21, 3, 14, 5, 60, 7, 6], 81));
  console.log(
    "findSumBruteForce",
    findSumBruteForce([1, 21, 3, 14, 5, 60, 7, 6], 81)
  );
  console.log("findSumBruteForce", findSumBruteForce([1, 2, 3, 4], 5));
  console.log("findSumBruteForce", findSumBruteForce([1, 2, 3, 4], 10));

  // ii) Sorting the array
  // solution i) is very intuitive, it is not very time efficient.
  // A better way to solve this is by first sorting the array.
  // Then, for each element in the array, use a binary search
  // to look for another element in the array that will be equal to the
  // difference of the current element and the intended sum.
  // O(nlog^n)

  // hashing을 이용해서 더 효율적으로 처리할 수 있다.

  function binarySearch(arr, item) {
    let first = 0;
    let mid;
    let last = arr.length - 1;
    let found = false;
    let arrayIndex = -1;
    while (first <= last && !found) {
      mid = Math.floor((first + last) / 2);
      if (arr[mid] == item) {
        arrayIndex = mid;
        found = true;
      } else {
        if (item < arr[mid]) {
          last = mid - 1;
        } else {
          first = mid + 1;
        }
      }
    }
    return found ? arrayIndex : false;
  }

  function findSumBinarySearch(arr, value) {
    arr.sort((a, b) => a - b);
    let index;
    for (let j = 0; j < arr.length; j++) {
      index = binarySearch(arr, value - arr[j]);
      if (index != false && j != index) {
        return [arr[j], value - arr[j]];
      }
    }
    return false;
  }

  perf(() =>
    findSumBinarySearch([...veryBigArr, 1, 21, 3, 14, 5, 60, 7, 6], 81)
  );
  console.log(
    "findSumBinarySearch",
    findSumBinarySearch([1, 21, 3, 14, 5, 60, 7, 6], 81)
  );
  console.log("findSumBinarySearch", findSumBinarySearch([1, 2, 3, 4], 5));
  console.log("findSumBinarySearch", findSumBinarySearch([1, 2, 3, 4], 10));

  // iii) Moving indices
  function findSumMovingIndices(arr, value) {
    arr.sort((a, b) => a - b);
    let index1 = 0;
    let index2 = arr.length - 1;
    let sum = 0;

    while (index1 != index2) {
      sum = arr[index1] + arr[index2];

      if (sum < value) {
        index1++;
      } else if (sum > value) {
        index2--;
      } else {
        return [arr[index1], arr[index2]];
      }
    }
    return false;
  }

  perf(() =>
    findSumMovingIndices([...veryBigArr, 1, 21, 3, 14, 5, 60, 7, 6], 81)
  );

  console.log(findSumMovingIndices([1, 21, 3, 14, 5, 60, 7, 6], 81));

  return (
    <div>
      <h1>Array Functions</h1>
      <p
        css={css`
          white-space: pre-line;
        `}
      >
        {`
          push(), pop(), shift(), unshift(), delete keyword
          reverse(),
        `}
      </p>
    </div>
  );
};

export default Course1;
