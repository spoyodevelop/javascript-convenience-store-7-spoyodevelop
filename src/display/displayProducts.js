import printMessage from '../../View/OutputView.js';

export default function displayWelcomeMessage(products) {
  printMessage('안녕하세요. W편의점입니다.');
  printMessage('현재 보유하고 있는 상품입니다.');
  products.forEach((product) => printMessage(product.toString()));
}
