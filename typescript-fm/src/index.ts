export async function addNumbers(a: number, b: number) {
  await timeout(500);
  return a + b;
}

/**
 * Create a promise that resolves after some time
 * @param delay number of milliseconds before promise resolves
 */
function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

(async () => {
  console.log(await addNumbers(10, 10));
})();

// let x = "hello world";

// reassignment is fine
// x = "hello mars";

// but if we try to change type
// x = 42; // Error
