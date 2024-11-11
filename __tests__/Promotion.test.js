import Promotion from '../src/Model/Promotion.js';
import PROMOTION_LIST from '../src/Model/PromotionList.js';

describe('Promotion canGiveFreeItem Method', () => {
  const testDateWithinPromotion = new Date('2024-06-15'); // 프로모션 기간 내 날짜
  const testDateOutsidePromotion = new Date('2025-01-01'); // 프로모션 기간 외 날짜

  const testCases = [
    {
      promoName: '탄산2+1',
      purchaseCounts: [1, 2, 3, 4, 5, 6],
      testDate: testDateWithinPromotion,
      expectedResults: [false, true, false, false, true, false],
    },
    {
      promoName: 'MD추천상품',
      purchaseCounts: [1, 2, 3, 4, 5, 6],
      testDate: testDateWithinPromotion,
      expectedResults: [true, false, true, false, true, false],
    },
    {
      promoName: '반짝할인',
      purchaseCounts: [1, 2, 3, 4],
      testDate: new Date('2024-11-15'), // 프로모션 기간 내 날짜
      expectedResults: [true, false, true, false],
    },
    {
      promoName: '반짝할인',
      purchaseCounts: [1, 2, 3, 4],
      testDate: testDateOutsidePromotion, // 프로모션 기간 외 날짜
      expectedResults: [false, false, false, false],
    },
  ];

  testCases.forEach(
    ({ promoName, purchaseCounts, testDate, expectedResults }) => {
      describe(`프로모션명: ${promoName}`, () => {
        const promo = new Promotion(promoName);

        purchaseCounts.forEach((count, index) => {
          test(`구매 수량: ${count}, 테스트 날짜: ${testDate.toISOString().split('T')[0]}`, () => {
            const isWithinPromotion = promo.isDateWithinPromotion(testDate);
            const canGive = promo.canGiveFreeItem(count);
            const result = isWithinPromotion && canGive;
            expect(result).toBe(expectedResults[index]);
          });
        });
      });
    },
  );
});
