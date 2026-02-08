# Firebase Hosting 배포 계획

사용자의 요청에 따라 **코드 수정 없이** Firebase Hosting 배포에만 집중하는 실행 계획입니다. 로컬 개발 환경 구성은 완료된 것으로 간주합니다.

## User Review Required

> [!NOTE]
> **전제 조건**
>
> - `npm install` 등 의존성 설치가 완료되어 있어야 합니다. (완료 가정)
> - Google 계정 로그인이 필요합니다.
> - 프로젝트 루트(`d:\vibe-coding\linke-cleaner`)에서 모든 명령을 실행합니다.

## Proposed Steps

### 1. Firebase 도구 준비

배포를 위한 Firebase CLI 도구를 준비합니다.

- `npm install -g firebase-tools`: 전역으로 설치 (이미 설치되어 있을 수 있음)
- `firebase login`: 브라우저를 통해 Google 계정 인증

### 2. 프로젝트 초기화 (Interactive Setup)

터미널에서 `firebase init hosting`을 실행하고 아래와 같이 설정합니다.

- **Project Setup**: "Use an existing project" 또는 "Create a new project" 선택
- **Public directory**: `dist` (Vite 빌드 기본 출력 폴더)
- **Configure as a single-page app (rewrite all urls to /index.html)?**: `Yes`
- **Set up automatic builds and deploys with GitHub?**: `No` (수동 배포 우선)
- **Overwrite index.html?**: `No` (빌드 파일 덮어쓰기 방지)

### 3. 빌드 및 배포

실제 앱을 빌드하고 호스팅 서버로 전송합니다.

- `npm run build`: 프로덕션용 최적화 빌드 수행 (`dist` 폴더 생성)
- `firebase deploy`: `dist` 폴더의 내용을 Firebase Hosting에 업로드

## Verification Plan

### Automated Tests

- `npm run build`: 빌드 프로세스가 에러 없이 종료되는지 확인 (Exit Code 0)

### Manual Verification

- `firebase deploy` 완료 후 출력되는 **Hosting URL** (예: `https://[project-id].web.app`)에 접속하여 앱이 정상 동작하는지 확인합니다.
