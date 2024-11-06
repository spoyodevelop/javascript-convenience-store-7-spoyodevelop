const promotions = [
  ['탄산2+1', 2, 1, '2024-01-01', '2024-12-31'],
  ['MD추천상품', 1, 1, '2024-01-01', '2024-12-31'],
  ['반짝할인', 1, 1, '2024-11-01', '2024-11-30'],
];

export default class Promotion {
  #name;

  #buy;

  #get;

  #start_date;

  #end_date;

  constructor(name) {
    if (name === null) {
      this.#name = 'noPromo';
      this.#buy = 0;
      this.#get = 0;
      this.#end_date = null;
      this.#start_date = null;
    }
    const filteredPromotion = promotions.filter(
      (promotion) => promotion[0] === name,
    );

    const [promo] = filteredPromotion;

    if (promo) {
      const [filteredName, buy, get, filteredStartDate, filteredEndDate] =
        promo;
      this.#name = filteredName;
      this.#buy = buy;
      this.#get = get;
      this.#start_date = new Date(filteredStartDate);
      this.#end_date = new Date(filteredEndDate);
    }
  }

  toString() {
    if (this.#name) return this.#name;
    return '';
  }
}
