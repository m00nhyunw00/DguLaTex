/**
 * =================================================================
 * [Main] Backend Server Entry Point
 * 설명: 어플리케이션의 환경 설정, 미들웨어 구성 및 서버 구동을 담당함.
 * 주요 기능: 환경 변수 로드, CORS 설정, 라우터 통합 및 HTTP 서버 실행.
 * =================================================================
 */

/* ---------------------------------------------------------
 * SECTION 1: External Dependencies & Configuration
 * 기능: 서비스 구동에 필요한 외부 모듈을 로드하고 환경 설정을 초기화함.
 * --------------------------------------------------------- */
require('dotenv').config(); // .env 파일에 정의된 환경 변수를 process.env로 로드함
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

/* ---------------------------------------------------------
 * SECTION 2: Global Middlewares
 * 기능: 모든 HTTP 요청에 대해 공통적으로 적용되는 전처리 로직을 정의함.
 * --------------------------------------------------------- */

// Cross-Origin Resource Sharing(CORS) 허용 설정
// 프론트엔드 서비스(Vite, React 등)의 크로스 도메인 요청을 승인함
app.use(cors());

// JSON Body Parser 설정
// 클라이언트로부터 전달되는 JSON 형식의 Payload를 파싱하여 req.body에 할당함
app.use(express.json());

/* ---------------------------------------------------------
 * SECTION 3: API Route Integration
 * 기능: 기능별로 분리된 라우터 모듈을 특정 경로(Prefix)에 연결함.
 * --------------------------------------------------------- */

// 인증 관련 API (로그인, 토큰 검증 등) 경로 바인딩
app.use('/api/auth', authRoutes);

/* ---------------------------------------------------------
 * SECTION 4: Server Orchestration
 * 기능: 서비스 포트를 할당하고 네트워크 리스닝을 시작함.
 * --------------------------------------------------------- */

/**
 * 포트 할당 로직
 * 1. 시스템 환경 변수(process.env.PORT)의 설정값을 최우선으로 참조함.
 * 2. 환경 변수가 부재할 경우 기본 포트로 5000번을 할당함.
 */
const PORT = process.env.PORT || 5000;

/**
 * HTTP 서버 가동
 * 설정된 포트를 기반으로 서버를 실행하며, 가동 성공 시 상태를 터미널에 출력함.
 */
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});