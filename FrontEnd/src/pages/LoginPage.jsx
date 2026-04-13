import React from 'react';
import LoginUI from '../components/Login/LoginUI';
import { useLogin } from '../hooks/useLogin';
import './LoginPage.css'; // [신규] 배경 전용 CSS 임포트

function LoginPage({ setIsLoggedIn, setUser }) {
    const loginLogic = useLogin(setIsLoggedIn, setUser);

    return (
        <div className="login-page-wrapper">
            {/* 이미지 가독성을 위한 오버레이 레이어 */}
            <div className="login-page-overlay">
                <LoginUI
                    {...loginLogic}
                />
            </div>
        </div>
    );
}

export default LoginPage;