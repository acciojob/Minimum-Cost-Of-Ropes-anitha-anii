
function calculateMinimumCostRopes() {
  
  var input = document.getElementById("ropes-input").value;
    var ropes = input.split(",").map(Number);
    var priorityQueue = new MinHeap();

   for (var i = 0; i < ropes.length; i++) {
    priorityQueue.insert(ropes[i]);
  }

  var totalCost = 0;
  while (priorityQueue.size() > 1) {
        var rope1 = priorityQueue.extractMin();
    var rope2 = priorityQueue.extractMin();
        var cost = rope1 + rope2;
       totalCost += cost;
        priorityQueue.insert(cost);
  }

 
  document.getElementById("result").innerHTML = totalCost;
}

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


  
    
  