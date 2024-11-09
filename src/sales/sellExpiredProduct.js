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

  const nonPromoSellQuantity = calculateNonPromoSellQuantity(
    sellingQuantity,
    0,
  );

  if (nonPromoProduct && nonPromoSellQuantity > 0) {
    nonPromoProduct.sell(nonPromoSellQuantity);
  }

  const membershipSaleTotal = calculateTotalMembershipSale(
    nonPromoSellQuantity,
    price,
  );

  return {
    name,
    nonPromoSellQuantity,
    totalQuantity: nonPromoSellQuantity,
    price,
    membershipSaleTotal,
  };
}
