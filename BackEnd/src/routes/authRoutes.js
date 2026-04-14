/**
 * =================================================================
 * [Router] Authentication Router
 * 설명: 인증 관련 HTTP 요청을 해당 컨트롤러 메소드로 매핑하는 라우터임.
 * 주요 기능: 로그인 등 사용자 계정 인증과 관련된 API 엔드포인트 정의.
 * =================================================================
 */
const express = require('express');
const router = express.Router();

/* ---------------------------------------------------------
 * SECTION 1: Controller Dependency Injection
 * 기능: 비즈니스 로직이 구현된 authController 모듈을 참조함.
 * --------------------------------------------------------- */
const authController = require('../controllers/authController');

/* ---------------------------------------------------------
 * SECTION 2: Routing Definitions
 * 기능: 특정 경로(Path)와 HTTP Method를 컨트롤러 함수와 연결함.
 * --------------------------------------------------------- */

/**
 * @route   POST /api/auth/login
 * @desc    사용자 인증 시도 및 로그인 처리
 * @access  Public
 */
router.post('/login', authController.login);

/* ---------------------------------------------------------
 * SECTION 3: Module Export
 * 기능: 정의된 라우터 객체를 외부 모듈(서버 메인 파일 등)에서 사용할 수 있도록 수출함.
 * --------------------------------------------------------- */
module.exports = router;