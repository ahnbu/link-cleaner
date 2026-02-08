# Design: 다크 테마 적용 및 UI 최적화

## 1. 개요
전체 애플리케이션의 테마를 'Dark Mode'로 완전히 전환하고, 중복된 '새로 시작하기' 버튼을 제거하여 UI를 간결하게 만듭니다.

## 2. 변경 상세

### 2.1 App.tsx
- **레이아웃**: 결과 화면 툴바(`Actions Toolbar`)에서 `새로 시작하기` 버튼 요소 삭제.
- **색상 팔레트**:
  - 메인 타이틀: `text-slate-800` → `text-slate-100`
  - 서브 텍스트: `text-slate-500` → `text-slate-400`
  - 로딩 오버레이: `bg-white` → `bg-slate-900`, `text-slate-600` → `text-slate-300`, `border-slate-200` → `border-slate-800`
  - 결과 툴바: `bg-white/90` → `bg-slate-900/80`, `border-slate-200/60` → `border-slate-700/50`
  - 버튼 (Copy/Download): 배경 및 보더 색상을 어두운 배경에 맞게 조정.

### 2.2 components/FileUploader.tsx
- **드롭존**:
  - 배경: `bg-slate-50` → `bg-slate-900/50`
  - 테두리: `border-slate-300` → `border-slate-700`
  - 텍스트: `text-slate-600` → `text-slate-300`
  - 아이콘: `bg-indigo-50` → `bg-indigo-500/10`

### 2.3 components/MarkdownPreview.tsx
- **컨테이너**:
  - 배경: `bg-white` → `bg-slate-900`
  - 테두리: `border-slate-200` → `border-slate-800`
- **헤더**:
  - 배경: `bg-slate-50` → `bg-slate-800/50`
  - 타이틀: `text-slate-700` → `text-slate-200`
- **본문**:
  - 텍스트: `text-slate-600` → `text-slate-300`

### 2.4 index.html & index.css
- `body` 배경색이 `bg-slate-950`으로 이미 설정되어 있으므로, 컴포넌트들의 배경이 `white`가 아닌 투명 혹은 `slate-900` 계열이어야 자연스러움.

## 3. 검증 포인트
- 모든 텍스트가 어두운 배경에서 가독성을 유지하는가?
- '새로 시작하기' 버튼이 제거되었으며, 남은 버튼들의 정렬(우측)이 올바른가?
