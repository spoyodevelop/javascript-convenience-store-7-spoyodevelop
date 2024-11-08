import printMessage from '../../View/OutputView.js';
import { ERROR_MESSAGES } from '../Error/Error.js';

import { askUserAgree } from '../../View/InputView.js';
import processBills from '../calculators/processBills.js';
import { USER_MESSAGES } from '../SystemSettings/systemSettings.js';
import { promptUserInput, parseShoppingCart } from './inputHandler.js';
import {
  validateItemsExist,
  validateStockQuantity,
} from '../Validation/validations.js';
import { processShoppingCart } from '../calculators/processShoppingCart.js';

export default async function askUserInput(parsedProducts) {
  const inputString = await promptUserInput();
  const shoppingCart = parseShoppingCart(inputString);

  if (!validateItemsExist(shoppingCart, parsedProducts)) {
    printMessage(ERROR_MESSAGES.ITEM_NOT_FOUND);
    return askUserInput(parsedProducts);
  }

  if (!validateStockQuantity(shoppingCart, parsedProducts)) {
    printMessage(ERROR_MESSAGES.EXCEEDS_STOCK_QUANTITY);
    return askUserInput(parsedProducts);
  }

  const bills = await processShoppingCart(shoppingCart, parsedProducts);

  const { filteredGoods, totals } = processBills(bills);

  if (filteredGoods.length === 0) return;

  const isMembershipSale = await askUserAgree(
    USER_MESSAGES.ASK_MEMBERSHIP_SALE,
  );

  return {
    isMembershipSale,
    filteredGoods,
    totals,
  };
}
