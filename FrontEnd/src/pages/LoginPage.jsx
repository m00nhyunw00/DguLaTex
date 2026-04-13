import React from 'react';
import LoginUI from '../components/Login/LoginUI';
import { useLogin } from '../hooks/useLogin';

/**
 * [View] 로그인 페이지 메인 컴포넌트
 */
function LoginPage({ setIsLoggedIn }) {
    // 전역 상태 변경 함수를 전달하여 로직 처리
    const loginProps = useLogin(setIsLoggedIn);

    return <LoginUI {...loginProps} />;
}

export default LoginPage;