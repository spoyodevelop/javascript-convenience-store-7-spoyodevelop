import { Console } from '@woowacourse/mission-utils';

import { askUserAgree } from '../View/InputView.js';

import PRODUCT_LIST from './Model/ProductList.js';
import parseProducts from './ProductMaker/parseProducts.js';
import askUserInput from './askUserInput/askUserInput.js';
import displayBills from './display/displayBills.js';
import displayWelcomeMessage from './display/displayProducts.js';

class App {
  async run() {
    const parsedProducts = parseProducts(PRODUCT_LIST);

    while (true) {
      displayWelcomeMessage(parsedProducts);
      const userInput = await askUserInput(parsedProducts);
      const { isMembershipSale, filteredGoods, totals } =
        this.safeParseUserInput(userInput);
      displayBills(isMembershipSale, filteredGoods, totals);
      const moreSale = await this.askForMoreSale();
      if (!moreSale) {
        break;
      }
    }
  }

  safeParseUserInput(input) {
    // input이 null, undefined일 경우 기본 값으로 설정
    return (
      input || {
        isMembershipSale: false,
        filteredGoods: [],
        totals: {},
      }
    );
  }

  async askForMoreSale() {
    const message = '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)';
    return await askUserAgree(message);
  }
}

export default App;
