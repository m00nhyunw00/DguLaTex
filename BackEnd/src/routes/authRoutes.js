const express = require('express');
const router = express.Router();

// 컨트롤러 가져오기
const authController = require('../controllers/authController');

// 로그인 API
router.post('/login', authController.login);

module.exports = router;