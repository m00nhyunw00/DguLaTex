/**
 * =================================================================
 * [Component] Login UI View
 * 설명: 사용자 인증을 위한 로그인 폼의 시각적 요소를 구성
 * 주요 기능: 학번 및 비밀번호 입력 인터페이스 제공, 에러 메시지 출력,
 * 상위 컴포넌트(Page)로부터 전달받은 인증 핸들러 실행
 * =================================================================
 */

import React from 'react';
import './LoginUI.css';

function LoginUI({
                     studentId,      // [Prop] 현재 입력된 학번/아이디 상태
                     setStudentId,   // [Prop] 학번 입력값 업데이트 함수
                     password,       // [Prop] 현재 입력된 비밀번호 상태
                     setPassword,    // [Prop] 비밀번호 입력값 업데이트 함수
                     handleLogin,    // [Prop] 폼 제출 시 실행될 인증 로직 함수
                     error           // [Prop] 인증 실패 시 노출할 에러 메시지 문자열
                 }) {
    return (
        /* ---------------------------------------------------------
         * SECTION 1: Login Card Wrapper
         * 기능: Glassmorphism 스타일이 적용된 반투명 카드 컨테이너
         * --------------------------------------------------------- */
        <div className="login-card-glass shadow-lg">

            {/* 파트 1: 브랜드 로고 및 서비스 타이틀 영역 */}
            <div className="text-center mb-5">
                <h1 className="dgu-logo">DguLaTeX</h1>
                <p className="text-secondary small">동국대학교 온라인 LaTeX 편집기</p>
            </div>

            {/* 파트 2: 조건부 에러 메시지 렌더링 */}
            {/* 기능: 인증 실패 등 예외 상황 발생 시 사용자에게 피드백 제공 */}
            {error && (
                <div className="alert alert-danger py-2 small text-center mb-4 animate__animated animate__shakeX">
                    {error}
                </div>
            )}

            {/* ---------------------------------------------------------
            * SECTION 2: Authentication Form
            * 기능: 사용자 입력을 수집하고 제출(Submit) 이벤트를 처리
            * --------------------------------------------------------- */}
            <form onSubmit={handleLogin}>

                {/* 학번/사번 입력 필드 (Floating Label 적용) */}
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control dgu-input"
                        id="studentId"
                        placeholder="ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                    <label htmlFor="studentId">학번 또는 사번 (dgu)</label>
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="form-floating mb-4">
                    <input
                        type="password"
                        className="form-control dgu-input"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password">비밀번호 (1234)</label>
                </div>

                {/* 로그인 제출 버튼: 동국대 브랜드 컬러가 적용된 메인 액션 버튼 */}
                <button className="btn btn-dgu-primary w-100 py-3 fw-bold" type="submit">
                    로그인
                </button>
            </form>
        </div>
    );
}

export default LoginUI;