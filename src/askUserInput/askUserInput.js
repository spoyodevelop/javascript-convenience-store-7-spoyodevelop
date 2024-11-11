import { USER_MESSAGES, ERROR_MESSAGES } from '../config/defaultSettings.js';

import processBills from '../calculators/processBills.js';

import processShoppingCart from '../calculators/processShoppingCart.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';
import validateItemsExist from '../Validation/validateItemsExist.js';
import validateStockQuantity from '../Validation/validateStockQuantity.js';

async function getValidatedShoppingCart(parsedProducts) {
  const shoppingCart = await InputView.getValidShoppingCart();

  if (!validateItemsExist(shoppingCart, parsedProducts)) {
    OutputView.printMessage(ERROR_MESSAGES.ITEM_NOT_FOUND);
    return getValidatedShoppingCart(parsedProducts);
  }

  if (!validateStockQuantity(shoppingCart, parsedProducts)) {
    OutputView.printMessage(ERROR_MESSAGES.EXCEEDS_STOCK_QUANTITY);
    return getValidatedShoppingCart(parsedProducts);
  }

  return shoppingCart;
}

export default async function askUserInput(parsedProducts) {
  const shoppingCart = await getValidatedShoppingCart(parsedProducts);

  const bills = await processShoppingCart(shoppingCart, parsedProducts);
  const { filteredGoods, totals } = processBills(bills);

  if (filteredGoods.length === 0) return;

  const isMembershipSale = await InputView.askUserAgree(
    USER_MESSAGES.ASK_MEMBERSHIP_SALE,
  );

  return {
    isMembershipSale,
    filteredGoods,
    totals,
  };
}
