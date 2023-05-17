
function connectRopes(lengths) {
  // Create a priority queue (min-heap)
  const pq = new MinHeap();
  
  // Insert the lengths into the priority queue
  for (let i = 0; i < lengths.length; i++) {
    pq.insert(lengths[i]);
  }
  
  let totalCost = 0;
  
  // Continue the process until there is only one rope left
  while (pq.size() > 1) {
    // Remove the two ropes with minimum lengths
    const rope1 = pq.remove();
    const rope2 = pq.remove();
    
    // Connect the ropes and calculate the cost
    const connectedLength = rope1 + rope2;
    totalCost += connectedLength;
    
    // Add the connected rope back to the priority queue
    pq.insert(connectedLength);
  }
  
  // Return the total cost
  return totalCost;
}

// Priority Queue (Min-Heap) implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  size() {
    return this.heap.length;
  }
  
  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }
  
  remove() {
    if (this.heap.length === 0) {
      throw new Error("Heap is empty.");
    }
    
    const minValue = this.heap[0];
    const lastValue = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heap[0] = lastValue;
      this.sinkDown(0);
    }
    
    return minValue;
  }
  
  bubbleUp(index) {
    const value = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parentValue = this.heap[parentIndex];
      
      if (value >= parentValue) {
        break;
      }
      
      this.heap[parentIndex] = value;
      this.heap[index] = parentValue;
      index = parentIndex;
    }
  }
  
  sinkDown(index) {
    const value = this.heap[index];
    const length = this.heap.length;
    
    while (true) {
      let childIndex1 = index * 2 + 1;
      let childIndex2 = index * 2 + 2;
      let swapIndex = null;
      
      if (childIndex1 < length) {
        const childValue1 = this.heap[childIndex1];
        if (childValue1 < value) {
          swapIndex = childIndex1;
        }
      }
      
      if (childIndex2 < length) {
        const childValue2 = this.heap[childIndex2];
        if (
          (swapIndex === null && childValue2 < value) ||
          (swapIndex !== null && childValue2 < this.heap[swapIndex])
        ) {
          swapIndex = childIndex2;
        }
      }
      
      if (swapIndex === null) {
        break;
      }
      
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = value;
      index = swapIndex;
    }
  }
