# [Design] 클렌징 로직 고도화 (Cleansing Logic Enhancement)

## 1. 확장 정규표현식 설계 (Enhanced Regex Design)

### 1.1. 역슬래시 이스케이프 제거 (Unescape Markdown)
- **대상**: `\*\*`, `\*`, `\#`, `\[`, `\]` 등 마크다운 엔진이 이스케이프 처리한 기호들.
- **Regex**: `const UNESCAPE_REGEX = /\(?=[*#_\[\]])/g;`
- **처리**: 역슬래시(``)만 제거하고 뒤의 기호는 유지.

### 1.2. 각주 마커 패턴 강화 (Enhanced Footnotes)
- **대상**: 문장 끝이나 단어 뒤에 붙는 `[1]`, `[1, 2]`, `[1-3]` 및 공백이 포함된 경우.
- **Regex**: `const ENHANCED_FOOTNOTE_REGEX = /\s?\[\d+(?:[\s,.-]*\d+)*\]/g;`
- **처리**: 마커 앞의 공백 한 칸을 포함하여 제거하여 문장이 자연스럽게 이어지도록 함.

## 2. 로직 고도화 (Logic Enhancement)

### 2.1. `localCleansingService.ts` 확장
- `cleanseTextLocally` 함수 내부에 `UNESCAPE_REGEX` 적용 단계 추가.
- `config.simplifyFormatting` 옵션 활성화 시 역슬래시 제거 로직 작동.

### 2.2. 줄바꿈 정규화 (Newline Normalization)
- 3번 이상의 연속된 줄바꿈을 2번으로 축소 (`


` -> `

`).
- 문장 끝의 불필요한 공백 제거.

## 3. 검증 계획 (Verification Plan)
- **테스트 케이스**: `example/노트북LM_before.txt`
- **기대 결과**: 
    - 모든 `\*\*` 가 `**` 로 변경됨.
    - `[1, 2]` 등의 인용 마커 제거.
    - `[blog.naver](...)` 등의 링크 제거 (기존 기능 유지 확인).
    - 결과물이 `노트북LM_after.txt`와 구조적으로 동일해야 함.
