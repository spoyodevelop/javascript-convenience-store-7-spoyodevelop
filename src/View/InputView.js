import { Console } from '@woowacourse/mission-utils';
import validateShoppingCart from '../Validation/validateShoppingCart.js';
import { USER_MESSAGES } from '../config/systemSettings.js';

export default class InputView {
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
        USER_MESSAGES.ASK_PRODUCT_NAME_AND_QUANTITY,
      );

      const shoppingCart = validateShoppingCart(input);

      if (shoppingCart !== null) {
        return shoppingCart; // 유효한 입력일 경우 반환
      }
    }
  }
}
