/* 
Create a function that accepts a sequence and a non-negative integer n, and returns a sequence of the first n elements from it.

If the sequence has fewer than n elements, return all of them.

Examples
[0, 1, 2, 3, 5, 8, 13], n = 3  =>  [0, 1, 2]
[0, 1, 2, 3, 5, 8, 13], n = 0  =>  []
                    [], n = 3  =>  []
*/
function take(arr, n) {
  // Your code here
  return arr.slice(0,n);
}

console.log(take([0, 1, 2, 3, 5, 8, 13], 3)) // [0, 1, 2]
console.log(take([0, 1, 2, 3, 5, 8, 13], 0)) // []
console.log(take([], 3)) // []