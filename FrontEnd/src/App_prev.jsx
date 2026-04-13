import { useState } from 'react';
// 외부 라이브러리 및 전역 스타일 로드
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// 세부 화면 컴포넌트 임포트 (기능별 파일 분리)
import Login from './components/Login/Login_prev.jsx';
import EditorPage from './components/EditorPage/EditorPage.jsx';

/**
 * App Component (Root)
 * @description 애플리케이션의 상태(State) 중앙 관리 및 라우팅 제어
 */
function App() {
    /* -----------------------------------------------------------
       1. Global State Management (전역 상태 관리)
       ----------------------------------------------------------- */

    // 인증 및 세션 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 (T/F)
    const [email, setEmail] = useState('');              // 사용자 식별자
    const [password, setPassword] = useState('');        // 사용자 비밀번호
    const [error, setError] = useState('');              // 인증 오류 메시지

    // 에디터 작업 데이터
    const [latexCode, setLatexCode] = useState(
        '\\documentclass{article}\n\\begin{document}\nHello DguLaTeX!\n\\end{document}'
    );

    /* -----------------------------------------------------------
       2. Business Logic (비즈니스 로직)
       ----------------------------------------------------------- */

    /**
     * @description 사용자 인증 처리 핸들러
     * @param {Event} e - Form Submit 이벤트
     */
    const handleLogin = (e) => {
        e.preventDefault(); // 브라우저 기본 새로고침 동작 방지

        // 정적 계정 검증 (추후 API 연동 포인트)
        if (email === 'dgu' && password === '1234') {
            setIsLoggedIn(true);
            setError(''); // 에러 상태 초기화
        } else {
            setIsLoggedIn(false);
            setError('아이디 또는 비밀번호가 잘못되었습니다.'); // 실패 시 문구 출력
        }
    };

    /**
     * @description 세션 종료 및 상태 초기화 핸들러
     */
    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');    // 보안을 위한 입력 데이터 소거
        setPassword('');
        setError('');
    };

    /* -----------------------------------------------------------
       3. Conditional Rendering (조건부 렌더링)
       ----------------------------------------------------------- */

    return (
        <>
            {/* 상태(isLoggedIn)에 따른 화면 분기 처리 (Ternary Operator)
                - true: 메인 에디터 화면 노출 및 데이터 전달 (Props Down)
                - false: 로그인 입력 화면 노출 및 리모컨 전달 (Callback Props)
            */}
            {isLoggedIn ? (
                <EditorPage
                    email={email}
                    handleLogout={handleLogout}
                    latexCode={latexCode}
                    setLatexCode={setLatexCode}
                />
            ) : (
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    error={error}
                />
            )}
        </>
    );
}

export default App;