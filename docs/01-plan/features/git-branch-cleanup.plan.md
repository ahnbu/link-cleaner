# [Plan] Git 브랜치 정리 (Git Branch Cleanup)

## 1. 개요 (Overview)
현재 사용 중인 Git 저장소 내의 불필요한 브랜치들을 정리하여 작업 환경을 쾌적하게 유지합니다.

## 2. 문제점 (Current Issues)
- **브랜치 파편화**: 이미 작업이 완료되어 원격 `main`에 반영된 브랜치가 로컬 및 원격에 여전히 남아있음.
- **동기화 지연**: 로컬 `main` 브랜치가 원격 `main`의 최신 상태를 반영하지 못하고 있음.

## 3. 해결 방안 (Proposed Solutions)
- **최신화**: 로컬 `main` 브랜치를 원격 `main`으로 업데이트 (`git pull`).
- **불필요한 브랜치 삭제**: 이미 머지되었거나 더 이상 사용하지 않는 `feature/test-auto-deploy` 브랜치를 로컬과 원격 모두에서 삭제.
- **정리 확인**: 브랜치 목록을 다시 확인하여 깔끔해졌는지 검증.

## 4. 작업 목록 (Tasks)
- [x] 현재 브랜치 상태 및 머지 여부 확인
- [ ] 로컬 `main` 브랜치 업데이트
- [ ] 로컬 `feature/test-auto-deploy` 브랜치 삭제
- [ ] 원격 `feature/test-auto-deploy` 브랜치 삭제
- [ ] 최종 브랜치 목록 확인

## 5. 예상 결과 (Expected Outcome)
- 로컬과 원격 모두 `main` 브랜치만 남게 되어 혼란이 줄어듦.
- 작업 이력이 깔끔하게 관리됨.
