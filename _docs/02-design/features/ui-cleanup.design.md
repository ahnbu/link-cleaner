# [Design] UI 클린업 및 공백 제거

## 1. UI 구조 변경 (UI Structure Changes)

### 1.1 App.tsx
- **푸터 제거**: 불필요한 문구가 포함된 `<footer>` 섹션을 삭제하거나 숨김 처리.
- **프리뷰어 간격 조정**: `Original Content`와 `Cleansed Content` 사이의 수직 간격을 줄이기 위해 `space-y-6`를 `space-y-4`로 변경.

### 1.2 MarkdownPreview.tsx
- **텍스트 영역 높이 조정**: 
    - 현재: `h-80 lg:h-[400px]` (고정 높이)
    - 변경: 컨텐츠 양에 따라 유연하게 반응하거나, 기본 고정 높이를 축소 (`h-64 lg:h-[300px]`)하여 빈 공간 최소화.
    - `textarea`에 `min-h-[200px]`를 적용하고 `h-auto` 스타일을 시도하되, 레이아웃 일관성을 위해 `h-[300px]` 정도로 축소하는 것을 우선함.

## 2. 컴포넌트 상세 설계 (Component Specification)

### App.tsx
```tsx
// AS-IS
<div className="lg:col-span-2 space-y-6">
// TO-BE
<div className="lg:col-span-2 space-y-4">

// Footer
// 삭제
```

### MarkdownPreview.tsx
```tsx
// AS-IS
className="w-full h-80 lg:h-[400px] ..."
// TO-BE
className="w-full h-64 lg:h-[300px] ..."
```

## 3. 검증 계획 (Verification Plan)
- 텍스트 업로드 후 오리지널/결과물 사이의 간격이 시각적으로 적절한지 확인.
- 하단 푸터 문구가 사라졌는지 확인.
- 텍스트 영역의 높이가 줄어들어 전체적인 화면 구성이 더 컴팩트해졌는지 확인.
