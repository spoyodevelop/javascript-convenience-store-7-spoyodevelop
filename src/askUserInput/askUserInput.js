import { ERROR_MESSAGES } from '../Error/Error.js';
import { USER_MESSAGES } from '../config/systemSettings.js';

import processBills from '../calculators/processBills.js';
import { promptUserInput, parseShoppingCart } from './inputHandler.js';
import {
  validateItemsExist,
  validateStockQuantity,
} from '../Validation/validations.js';
import { processShoppingCart } from '../calculators/processShoppingCart.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

export default async function askUserInput(parsedProducts) {
  const inputView = new InputView();
  const outPutView = new OutputView();

  const inputString = await promptUserInput();
  const shoppingCart = parseShoppingCart(inputString);

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
