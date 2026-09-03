# [Design] Git 브랜치 정리 (Git Branch Cleanup)

## 1. 개요 (Overview)
계획된 Git 브랜치 정리 작업을 수행하기 위한 구체적인 명령어를 정의합니다.

## 2. 작업 상세 (Detailed Tasks)

### 2.1. 로컬 main 최신화
- `main` 브랜치로 체크아웃 후 `git pull` 수행.
- 현재 `behind 1` 상태이므로 원격의 변경사항을 가져와 동기화함.

### 2.2. 로컬 feature 브랜치 삭제
- `feature/test-auto-deploy` 브랜치는 이미 `origin/main`과 동일한 위치에 있으므로 삭제 가능.
- `git branch -d feature/test-auto-deploy` 명령어를 사용.

### 2.3. 원격 feature 브랜치 삭제
- 원격 저장소(`origin`)에 남아있는 `feature/test-auto-deploy` 브랜치 삭제.
- `git push origin --delete feature/test-auto-deploy` 명령어 사용.

## 3. 검증 계획 (Verification Plan)
- `git branch -a` 명령어로 남은 브랜치 확인.
- `main` 브랜치와 `remotes/origin/main`만 남아야 함.
