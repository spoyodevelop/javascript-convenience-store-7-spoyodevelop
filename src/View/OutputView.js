import { Console } from '@woowacourse/mission-utils';
import { USER_MESSAGES } from '../config/defaultSettings.js';

const OutputView = {
  /**
   * 콘솔에 메시지를 출력합니다.
   *
   * @param {string} message - 출력할 메시지입니다.
   */
  printMessage(message) {
    Console.print(message);
  },

  /**
   * 환영 메시지를 출력합니다.
   *
   * @param {Array} products - 현재 보유하고 있는 상품 리스트입니다.
   */
  displayWelcomeMessage(products) {
    this.printMessage(USER_MESSAGES.WELCOME_MESSAGE);
    this.printMessage(USER_MESSAGES.SHOW_PRODUCT);
    products.forEach((product) => {
      this.printMessage(`${product.toString()}`);
    });
  },
};

export default OutputView;
