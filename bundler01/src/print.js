class Animal {
  a = 1;
  printA = () => {
    return this.a;
  };
}

const printMe = () => {
  console.log("PRINT_FROM_PRINT");
};

export default printMe;
