# 우아한 테크코스 편의점 미션 계산기 🛒💰

## 프로젝트 소개 📋

이 프로젝트는 구매자의 할인 혜택과 재고 상황을 고려하여 **최종 결제 금액을 계산하고 안내하는 편의점 결제 시스템**을 구현합니다. 상품의 가격과 수량을 입력받아 총구매액을 계산하고, 프로모션 및 멤버십 할인 정책을 적용하여 최종 결제 금액을 산출합니다. 또한, 구매 내역과 할인 정보를 영수증 형태로 출력하고 추가 구매 여부를 선택할 수 있습니다.

## 기능 목록 📝

- **상품 관리 🛍️**

  - 상품 목록과 행사 목록을 파일에서 불러옵니다.
  - 각 상품의 가격, 재고, 프로모션 정보를 관리합니다.

- **재고 관리 📦**

  - 구매 시 재고 수량을 확인하고, 결제된 수량만큼 재고를 차감합니다.
  - 최신 재고 상태를 유지하여 정확한 정보 제공.

- **프로모션 할인 적용 🎉**

  - 프로모션 기간 내에 해당하는 상품에 대해 N+1 할인 적용.
  - 프로모션 재고를 우선 차감하고, 부족 시 일반 재고 사용.
  - 프로모션 혜택 안내 및 추가 구매 유도.

- **멤버십 할인 적용 💳**

  - 프로모션 미적용 금액의 30% 할인 적용.
  - 최대 할인 한도는 8,000원.

- **결제 및 영수증 출력 🧾**

  - 최종 결제 금액 계산 및 영수증 출력.
  - 구매 상품 내역, 증정 상품 내역, 금액 정보를 포함.
  - 영수증을 보기 좋게 정렬하여 출력.

- **입력 검증 및 오류 처리 ⚠️**

  - 잘못된 입력에 대한 오류 메시지 출력 및 재입력 요청.
  - 오류 메시지는 "[ERROR]"로 시작.

- **추가 구매 기능 🔄**
  - 영수증 출력 후 추가 구매 여부를 선택 가능.
  - 재고가 업데이트된 상품 목록을 확인 후 추가 구매 진행.

## 사용 방법 💡

1. **시작 안내 🖥️**

   - 프로그램 실행 시 환영 인사와 함께 현재 보유하고 있는 상품 목록이 출력됩니다.
   - 상품명, 가격, 프로모션 이름, 재고 정보를 확인할 수 있습니다.

2. **상품 및 수량 입력 📝**

   - 구매할 상품명과 수량을 다음 형식으로 입력합니다:
     ```
     [상품명-수량],[상품명-수량]
     ```
     - 예시: `[콜라-3],[사이다-2]`

3. **프로모션 혜택 안내 🎁**

   - 프로모션 적용이 가능한 상품을 적게 구매한 경우, 추가 혜택 안내 메시지가 출력됩니다.
     ```
     현재 {상품명}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
     ```
   - `Y`를 입력하면 필요한 수량을 추가하여 혜택을 받을 수 있습니다.

4. **프로모션 재고 부족 시 안내 🚫**

   - 프로모션 재고가 부족하여 일부 수량이 프로모션 혜택을 받지 못하는 경우 안내 메시지가 출력됩니다.
     ```
     현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
     ```
   - `Y`를 입력하면 해당 수량을 정가로 결제합니다.
   - `N`을 입력하면 해당 수량을 제외하고 결제를 진행합니다.

5. **멤버십 할인 적용 여부 💳**

   - 멤버십 할인을 받으시겠습니까? (Y/N)
     ```
     멤버십 할인을 받으시겠습니까? (Y/N)
     ```
   - `Y`를 입력하면 멤버십 할인이 적용됩니다.

6. **영수증 확인 🧾**

   - 결제 완료 후 영수증이 출력됩니다.
   - 영수증에는 구매 상품 내역, 증정 상품 내역, 총구매액, 행사할인, 멤버십할인, 내실돈이 표시됩니다.

7. **추가 구매 여부 🔄**
   - 추가로 구매할 상품이 있는지 묻는 메시지가 출력됩니다.
     ```
     감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
     ```
   - `Y`를 입력하면 재고가 업데이트된 상품 목록이 다시 출력되고, 추가 구매를 진행합니다.
   - `N`을 입력하면 프로그램이 종료됩니다.

## 입출력 형식 📝

### 입력 형식 ⌨️

- **상품 및 수량 입력**
  - `[상품명-수량],[상품명-수량]`
- **예/아니오 선택**
  - `Y` 또는 `N`

