/**
 * =================================================================
 * [Page] Login Page Component
 * 설명: 로그인 화면의 전체 레이아웃 구성을 담당하는 페이지 컴포넌트
 * 주요 기능: 배경 이미지 및 오버레이 적용, 로그인 로직(Hook) 주입 및 UI 배치
 * =================================================================
 */

import React from 'react';
import LoginUI from '../components/Login/LoginUI';
import { useLogin } from '../hooks/useLogin';
import './LoginPage.css'; // 화면 전체 배경 및 레이아웃 정의 스타일

/**
 * @param {Function} setIsLoggedIn - 로그인 성공 시 전체 앱의 인증 상태를 변경하는 함수
 * @param {Function} setUser - 로그인 성공 시 사용자 정보를 전역 상태에 저장하는 함수
 */
function LoginPage({ setIsLoggedIn, setUser }) {

    /* ---------------------------------------------------------
     * SECTION 1: Authentication Logic Integration
     * 기능: useLogin 훅을 사용하여 입력 상태 관리 및 인증 요청 로직을 가져옴
     * --------------------------------------------------------- */
    const loginLogic = useLogin(setIsLoggedIn, setUser);

    /* ---------------------------------------------------------
     * SECTION 2: Page Composition & Background Layout
     * 기능: 전체 배경 이미지(Wrapper)와 폼 가독성 확보용 레이어(Overlay)를 중첩 구성
     * --------------------------------------------------------- */
    return (
        // 전체 배경 컨테이너 (dgu_campus.jpg 및 뷰포트 고정)
        <div className="login-page-wrapper">

            {/* 배경 이미지의 명도를 조절하여 중앙 로그인 카드의 집중도를 높이는 레이어 */}
            <div className="login-page-overlay">

                {/* 실제 사용자 입력 인터페이스 컴포넌트 */}
                <LoginUI
                    {...loginLogic} // studentId, password, handleLogin 등을 일괄 전달
                />

            </div>
        </div>
    );
}

export default LoginPage;