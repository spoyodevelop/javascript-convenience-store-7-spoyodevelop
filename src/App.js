import { Console, DateTimes } from '@woowacourse/mission-utils';

import { askUserAgree } from '../View/InputView.js';
import ShoppingItem from './Model/ShoppingItem.js';
import sellProduct from './Seller/sellProduct.js';
import sellExpiredProduct from './Seller/sellExpiredProduct.js';
import PRODUCT_LIST from './Model/ProductList.js';
import parseProducts from './ProductMaker/parseProducts.js';

class App {
  async run() {
    const parsedProducts = parseProducts(PRODUCT_LIST);
    function findProduct(findingProducts, productName) {
      const foundProduct = findingProducts.filter(
        (product) => product.getName() === productName,
      );

      // 빈 배열인지 확인하여 상품이 없는 경우 메시지를 출력
      if (foundProduct.length === 0) {
        return;
      }

      return foundProduct;
    }

    function isValidProductQuantity(inputQuantity, foundProduct) {
      const [promoProduct] = foundProduct.filter((product) =>
        product.isPromoProduct(),
      );
      const [nonPromoProduct] = foundProduct.filter(
        (product) => !product.isPromoProduct(),
      );

      const promoQuantity = promoProduct?.getQuantity() ?? 0;
      const nonPromoQuantity = nonPromoProduct?.getQuantity() ?? 0;

      if (Number(inputQuantity) > promoQuantity + nonPromoQuantity) {
        return false;
      }
      return Number(inputQuantity);
    }
    // 프로모션 상품과 비프로모션 상품 분리

    async function askUserInput() {
      while (true) {
        const inputString = await Console.readLineAsync(
          '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])',
        );

        const parsedString = inputString.split(',');
        const shoppingCart = [];
        const bills = [];
        parsedString.forEach((items) => {
          const slicedString = items.slice(1, -1);
          const [name, quantity] = slicedString.split('-');
          shoppingCart.push(new ShoppingItem(name, Number(quantity)));
        });

        const invalidItems = shoppingCart.filter((item) => {
          const foundProduct = findProduct(parsedProducts, item.getName());
          return !foundProduct;
        });

        if (invalidItems.length > 0) {
          Console.print(
            '[ERROR] 존재하지 않는 상품이 있습니다. 다시 입력해 주세요.',
          );
          continue;
        }
        const isValidQuantity = shoppingCart.every((item) => {
          const foundProduct = findProduct(parsedProducts, item.getName());
          return isValidProductQuantity(item.getQuantity(), foundProduct);
        });
        if (!isValidQuantity) {
          Console.print(
            '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
          );
          continue;
        }
        for (const item of shoppingCart) {
          const foundProduct = findProduct(parsedProducts, item.getName());
          const [promoProduct] = foundProduct.filter((product) =>
            product.isPromoProduct(),
          );
          let bill;

          if (promoProduct && !promoProduct.isExpired(DateTimes.now())) {
            bill = await sellExpiredProduct(foundProduct, item.getQuantity());
          } else {
            bill = await sellProduct(foundProduct, item.getQuantity());
          }
          bills.push(bill);
        }
        const isMembershipSale = await askUserAgree(
          '멤버십 할인을 받으시겠습니까? (Y/N)',
        );

        return { bills, isMembershipSale };
      }

      // 쇼핑 카트 처리 로직 추가
    }
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
      const { bills, isMembershipSale } = await askUserInput();
      printBills(bills, isMembershipSale);
      const moreSale = await askUserAgree(
        '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)',
      );
      if (!moreSale) {
        break;
      }
    }
    // const foundProduct = findProduct(parsedProducts, '콜라');
    // const parsedNumber = await getInputWhileValid(
    //   isValidProductQuantity,
    //   '수를 입력해주세요.',
    //   foundProduct,
    // );
    // await sellProduct(foundProduct, Number(parsedNumber));
  }
}

export default App;
