import { Console, DateTimes } from '@woowacourse/mission-utils';
import Product from './Model/Product.js';
import Promotion from './Model/Promotion.js';

class App {
  async run() {
    const products = [
      ['콜라', 1000, 10, '탄산2+1'],
      ['콜라', 1000, 10, null],
      ['사이다', 1000, 8, '탄산2+1'],
      ['사이다', 1000, 7, null],
      ['오렌지주스', 1800, 9, 'MD추천상품'],
      ['탄산수', 1200, 5, '탄산2+1'],
      ['물', 500, 10, null],
      ['비타민워터', 1500, 6, null],
      ['감자칩', 1500, 5, '반짝할인'],
      ['감자칩', 1500, 5, null],
      ['초코바', 1200, 5, 'MD추천상품'],
      ['초코바', 1200, 5, null],
      ['에너지바', 2000, 5, null],
      ['정식도시락', 6400, 8, null],
      ['컵라면', 1700, 1, 'MD추천상품'],
      ['컵라면', 1700, 10, null],
    ];

    // products를 검사하여, 프로모션이 있지만, 일반 재고가 없는 것들은 반영 시킨다.
    const promoProducts = new Set(
      products
        .filter((product) => product[3] === null)
        .map((product) => product[0]),
    );

    const allProduct = new Set(products.map((product) => product[0]));
    const needToAddProduct = [...allProduct.difference(promoProducts)];
    console.log(needToAddProduct);

    const parsedProducts = [];
    products.forEach((product) => {
      parsedProducts.push(
        new Product(
          product[0],
          product[1],
          product[2],
          new Promotion(product[3]),
        ),
      );
      const isNeedToAdd = needToAddProduct.includes(product[0]);
      if (isNeedToAdd) {
        parsedProducts.push(new Product(product[0], product[1], 0, null));
      }
    });

    parsedProducts.forEach((product) => console.log(product.toString()));
  }
}

export default App;
