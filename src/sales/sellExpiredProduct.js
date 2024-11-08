import {
  calculateNonPromoSellQuantity,
  getPromoAndNonPromoProducts,
} from './sellHelpers.js';

function calculateTotalMembershipSale(nonPromoSellQuantity, price) {
  const membershipSaleTotal = ((nonPromoSellQuantity * price) / 100) * 30;
  return Math.min(membershipSaleTotal, 8000);
}

export default async function sellExpiredProduct(
  foundProduct,
  sellingQuantity,
) {
  // 프로모션 상품을 무시하고 비프로모션 상품만 처리
  const { nonPromoProduct } = getPromoAndNonPromoProducts(foundProduct);
  const { name, price } = nonPromoProduct;

  // 비프로모션 판매 수량 계산
  const nonPromoSellQuantity = calculateNonPromoSellQuantity(
    sellingQuantity,
    0,
  );

  // 비프로모션 재고 판매 처리
  if (nonPromoProduct && nonPromoSellQuantity > 0) {
    nonPromoProduct.sell(nonPromoSellQuantity);
  }

  // 멤버십 할인 계산
  const membershipSaleTotal = calculateTotalMembershipSale(
    nonPromoSellQuantity,
    price,
  );

  // 결과 반환
  return {
    name,
    nonPromoSellQuantity,
    totalQuantity: nonPromoSellQuantity,
    price,
    membershipSaleTotal,
  };
}
