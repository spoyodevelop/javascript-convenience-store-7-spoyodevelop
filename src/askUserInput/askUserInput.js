import { Console } from '@woowacourse/mission-utils';
import {
  promptUserInput,
  parseShoppingCart,
  validateItemsExist,
  validateStockQuantity,
  processShoppingCart,
} from './askUserHelper.js';
import { askUserAgree } from '../../View/InputView.js';

export default async function askUserInput() {
  const inputString = await promptUserInput();
  const shoppingCart = parseShoppingCart(inputString);

  if (!validateItemsExist(shoppingCart)) {
    Console.print('[ERROR] 존재하지 않는 상품이 있습니다. 다시 입력해 주세요.');
    return askUserInput(); // 재귀 호출
  }

  if (!validateStockQuantity(shoppingCart)) {
    Console.print(
      '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
    );
    return askUserInput(); // 재귀 호출
  }

  const bills = await processShoppingCart(shoppingCart);
  const isMembershipSale = await askUserAgree(
    '멤버십 할인을 받으시겠습니까? (Y/N)',
  );

  return { bills, isMembershipSale };
}
