'use strict'

let count = 0;

// returns sorted array and count of atomic operations
const mergeSort = (array, length) => {
  count++; // 1 for the if statement
  if (length === 1) {
    return array;
  } 

  const mid = Math.floor(length / 2); // 3 atomic operations
  const left = array.slice(0, mid); // 2 atomic operations
  const right = array.slice(mid); // 2 atomic operations

  count += 7; // 7 from above

  const sorted = merge(
    mergeSort(left, left.length),
    mergeSort(right, right.length)
  );

  return sorted;
}

// returns merged arrays
const merge = (left, right) => {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  count += 3; // 3 operations assignments

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft++;
      count += 2; // 2 operations from if and assignments
    } 
    else {
      result.push(right[indexRight]);
      indexRight++;
      count += 2; // 2 operations from if and assignments
    }
  }

  return result.concat(left.slice(indexLeft), right.slice(indexRight));
}

// returns random array with values between 0 and n
const randomArray = (n) => {
  const A = [];

  for (let i = 0; i < n; i++) {
    A[i] = Math.floor(Math.random() * n);
  }

  return A;
}

// initialize variables and get average values
const main = () => {
  let data = [];

  for (let i = 4; i < 26; i++) {

    const n = Math.pow(2, i);
    let runs = [];

    for (let j = 0; j < 5; j++) {
      count = 0;

      const arr = randomArray(n);
      mergeSort(arr, n);

      runs[j] = count;
    }

    const sum = runs.reduce((prev, cur) => cur += prev);
    const avg = sum / 5;
    data[i - 4] = [n, avg];

    console.log('Done', i);
  }

  console.log(data);
}

main();