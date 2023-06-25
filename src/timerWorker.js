/* eslint-disable no-restricted-globals */

self.onmessage = (e) => {
  let count = e.data;
  setInterval(() => {
    count--;
    postMessage(count);
  }, 1000);
}