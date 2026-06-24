/* 
    Complete the function which will return the area of a circle with the given radius.

Returned value is expected to be accurate up to tolerance of 0.01.

If the radius is not positive, throw Error.
*/

function circleArea(radius) {
  return (radius > 0)? Math.PI * Math.pow(radius, 2): function() { throw new Error("Radius must be a positive number"); }(); // if the radius is positive
}