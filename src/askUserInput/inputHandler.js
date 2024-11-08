import { Console } from '@woowacourse/mission-utils';
import ShoppingItem from '../Model/ShoppingItem.js';

async function promptUserInput() {
  return Console.readLineAsync(
    '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])',
  );
}
function parseShoppingCart(inputString) {
  const parsedString = inputString.split(',');
  return parsedString.map((items) => {
    const slicedString = items.slice(1, -1);
    const [name, quantity] = slicedString.split('-');
    return new ShoppingItem(name, Number(quantity));
  });
}

export { promptUserInput, parseShoppingCart };