### 출력 형식 📄

- **상품 목록 안내**

  ```
  안녕하세요. W편의점입니다.
  현재 보유하고 있는 상품입니다.

  - 상품명 가격 재고수량 프로모션명
  ```

- **오류 메시지 ⚠️**

  - 오류 발생 시 `[ERROR]`로 시작하는 메시지가 출력됩니다.
    ```
    [ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.
    ```

- **영수증 출력 🧾**
  ```
  ==============W 편의점================
  상품명        수량    금액
  상품1         수량1   금액1
  상품2         수량2   금액2
  =============증       정===============
  증정상품명     수량
  ====================================
  총구매액       총수량       총금액
  행사할인              -할인금액
  멤버십할인            -할인금액
  내실돈               최종결제금액
  ```

## 실행 예시 💻

```
안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 10개 탄산2+1
- 사이다 1,000원 8개 탄산2+1
...

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[콜라-3],[에너지바-5]

멤버십 할인을 받으시겠습니까? (Y/N)
Y

==============W 편의점================
상품명        수량    금액
콜라          3      3,000
에너지바       5      10,000
=============증       정===============
콜라          1
====================================
총구매액       8      13,000
행사할인              -1,000
멤버십할인            -3,000
내실돈               9,000

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
```

## 오류 처리 안내 ⚠️

- **잘못된 형식 입력 시**

  - `[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`

- **존재하지 않는 상품 입력 시**

  - `[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.`

- **재고 수량 초과 시**

  - `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`

- **기타 잘못된 입력 시**
  - `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.`

## 참고 사항 📌

- 상품 목록과 행사 목록은 `public/products.md`와 `public/promotions.md` 파일에서 불러옵니다.
- 두 파일의 형식을 유지하면서 내용을 수정할 수 있습니다.
- 프로그램 실행 전에 해당 파일들이 올바른 위치에 있는지 확인해 주세요.

## 동작 원리 ⚙️

### CSV 파싱, `parsedProducts` 만들기, 제품 목록 출력 📂

1. `parseCSV`에 있는 파서를 통해 `public/products.md` 와 `public/promotions.md`에 있는 프로모션 항목들을 불러온 뒤, 객체 배열에 저장합니다.
2. `products`에 있는 상품들을 프로모션 제품과 비프로모션 제품으로 분리한 뒤, 각각의 제품의 `Product` 객체를 만든 다음에, 이것을 `parsedProducts` 배열에 넣습니다.
3. 이때, 프로모션 제품 재고가 있지만, 비프로모션 제품 재고가 없는 제품들을 모두 검사한 뒤, 이런 제품들은 `Product` 객체를 만든 다음에, 재고를 0으로 설정하여 `parsedProducts` 배열 안에 넣습니다.
4. 그럼 완성된 제품 리스트를 보여줄 때, 프로모션 재고가 있지만, 비프로모션 재고가 없는 경우도 상정하여 제품 리스트를 보여줄 수 있는 `parsedProducts` 배열을 만들 수 있습니다.
5. 완성된 `parsedProducts` 배열을 `displayWelcomeMessage(parsedProducts)`로 넘겨주어, 제품 리스트를 출력합니다.

### 제품명과 수량 파싱 🔢

1. 제품명과 수량을 사용자 입력에서 파싱합니다.
2. `validateShoppingCart`를 통해, 문자열이 적절한 포맷으로 되어 있는지 확인합니다. 그렇지 않다면, 사용자에게 입력을 다시 받습니다.
3. `validateItemsExist`를 통해, 파싱된 사용자 입력에 들어있는 물건들이 정상적으로 리스트에 있는 물건인지 확인합니다. 만약 없는 물건이라면, 사용자에게 입력을 다시 받습니다.
4. `validateStockQuantity`를 통해, 파싱된 사용자 입력에 들어있는 물건들이 재고가 있는지 확인합니다. 물건 수량은 비프로모션 재고 + 프로모션 재고입니다. 이때, 사용자가 이것보다 더 요구한다면, 사용자에게 입력을 다시 받습니다.
   - 4.1. `validateStockQuantity`에서, 만약 파싱된 사용자 입력에 들어있는 물건의 행사가 끝났다면, 물건 수량은 비프로모션 재고만으로 한정합니다. 만약 이것보다 사용자가 많이 요구한다면, 사용자에게 입력을 다시 받습니다.
5. 모든 검증을 마쳤다면, 본격적으로 물건 판매를 시작합니다.

### 물건 판매 🛒

