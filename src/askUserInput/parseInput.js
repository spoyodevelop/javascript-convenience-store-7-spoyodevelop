import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES } from '../Error/Error.js';

import ShoppingItem from '../Model/ShoppingItem.js';

/**
 * 입력 문자열을 파싱하고 유효성을 검사하는 함수
 * @param {string} inputString - 사용자 입력 문자열
 * @returns {ShoppingItem[]} - 파싱된 ShoppingItem 객체 배열
 */
export default function validateShoppingCart(inputString) {
  const itemPattern = /^\[(.+)-(\d+)]$/;
  const items = inputString.split(',').map((item) => item.trim());

  const shoppingItems = [];

  for (const item of items) {
    const match = item.match(itemPattern);
    if (!match) {
      Console.print(ERROR_MESSAGES.INVALID_FORMAT);
      return null; // 잘못된 형식일 경우 null 반환
    }

    const name = match[1];
    const quantity = Number(match[2]);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      Console.print(ERROR_MESSAGES.INVALID_QUANTITY);
      return null; // 잘못된 수량일 경우 null 반환
    }

    shoppingItems.push(new ShoppingItem(name, quantity));
  }

  return shoppingItems;
}
