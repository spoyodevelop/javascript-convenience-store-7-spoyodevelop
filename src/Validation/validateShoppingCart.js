import OutputView from '../View/OutputView.js';
import { ERROR_MESSAGES } from '../config/defaultSettings.js';
import ShoppingItem from '../Model/ShoppingItem.js';

const ITEM_REGEX = /^\[([^-]+)-(\d+)]$/;
const isNumber = /^(0|[1-9]\d*)$/;

function isValidFormat(item) {
  return ITEM_REGEX.test(item);
}

function parseItem(item) {
  const [, name, quantity] = item.match(ITEM_REGEX);
  return { name, quantity };
}

function isValidQuantity(quantity) {
  return isNumber.test(quantity) && Number(quantity) > 0;
}

export default function validateShoppingCart(inputString) {
  const shoppingItems = [];
  const items = inputString.split(',');

  items.forEach((item) => {
    const trimmedItem = item.trim();

    if (!isValidFormat(trimmedItem)) {
      OutputView.printMessage(`${ERROR_MESSAGES.INVALID_FORMAT}`);
      return null;
    }

    const { name, quantity } = parseItem(trimmedItem);
    if (!isValidQuantity(quantity)) {
      OutputView.printMessage(`${ERROR_MESSAGES.INVALID_QUANTITY}`);
      return null;
    }

    shoppingItems.push(new ShoppingItem(name, Number(quantity)));
  });

  if (shoppingItems.length > 0) {
    return shoppingItems;
  }
  return null;
}
