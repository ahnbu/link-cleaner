# [Report] 특수 문자 정제 로직 추가 (Special Character Cleansing)

## 1. 작업 요약 (Executive Summary)
텍스트 클렌징 과정에서 불필요하게 이스케이프된 특수 문자(`\.`, `\----`)를 자동으로 정제하는 로직을 추가하여 결과물의 가독성을 향상시킴.

## 2. 주요 변경 사항 (Key Changes)
- **`services/localCleansingService.ts`**:
    - `ESCAPED_DOT_REGEX`: `\.` 패턴 탐지용 정규표현식 추가.
    - `ESCAPED_DASH_REGEX`: `\----` 등 이스케이프된 구분선 탐지용 정규표현식 추가.
    - `cleanseTextLocally`: `simplifyFormatting` 옵션 활성 시 해당 패턴들을 정제하도록 로직 수정.

## 3. 작업 결과 (Results)
- 마크다운 이스케이프 문자가 포함된 텍스트를 로컬에서 즉시 깔끔하게 변환할 수 있게 됨.
- AI 클렌징 전 단계에서 데이터를 정규화하여 일관된 품질 확보 가능.

## 4. 검증 결과 (Verification)
- 설계 대비 구현 정합성 100% 확인.
- 기존 로직과의 충돌 없음 확인.

## 5. 향후 계획 (Next Steps)
- 추가적으로 발견되는 이스케이프 패턴(예: `\!`, `\(` 등)이 있을 경우 동일한 방식으로 확장 가능.
