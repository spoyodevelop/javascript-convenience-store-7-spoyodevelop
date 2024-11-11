import { adjustQuantities } from '../src/ProductSales/sellProduct.js';
import Product from '../src/Model/Product.js';

describe('adjustQuantities - Product 객체 사용', () => {
  let inputView;
  let product;

  beforeEach(() => {
    inputView = {
      askUserAgree: jest.fn(),
    };
    jest.clearAllMocks(); // 모든 Mock 초기화
  });

  it('탄산2+1 프로모션 - 사용자가 추가 구매를 동의할 때', async () => {
    product = new Product('콜라', 1000, 10, '탄산2+1');

    // howMuchItemNeedToBeFree 메서드를 모의 함수로 만들고 원하는 반환 값 설정
    jest.spyOn(product, 'howMuchItemNeedToBeFree').mockReturnValue(2);

    // Mock 설정
    inputView.askUserAgree.mockResolvedValue(true);

    // 테스트 실행
    const result = await adjustQuantities(
      product,
      5, // nonPromoSellQuantity
      2, // remainder
      product.name,
      10, // promoSellQuantity
      inputView,
    );

    expect(inputView.askUserAgree).toHaveBeenCalledWith(
      expect.stringContaining(
        `현재 ${product.name} ${7}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
      ),
    );

    expect(result).toEqual({
      nonPromoSellQuantity: 5,
      promoSellQuantity: 10,
      remainder: 2,
    });
  });

  it('MD추천상품 (1+1 프로모션) - 사용자가 추가 구매를 거부할 때', async () => {
    product = new Product('오렌지주스', 1800, 9, 'MD추천상품');

    // howMuchItemNeedToBeFree 메서드 모의 처리
    jest.spyOn(product, 'howMuchItemNeedToBeFree').mockReturnValue(1);

    inputView.askUserAgree.mockResolvedValue(false);

    const result = await adjustQuantities(
      product,
      3,
      1,
      product.name,
      6,
      inputView,
    );

    expect(inputView.askUserAgree).toHaveBeenCalledWith(
      expect.stringContaining(
        `현재 ${product.name} ${4}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
      ),
    );

    expect(result).toEqual({
      nonPromoSellQuantity: 0,
      promoSellQuantity: 5,
      remainder: 0,
    });
  });
});
