import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES } from '../Error/Error.js';
import ShoppingItem from '../Model/ShoppingItem.js';

/**
 * 입력 문자열을 파싱하고 유효성을 검사하는 함수
 * @param {string} inputString - 사용자 입력 문자열
 * @returns {ShoppingItem[] | null} - 파싱된 ShoppingItem 객체 배열 또는 null
 */
function validateShoppingCart(inputString) {
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

/**
 * 올바른 입력을 받을 때까지 반복해서 입력을 요청하는 함수
 * @returns {ShoppingItem[]} - 유효한 ShoppingItem 객체 배열
 */
async function getValidShoppingCart() {
  while (true) {
    const input = await Console.readLineAsync(
      '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])',
    );

    const shoppingCart = validateShoppingCart(input);

    if (shoppingCart !== null) {
      return shoppingCart; // 유효한 입력일 경우 반환
    }
  }
}

export { getValidShoppingCart };
