import findProduct from '../ProductFinder/findProduct.js';

export default function validateStockQuantity(shoppingCart, parsedProducts) {
  return shoppingCart.every((item) => {
    const foundProduct = findProduct(parsedProducts, item.name);
    if (!foundProduct || foundProduct.length === 0) {
      return false;
    }

    const [promoProduct] = foundProduct.filter((product) =>
      product.isPromoProduct(),
    );
    const [nonPromoProduct] = foundProduct.filter(
      (product) => !product.isPromoProduct(),
    );

    const promoQuantity = promoProduct?.quantity ?? 0;
    const nonPromoQuantity = nonPromoProduct?.quantity ?? 0;
    const totalAvailableQuantity = promoQuantity + nonPromoQuantity;

    return Number(item.quantity) <= totalAvailableQuantity;
  });
}
// expired 로직을 여기다 적용할까?
