import { Console } from '@woowacourse/mission-utils';

import { askUserAgree } from '../View/InputView.js';

import PRODUCT_LIST from './Model/ProductList.js';
import parseProducts from './ProductMaker/parseProducts.js';
import askUserInput from './askUserInput/askUserInput.js';
import printBills from './printBills/printBills.js';

class App {
  async run() {
    const parsedProducts = parseProducts(PRODUCT_LIST);

    while (true) {
      Console.print('안녕하세요. W편의점입니다.');
      Console.print('현재 보유하고 있는 상품입니다.');
      parsedProducts.forEach((product) => Console.print(product.toString()));
      const {
        isMembershipSale = false,
        filteredGoods = [],
        totals = {},
      } = (await askUserInput(parsedProducts)) || {};

      printBills(isMembershipSale, filteredGoods, totals);
      const moreSale = await askUserAgree(
        '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)',
      );
      if (!moreSale) {
        break;
      }
    }
  }
}

export default App;
