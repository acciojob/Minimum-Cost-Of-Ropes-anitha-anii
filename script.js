let n = 5
let arr[] = {4, 2, 7, 6, 9}
function calculateMinCost() {
  //your code here
  let sum=0;
	for(let i=0;i<arr.length;i++){
		sum+=arr[i];
	}
  return sum;
  
}