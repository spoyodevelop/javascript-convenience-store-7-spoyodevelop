export default class Product {
  #name;

  #price;

  #quantity;

  #promotion;

  constructor(name, price, quantity, promotion) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
    this.#promotion = promotion;
  }

  toString() {
    let quantity = '재고 없음';
    if (this.#quantity !== 0) {
      quantity = `${this.#quantity}개`;
    }
    return `- ${this.#name} ${this.#price} ${quantity} ${this.#promotion.toString()}`;
  }
}
