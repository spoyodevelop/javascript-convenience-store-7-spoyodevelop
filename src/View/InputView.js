import { Console } from '@woowacourse/mission-utils';
import validateShoppingCart from '../Validation/validateShoppingCart.js';

export default class InputView {
  async getInputWhileValid(validator, promptMessage, ...args) {
    const input = await Console.readLineAsync(promptMessage);
    const validInput = validator(input, ...args);

    if (validInput) {
      return input;
    }
    return this.getInputWhileValid(validator, promptMessage, ...args);
  }

  async askUserAgree(promptMessage) {
    const input = await Console.readLineAsync(promptMessage);

    if (input === 'Y') {
      return true;
    }
    if (input === 'N') {
      return false;
    }
    Console.print('Y/N 이외에 입력은 할 수 없습니다.');
    return this.askUserAgree(promptMessage);
  }

  async getValidShoppingCart() {
    while (true) {
      const input = await Console.readLineAsync(
        '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])',
      );

      const shoppingCart = validateShoppingCart(input);

      if (shoppingCart !== null) {
        return shoppingCart; // 유효한 입력일 경우 반환
      }
    }
  }
}
