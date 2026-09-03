# [Plan] GitHub Actions를 이용한 Firebase 자동 배포 (GitHub Actions Firebase Deployment)

## 1. 개요 (Overview)
GitHub 저장소에 코드가 푸시되거나 병합될 때 자동으로 Firebase Hosting에 배포되는 CI/CD 환경을 구축합니다. 이를 통해 수동 배포의 번거로움을 줄이고 항상 최신 코드가 서비스에 반영되도록 합니다.

## 2. 요구 사항 (Requirements)
- **Firebase CLI**: `firebase-tools` 설치 및 GitHub 연동 설정.
- **GitHub 저장소**: 프로젝트가 업로드된 GitHub 저장소 권한.
- **빌드 스크립트**: `npm run build`를 통한 프로덕션 빌드 정상 작동 여부.
- **Secrets 관리**: GitHub Actions에서 사용할 Firebase 서비스 계정 키 등록.

## 3. 해결 방안 (Proposed Solutions)
- `firebase init hosting:github` 명령어를 사용하여 자동 배포 워크플로우를 생성합니다.
- 메인 브랜치(`main`) 병합 시 운영 채널로 자동 배포되도록 설정합니다.
- Pull Request 생성 시 미리보기(Preview) 채널로 자동 배포하여 변경 사항을 사전 검증합니다.
- GitHub Secrets에 `FIREBASE_SERVICE_ACCOUNT` 키를 자동으로 등록하여 보안을 유지합니다.

## 4. 작업 목록 (Tasks)
- [ ] 로컬 빌드 검증 (`npm run build`)
- [ ] Firebase CLI를 통한 GitHub Action 설정 (`firebase init hosting:github`)
    - GitHub 로그인 및 저장소 선택
    - 빌드 스크립트 설정: `npm ci && npm run build`
    - PR 병합 시 자동 배포 설정 (Yes)
    - PR 생성 시 미리보기 배포 설정 (Yes)
- [ ] 생성된 워크플로우 파일 확인 (`.github/workflows/*.yml`)
- [ ] GitHub 저장소의 Secrets 등록 여부 확인
- [ ] 테스트 브랜치 생성 및 푸시를 통한 자동 배포 검증
- [ ] 메인 브랜치 병합을 통한 실제 사이트 반영 확인

## 5. 예상 결과 (Expected Outcome)
- 코드가 `main` 브랜치에 반영되면 자동으로 Firebase Hosting에 배포됨.
- PR 생성 시마다 전용 미리보기 URL이 생성되어 협업 및 검증이 용이해짐.
- 배포 이력이 GitHub Actions 탭에서 투명하게 관리됨.
