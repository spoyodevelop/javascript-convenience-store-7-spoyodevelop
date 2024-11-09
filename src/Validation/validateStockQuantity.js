import { DateTimes } from '@woowacourse/mission-utils';
import findProduct from '../ProductFinder/findProduct.js';

export default function validateStockQuantity(shoppingCart, parsedProducts) {
  for (const item of shoppingCart) {
    const foundProduct = findProduct(parsedProducts, item.name);

    if (!Array.isArray(foundProduct) || foundProduct.length === 0) {
      return false;
    }

    const promoProduct = foundProduct.find((product) =>
      product.isPromoProduct(),
    );
    const nonPromoProduct = foundProduct.find(
      (product) => !product.isPromoProduct(),
    );

    let promoQuantity = promoProduct ? promoProduct.quantity : 0;
    const nonPromoQuantity = nonPromoProduct ? nonPromoProduct.quantity : 0;

    if (promoProduct && !promoProduct.isAvailablePromotion(DateTimes.now())) {
      promoQuantity = 0;
    }

    const totalAvailableQuantity = promoQuantity + nonPromoQuantity;

    if (Number(item.quantity) > totalAvailableQuantity) {
      return false;
    }
  }
  return true;
}