1. 본격적으로 물건 판매를 시작합니다.
2. 물건은 프로모션 재고를 우선적으로 판매합니다. 만약 프로모션 재고가 모두 소진되었다면, 고객에게 안내하여 물건을 판매합니다.
3. 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 그 수량만큼 추가 여부를 입력받습니다.
   - 3.1. 이 경우는, 2+1 제품을 2개 가져왔을 때, 1+1 제품에 1개를 가져왔을 때만 추가 여부를 확인받습니다.
   - 3.2. 다만, 줄 수 있는 수량의 프로모션 재고가 부족하다면 추가 여부를 안내하지 않습니다. 예를 들어 프로모션 재고가 2개 남았는데, 2개만 결제한다고 한다면, 해당 안내 사항은 안내되지 않습니다.
4. 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부를 입력받습니다.
   - 4.1. 이 경우는, 완전히 프로모션이 적용되지 않는 제품들은 여부를 확인받지 않습니다.
   - 4.2. 만약 프로모션 재고와 비프로모션 재고가 혼합되어 계산된다면(예: 비프로모션 콜라 2개 + 프로모션 콜라 1개), 해당되는 모든 제품의 수량을 정확히 안내합니다(총 3개).
   - 4.3. 프로모션이 끝난 상품의 프로모션은 안내하지 않습니다. 그냥 결제를 진행합니다.
5. 멤버십 할인을 적용한 금액을 저장합니다.
   - 5.1. 멤버십 할인은 행사 할인이 적용되지 않은 모든 제품에 적용합니다. 예를 들어, 비프로모션 콜라 2개 + 프로모션 콜라 1개로 결제를 진행한 경우, 3개 모두 멤버십 할인을 적용한 금액을 돌려줍니다.

### 영수증 출력 🧾

1. 영수증을 출력합니다.
2. 구매 상품 내역을 출력합니다. 구매 상품 내역에는 구매한 상품의 이름과 수량, 가격이 적혀 있어야 합니다.
3. 증정 상품 내역을 출력합니다. 증정된 모든 상품의 이름과 수량이 적혀 있어야 합니다.
4. 총 구매액을 출력합니다. 할인이 적용되지 않은 상품의 금액을 출력합니다.
5. 행사 할인 금액을 출력합니다. 행사로 할인된 금액을 출력합니다.
6. 멤버십 할인 금액을 출력합니다. 멤버십으로 할인된 금액을 출력합니다.
   - 6.1. 멤버십으로 할인된 금액이 8,000원 이상이라면, 그 이상은 절삭하고 8,000원만 할인합니다.
7. 내실 돈을 출력합니다. 내실 돈은 = 총구매액 - 행사할인 - 멤버십할인금액 입니다.

### 재시도 🔁

1. 추가로 구매할 수 있는지 여부를 출력하고, 만약 더 구매한다고 하면, 제품명과 수량 파싱을 하는 곳으로 돌아갑니다.
2. 위 사항을 구매를 다시 반복하는 것을 중단할 때까지 계속합니다.
   -2.1. 만약 모든 재고가 소진되어도 프로그램은 종료됩니다.

## ❓ 의문사항과 해결방안들 🤔

**프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우 안내 메시지 처리**

- **문제점:** 프로모션 재고가 부족한 상황에서 고객이 구매하려는 수량이 프로모션 적용 기준에 미치지 못할 때 추가 수량 안내가 트리거되지 않음. 예를 들어, 1+1 행사 중인 상품의 프로모션 재고가 1개뿐이고 고객이 1개를 구매하려고 할 때, 추가 수량 안내가 발생하지 않음.
- **해결방안:** 이 경우에는 추가 안내를 하지 않습니다. 고객이 원래 1개만 구매하려 했고, 프로모션 재고도 부족하므로 추가 수량 안내나 프로모션 혜택 적용이 불가능합니다.

**멤버십 할인 적용 범위 명확화**

- **문제점:** 프로모션이 적용되지 않은 모든 항목에 대해 멤버십 할인을 적용하는 것이 맞는지에 대한 혼동.
- **해결방안:** 프로모션이 적용되지 않은 모든 상품 및 수량에 대해 멤버십 할인을 적용합니다. 단, 할인 한도는 8,000원으로 제한됩니다.

**프로모션이 종료된 제품의 프로모션 재고 활용 여부**

- **문제점:** 프로모션이 종료된 제품의 남은 프로모션 재고를 일반 재고로 판매할 수 있는지에 대한 의문.
- **해결방안:** 프로모션이 종료된 제품의 프로모션 재고는 판매하지 않습니다. 재고로는 잡지 않지만, 상품 목록에서는 출력할 수 있도록 합니다.
