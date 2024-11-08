import { Console } from '@woowacourse/mission-utils';

export default class InputView {
  /**
   * 유효한 입력이 제공될 때까지 사용자에게 입력을 계속 요청하는 메서드입니다.
   *
   * 이 메서드는 재귀적으로 사용자에게 메시지를 표시하여 입력을 받고, 제공된 유효성 검사 함수로 입력을 검증합니다.
   * 입력이 유효한 경우 해당 입력을 반환하며, 유효하지 않은 경우 다시 메시지를 표시하여 입력을 받을 때까지 반복합니다.
   *
   * @async
   * @param {Function} validator - 입력을 받아 유효하면 `true`, 유효하지 않으면 `false`를 반환하는 함수입니다.
   * @param {string} promptMessage - 사용자에게 표시될 메시지입니다.
   * @param {...*} args - 유효성 검사 함수에 전달할 추가 인수입니다.
   * @returns {Promise<*>} - 유효한 입력이 제공되면 해당 입력을 반환하는 Promise입니다.
   */
  async getInputWhileValid(validator, promptMessage, ...args) {
    const input = await Console.readLineAsync(promptMessage);
    const validInput = validator(input, ...args);

    if (validInput) {
      return input;
    }
    return this.getInputWhileValid(validator, promptMessage, ...args);
  }

  /**
   * 사용자에게 'Y' 또는 'N' 응답을 요청하는 메서드입니다.
   *
   * 'Y'가 입력되면 `true`를 반환하고, 'N'이 입력되면 `false`를 반환합니다.
   * 'Y' 또는 'N' 이외의 입력이 제공될 경우 오류 메시지를 표시하고 다시 입력을 요청합니다.
   *
   * @async
   * @param {string} promptMessage - 사용자에게 표시될 메시지입니다.
   * @returns {Promise<boolean>} - 'Y'가 입력되면 `true`, 'N'이 입력되면 `false`를 반환하는 Promise입니다.
   */
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
}
