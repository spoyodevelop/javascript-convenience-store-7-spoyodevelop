import findProduct from '../ProductFinder/findProduct.js';

// 상품 존재 여부 검증
function validateItemsExist(shoppingCart, parsedProducts) {
  return shoppingCart.every((item) => {
    const foundProduct = findProduct(parsedProducts, item.name);
    return Boolean(foundProduct);
  });
}

// 재고 수량 검증
function validateStockQuantity(shoppingCart, parsedProducts) {
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

export { validateItemsExist, validateStockQuantity };
