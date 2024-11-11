export default function findProduct(findingProducts, productName) {
  const foundProduct = findingProducts.filter(
    (product) => product.name === productName,
  );

  if (foundProduct.length === 0) {
    return;
  }

  return foundProduct;
}
