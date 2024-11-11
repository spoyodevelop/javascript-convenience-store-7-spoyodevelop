import { DateTimes } from '@woowacourse/mission-utils';
import Promotion from '../src/Model/Promotion.js';

describe('Promotion canGiveFreeItem 및 isDateWithinPromotion 함수', () => {
  const testDateWithinPromotion = DateTimes.now(); // 프로모션 기간 내 날짜
  const testDateOutsidePromotion = new Date('2025-01-01'); // 프로모션 기간 외 날짜
  const edgeCaseDate = new Date('2024-12-31'); // 프로모션 종료일

  const testCases = [
    {
      promoName: '탄산2+1',
      purchaseCounts: [1, 2, 3, 4, 5, 6, 10, 20],
      testDates: [
        { date: testDateWithinPromotion, type: 'within' },
        { date: edgeCaseDate, type: 'edge' },
        { date: testDateOutsidePromotion, type: 'outside' },
      ],
      expectedResults: {
        within: [false, true, false, false, true, false, false, true],
        edge: [false, true, false, false, true, false, false, true],
        outside: [false, false, false, false, false, false, false, false],
      },
    },
    {
      promoName: 'MD추천상품',
      purchaseCounts: [1, 2, 3, 4, 5, 6, 10, 20],
      testDates: [
        { date: testDateWithinPromotion, type: 'within' },
        { date: edgeCaseDate, type: 'edge' },
        { date: testDateOutsidePromotion, type: 'outside' },
      ],
      expectedResults: {
        within: [true, false, true, false, true, false, false, false],
        edge: [true, false, true, false, true, false, false, false],
        outside: [false, false, false, false, false, false, false, false],
      },
    },
    {
      promoName: '반짝할인',
      purchaseCounts: [1, 2, 3, 4, 5, 10, 20],
      testDates: [
        { date: new Date('2024-11-15'), type: 'within' },
        { date: edgeCaseDate, type: 'edge' },
        { date: testDateOutsidePromotion, type: 'outside' },
      ],
      expectedResults: {
        within: [true, false, true, false, true, false, false],
        edge: [false, false, false, false, false, false, false],
        outside: [false, false, false, false, false, false, false],
      },
    },
  ];

  testCases.forEach(
    ({ promoName, purchaseCounts, testDates, expectedResults }) => {
      describe(`프로모션명: ${promoName}`, () => {
        let promo;
        beforeEach(() => {
          promo = new Promotion(promoName);
        });

        testDates.forEach(({ date, type }) => {
          purchaseCounts.forEach((count, index) => {
            test(`구매 수량: ${count}, 날짜: ${date.toISOString().split('T')[0]} (${type})`, () => {
              const isWithinPromotion = promo.isDateWithinPromotion(date);
              const canGive = promo.canGiveFreeItem(count);
              const result = isWithinPromotion && canGive;

              if (type === 'within') {
                expect(result).toBe(expectedResults.within[index]);
              } else if (type === 'edge') {
                expect(result).toBe(expectedResults.edge[index]);
              } else if (type === 'outside') {
                expect(result).toBe(expectedResults.outside[index]);
              }
            });
          });
        });
      });
    },
  );
});
