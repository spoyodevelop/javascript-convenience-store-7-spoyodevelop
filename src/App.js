import { Console } from '@woowacourse/mission-utils';

import { askUserAgree } from '../View/InputView.js';

import PRODUCT_LIST from './Model/ProductList.js';
import parseProducts from './ProductMaker/parseProducts.js';
import askUserInput from './askUserInput/askUserInput.js';

class App {
  async run() {
    const parsedProducts = parseProducts(PRODUCT_LIST);

    function printBills(bills, isMembershipSale) {
      const result = '';
      const goods = [];
      let totalPurchased = 0;
      let totalPromoSale = 0;
      let totalMembershipSale = 0;
      bills.forEach((bill) => {
        goods.push([bill.name, bill.totalQuantity, bill.price, bill.freebie]);

        totalPurchased += bill.totalQuantity * bill.price;
        if (bill.freebie) {
          totalPromoSale += bill.freebie * bill.price;
        }
        if (isMembershipSale) totalMembershipSale += bill.membershipSaleTotal;
      });

      function toNumberFormatOfKor(num) {
        return num.toLocaleString('ko-KR');
      }

      totalMembershipSale = Math.min(8000, totalMembershipSale);

      const sumsTotal = totalPurchased - totalMembershipSale - totalPromoSale;

      Console.print('===========W 편의점=============');
      Console.print('상품명		수량	금액');

      goods.forEach((good) => {
        const [name, totalQuantity, price, freebie] = good;
        Console.print(`${name} ${totalQuantity} ${price * totalQuantity}`);
      });
      Console.print('===========증	정=============');
      goods.forEach((good) => {
        const [name, totalQuantity, price, freebie] = good;
        if (freebie) Console.print(`${name} ${freebie}`);
      });

      Console.print(`총구매액 ${toNumberFormatOfKor(totalPurchased)}`);
      Console.print(`행사할인 -${toNumberFormatOfKor(totalPromoSale)}`);
      Console.print(`맴버쉽할인 -${toNumberFormatOfKor(totalMembershipSale)}`);
      Console.print(`내실돈 ${toNumberFormatOfKor(sumsTotal)}`);
    }

    while (true) {
      Console.print('안녕하세요. W편의점입니다.');
      Console.print('현재 보유하고 있는 상품입니다.');
      parsedProducts.forEach((product) => Console.print(product.toString()));
      const { bills, isMembershipSale } = await askUserInput(parsedProducts);
      printBills(bills, isMembershipSale);
      const moreSale = await askUserAgree(
        '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)',
      );
      if (!moreSale) {
        break;
      }
    }
  }
}

export default App;
