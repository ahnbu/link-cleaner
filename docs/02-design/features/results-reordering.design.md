# [Design] 결과 화면 컴포넌트 재배치

## 1. UI 순서 변경 설계

### 1.1 App.tsx 결과 영역 (Results Area)
사용자 피드백을 반영하여 중요도 순으로 배치를 변경합니다.

1.  **Actions Toolbar**: 상단에 고정하여 즉각적인 활용 유도.
    - `sticky bottom-8` -> `sticky top-4` (헤더 아래쪽에 고정될 수 있도록 조정)
    - 배경 불투명도 및 블러 효과 유지.
2.  **정리된 내용 (Cleansed Content)**: 주요 결과물을 먼저 노출.
3.  **원본 내용 (Original Content)**: 비교용 데이터이므로 하단으로 배치.

## 2. 코드 구조 변경 예시

```tsx
<div className="flex flex-col space-y-6">
  {/* 1. Actions Toolbar (Top Sticky) */}
  <div className="sticky top-4 z-20 ...">
    {/* Action buttons... */}
  </div>

  {/* 2. Cleansed Content (Primary Result) */}
  <MarkdownPreview title="정리된 내용" ... />

  {/* 3. Original Content (Reference) */}
  <MarkdownPreview title="원본 내용" ... />
</div>
```

## 3. 검증 계획
- 변환 완료 시 액션 바가 최상단에 나타나는지 확인.
- 스크롤 시 액션 바가 상단에 적절히 고정되는지 확인.
- 정리된 내용이 원본 내용보다 위에 위치하는지 확인.
