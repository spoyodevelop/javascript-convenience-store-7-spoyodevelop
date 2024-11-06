import { Console } from '@woowacourse/mission-utils';

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

  sell(quantity) {
    this.#quantity -= quantity;
  }

  getName() {
    return this.#name;
  }

  isPromoProduct() {
    return this.#promotion.getName() !== 'noPromo';
  }

  askFreeFreebie(quantity) {
    return this.#promotion.isAbleToGiveFreebie(quantity);
  }

  isRemainderLeft(purchaseCount) {
    return this.#promotion.isRemainderLeft(purchaseCount);
  }

  getPrice() {
    return this.#price;
  }

  getQuantity() {
    return this.#quantity;
  }

  getBOGO(quantity) {
    return this.#promotion.getFreeItem(quantity);
  }

  toString() {
    let quantity = '재고 없음';

    if (this.#quantity !== 0) {
      quantity = `${this.#quantity}개`;
    }

    return `- ${this.#name} ${this.#price} ${quantity} ${this.#promotion.toString()}`;
  }
}
