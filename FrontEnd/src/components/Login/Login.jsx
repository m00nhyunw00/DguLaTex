import React from 'react';
import './Login.css';

/**
 * [View] 로그인 화면의 순수 UI 컴포넌트
 */
function LoginUI({ email, setEmail, password, setPassword, handleLogin, error }) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light w-100">
            <div className="card p-4 shadow-sm border-0" style={{ width: '360px' }}>
                <h2 className="text-center mb-4 fw-bold text-dgu">DguLaTeX</h2>

                {error && (
                    <div className="alert alert-danger p-2 small text-center mb-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">아이디</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="아이디를 입력하세요 (dgu)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="비밀번호를 입력하세요 (1234)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-dgu w-100 py-2">
                        로그인
                    </button>
                </form>

                <div className="mt-3 text-center">
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        * 테스트 계정: dgu / 1234
                    </small>
                </div>
            </div>
        </div>
    );
}

export default LoginUI;