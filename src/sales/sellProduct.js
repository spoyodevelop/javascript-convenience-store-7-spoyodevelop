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
export default async function sellProduct(foundProduct, sellingQuantity) {
  const inputView = new InputView();

  const { promoProduct, nonPromoProduct } =
    getPromoAndNonPromoProducts(foundProduct);

  const { name } = nonPromoProduct;

  let promoSellQuantity = calculatePromoSellQuantity(
    sellingQuantity,
    promoProduct,
  );

  const askUserFreebie = await checkFreebieEligibility(
    promoProduct,
    sellingQuantity,
    name,
  );
  if (askUserFreebie) {
    promoSellQuantity += 1;
  }

  let remainder = calculateRemainder(promoProduct, promoSellQuantity);
  // let freeItemNeed = 0;
  // if (promoProduct) {
  //   freeItemNeed = promoProduct.howMuchItemNeedToBeFree() + 1;
  //   // console.log(freeItemNeed);
  // }
  let nonPromoSellQuantity = calculateNonPromoSellQuantity(
    sellingQuantity,
    promoSellQuantity,
  );

  // 비프로모션 상품 구매 여부 확인
  let wantToBuyNonPromo = true;
  if (
    promoProduct &&
    nonPromoSellQuantity > 0
    // (promoProduct &&
    //   promoSellQuantity > 0 &&
    //   promoSellQuantity + 1 === freeItemNeed)
    // // ||
    // (promoSellQuantity > 0 && remainder)
    // 이것을 어떻게 처리 해야 할까.... 일단 기본 테스트 코드가 통과 하지 않으니, 수정을 가하지는 않겠음.
    // promoSellQuantity가 1차이로 나면 그때만 할까?
  ) {
    wantToBuyNonPromo = await inputView.askUserAgree(
      `현재 ${name}은(는) ${nonPromoSellQuantity + remainder}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
    );
  }

  if (!wantToBuyNonPromo) {
    nonPromoSellQuantity = 0;
    promoSellQuantity -= remainder;
    remainder = 0;
  }

  if (promoProduct && promoSellQuantity > 0) {
    promoProduct.sell(promoSellQuantity);
  }
  if (nonPromoProduct && nonPromoSellQuantity > 0) {
    nonPromoProduct.sell(nonPromoSellQuantity);
  }

  const { price } = nonPromoProduct;
  const membershipSaleTotal = calculateMembershipSale(
    nonPromoSellQuantity,
    remainder,
    price,
  );

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
