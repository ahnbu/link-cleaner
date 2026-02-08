# [Plan] 클렌징 로직 고도화 및 로컬 처리 확장 (Cleansing Logic Enhancement & Local Expansion)

## 1. 개요 (Overview)
`노트북LM_before.txt`와 `after.txt`의 사례를 분석한 결과, 기존의 정규표현식 외에도 특정 패턴(역슬래시 이스케이프, 특정 형식의 인용구 번호 등)이 존재함. 이를 AI 없이 로컬에서 빠르게 처리할 수 있도록 `localCleansingService.ts`의 로직을 고도화하고 성능을 확장함.

## 2. 목표 (Goals)
- **추가 패턴 지원**: 역슬래시(``) 이스케이프 제거, 특정 기호(`\*`) 처리 등 고도화된 Regex 적용.
- **Fast 모드 성능 강화**: 더 넓은 범위의 노이즈를 로컬에서 즉시 제거하여 AI 의존도 감소.
- **정확도 향상**: `노트북LM_after.txt`에서 수동으로 정리된 수준의 결과물을 로컬 로직으로 도출.

## 3. 대상 패턴 분석 (Pattern Analysis)
`example/노트북LM_before.txt` 기준:
- **역슬래시 이스케이프**: `\*\*`, `\*` 등 마크다운 특수문자 앞에 붙은 불필요한 역슬래시.
- **각주 마커의 변종**: `[1, 2]`, `[1, 3]`, `[1-3]` 외에도 줄 끝에 붙는 `[1]` 형식.
- **불필요한 공백/줄바꿈**: 텍스트 사이의 과도한 줄바꿈 및 문장 끝 공백.

## 4. 상세 작업 내용 (Tasks)
- [ ] **고도화된 Regex 추가**:
    - Escaped characters: `/\(?=[*#_\[\]])/g` (특정 마크다운 기호 앞의 역슬래시 제거)
    - Enhanced Footnote markers: 기존 패턴 유지 및 공백 대응 강화.
- [ ] **`localCleansingService.ts` 업데이트**:
    - 새로운 정규표현식 적용 로직 추가.
    - 텍스트 정규화 로직(Newline normalization) 정교화.
- [ ] **검증**:
    - `노트북LM_before.txt`를 사용하여 로컬 클렌징 후 `노트북LM_after.txt`와 비교.
    - 기존 `perplexity답변` 사례에 대한 회귀 테스트.

## 5. 기대 효과 (Expected Benefits)
- 노트북LM 등 다양한 AI 도구의 출력물에 대해 즉각적인 대응 가능.
- 수동 수정 노력을 최소화하고 자동화된 클렌징 품질 확보.
