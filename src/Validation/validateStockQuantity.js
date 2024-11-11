import { DateTimes } from '@woowacourse/mission-utils';
import findProduct from '../ProductFinder/findProduct.js';

function isValidProduct(foundProduct) {
  if (!Array.isArray(foundProduct) || foundProduct.length === 0) return false;
  return true;
}

function calculatePromoQuantity(foundProduct) {
  const promoProduct = foundProduct.find((product) => product.isPromoProduct());

  if (!promoProduct || !promoProduct.isAvailablePromotion(DateTimes.now()))
    return 0;

  return promoProduct.quantity;
}

function calculateNonPromoQuantity(foundProduct) {
  const nonPromoProduct = foundProduct.find(
    (product) => !product.isPromoProduct(),
  );

  if (!nonPromoProduct) return 0;

  return nonPromoProduct.quantity;
}

export default function validateStockQuantity(shoppingCart, parsedProducts) {
  return shoppingCart.every((item) => {
    const foundProduct = findProduct(parsedProducts, item.name);

    if (!isValidProduct(foundProduct)) return false;

    const promoQuantity = calculatePromoQuantity(foundProduct);
    const nonPromoQuantity = calculateNonPromoQuantity(foundProduct);
    const totalAvailableQuantity = promoQuantity + nonPromoQuantity;

    if (Number(item.quantity) > totalAvailableQuantity) return false;

    return true;
  });
}
