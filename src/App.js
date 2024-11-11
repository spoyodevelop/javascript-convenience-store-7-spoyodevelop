import InputView from './View/InputView.js';
import OutputView from './View/OutputView.js';

import PRODUCT_LIST from './Model/ProductList.js';
import parseProducts from './ProductParser/parseProducts.js';
import askUserInput from './askUserInput/askUserInput.js';
import { USER_MESSAGES } from './config/defaultSettings.js';
import { areAllProductsSoldOut } from './Utility/util.js';

class App {
  async run() {
    const products = parseProducts(PRODUCT_LIST);
    let continueSale;

    do {
      await this.handleUserInput(products);
      if (areAllProductsSoldOut(products)) {
        OutputView.printMessage(USER_MESSAGES.ALL_PRODUCTS_SOLD_OUT);
        return;
      }
      continueSale = await InputView.askUserAgree(
        USER_MESSAGES.ASK_USER_MORE_SALE,
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
