import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES } from '../config/defaultSettings.js';
import ShoppingItem from '../Model/ShoppingItem.js';

function isValidFormat(item) {
  return /^\[([^-]+)-(\d+)]$/.test(item);
}
const isNumber = /^(0|[1-9]\d*)$/;

function parseItem(item) {
  const [, name, quantity] = item.match(/^\[([^-]+)-(\d+)]$/);
  return { name, quantity };
}

function isValidQuantity(quantity) {
  if (!isNumber.test(quantity)) return false;
  const numberQuantity = Number(quantity);
  return Number.isInteger(numberQuantity) && numberQuantity > 0;
}

export default function validateShoppingCart(inputString) {
  const shoppingItems = [];

  inputString.split(',').forEach((item) => {
    const trimmedItem = item.trim();

    if (!isValidFormat(trimmedItem)) {
      Console.print(ERROR_MESSAGES.INVALID_FORMAT);
      return;
    }

    const { name, quantity } = parseItem(trimmedItem);
    if (!isValidQuantity(quantity)) {
      Console.print(ERROR_MESSAGES.INVALID_QUANTITY);
      return;
    }

    shoppingItems.push(new ShoppingItem(name, Number(quantity)));
  });

  if (shoppingItems.length === 0) {
    return null;
  }

  return shoppingItems;
}
