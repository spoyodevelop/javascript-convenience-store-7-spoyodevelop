import { DateTimes } from '@woowacourse/mission-utils';
import sellProduct from '../sales/sellProduct.js';
import sellExpiredProduct from '../sales/sellExpiredProduct.js';
import findProduct from '../ProductFinder/findProduct.js';

// 장바구니 처리 및 결제
async function processShoppingCart(shoppingCart, parsedProducts) {
  const bills = [];

  for (const item of shoppingCart) {
    const foundProduct = findProduct(parsedProducts, item.name);
    const [promoProduct] = foundProduct.filter((product) =>
      product.isPromoProduct(),
    );

    if (promoProduct && !promoProduct.isAvailablePromotion(DateTimes.now())) {
      bills.push(await sellExpiredProduct(foundProduct, item.quantity));
      continue;
    }

    bills.push(await sellProduct(foundProduct, item.quantity));
  }

  return bills;
}

export { processShoppingCart };
