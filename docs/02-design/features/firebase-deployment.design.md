# [Design] Firebase Hosting 배포

## 1. 배포 아키텍처 (Deployment Architecture)
- **플랫폼**: Firebase Hosting
- **빌드 도구**: Vite (npm run build)
- **출력 디렉토리**: `dist`
- **라우팅 설정**: SPA (Single Page Application) - 모든 경로를 `index.html`로 리다이렉트

## 2. 주요 설정 파일 설계 (Configuration Design)

### 2.1 firebase.json
Firebase 호스팅의 동작을 정의하는 핵심 파일입니다.
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 2.2 .firebaserc
프로젝트 별칭 및 ID를 관리합니다. (초기화 시 생성됨)

## 3. 배포 워크플로우 (Deployment Workflow)

### Step 1: 환경 변수 확인
- 배포된 환경에서도 Gemini API 키가 작동해야 하므로, Firebase Console에서 환경 변수를 설정하거나 빌드 타임에 주입되는지 확인.
- 현재 프로젝트는 `vite.config.ts`에서 `process.env.GEMINI_API_KEY`를 `define`으로 주입하므로, 빌드 환경에 해당 키가 존재해야 함.

### Step 2: 빌드 및 업로드
1. `npm run build`: `dist` 폴더 생성.
2. `firebase deploy --only hosting`: 호스팅 자산만 선택적으로 배포.

## 4. 검증 계획 (Verification Plan)
- **빌드 검증**: `dist/index.html`과 `dist/assets` 파일들이 정상 생성되었는지 확인.
- **접속 검증**: 배포 URL 접속 시 첫 화면이 로드되는지 확인.
- **기능 검증**: 파일 업로드 시 API 호출 및 클렌징 결과가 정상 출력되는지 확인 (CORS 이슈 등 체크).
