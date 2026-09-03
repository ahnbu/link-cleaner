# [Report] Firebase 자동 배포 구축 완료 (Firebase Deployment Completion Report)

## 1. 개요
GitHub Actions를 활용하여 `Linke Cleaner` 프로젝트의 CI/CD 파이프라인을 구축했습니다. 이제 GitHub에 코드를 푸시하거나 PR을 생성하면 자동으로 빌드 및 배포가 수행됩니다.

## 2. 작업 결과
- **프로덕션 자동 배포**: `main` 브랜치에 코드가 병합되면 Firebase Hosting(Live)에 자동 배포됩니다.
- **프리뷰 자동 배포**: Pull Request 생성 시 임시 URL(Preview)에 배포되어 미리보기가 가능합니다.
- **워크플로우 파일 생성**: `.github/workflows/` 디렉토리에 2개의 YAML 파일이 생성되었습니다.

## 3. 필수 후속 작업 (User Action Required)
자동 배포가 실제로 작동하려면 **GitHub Secrets** 설정이 반드시 필요합니다.

1.  **서비스 계정 키 생성**:
    - Google Cloud Console 접속 -> IAM 및 관리 -> 서비스 계정.
    - `firebase-adminsdk`로 시작하는 계정 선택 (또는 새로 생성).
    - '키' 탭 -> 키 추가 -> 새 키 만들기 -> JSON 선택 -> 다운로드.

2.  **GitHub Secret 등록**:
    - GitHub 저장소 접속 -> **Settings** -> **Secrets and variables** -> **Actions**.
    - **New repository secret** 클릭.
    - **Name**: `FIREBASE_SERVICE_ACCOUNT_LINK_CLEANER_52FE6`
    - **Secret**: 다운로드 받은 JSON 파일의 **내용 전체**를 복사하여 붙여넣기.
    - **Add secret** 클릭.

## 4. 결론
시스템 구축이 완료되었으며, Secret 등록만 완료되면 즉시 자동 배포를 사용할 수 있습니다.
