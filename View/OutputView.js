import { Console } from '@woowacourse/mission-utils';
/**
 * 메시지를 콘솔에 출력합니다.
 *
 * @function printMessage
 * @param {string} message - 출력할 메시지입니다.
 * @example
 * printMessage('안녕하세요!');
 */
export default function printMessage(message) {
  Console.print(message);
}
