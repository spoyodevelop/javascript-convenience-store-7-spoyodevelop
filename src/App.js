import InputView from './View/InputView.js';
import OutputView from './View/OutputView.js';

import PRODUCT_LIST from './Model/ProductList.js';
import parseProducts from './ProductParser/parseProducts.js';
import askUserInput from './askUserInput/askUserInput.js';

class App {
  async run() {
    const products = parseProducts(PRODUCT_LIST);
    let continueSale;

    do {
      await this.handleUserInput(products);
      continueSale = await InputView.askUserAgree(
        '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)',
      );
    } while (continueSale);
  }

  async handleUserInput(products) {
    OutputView.displayWelcomeMessage(products);
    const {
      isMembershipSale = false,
      filteredGoods = [],
      totals = {},
    } = (await askUserInput(products)) || {};
    OutputView.displayBill(isMembershipSale, filteredGoods, totals);
  }
}

export default App;
