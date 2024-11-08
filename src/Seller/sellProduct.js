import {
  calculateNonPromoSellQuantity,
  getPromoAndNonPromoProducts,
  calculatePromoSellQuantity,
  checkFreebieEligibility,
  calculateRemainder,
} from './sellingHelpers.js';
import { askUserAgree } from '../../View/InputView.js';

function calculateMembershipSale(nonPromoSellQuantity, remainder, price) {
  const membershipSaleTotal =
    (((nonPromoSellQuantity + remainder) * price) / 100) * 30;
  return Math.min(membershipSaleTotal, 8000);
}
export default async function sellProduct(foundProduct, sellingQuantity) {
  // 프로모션 상품과 비프로모션 상품 분리
  const { promoProduct, nonPromoProduct } =
    getPromoAndNonPromoProducts(foundProduct);

  // 비프로모션 상품 이름
  const { name } = nonPromoProduct;

  // 프로모션 판매 수량 계산
  let promoSellQuantity = calculatePromoSellQuantity(
    sellingQuantity,
    promoProduct,
  );

  // 무료 상품 추가 여부 확인
  const askUserFreebie = await checkFreebieEligibility(
    promoProduct,
    sellingQuantity,
    name,
  );
  if (askUserFreebie) {
    promoSellQuantity += 1;
  }

  // 잔여 수량 및 비프로모션 판매 수량 계산
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
    wantToBuyNonPromo = await askUserAgree(
      `현재 ${name}은(는) ${nonPromoSellQuantity + remainder}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
    );
  }

  // 비프로모션 상품 구매를 원하지 않는 경우 처리
  if (!wantToBuyNonPromo) {
    nonPromoSellQuantity = 0;
    promoSellQuantity -= remainder;
    remainder = 0;
  }

  // 판매 처리
  if (promoProduct && promoSellQuantity > 0) {
    promoProduct.sell(promoSellQuantity);
  }
  if (nonPromoProduct && nonPromoSellQuantity > 0) {
    nonPromoProduct.sell(nonPromoSellQuantity);
  }

  // 멤버십 할인 계산
  const { price } = nonPromoProduct;
  const membershipSaleTotal = calculateMembershipSale(
    nonPromoSellQuantity,
    remainder,
    price,
  );

  // 결과 반환
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
