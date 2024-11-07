import { Console } from '@woowacourse/mission-utils';
import {
  promptUserInput,
  parseShoppingCart,
  validateItemsExist,
  validateStockQuantity,
  processShoppingCart,
} from './askUserHelper.js';
import { askUserAgree } from '../../View/InputView.js';

export default async function askUserInput(parsedProducts) {
  const inputString = await promptUserInput();
  const shoppingCart = parseShoppingCart(inputString);

  if (!validateItemsExist(shoppingCart, parsedProducts)) {
    Console.print('[ERROR] 존재하지 않는 상품이 있습니다. 다시 입력해 주세요.');
    return askUserInput(parsedProducts); // 재귀 호출
  }

  if (!validateStockQuantity(shoppingCart, parsedProducts)) {
    Console.print(
      '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
    );
    return askUserInput(parsedProducts); // 재귀 호출
  }

  const bills = await processShoppingCart(shoppingCart, parsedProducts);

  const goods = [];
  let totalPurchased = 0;
  let totalPromoSale = 0;
  let totalMembershipSale = 0;
  //   console.log(bills);

  bills.forEach((bill) => {
    goods.push([bill.name, bill.totalQuantity, bill.price, bill.freebie]);

    totalPurchased += bill.totalQuantity * bill.price;
    if (bill.freebie) {
      totalPromoSale += bill.freebie * bill.price;
    }
    totalMembershipSale += bill.membershipSaleTotal;
  });
  const filteredGoods = goods.filter((good) => good[1] !== 0);

  if (!filteredGoods || filteredGoods.length === 0) {
    return;
  }
  const isMembershipSale = await askUserAgree(
    '멤버십 할인을 받으시겠습니까? (Y/N)',
  );

  return {
    bills,
    isMembershipSale,
    filteredGoods,
    totalPurchased,
    totalPromoSale,
    totalMembershipSale,
  };
}
