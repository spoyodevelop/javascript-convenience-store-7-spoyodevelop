import {
  calculateNonPromoSellQuantity,
  getPromoAndNonPromoProducts,
  calculatePromoSellQuantity,
  checkFreebieEligibility,
  calculateRemainder,
} from './sellHelpers.js';
import InputView from '../View/InputView.js';

function calculateMembershipSale(nonPromoSellQuantity, remainder, price) {
  const membershipSaleTotal =
    (((nonPromoSellQuantity + remainder) * price) / 100) * 30;
  return Math.min(membershipSaleTotal, 8000);
}

function getProductInfo(foundProduct) {
  const { promoProduct, nonPromoProduct } =
    getPromoAndNonPromoProducts(foundProduct);
  const { name } = nonPromoProduct;
  return { promoProduct, nonPromoProduct, name };
}

async function handleFreebieEligibility(
  promoProduct,
  sellingQuantity,
  name,
  promoSellQuantity,
) {
  const askUserFreebie = await checkFreebieEligibility(
    promoProduct,
    sellingQuantity,
    name,
  );
  if (askUserFreebie) {
    promoSellQuantity += 1;
  }
  return promoSellQuantity;
}

async function adjustQuantities(
  promoProduct,
  nonPromoSellQuantity,
  remainder,
  name,
  promoSellQuantity,
  inputView,
) {
  let wantToBuyNonPromo = true;
  if (promoProduct && nonPromoSellQuantity > 0) {
    wantToBuyNonPromo = await inputView.askUserAgree(
      `현재 ${name}은(는) ${nonPromoSellQuantity + remainder}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
    );
  }

  if (!wantToBuyNonPromo) {
    nonPromoSellQuantity = 0;
    promoSellQuantity -= remainder;
    remainder = 0;
  }

  return { nonPromoSellQuantity, promoSellQuantity, remainder };
}

function processProductSales(
  promoProduct,
  promoSellQuantity,
  nonPromoProduct,
  nonPromoSellQuantity,
) {
  if (promoProduct && promoSellQuantity > 0) {
    promoProduct.sell(promoSellQuantity);
  }
  if (nonPromoProduct && nonPromoSellQuantity > 0) {
    nonPromoProduct.sell(nonPromoSellQuantity);
  }
}

function calculateMembershipSaleTotal(
  nonPromoProduct,
  nonPromoSellQuantity,
  remainder,
) {
  const { price } = nonPromoProduct;
  return calculateMembershipSale(nonPromoSellQuantity, remainder, price);
}

function getReturnObject(
  name,
  promoSellQuantity,
  nonPromoSellQuantity,
  promoProduct,
  price,
  membershipSaleTotal,
) {
  return {
    name,
    promoSellQuantity,
    nonPromoSellQuantity,
    totalQuantity: promoSellQuantity + nonPromoSellQuantity,
    freebie: promoProduct?.getBOGO(promoSellQuantity) ?? 0,
    price,
    membershipSaleTotal,
  };
}

async function getSaleQuantities(
  sellingQuantity,
  promoProduct,
  name,
  inputView,
) {
  let promoSellQuantity = calculatePromoSellQuantity(
    sellingQuantity,
    promoProduct,
  );
  promoSellQuantity = await handleFreebieEligibility(
    promoProduct,
    sellingQuantity,
    name,
    promoSellQuantity,
  );
  const remainder = calculateRemainder(promoProduct, promoSellQuantity);
  const nonPromoSellQuantity = calculateNonPromoSellQuantity(
    sellingQuantity,
    promoSellQuantity,
  );
  return adjustQuantities(
    promoProduct,
    nonPromoSellQuantity,
    remainder,
    name,
    promoSellQuantity,
    inputView,
  );
}

export default async function sellProduct(foundProduct, sellingQuantity) {
  const { promoProduct, nonPromoProduct, name } = getProductInfo(foundProduct);
  const { promoSellQuantity, remainder, nonPromoSellQuantity } =
    await getSaleQuantities(sellingQuantity, promoProduct, name, InputView);
  processProductSales(
    promoProduct,
    promoSellQuantity,
    nonPromoProduct,
    nonPromoSellQuantity,
  );
  const membershipSaleTotal = calculateMembershipSaleTotal(
    nonPromoProduct,
    nonPromoSellQuantity,
    remainder,
  );
  return getReturnObject(
    name,
    promoSellQuantity,
    nonPromoSellQuantity,
    promoProduct,
    nonPromoProduct.price,
    membershipSaleTotal,
  );
}
