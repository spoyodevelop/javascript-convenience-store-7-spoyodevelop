import { askUserAgree } from '../../View/InputView.js';

function getPromoAndNonPromoProducts(foundProduct) {
  const [promoProduct] = foundProduct.filter((product) =>
    product.isPromoProduct(),
  );
  const [nonPromoProduct] = foundProduct.filter(
    (product) => !product.isPromoProduct(),
  );
  return { promoProduct, nonPromoProduct };
}

// 프로모션 판매 수량 계산
function calculatePromoSellQuantity(sellingQuantity, promoProduct) {
  const promoQuantity = promoProduct?.getQuantity() ?? 0;
  return Math.min(sellingQuantity, promoQuantity);
}

// 잔여 수량 계산
function calculateRemainder(promoProduct, promoSellQuantity) {
  return promoProduct?.isRemainderLeft(promoSellQuantity) ?? 0;
}

// 비프로모션 판매 수량 계산
function calculateNonPromoSellQuantity(sellingQuantity, promoSellQuantity) {
  return Math.max(0, sellingQuantity - promoSellQuantity);
}

// 무료 상품 추가 여부 확인
async function checkFreebieEligibility(promoProduct, sellingQuantity, name) {
  if (
    promoProduct &&
    promoProduct.askFreeFreebie(sellingQuantity) &&
    sellingQuantity < promoProduct.getQuantity()
  ) {
    return await askUserAgree(
      `현재 ${name}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`,
    );
  }
  return false;
}

export {
  getPromoAndNonPromoProducts,
  calculateNonPromoSellQuantity,
  calculateRemainder,
  calculatePromoSellQuantity,
  checkFreebieEligibility,
};
