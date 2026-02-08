# [Plan] Firebase Hosting 배포 (Firebase Hosting Deployment)

## 1. 개요 (Overview)
개발이 완료된 Link Cleaner 프로젝트를 Firebase Hosting을 통해 전 세계에 서비스할 수 있도록 배포 환경을 구축하고 실행합니다.

## 2. 요구 사항 (Requirements)
- **Firebase CLI**: Firebase 명령어를 실행하기 위한 도구 설치 및 로그인.
- **Hosting 설정**: Vite 프로젝트 구조(`dist` 폴더)에 맞는 호스팅 초기화.
- **프로덕션 빌드**: 최적화된 정적 파일 생성.
- **배포 실행**: 실제 호스팅 서버로 파일 업로드 및 URL 확인.

## 3. 해결 방안 (Proposed Solutions)
- `firebase-tools`를 사용하여 프로젝트를 초기화합니다.
- Vite의 기본 빌드 결과물인 `dist` 폴더를 public 디렉토리로 설정합니다.
- SPA(Single Page Application) 설정을 활성화하여 라우팅 문제를 방지합니다.
- `npm run build` 후 `firebase deploy` 명령어를 순차적으로 실행합니다.

## 4. 작업 목록 (Tasks)
- [ ] Firebase CLI 설치 및 로그인 (`firebase login`)
- [ ] Firebase 프로젝트 초기화 (`firebase init hosting`)
    - Public directory: `dist`
    - SPA rewrite: `Yes`
- [ ] 프로덕션 빌드 수행 (`npm run build`)
- [ ] Firebase 배포 수행 (`firebase deploy`)
- [ ] 최종 배포 URL 접속 및 동작 검증

## 5. 예상 결과 (Expected Outcome)
- `https://[project-id].web.app` 형태의 공용 URL을 통해 서비스 접속 가능.
- 로컬 환경과 동일한 기능이 배포 환경에서도 정상 작동함.
