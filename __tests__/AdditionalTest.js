import { run, runExceptions, mockNowDate } from '../src/Test/Test.js';

const INPUTS_TO_TERMINATE = ['[비타민워터-1]', 'N', 'N'];

describe('구매 로직 테스트', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each([
    {
      description: '8000원 맴버쉽 천장확인',
      inputs: ['[정식도시락-8],[에너지바-5]', 'Y', 'N'],
      expected: '내실돈53,200',
    },
    {
      description: '정식도시락 구매시, 얼마 정도 돈이 드는지 확인',
      inputs: ['[정식도시락-8],[에너지바-5]', 'N', 'N'],
      expected: '내실돈61,200',
    },
    {
      description:
        '행사 제품이 하나 부족할때, 하나 더 주는 것이 정상적으로 동작하는지 확인',
      inputs: ['[사이다-2],[감자칩-1]', 'Y', 'Y', 'Y', 'N'],
      expected: '내실돈3,500',
    },
    {
      description:
        '콜라 수가 부족해서 결제를 안했을 때, 정확히 프롬프트가 뜨는지 확인',
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
      expected: '내실돈7,000',
    },
    {
      description:
        '행사 제품이 하나 부족할 때, 하나 더 주는 것을 거부했을 때, 맴버쉽 할인이 적용되는지 확인',
      inputs: ['[사이다-2],[감자칩-1]', 'N', 'N', 'Y', 'N'],
      expected: '내실돈2,450',
    },
    {
      description: '콜라 10개를 계산할 때, 프로모션 미 적용을 확인하는지 확인',
      inputs: ['[콜라-10]', 'Y', 'N'],
      expected: '내실돈6,700',
    },
    {
      description: '기간에 해당하지 않는 프로모션 적용 및 맴버쉽 혜택 적용',
      inputs: ['[감자칩-2]', 'Y', 'N'],
      expected: '내실돈2,100',
      mockDate: '2024-02-01',
    },
    {
      description:
        '기간에 해당하지 않는 프로모션 적용 및 맴버쉽 할인 천장 테스트',
      inputs: ['[감자칩-2],[정식도시락-8]', 'Y', 'N'],
      expected: '내실돈46,200',
      mockDate: '2024-02-01',
    },
    {
      description: '컵라면 1개를 살때 불필요한 인풋이 뜨지 않는것 테스트',
      inputs: [
        '[컵라면-1]',
        'Y',
        'Y',
        '[컵라면-1]',
        'Y',
        'Y',
        '[컵라면-2]',
        'Y',
        'Y',
        'N',
      ],
      expected: '내실돈2,380',
    },
    {
      description:
        '컵라면 2개를 살때 제대로 비 프로모 제품을 제대로 물어보는지에 대한 테스트',
      inputs: ['[컵라면-2]', 'N', 'Y', '[컵라면-2]', 'Y', 'Y', 'N'],
      expected: '내실돈2,380',
    },
  ])('$description', async ({ inputs, expected, mockDate }) => {
    if (mockDate) mockNowDate(mockDate);
    await run({
      inputs,
      expectedIgnoringWhiteSpaces: [expected],
    });
  });

  test.each([
    {
      description:
        '기간에 해당되지 않는 프로모션 적용 및 프로모션에는 프로모션 재고만 사용하는지 확인',
      inputs: ['[콜라-11]', 'N', 'N'],
      expectedErrorMessage:
        '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
      mockDate: '2025-02-01',
    },
  ])(
    '$description - 예외 테스트',
    async ({ inputs, expectedErrorMessage, mockDate }) => {
      if (mockDate) mockNowDate(mockDate);
      await runExceptions({
        inputs,
        inputsToTerminate: INPUTS_TO_TERMINATE,
        expectedErrorMessage,
      });
    },
  );
});
