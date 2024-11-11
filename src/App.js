import InputView from './View/InputView.js';
import OutputView from './View/OutputView.js';

import PRODUCT_LIST from './Model/ProductList.js';
import parseProducts from './ProductParser/parseProducts.js';
import askUserInput from './askUserInput/askUserInput.js';
import { USER_MESSAGES } from './config/defaultSettings.js';

class App {
  async run() {
    const products = parseProducts(PRODUCT_LIST);
    let continueSale;

    do {
      await this.handleUserInput(products);
      if (this.areAllProductsSoldOut(products)) {
        OutputView.printMessage(
          '재고가 다 팔렸습니다. 금일 판매를 종료합니다.',
        );
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

  areAllProductsSoldOut(products) {
    if (!Array.isArray(products)) return false;
    return products.every((product) => product.quantity === 0);
  }
}

export default App;
