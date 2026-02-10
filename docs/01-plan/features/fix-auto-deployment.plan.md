# [Plan] GitHub 자동 배포 고장 진단 및 수정 (Fix Auto-Deployment)

## 1. 개요 (Overview)
현재 GitHub Actions를 통한 Firebase Hosting 자동 배포가 정상적으로 작동하지 않는 문제를 진단하고, 이를 해결하여 `main` 브랜치 푸시 시 자동으로 배포되도록 수정함.

## 2. 목표 (Goals)
- **원인 파악**: 배포 실패의 근본 원인(Secrets 누락, 빌드 에러, 설정 오류 등)을 진단.
- **자동 배포 복구**: GitHub Actions 워크플로우가 성공적으로 완료되고 Firebase Hosting에 반영되도록 수정.
- **검증**: 실제 푸시 후 배포 성공 여부 확인.

## 3. 진단 체크리스트 (Diagnostic Checklist)
- [ ] **GitHub Secrets 확인**: `FIREBASE_SERVICE_ACCOUNT_LINK_CLEANER_52FE6`가 GitHub 저장소에 정확히 등록되어 있는지 확인 (사용자 확인 필요).
- [ ] **로컬 빌드 테스트**: `npm run build`를 로컬에서 실행하여 빌드 에러 여부 확인.
- [ ] **브랜치 설정 확인**: 워크플로우의 `on.push.branches`가 현재 사용 중인 `main` 브랜치와 일치하는지 확인.
- [ ] **GitHub Actions 로그 확인**: 최근 실행된 워크플로우의 에러 메시지 분석 (사용자에게 로그 확인 요청 또는 가이드).

## 4. 상세 작업 내용 (Tasks)
- [ ] **로컬 빌드 검증**: 로컬 환경에서 빌드 수행 및 에러 수정.
- [ ] **워크플로우 파일(`firebase-hosting-merge.yml`) 검토**: 설정 값(projectId, 채널 등)의 정확성 재확인.
- [ ] **Secrets 가이드**: Secrets 누락 시 재등록 가이드 제공.
- [ ] **수정 및 테스트**: 필요한 수정 사항 반영 후 `git push`를 통한 최종 확인.

## 5. 기대 효과 (Expected Benefits)
- 코드 변경 시마다 수동 배포하는 번거로움 제거.
- 지속적 배포(CD) 환경 복구로 개발 생산성 향상.
