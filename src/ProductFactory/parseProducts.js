import Product from '../Model/Product.js';
import Promotion from '../Model/Promotion.js';

// 프로모션 상품 식별
function identifyPromoProducts(productList) {
  return new Set(
    productList
      .filter((product) => product.promotion === null)
      .map((product) => product.name),
  );
}

// 추가로 반영해야 할 상품 식별
function identifyProductsToAdd(productList, promoProducts) {
  const allProductNames = productList.map((product) => product.name);
  return allProductNames.filter(
    (productName) => !promoProducts.has(productName),
  );
}

// 개별 상품을 파싱
function parseSingleProduct(product, needToAddProduct) {
  const { name, price, quantity, promotion } = product;

  const currentPromotion = new Promotion(promotion || 'noPromo');
  const parsedProduct = [new Product(name, price, quantity, currentPromotion)];

  // 추가로 반영해야 하는 상품인지 확인 후 처리
  if (needToAddProduct.includes(name)) {
    parsedProduct.push(new Product(name, price, 0, new Promotion('noPromo')));
  }

  return parsedProduct;
}

export default function parseProducts(productList) {
  // 프로모션이 있지만 일반 재고가 없는 상품 식별
  const promoProducts = identifyPromoProducts(productList);

  // 모든 상품에서 프로모션만 있는 상품 필터링
  const needToAddProduct = identifyProductsToAdd(productList, promoProducts);

  // 상품 리스트를 파싱하여 결과 생성
  return productList.flatMap((product) =>
    parseSingleProduct(product, needToAddProduct),
  );
}
