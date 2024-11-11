import { Console } from '@woowacourse/mission-utils';
import validateShoppingCart from '../src/Validation/validateShoppingCart.js';
import ShoppingItem from '../src/Model/ShoppingItem.js';
import { ERROR_MESSAGES } from '../src/config/defaultSettings.js';

// Console.print를 모킹하여 테스트에서 출력 확인
jest.spyOn(Console, 'print').mockImplementation(() => {});

describe('validateShoppingCart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('올바른 입력 검증', () => {
    test('단일 상품 입력', () => {
      const input = '[콜라-10]';
      const result = validateShoppingCart(input);

      expect(result).toEqual([new ShoppingItem('콜라', 10)]);
    });

    test('여러 상품 입력', () => {
      const input = '[사이다-5],[감자칩-2]';
      const result = validateShoppingCart(input);

      expect(result).toEqual([
        new ShoppingItem('사이다', 5),
        new ShoppingItem('감자칩', 2),
      ]);
    });
    test('여러 상품 입력 - 공백 없음', () => {
      const input = '[빵-2],[우유-1],[초콜릿-15]';
      const result = validateShoppingCart(input);

      expect(result).toEqual([
        new ShoppingItem('빵', 2),
        new ShoppingItem('우유', 1),
        new ShoppingItem('초콜릿', 15),
      ]);
    });
  });

  describe('입력 형식 오류 검증', () => {
    test('하이픈 누락', () => {
      const input = '[콜라10]';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });

    test('대괄호 누락', () => {
      const input = '사이다-5';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });

    test('빈 문자열 입력', () => {
      const input = '';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });

    test('상품명에 하이픈이 포함된 경우', () => {
      const input = '[콜라--1]';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });

    test('정수가 아닌 수량 입력', () => {
      const input = '[감자칩-2.5]';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });

    test('수량이 누락된 경우', () => {
      const input = '[사이다-]';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });

    test('상품명이 누락된 경우', () => {
      const input = '[-10]';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });
  });

  describe('수량 오류 검증', () => {
    test('수량이 음수인 경우', () => {
      const input = '[콜라--1]';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });

    test('수량이 0인 경우', () => {
      const input = '[사이다-0]';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(
        ERROR_MESSAGES.INVALID_QUANTITY,
      );
    });

    test('수량이 숫자가 아닌 경우', () => {
      const input = '[사이다-abc]';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });
  });

  describe('엣지 케이스 검증', () => {
    test('공백이 포함된 입력', () => {
      const input = ' [콜라-5] ';
      const result = validateShoppingCart(input);

      expect(result).toEqual([new ShoppingItem('콜라', 5)]);
    });

    test('여러 공백과 콤마가 포함된 경우', () => {
      const input = '  [콜라-5] ,  [사이다-10] , [감자칩-2] ';
      const result = validateShoppingCart(input);

      expect(result).toEqual([
        new ShoppingItem('콜라', 5),
        new ShoppingItem('사이다', 10),
        new ShoppingItem('감자칩', 2),
      ]);
    });

    test('입력이 모두 공백인 경우', () => {
      const input = '   ';
      const result = validateShoppingCart(input);

      expect(result).toBeNull();
      expect(Console.print).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_FORMAT);
    });
  });
});
