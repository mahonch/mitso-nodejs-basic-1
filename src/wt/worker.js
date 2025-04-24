import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => {
  if (n < 2) return n;
  return nthFibonacci(n - 1) + nthFibonacci(n - 2);
};

const result = nthFibonacci(workerData);
parentPort.postMessage(result);