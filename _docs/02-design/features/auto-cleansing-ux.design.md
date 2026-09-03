# [Design] 자동 클렌징 프로세스 및 UX 개선

## 1. 컴포넌트 구조 및 로직 변경

### 1.1 App.tsx
- **상태 관리**:
    - `isCopied` (boolean): 복사 완료 상태 표시용 (2초 후 리셋).
- **이벤트 핸들러**:
    - `handleFileUpload`: 파일을 받자마자 `handleCleansing` 로직을 수행하도록 연결. `config`는 기존 state의 기본값을 그대로 사용.
    - `handleDownload`: 파일명 생성 시 `.md` 확장자 강제 적용.
    - `handleCopy`: `alert` 제거, `isCopied` state를 `true`로 설정 후 `setTimeout`으로 원복.
- **UI 레이아웃**:
    - `FileUploader` 영역과 `CleansingOptions` 분리 로직 제거.
    - `grid-cols-1 lg:grid-cols-3` 레이아웃을 단일 컬럼(`w-full`) 세로 배치로 변경.
    - 상단: `Header`
    - 중단: `FileUploader` (항상 노출하되, 결과가 있을 땐 크기를 줄이거나 재업로드 용도로 배치 고려, 또는 결과 하단에 배치. **기획 의도: "업로드하면 바로 변환" → 결과가 바로 보여야 함.**)
    - 결과 영역: 오리지널(위) -> 결과물(아래) 순서로 배치.

### 1.2 UX 흐름 상세
1.  사용자가 파일 업로드.
2.  `isCleansing` 상태 `true`로 진입, 로딩 인디케이터 표시 (FileUploader 내 또는 전체 오버레이).
3.  변환 완료 시 `cleansedContent` 채워짐.
4.  화면 하단에 **Original Content** 박스와 **Cleansed Content** 박스가 세로로 나열됨.
5.  **Cleansed Content** 하단 또는 내부에 액션 버튼(복사, 다운로드) 배치.

## 2. 코드 변경 계획 (Code Changes)

### App.tsx
```tsx
// 복사 핸들러 변경
const handleCopy = () => {
  if (!state.cleansedContent) return;
  navigator.clipboard.writeText(state.cleansedContent);
  setIsCopied(true);
  setTimeout(() => setIsCopied(false), 2000);
};

// 파일 업로드 핸들러 변경
const handleFileUpload = (content: string, name: string) => {
  // 상태 업데이트와 동시에 클렌징 시작
  setState(prev => ({...}));
  triggerCleansing(content); 
};
```

### UI 레이아웃
```tsx
<div className="flex flex-col space-y-8">
   <FileUploader /> <!-- 항상 노출 or 결과 있으면 상단 작게 -->
   {state.cleansedContent && (
      <>
        <MarkdownPreview title="Original" ... />
        <MarkdownPreview title="Cleansed" ... />
        <ActionButtons />
      </>
   )}
</div>
```

## 3. 검증 계획 (Verification Plan)
- `.txt`, `.md` 파일 업로드 시 즉시 로딩 후 결과가 나오는지 확인.
- 다운로드 된 파일의 확장자가 `.md`인지 확인.
- 복사 버튼 클릭 시 텍스트가 "Copied!" 등으로 변했다가 돌아오는지 확인.
- 레이아웃이 세로 2단으로 깔끔하게 보이는지 확인.
