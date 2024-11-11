import findProduct from '../ProductFinder/findProduct.js';

export default function validateItemsExist(shoppingCart, parsedProducts) {
  return shoppingCart.every((item) => {
    const foundProduct = findProduct(parsedProducts, item.name);
    return Boolean(foundProduct);
  });
}
