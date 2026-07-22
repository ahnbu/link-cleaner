<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Link Cleaner

## 서비스 정보

> 최종 확인: 2026-07-22

| 항목 | 값 |
|---|---|
| 서비스 URL | https://link-cleaner-52fe6.web.app/ |
| 상태 | ⚠️ **기능 불능 의심** — 페이지는 열리나 AI 변환이 동작하지 않을 가능성이 높음 |
| 의심 근거 | 배포 번들에 Gemini 키가 **빈 값**(`apiKey:""`)으로 박혀 있다. 빌드 시 `GEMINI_API_KEY`가 주입되지 않은 것으로 보인다 |
| 조치 방향 | Firebase 빌드 환경(GitHub Actions Secrets)에 `GEMINI_API_KEY` 등록 후 재배포. **단, Vite 특성상 키가 클라이언트에 노출되므로 서버 프록시 도입을 함께 검토할 것** |
| 호스팅 | **Firebase Hosting** (프로젝트 `link-cleaner-52fe6`) |
| DB | ❌ 없음 (상태 저장 없는 변환 도구) |
| 인증 | ❌ 없음 |
| 외부 API | Google Gemini (`@google/genai`) |
| 배포 방식 | GitHub Actions 2종 (`firebase-hosting-merge.yml`, `firebase-hosting-pull-request.yml`) |
| 필요 환경변수 | `GEMINI_API_KEY` (`vite.config.ts`에서 `process.env.API_KEY`로 치환) |

> 대체 주소: `link-cleaner-52fe6.firebaseapp.com` (동일 서비스)

### ⚠️ 활성 서비스로 전환 시 선결 과제

현재 배포본은 키가 빈 값이라 AI 기능이 동작하지 않는다. **역설적으로 그 덕분에 키 유출도 없는 상태**다. 복구하려면 아래 순서를 지켜야 한다.

| # | 과제 | 현재 상태 | 조치 |
|---|---|---|---|
| 1 | **Gemini 키 클라이언트 노출 구조** | `vite.config.ts:14-15`가 `GEMINI_API_KEY`를 `process.env.API_KEY`로 치환해 번들에 삽입 | 서버 경유 호출로 전환 (Firebase Functions 또는 프록시) |
| 2 | 유효 키 주입 | 빈 값(`apiKey:""`)으로 빌드됨 | 1번 완료 후 GitHub Actions Secrets에 등록 |
| 3 | 테스트 부재 | 테스트 코드 0건 | 배포 후 스모크 테스트 추가 |

> **1번을 건너뛰고 키만 채우면 즉시 공개된다.** 참고로 로컬 `.env.local`에 남아 있는 키는 이미 폐기된 값이다(2026-07-22 확인).
> 서버 경유 구현은 `color_prompt`의 `functions/api/generate.js`를 참고할 것.

---

## Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1zuUwS3GePQdSqj7oB-TkOBxNYOGJRKTZ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
