import { Console } from '@woowacourse/mission-utils';

/**
 * 유효한 입력이 제공될 때까지 사용자에게 입력을 계속 요청하는 함수입니다.
 *
 * 이 함수는 재귀적으로 사용자에게 메시지를 표시하여 입력을 받고, 제공된 유효성 검사 함수로 입력을 검증합니다.
 * 입력이 유효한 경우 해당 입력을 반환하며, 유효하지 않은 경우 다시 메시지를 표시하여 입력을 받을 때까지 반복합니다.
 *
 * @async
 * @function getInputWhileValid
 * @param {Function} validator - 입력을 받아 유효하면 `true`, 유효하지 않으면 `false`를 반환하는 함수입니다.
 * @param {string} promptMessage - 사용자에게 표시될 메시지입니다.
 * @returns {Promise<*>} - 유효한 입력이 제공되면 해당 입력을 반환하는 Promise입니다.
 *
 * @example
 * // 숫자만 허용하는 유효성 검사 함수와 함께 사용 예제
 * const isNumber = (input) => !isNaN(input);
 * const userNumber = await getInputWhileValid(isNumber, "숫자를 입력하세요:");
 */
export async function getInputWhileValid(validator, promptMessage, ...args) {
  const input = await Console.readLineAsync(promptMessage);
  const validInput = validator(input, ...args);

  if (validInput) {
    return validInput;
  }
  return getInputWhileValid(validator, promptMessage, ...args);
}
export async function askUserAgree(promptMessage) {
  const input = await Console.readLineAsync(promptMessage);

  if (input === 'Y') {
    return true;
  }
  if (input === 'N') {
    return false;
  }
  Console.print('Y/N이외에 입력은 할수 없습니다.');
  return askUserAgree(promptMessage);
}
