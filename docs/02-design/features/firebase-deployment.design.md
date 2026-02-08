# [Design] GitHub Actions를 이용한 Firebase 자동 배포 (GitHub Actions Firebase Deployment)

## 1. 시스템 구조 (System Architecture)

### 1.1. 구성 요소
- **GitHub Repository**: 소스 코드 저장 및 버전 관리.
- **GitHub Actions**: CI/CD 파이프라인 실행 (빌드 및 배포).
- **Firebase Hosting**: 정적 웹사이트 호스팅 서비스.

### 1.2. 워크플로우 흐름
1. **Push to `main`**:
    - 개발자가 코드를 `main` 브랜치에 푸시.
    - GitHub Action (`deploy-prod`) 트리거.
    - 의존성 설치 (`npm ci`).
    - 프로젝트 빌드 (`npm run build`).
    - Firebase Hosting (Live Channel)으로 배포.

2. **Pull Request**:
    - 개발자가 PR 생성 또는 업데이트.
    - GitHub Action (`deploy-preview`) 트리거.
    - 의존성 설치 및 빌드.
    - Firebase Hosting (Preview Channel)으로 배포.
    - PR 코멘트로 미리보기 URL 자동 게시.

## 2. 상세 설계 (Detailed Design)

### 2.1. GitHub Actions 워크플로우 파일

#### A. 프로덕션 배포 (`.github/workflows/firebase-hosting-merge.yml`)
- **Trigger**: `push` on `main` branch
- **Jobs**: `build_and_deploy`
- **Steps**:
  1. Checkout code
  2. Install dependencies
  3. Build
  4. Deploy to Firebase (Service Account Secret 필요)

#### B. 프리뷰 배포 (`.github/workflows/firebase-hosting-pull-request.yml`)
- **Trigger**: `pull_request` on `main` branch
- **Jobs**: `build_and_preview`
- **Steps**:
  1. Checkout code
  2. Install dependencies
  3. Build
  4. Deploy to Firebase Preview Channel (Expires in 7 days)

### 2.2. 환경 변수 및 보안 (Secrets)
- **`FIREBASE_SERVICE_ACCOUNT_LINKE_CLEANER`**: Firebase 서비스 계정 인증 키 (JSON).
- **`GITHUB_TOKEN`**: GitHub Actions에서 기본 제공 (PR 코멘트 작성용).

### 2.3. 프로젝트 설정 확인
- `firebase.json`: 호스팅 설정 (public: `dist`, rewrites: index.html).
- `.firebaserc`: 프로젝트 ID 매핑 확인.

## 3. 검증 계획 (Verification Plan)
- [ ] 워크플로우 파일 문법 유효성 검사.
- [ ] `npm run build` 스크립트 실행 확인.
- [ ] Firebase Project ID 일치 여부 확인.