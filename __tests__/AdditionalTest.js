import { run, runExceptions, mockNowDate } from '../src/Test/Test.js';

const INPUTS_TO_TERMINATE = ['[비타민워터-1]', 'N', 'N'];

test('8000원 맴버쉽 천장확인', async () => {
  await run({
    inputs: ['[정식도시락-8],[에너지바-5]', 'Y', 'N'],
    expectedIgnoringWhiteSpaces: ['내실돈53,200'],
  });
});

test('정식도시락 구매시, 얼마 정도 돈이 드는지 확인', async () => {
  await run({
    inputs: ['[정식도시락-8],[에너지바-5]', 'N', 'N'],
    expectedIgnoringWhiteSpaces: ['내실돈61,200'],
  });
});

test('행사 제품이 하나 부족할때, 하나 더 주는것이 정상적으로 동작하는지 확인', async () => {
  await run({
    inputs: ['[사이다-2],[감자칩-1]', 'Y', 'Y', 'Y', 'N'],
    expectedIgnoringWhiteSpaces: ['내실돈3,500'],
  });
});

test('콜라 수가 부족해서 결제를 안했을때, 정확히 프롬프트가 뜨는지 확인', async () => {
  await run({
    inputs: [
      '[콜라-10]',
      'Y',
      'Y',
      '[콜라-10]',
      'N',
      'Y',
      '[콜라-10]',
      'Y',
      'Y',
      'N',
    ],
    expectedIgnoringWhiteSpaces: ['내실돈7,000'],
  });
});

test('행사 제품이 하나 부족할때, 하나 더 주는것을 거부했을때, 정상적으로 맴버쉽 할인이 적용되는지 확인', async () => {
  await run({
    inputs: ['[사이다-2],[감자칩-1]', 'N', 'N', 'Y', 'N'],
    expectedIgnoringWhiteSpaces: ['내실돈2,450'],
  });
});

test('콜라 10개를 계산할때, 프로모션 미 적용을 확인하는지 확인', async () => {
  await run({
    inputs: ['[콜라-10]', 'Y', 'N'],
    expectedIgnoringWhiteSpaces: ['내실돈6,700'],
  });
});

test('기간에 해당하지 않는 프로모션 적용 및 맴버쉽 혜택 적용', async () => {
  mockNowDate('2024-02-01');

  await run({
    inputs: ['[감자칩-2]', 'Y', 'N'],
    expectedIgnoringWhiteSpaces: ['내실돈2,100'],
  });
});

test('기간에 해당하지 않는 프로모션 적용 및 맴버쉽 할인 천장 테스트', async () => {
  mockNowDate('2024-02-01');

  await run({
    inputs: ['[감자칩-2],[정식도시락-8]', 'Y', 'N'],
    expectedIgnoringWhiteSpaces: ['내실돈46,200'],
  });
});

test('기간에 해당되지 않는 프로모션 적용 및 프로모션에는 프로모션 재고만 사용하는지 확인', async () => {
  mockNowDate('2025-02-01');
  await runExceptions({
    inputs: ['[콜라-11]', 'N', 'N'],
    inputsToTerminate: INPUTS_TO_TERMINATE,
    expectedErrorMessage:
      '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
  });
});
