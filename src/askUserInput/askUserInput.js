import { USER_MESSAGES, ERROR_MESSAGES } from '../config/defaultSettings.js';

import processBills from '../calculators/processBills.js';

import processShoppingCart from '../calculators/processShoppingCart.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';
import validateItemsExist from '../Validation/validateItemsExist.js';
import validateStockQuantity from '../Validation/validateStockQuantity.js';

export default async function askUserInput(parsedProducts) {
  const inputView = new InputView();
  const outPutView = new OutputView();

  const shoppingCart = await inputView.getValidShoppingCart();
  if (!validateItemsExist(shoppingCart, parsedProducts)) {
    outPutView.printMessage(ERROR_MESSAGES.ITEM_NOT_FOUND);
    return askUserInput(parsedProducts);
  }

  if (!validateStockQuantity(shoppingCart, parsedProducts)) {
    outPutView.printMessage(ERROR_MESSAGES.EXCEEDS_STOCK_QUANTITY);
    return askUserInput(parsedProducts);
  }

  const bills = await processShoppingCart(shoppingCart, parsedProducts);

  const { filteredGoods, totals } = processBills(bills);

  if (filteredGoods.length === 0) return;

  const isMembershipSale = await inputView.askUserAgree(
    USER_MESSAGES.ASK_MEMBERSHIP_SALE,
  );

  return {
    isMembershipSale,
    filteredGoods,
    totals,
  };
}
