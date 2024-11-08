const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES = {
  ITEM_NOT_FOUND: `${ERROR_PREFIX} 존재하지 않는 상품이 있습니다. 다시 입력해 주세요.`,
  EXCEEDS_STOCK_QUANTITY: `${ERROR_PREFIX} 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`,
  INVALID_FORMAT: `${ERROR_PREFIX} 잘못된 입력 형식입니다. [상품명-수량] 형식으로 입력해 주세요.`,
  INVALID_QUANTITY: `${ERROR_PREFIX} 수량은 1 이상의 정수여야 합니다.`,
};
