export const perf = cb => {
  console.time(`${cb.toString()}`);
  cb();
  console.timeEnd(`${cb.toString()}`);
};
