import { Console, DateTimes } from '@woowacourse/mission-utils';
import Product from './Model/Product.js';
import Promotion from './Model/Promotion.js';
import { getInputWhileValid, askUserAgree } from '../View/InputView.js';
import ShoppingItem from './Model/ShoppingItem.js';

class App {
  async run() {
    const products = [
      ['콜라', 1000, 10, '탄산2+1'],
      ['콜라', 1000, 10, null],
      ['사이다', 1000, 8, '탄산2+1'],
      ['사이다', 1000, 7, null],
      ['오렌지주스', 1800, 9, 'MD추천상품'],
      ['탄산수', 1200, 5, '탄산2+1'],
      ['물', 500, 10, null],
      ['비타민워터', 1500, 6, null],
      ['감자칩', 1500, 5, '반짝할인'],
      ['감자칩', 1500, 5, null],
      ['초코바', 1200, 5, 'MD추천상품'],
      ['초코바', 1200, 5, null],
      ['에너지바', 2000, 5, null],
      ['정식도시락', 6400, 8, null],
      ['컵라면', 1700, 1, 'MD추천상품'],
      ['컵라면', 1700, 10, null],
    ];

    // products를 검사하여, 프로모션이 있지만, 일반 재고가 없는 것들은 반영 시킨다.
    const promoProducts = new Set(
      products
        .filter((product) => product[3] === null)
        .map((product) => product[0]),
    );

    const allProduct = products.map((product) => product[0]);

    const needToAddProduct = allProduct.filter(
      (product) => !promoProducts.has(product),
    );

    const parsedProducts = [];
    products.forEach((product) => {
      const [name, price, quantity, promo] = product;
      let promotion;
      if (promo) {
        promotion = new Promotion(promo);
      } else {
        promotion = new Promotion('noPromo');
      }
      parsedProducts.push(new Product(name, price, quantity, promotion));
      const isNeedToAdd = needToAddProduct.includes(product[0]);
      if (isNeedToAdd) {
        parsedProducts.push(
          new Product(name, price, 0, new Promotion('noPromo')),
        );
      }
    });
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

    async function sellProduct(foundProduct, sellingQuantity) {
      const [promoProduct] = foundProduct.filter((product) =>
        product.isPromoProduct(),
      );
      const [nonPromoProduct] = foundProduct.filter(
        (product) => !product.isPromoProduct(),
      );

      const promoQuantity = promoProduct?.getQuantity() ?? 0;

      let promoSellQuantity = Math.min(sellingQuantity, promoQuantity);
      let askUserFreebie = false;
      const name = nonPromoProduct.getName();
      if (
        promoProduct &&
        promoProduct.askFreeFreebie(sellingQuantity) &&
        sellingQuantity < promoQuantity
      ) {
        askUserFreebie = await askUserAgree(
          `현재 ${name}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`,
        );
      }
      if (askUserFreebie) {
        promoSellQuantity += 1;
      }
      let remainer = promoProduct?.isRemainderLeft(promoSellQuantity) ?? 0;
      // console.log(`remainder: ${remainer}`);
      let nonPromoSellQuantity = 0;
      if (sellingQuantity - promoSellQuantity > 0) {
        nonPromoSellQuantity = sellingQuantity - promoSellQuantity;
      }
      let freebie = 0;

      let wantToBuyNonPromo = true;

      if (promoProduct) {
        freebie = promoProduct.getBOGO(promoSellQuantity);
      }

      if (
        promoProduct &&
        nonPromoSellQuantity
        // 말이안됨
        // || remainer
      ) {
        wantToBuyNonPromo = await askUserAgree(
          `현재 ${name}은(는) ${nonPromoSellQuantity + remainer}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
        );
      }
      if (!wantToBuyNonPromo) {
        nonPromoSellQuantity = 0;
        promoSellQuantity -= remainer;
        remainer = 0;
      }
      // 유의 reminder 적용하는지 유의할것.
      if (promoProduct && promoSellQuantity > 0) {
        promoProduct.sell(promoSellQuantity);
      }

      if (nonPromoProduct && nonPromoSellQuantity > 0) {
        nonPromoProduct.sell(nonPromoSellQuantity);
      }
      let membershipSaleTotal = 0;
      const price = nonPromoProduct.getPrice();

      membershipSaleTotal =
        (((nonPromoSellQuantity + remainer) * price) / 100) * 30;
      if (membershipSaleTotal > 8000) {
        membershipSaleTotal = 8000;
      }

      // console.log(
      //   `
      //     promo에서 파는 양 : ${promoSellQuantity}
      //     nonPromo에서 파는 양: ${nonPromoSellQuantity}
      //     꽁짜로 주는 양: ${freebie}
      //     가격: ${nonPromoProduct.getPrice()}
      //     맴버쉽 할인가: ${membershipSaleTotal}
      //     `,
      // );
      return {
        name,
        promoSellQuantity,
        nonPromoSellQuantity,
        totalQuantity: promoSellQuantity + nonPromoSellQuantity,
        freebie,
        price: nonPromoProduct.getPrice(),
        membershipSaleTotal,
      };
    }
    async function sellExpiredProduct(foundProduct, sellingQuantity) {
      const [promoProduct] = foundProduct.filter((product) =>
        product.isPromoProduct(),
      );
      const [nonPromoProduct] = foundProduct.filter(
        (product) => !product.isPromoProduct(),
      );

      const promoQuantity = promoProduct?.getQuantity() ?? 0;

      const promoSellQuantity = Math.min(sellingQuantity, promoQuantity);

      const name = nonPromoProduct.getName();

      // console.log(`remainder: ${remainer}`);
      const nonPromoSellQuantity = sellingQuantity - promoSellQuantity;

      if (promoProduct && promoSellQuantity > 0) {
        promoProduct.sell(promoSellQuantity);
      }

      if (nonPromoProduct && nonPromoSellQuantity > 0) {
        nonPromoProduct.sell(nonPromoSellQuantity);
      }
      let membershipSaleTotal = 0;
      const price = nonPromoProduct.getPrice();

      membershipSaleTotal =
        (((nonPromoSellQuantity + promoSellQuantity) * price) / 100) * 30;
      if (membershipSaleTotal > 8000) {
        membershipSaleTotal = 8000;
      }

      return {
        name,
        promoSellQuantity,
        nonPromoSellQuantity,
        totalQuantity: promoSellQuantity + nonPromoSellQuantity,

        price: nonPromoProduct.getPrice(),
        membershipSaleTotal,
      };
    }
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
      const sumsTotal = totalPurchased - totalMembershipSale - totalPromoSale;
      function toNumberFormatOfKor(num) {
        return num.toLocaleString('ko-KR');
      }
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
