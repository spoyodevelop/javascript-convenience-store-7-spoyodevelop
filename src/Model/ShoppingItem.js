export default class ShoppingItem {
  #name;

  #quantity;

  constructor(name, quantity) {
    this.#name = name;
    this.#quantity = quantity;
  }

  getName() {
    return this.#name;
  }

  getQuantity() {
    return this.#quantity;
  }

  toString() {
    return `name : ${this.#name} quantity : ${this.#quantity}`;
  }
}
