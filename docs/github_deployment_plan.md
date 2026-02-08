# GitHub Actions를 이용한 Firebase 자동 배포 계획

## 1. 개요

현재 로컬에서 수동으로 진행하는 `firebase deploy` 배포 방식을 GitHub Actions를 도입하여 자동화하는 계획입니다.
이 설정을 완료하면 GitHub 저장소의 `main` 브랜치에 코드가 푸시(Push)되거나 병합(Merge)될 때 자동으로 Firebase Hosting에 배포됩니다.

## 2. 목표

- **자동 배포**: 코드를 Git에 올리면 자동으로 서비스에 반영 (CI/CD 구축)
- **프리뷰 배포**: Pull Request(PR) 생성 시 미리보기 URL 자동 생성 (선택 사항)
- **안정성**: 로컬 환경과 무관하게 항상 Clean 상태에서 빌드 및 배포 보장

## 3. 진행 단계 (Step-by-Step)

### 3.1. Firebase CLI를 통한 설정 (가장 권장됨)

복잡한 YAML 파일을 직접 작성할 필요 없이, Firebase CLI 도구가 자동으로 필요한 설정 파일과 인증 키(Secrets)를 생성해 줍니다.

**실행 명령어:**

```bash
firebase init hosting:github
```

**예상되는 프롬프트 응답:**

1.  **GitHub 로그인**: 웹 브라우저가 열리며 GitHub 권한을 요청합니다. 승인합니다.
2.  **저장소 선택**: 현재 프로젝트의 GitHub 저장소(`사용자명/저장소명`)를 선택합니다.
3.  **빌드 스크립트 설정**:
    - Build script: `npm ci && npm run build` (현재 프로젝트 `package.json` 기준)
4.  **자동 배포 조건 설정**:
    - **PR 배포**: "Set up automatic deployment to your site's live channel when a PR is merged?" -> **Yes**
    - **Preview 배포**: "Set up automatic deployment to your site's live channel when a PR is merged?" -> **Yes** (선택)

### 3.2. 생성되는 파일 확인

위 과정을 마치면 프로젝트에 다음 파일들이 생성됩니다.

- `.github/workflows/firebase-hosting-merge.yml`: 메인 브랜치 배포용
- `.github/workflows/firebase-hosting-pull-request.yml`: PR 미리보기용 (선택 시)

### 3.3. GitHub Secrets 자동 등록

Firebase CLI가 GitHub 저장소의 `Settings > Secrets and variables > Actions`에 서비스 계정 키(`FIREBASE_SERVICE_ACCOUNT_...`)를 자동으로 등록합니다. 사용자가 수동으로 키를 복사/붙여넣기 할 필요가 없습니다.

## 4. 검증 및 테스트

1.  **기능 브랜치 생성**: `git checkout -b feature/deploy-test`
2.  **간단한 수정**: `README.md` 등 비기능 파일 수정 후 커밋
3.  **PR 생성 및 Push**: GitHub에 푸시하여 PR 생성
    - -> **기대 결과**: GitHub Actions가 돌면서 댓글로 "미리보기 URL"이 달림 (초기 설정 시)
4.  **Main 병합 (Merge)**: PR을 Main 브랜치로 병합
    - -> **기대 결과**: GitHub Actions가 `firebase-hosting-merge.yml`을 실행하고 실제 사이트에 배포됨

## 5. 주의사항

- `package.json`의 `build` 스크립트가 정상적으로 작동하는지 로컬에서 선행 확인이 필요합니다. (`npm run build`)
- `.gitignore`에 `node_modules` 등 불필요한 파일이 잘 포함되어 있는지 확인합니다.
