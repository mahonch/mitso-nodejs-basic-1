import { Worker } from 'worker_threads';
import os from 'os';

const performCalculations = async () => {
  const cpuCount = os.cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < cpuCount; i++) {
    const workerData = 10 + i;

    const worker = new Worker(new URL('./worker.js', import.meta.url), {
      workerData,
    });

    worker.on('message', (message) => {
      results.push({
        status: 'resolved',
        data: message,
      });
      if (results.length === cpuCount) {
        console.log(results);
      }
    });

    worker.on('error', () => {
      results.push({
        status: 'error',
        data: null,
      });
      if (results.length === cpuCount) {
        console.log(results);
      }
    });

    workers.push(worker);
  }
};

performCalculations();