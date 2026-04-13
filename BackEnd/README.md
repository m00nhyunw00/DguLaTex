# 🖥️ Back-End (Node.js Express)

클라이언트의 요청을 처리하고 데이터베이스를 제어하는 프로젝트의 백엔드입니다.

### 📁 폴더 구조 및 MVC 역할 분담

| 폴더명 | MVC 역할 | 설명 |
| :--- | :---: | :--- |
| **src/controllers/**| **Controller**| 요청 데이터 처리, 비즈니스 로직 실행 및 DB 상호작용 |
| **src/models/** | **Model** | 데이터베이스의 테이블 구조 및 스키마 정의 |
| **src/routes/** | **Route** | API 주소(엔드포인트) 정의 및 담당 Controller 연결 |
| **src/app.js** | - | 서버 시작점. Express 설정, 미들웨어 및 포트 실행 |

### 🚀 실행 방법
1. `cd backend`
2. `npm install` (최초 1회)
3. `npm run dev` (nodemon을 통한 자동 재시작 실행)

### ⚠️ 주의사항
- **환경 변수**: DB 접속 정보나 비밀키가 담긴 `.env` 파일은 절대 Git에 업로드하지 마세요.
- **데이터 형식**: 모든 API 응답은 일관된 JS~~~~ON 형식을 유지합니다.
- **로직 분리**: Route에는 주소만 정의하고, 실제 데이터 처리는 반드시 Controller에서 수행합니다.