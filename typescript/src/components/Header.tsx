import React from "react";
import { test } from "components/test";

// test
test();
export function fn(arr: number[]) {
  const arr2 = [1, ...arr];
  if (arr2.length > 0) return arr2;
  return;
}

class Rectangle {
  #width: number;
  #height: number;

  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;
  }

  getAreaFunction() {
    return () => {
      return this.#width * this.#height;
    };
  }
}

const rect = new Rectangle(10, 10);
console.log(rect.getAreaFunction()());

const Header: React.FC = () => <div>Header</div>;

export default Header;
