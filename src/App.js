import InputView from './View/InputView.js';
import OutputView from './View/OutputView.js';

import PRODUCT_LIST from './Model/ProductList.js';
import parseProducts from './ProductParser/parseProducts.js';
import askUserInput from './askUserInput/askUserInput.js';

class App {
  async run() {
    const parsedProducts = parseProducts(PRODUCT_LIST);

    while (true) {
      OutputView.displayWelcomeMessage(parsedProducts);
      const userInput = await askUserInput(parsedProducts);
      const { isMembershipSale, filteredGoods, totals } =
        this.safeParseUserInput(userInput);
      OutputView.displayBill(isMembershipSale, filteredGoods, totals);
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

    return await InputView.askUserAgree(message);
  }
}

export default App;
