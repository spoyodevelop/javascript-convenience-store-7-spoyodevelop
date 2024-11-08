const PROMOTIONS_MAP = new Map([
  ['탄산2+1', [2, 1, '2024-01-01', '2024-12-31']],
  ['MD추천상품', [1, 1, '2024-01-01', '2024-12-31']],
  ['반짝할인', [1, 1, '2024-11-01', '2024-11-30']],
]);
const NO_PROMO = 'noPromo';

export default class Promotion {
  #name;

  #buy;

  #get;

  #start_date;

  #end_date;

  constructor(name) {
    const promo = PROMOTIONS_MAP.get(name) || [0, 0, null, null];
    const [buy, get, startDate, endDate] = promo;

    this.#name = PROMOTIONS_MAP.has(name) ? name : NO_PROMO;
    this.#buy = buy;
    this.#get = get;
    this.#start_date = startDate ? new Date(startDate) : null;
    this.#end_date = endDate ? new Date(endDate) : null;
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
