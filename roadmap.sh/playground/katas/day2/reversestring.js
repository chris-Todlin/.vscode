/* 
    Complete the solution so that it reverses the string passed into it.

'world'  =>  'dlrow'
'word'   =>  'drow'
*/

function solution(str){
  return str.split('').reverse().join('')
}
console.log(solution('world')) // 'dlrow'
console.log(solution('word')) // 'drow'

// revese sequence
const reverseSeq = n => {
  let reverseSequence = [];
  for(let i = n; i > 0; i--) 
    reverseSequence.push(i);
  return reverseSequence;
};
console.log(reverseSeq(5));