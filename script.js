// Function to calculate minimum cost of ropes
function calculateMinimumCostRopes() {
  // Get the input values from the text field
  var input = document.getElementById("ropes-input").value;

  // Split the input string into an array of rope lengths
  var ropes = input.split(",").map(Number);

  // Create a priority queue (min heap)
  var priorityQueue = new MinHeap();

  // Insert all ropes into the priority queue
  for (var i = 0; i < ropes.length; i++) {
    priorityQueue.insert(ropes[i]);
  }

  // Variable to store the total cost
  var totalCost = 0;

  // Merge ropes until only one rope is left in the priority queue
  while (priorityQueue.size() > 1) {
    // Extract the two smallest ropes from the priority queue
    var rope1 = priorityQueue.extractMin();
    var rope2 = priorityQueue.extractMin();

    // Calculate the cost of merging the ropes
    var cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the merged rope back into the priority queue
    priorityQueue.insert(cost);
  }

  // Output the minimum cost of connecting the ropes
  document.getElementById("result").innerHTML = totalCost;
}

// MinHeap class implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    var minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return minValue;
  }

  heapifyUp(index) {
    var parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    var leftChildIndex = 2 * index + 1;
    var rightChildIndex = 2 * index + 2;
    var smallestIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      this.swap(smallestIndex, index);
      this.heapifyDown(smallestIndex);
    }
  }

  swap(index1, index2) {
    var temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }
}

// Call the function to calculate minimum cost when the form is submitted
document.getElementById("ropes-form").addEventListener("submit", function (event) {
  event.preventDefault();
  calculateMinimumCostRopes();
});


  
    
  