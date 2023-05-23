function findMinimumCost(ropes) {
  let minCost = 0;

  // Create a min heap to store the lengths of ropes
  const minHeap = new MinHeap();
  for (let i = 0; i < ropes.length; i++) {
    minHeap.insert(ropes[i]);
  }

  // Connect the ropes until there is only one left
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of connecting the ropes
    const cost = rope1 + rope2;

    // Add the cost to the total minimum cost
    minCost += cost;

    // Insert the new rope (combined length) back into the min heap
    minHeap.insert(cost);
  }

  return minCost;
}

// MinHeap class to maintain the lengths of ropes in a min heap
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

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    const min = this.heap[0];
    const lastElement = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastElement;
      this.sinkDown(0);
    }

    return min;
  }

  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      this.bubbleUp(parentIndex);
    }
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
      this.sinkDown(smallestIndex);
    }
  }
}

/* Do not change anything below */

const inputElement = document.getElementById('input');
const resultElement = document.getElementById('result');

function handleFormSubmit(event) {
  event.preventDefault();

  const input = inputElement.value.trim();
  const ropes = input.split(',').map(Number);

  const minimumCost = findMinimumCost(ropes);
  resultElement.textContent = minimumCost;
}

const formElement = document.getElementById('form');
formElement.addEventListener('submit', handleFormSubmit);


  
    
  