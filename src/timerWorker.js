/* eslint-disable no-restricted-globals */
let interval = null;

self.onmessage = (e) => {
  console.log('Worker received message', e.data);
  if (e.data) {
    if (interval === null) {
      interval = setInterval(() => {
        console.log('Tick from timerWorker');
        postMessage(true);
      }, 1000)
    }
  }
  else {
    clearInterval(interval);
    interval = null;
  }
}