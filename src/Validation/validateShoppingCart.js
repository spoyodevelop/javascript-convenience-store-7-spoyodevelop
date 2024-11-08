import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES } from '../Error/Error.js';
import ShoppingItem from '../Model/ShoppingItem.js';

export default function validateShoppingCart(inputString) {
  // 수정된 정규식: 상품명에서 '-' 문자를 제외
  const itemPattern = /^\[([^-]+)-(\d+)]$/;
  const items = inputString.split(',').map((item) => item.trim());

  const shoppingItems = [];

  for (const item of items) {
    const match = item.match(itemPattern);
    if (!match) {
      Console.print(ERROR_MESSAGES.INVALID_FORMAT);
      return null; // 형식 오류 시 즉시 반환
    }

    const name = match[1];
    const quantity = Number(match[2]);

    // 수량 검증: 음수, 0, 정수가 아닌 경우 즉시 반환
    if (!Number.isInteger(quantity) || quantity <= 0) {
      Console.print(ERROR_MESSAGES.INVALID_QUANTITY);
      return null;
    }

    // 검증이 통과된 경우에만 객체 생성
    shoppingItems.push(new ShoppingItem(name, quantity));
  }

  // 검증 후 배열이 비어 있으면 null 반환
  if (shoppingItems.length === 0) {
    return null;
  }

  return shoppingItems;
}
