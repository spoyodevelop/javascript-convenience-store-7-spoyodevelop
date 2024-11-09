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
    if (quantity > this.#quantity)
      throw new Error('불가능한 값을 입력했습니다.');
    this.#quantity -= quantity;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  get quantity() {
    return this.#quantity;
  }

  isPromoProduct() {
    return this.#promotion.name !== 'noPromo';
  }

  askFreeFreebie(quantity) {
    return this.#promotion.canGiveFreeItem(quantity);
  }

  howMuchItemNeedToBeFree() {
    return this.#promotion.freeItemCountNeeded;
  }

  isRemainderLeft(purchaseCount) {
    return this.#promotion.hasRemainderItems(purchaseCount);
  }

  isAvailablePromotion(date) {
    return this.#promotion.isDateWithinPromotion(date);
  }

  getBOGO(quantity) {
    return this.#promotion.calculateFreeItems(quantity);
  }

  #toNumberFormatOfKor(num) {
    return num.toLocaleString('ko-KR');
  }

  toString() {
    let quantity = '재고 없음';

    if (this.#quantity !== 0) {
      quantity = `${this.#quantity}개`;
    }

    return `- ${this.#name} ${this.#toNumberFormatOfKor(this.#price)}원 ${quantity} ${this.#promotion.toString()}`;
  }
}
