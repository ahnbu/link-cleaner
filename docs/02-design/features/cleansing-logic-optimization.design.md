# [Design] 클렌징 로직 최적화 (Cleansing Logic Optimization)

## 1. 정규표현식 정의 (Regex Definitions)

### 1.1. 인용 링크 (Citation Links)
- **패턴**: `[title](url)` 형태 중 URL이 http/https로 시작하는 경우.
- **Regex**: `const CITATION_LINK_REGEX = /\[[^\]]+\]\(https?:\/\/[^\)]+\)/g;`
- **처리**: 빈 문자열로 대체.

### 1.2. 각주 마커 (Footnote Markers)
- **패턴**: `[1]`, `[1, 2]`, `[1-3]`, `[1,2,3]` 등 숫자와 쉼표, 하이픈이 포함된 대괄호.
- **Regex**: `const FOOTNOTE_MARKER_REGEX = /\[\d+(?:[\s,.-]*\d+)*\]/g;`
- **처리**: 빈 문자열로 대체.

### 1.3. 단순화 기호 (Decorative Symbols)
- **패턴**: `⭐` 이모지 및 불필요한 장식 기호.
- **Regex**: `const DECORATIVE_SYMBOL_REGEX = /[⭐]/g;`
- **처리**: 빈 문자열로 대체.

## 2. 서비스 구조 설계 (Service Architecture)

### 2.1. `services/localCleansingService.ts`
- **함수**: `cleanseTextLocally(text: string, config: CleansingConfig): string`
- **로직**:
    1. `config.removeCitationLinks`가 true이면 `CITATION_LINK_REGEX` 적용.
    2. `config.removeFootnoteMarkers`가 true이면 `FOOTNOTE_MARKER_REGEX` 적용.
    3. `config.simplifyFormatting`이 true이면 `DECORATIVE_SYMBOL_REGEX` 적용.
    4. 연속된 공백이나 불필요한 줄바꿈 정리 로직 추가(선택적).

### 2.2. 하이브리드 전략 (Hybrid Strategy)
- `App.tsx`에서 사용자가 "AI 클렌징"을 명시적으로 선택하지 않는 한 로컬 클렌징을 기본으로 수행.
- 혹은 `CleansingConfig`에 `useAI: boolean` 옵션을 추가하여 처리 주체를 결정.

## 3. UI 변경 사항
- 클렌징 버튼 옆에 "Fast (Local)"와 "Deep (AI)"을 선택할 수 있는 토글 또는 설정 추가. (기본값은 Fast)

## 4. 검증 계획 (Verification Plan)
- `example/perplexity답변_before.txt`를 로컬 클렌징 함수에 통과시킨 결과가 `perplexity답변_after.txt`와 실질적으로 동일(인용 링크 및 ⭐ 제거 확인)한지 체크.
