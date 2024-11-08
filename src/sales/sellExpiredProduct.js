import {
  calculateNonPromoSellQuantity,
  getPromoAndNonPromoProducts,
  calculatePromoSellQuantity,
} from './sellHelpers.js';

function calculateTotalMembershipSale(
  nonPromoSellQuantity,
  promoSellQuantity,
  price,
) {
  const membershipSaleTotal =
    (((nonPromoSellQuantity + promoSellQuantity) * price) / 100) * 30;
  return Math.min(membershipSaleTotal, 8000);
}

export default async function sellExpiredProduct(
  foundProduct,
  sellingQuantity,
) {
  const { promoProduct, nonPromoProduct } =
    getPromoAndNonPromoProducts(foundProduct);

  const { name } = nonPromoProduct;
  const promoSellQuantity = calculatePromoSellQuantity(
    sellingQuantity,
    promoProduct,
  );
  const nonPromoSellQuantity = calculateNonPromoSellQuantity(
    sellingQuantity,
    promoSellQuantity,
  );

  if (promoProduct && promoSellQuantity > 0) {
    promoProduct.sell(promoSellQuantity);
  }
  if (nonPromoProduct && nonPromoSellQuantity > 0) {
    nonPromoProduct.sell(nonPromoSellQuantity);
  }

  const { price } = nonPromoProduct;
  const membershipSaleTotal = calculateTotalMembershipSale(
    nonPromoSellQuantity,
    promoSellQuantity,
    price,
  );

  return {
    name,
    promoSellQuantity,
    nonPromoSellQuantity,
    totalQuantity: promoSellQuantity + nonPromoSellQuantity,
    price,
    membershipSaleTotal,
  };
}
