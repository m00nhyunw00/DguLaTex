import React from 'react';
import './Login.css';

/**
 * Login Component
 * @description 사용자 인증을 위한 UI 및 입력 인터페이스 제공
 * * @param {Object} props
 * @param {string} props.email - 아이디 입력 필드 상태값
 * @param {function} props.setEmail - 아이디 입력값 업데이트 함수
 * @param {string} props.password - 비밀번호 입력 필드 상태값
 * @param {function} props.setPassword - 비밀번호 입력값 업데이트 함수
 * @param {function} props.handleLogin - 폼 제출 시 실행되는 인증 로직 함수
 * @param {string} props.error - 인증 실패 시 노출할 에러 메시지
 */
function Login({ email, setEmail, password, setPassword, handleLogin, error }) {
    return (
        // 화면 중앙 정렬을 위한 Flex 레이아웃 컨테이너
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light w-100">

            {/* 로그인 카드 컨테이너 (너비 고정 및 그림자 효과) */}
            <div className="card p-4 shadow-sm border-0" style={{ width: '360px' }}>
                <h2 className="text-center mb-4 fw-bold text-dgu">DguLaTeX</h2>

                {/* Conditional Rendering: 에러 상태 존재 시 알림 박스 노출 */}
                {error && (
                    <div className="alert alert-danger p-2 small text-center mb-3">
                        {error}
                    </div>
                )}

                {/* 인증 정보 제출 폼 */}
                <form onSubmit={handleLogin}>

                    {/* ID 입력 섹션 */}
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">아이디</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="아이디를 입력하세요 (dgu)"
                            value={email} // 데이터 바인딩
                            onChange={(e) => setEmail(e.target.value)} // 실시간 상태 업데이트
                            required
                        />
                    </div>

                    {/* PW 입력 섹션 */}
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="비밀번호를 입력하세요 (1234)"
                            value={password} // 데이터 바인딩
                            onChange={(e) => setPassword(e.target.value)} // 실시간 상태 업데이트
                            required
                        />
                    </div>

                    {/* 인증 요청 버튼: 클릭 시 onSubmit 이벤트 트리거 */}
                    <button type="submit" className="btn btn-dgu w-100 py-2">
                        로그인
                    </button>
                </form>

                {/* 개발/테스트 편의를 위한 계정 정보 안내 */}
                <div className="mt-3 text-center">
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        * 테스트 계정: dgu / 1234
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login;