import { Console } from '@woowacourse/mission-utils';
import validateShoppingCart from '../Validation/validateShoppingCart.js';
import { ERROR_MESSAGES, USER_MESSAGES } from '../config/defaultSettings.js';

const InputView = {
  /**
   * 사용자에게 Y/N 응답을 요청하고, 유효한 입력을 받을 때까지 반복합니다.
   *
   * @param {string} promptMessage - 사용자에게 출력할 메시지
   * @returns {Promise<boolean>} - Y면 true, N이면 false 반환
   */
  async askUserAgree(promptMessage) {
    const input = await Console.readLineAsync(promptMessage);

    if (input === 'Y') {
      return true;
    }
    if (input === 'N') {
      return false;
    }
    Console.print(ERROR_MESSAGES.INVALID_YN_INPUT);
    return this.askUserAgree(promptMessage); // 재귀 호출
  },

  /**
   * 유효한 장바구니 입력을 받을 때까지 반복합니다.
   *
   * 재귀를 사용하지 않습니다.
   * @returns {Promise<Array>} - 유효한 장바구니 배열 반환
   */
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
  },
};

export default InputView;
