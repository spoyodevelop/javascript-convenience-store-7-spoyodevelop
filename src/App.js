import { Console, DateTimes } from '@woowacourse/mission-utils';
import Product from './Model/Product.js';
import Promotion from './Model/Promotion.js';
import { getInputWhileValid, askUserAgree } from '../View/InputView.js';

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

    const allProduct = new Set(products.map((product) => product[0]));
    const needToAddProduct = [...allProduct.difference(promoProducts)];

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
        Console.print('상품이 없습니다.');
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
        Console.print(
          `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`,
        );
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
      const remainer = promoProduct.isRemainderLeft(sellingQuantity) ?? 0;
      let nonPromoSellQuantity = sellingQuantity - promoSellQuantity;
      let freebie = 0;
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
      let wantToBuyNonPromo = true;
      if (askUserFreebie) {
        promoSellQuantity += 1;
      }

      if (promoProduct) {
        freebie = promoProduct.getBOGO(promoSellQuantity);
      }

      if ((promoProduct && nonPromoSellQuantity) || remainer) {
        wantToBuyNonPromo = await askUserAgree(
          `현재 ${name}은(는) ${nonPromoSellQuantity + remainer}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
        );
      }
      if (!wantToBuyNonPromo) {
        nonPromoSellQuantity = 0;
        promoSellQuantity -= remainer;
      }
      if (promoProduct && promoSellQuantity > 0) {
        promoProduct.sell(promoSellQuantity);
      }

      if (nonPromoProduct && nonPromoSellQuantity > 0) {
        nonPromoProduct.sell(nonPromoSellQuantity);
      }
      let membershipSaleTotal = 0;
      const price = nonPromoProduct.getPrice();

      const membershipSale = await askUserAgree(
        '멤버십 할인을 받으시겠습니까? (Y/N)',
      );
      if (membershipSale) {
        membershipSaleTotal = ((nonPromoSellQuantity * price) / 100) * 30;
      }
      console.log(
        `
          promo에서 파는 양 : ${promoSellQuantity}
          nonPromo에서 파는 양: ${nonPromoSellQuantity}
          꽁짜로 주는 양: ${freebie}
          가격: ${nonPromoProduct.getPrice()}   
          맴버쉽 할인가: ${membershipSaleTotal}       
          `,
      );
    }

    const foundProduct = findProduct(parsedProducts, '콜라');
    const parsedNumber = await getInputWhileValid(
      isValidProductQuantity,
      '수를 입력해주세요.',
      foundProduct,
    );
    await sellProduct(foundProduct, Number(parsedNumber));

    parsedProducts.forEach((product) => console.log(product.toString()));
  }
}

export default App;
