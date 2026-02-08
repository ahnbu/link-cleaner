# [Plan] UI 클린업 및 공백 제거 (UI Cleanup and Spacing)

## 1. 개요 (Overview)
클렌징 결과 화면에서 발생하는 불필요한 공백을 제거하고, 요구되지 않은 푸터 문구를 삭제하여 사용자 경험을 개선합니다.

## 2. 문제점 (Current Issues)
- **불필요한 공백**: 오리지널 컨텐츠와 클렌징 결과물 사이의 간격이 너무 넓거나, 고정된 높이의 텍스트 영역으로 인해 빈 공간이 두드러짐.
- **불필요한 문구**: 푸터에 있는 "Designed for AI Workflows & Clean Documentation." 문구가 서비스 성격에 맞지 않거나 불필요함.

## 3. 해결 방안 (Proposed Solutions)
- **공백 제거**: 
    - `App.tsx`의 프리뷰어 컬럼 간격(`space-y-6`)을 조정함.
    - `MarkdownPreview.tsx`의 텍스트 영역 높이를 조정하거나 유연하게 변경할 수 있는 방안 검토.
- **문구 삭제**: `App.tsx` 하단의 푸터 문구를 삭제하거나 빈 푸터로 변경.

## 4. 작업 목록 (Tasks)
- [ ] `App.tsx` 푸터 문구 제거
- [ ] `App.tsx` 프리뷰어 영역 간격 조정
- [ ] `MarkdownPreview.tsx` 텍스트 영역 높이 최적화 (필요 시)

## 5. 예상 결과 (Expected Outcome)
- 화면이 더 컴팩트해지고 정보 집중도가 높아짐.
- 불필요한 브랜드/홍보성 문구가 제거되어 깔끔한 인터페이스 제공.
