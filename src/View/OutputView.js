import { Console } from '@woowacourse/mission-utils';

class OutputView {
  /**
   * 콘솔에 메시지를 출력합니다.
   *
   * @param {string} message - 출력할 메시지입니다.
   */
  printMessage(message) {
    Console.print(message);
  }

  /**
   * 환영 메시지를 출력합니다.
   *
   * @param {Array} products - 현재 보유하고 있는 상품 리스트입니다.
   */
  displayWelcomeMessage(products) {
    this.printMessage('안녕하세요. W편의점입니다.');
    this.printMessage('현재 보유하고 있는 상품입니다:');
    products.forEach((product) => this.printMessage(product.toString()));
  }

  /**
   * 에러 메시지를 출력합니다.
   *
   * @param {string} errorMessage - 출력할 에러 메시지입니다.
   */
  displayErrorMessage(errorMessage) {
    this.printMessage(`🚫 오류: ${errorMessage}`);
  }
}

export default OutputView;
