import PROMOTION_LIST from './PromotionList.js';

const NO_PROMO = 'noPromo';

export default class Promotion {
  #name;

  #buy;

  #get;

  #start_date;

  #end_date;

  constructor(name) {
    const promo = PROMOTION_LIST.find((item) => item.name === name);

    if (promo) {
      this.#name = promo.name;
      this.#buy = promo.buy;
      this.#get = promo.get;
      this.#start_date = new Date(promo.start_date);
      this.#end_date = new Date(promo.end_date);
    } else {
      this.#name = NO_PROMO;
      this.#buy = 0;
      this.#get = 0;
      this.#start_date = null;
      this.#end_date = null;
    }
  }

  get name() {
    return this.#name;
  }

  get freeItemCountNeeded() {
    return this.#get;
  }

  canGiveFreeItem(purchaseCount) {
    return this.#buy > 0 && purchaseCount % (this.#buy + 1) === this.#buy;
  }

  hasRemainderItems(purchaseCount) {
    return purchaseCount % (this.#buy + 1);
  }

  calculateFreeItems(purchaseCount) {
    const rate = Math.floor(purchaseCount / (this.#buy + 1));
    return rate * this.#get;
  }

  isDateWithinPromotion(date) {
    return (
      this.#start_date &&
      this.#end_date &&
      this.#start_date <= date &&
      date <= this.#end_date
    );
  }

  toString() {
    return this.#name === NO_PROMO ? '' : this.#name;
  }
}
