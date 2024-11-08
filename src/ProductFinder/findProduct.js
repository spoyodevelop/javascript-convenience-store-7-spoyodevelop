export default function findProduct(findingProducts, productName) {
  const foundProduct = findingProducts.filter(
    (product) => product.name === productName,
  );

  // 빈 배열인지 확인하여 상품이 없는 경우 메시지를 출력
  if (foundProduct.length === 0) {
    return;
  }

  return foundProduct;
}
