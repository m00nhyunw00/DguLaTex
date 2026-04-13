require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// 프론트엔드(5173 등)의 접속을 허용하는 핵심 설정
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use('/api/auth', authRoutes);

// 1. .env에서 PORT 값을 가져오고, 없으면 5000을 할당합니다.
const PORT = process.env.PORT || 5000;

// 2. 위에서 정의한 PORT 변수를 사용합니다.
app.listen(PORT, () => {
    // 백엔드 터미널에 어떤 포트로 열렸는지 출력해줍니다.
    console.log(`Backend Server running on http://localhost:${PORT}`);
});