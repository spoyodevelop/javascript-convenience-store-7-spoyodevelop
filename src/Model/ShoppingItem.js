export default class ShoppingItem {
  #name;

  #quantity;

  constructor(name, quantity) {
    this.#name = name;
    this.#quantity = quantity;
  }

  get name() {
    return this.#name;
  }

  get quantity() {
    return this.#quantity;
  }

  toString() {
    return `name : ${this.#name} quantity : ${this.#quantity}`;
  }
}
