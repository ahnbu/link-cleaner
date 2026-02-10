# [Design/Diagnosis] 자동 배포 실패 원인 분석 (Auto-Deployment Diagnosis)

## 1. 현황 분석
- **로컬 빌드**: `npm run build` 성공 (빌드 에러 없음).
- **GitHub 상태**: 최신 커밋(`0780900`)이 원격 `main` 브랜치에 반영됨.
- **워크플로우 설정**: `.github/workflows/firebase-hosting-merge.yml` 파일이 존재하며 `main` 브랜치 푸시 트리거가 설정되어 있음.
- **Firebase 설정**: `firebase.json` 및 `.firebaserc`의 프로젝트 ID(`link-cleaner-52fe6`)가 워크플로우와 일치함.

## 2. 가공의 실패 원인 (Hypotheses)
1. **GitHub Secrets 누락 (가장 유력)**: `FIREBASE_SERVICE_ACCOUNT_LINK_CLEANER_52FE6` 시크릿이 GitHub 저장소에 설정되지 않았거나 잘못된 값이 들어있음.
2. **권한 부족**: GITHUB_TOKEN 또는 서비스 계정의 권한이 Firebase Hosting에 배포하기에 부족함.
3. **GitHub Actions 비활성화**: 저장소 설정에서 Actions가 비활성화되어 있음.

## 3. 해결 설계 (Solution Design)

### 3.1. 사용자 가이드 및 확인 요청
- GitHub 저장소의 **Actions** 탭에서 실패한 워크플로우의 로그를 확인하도록 안내.
- 특히 `FirebaseExtended/action-hosting-deploy` 단계에서 발생하는 에러 메시지 확인 필요.

### 3.2. 설정 보완
- 만약 Secrets 문제라면, Google Cloud Console에서 서비스 계정 키(JSON)를 다시 생성하여 GitHub에 등록하는 과정을 가이드함.
- 워크플로우 파일에서 `node-version`을 명시적으로 지정하여 환경 일관성 확보 (현재는 명시되어 있지 않음).

## 4. 수행 단계 (Steps to Follow)
1. GitHub Actions 로그 확인 요청.
2. 에러 메시지에 따른 조치 (Secrets 재등록 등).
3. 워크플로우 파일 최적화 (Node 버전 명시 등).
