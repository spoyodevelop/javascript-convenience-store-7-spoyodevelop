import validateStockQuantity from '../src/Validation/validateStockQuantity.js';

jest.mock('@woowacourse/mission-utils', () => ({
  DateTimes: {
    now: () => new Date('2023-10-15'),
  },
}));

describe('validateStockQuantity 함수 테스트', () => {
  test('재고 수량이 충분한 경우 true를 반환해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 A',
        quantity: 10,
        isPromoProduct: () => false,
        isAvailablePromotion: () => false,
      },
      {
        name: '상품 B',
        quantity: 5,
        isPromoProduct: () => true,
        isAvailablePromotion: () => true,
      },
    ];

    const shoppingCart = [
      { name: '상품 A', quantity: 5 },
      { name: '상품 B', quantity: 3 },
    ];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(true);
  });

  test('재고 수량이 부족한 경우 false를 반환해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 A',
        quantity: 4, // 필요한 수량보다 적음
        isPromoProduct: () => false,
        isAvailablePromotion: () => false,
      },
    ];

    const shoppingCart = [{ name: '상품 A', quantity: 5 }];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(false);
  });

  test('상품이 존재하지 않는 경우 false를 반환해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 A',
        quantity: 10,
        isPromoProduct: () => false,
        isAvailablePromotion: () => false,
      },
    ];

    const shoppingCart = [{ name: '상품 C', quantity: 1 }];

    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(false);
  });

  test('프로모션 유효성을 고려하여 재고를 확인해야 합니다.', () => {
    const parsedProducts = [
      {
        name: '상품 B',
        quantity: 2,
        isPromoProduct: () => true,
        isAvailablePromotion: () => false, // 프로모션이 유효하지 않음
      },
      {
        name: '상품 B',
        quantity: 1,
        isPromoProduct: () => false,
      },
    ];

    const shoppingCart = [{ name: '상품 B', quantity: 2 }];

    // 프로모션 상품은 제외되므로 총 재고는 1, 필요한 수량은 2이므로 false를 반환해야 합니다.
    expect(validateStockQuantity(shoppingCart, parsedProducts)).toBe(false);
  });
});
