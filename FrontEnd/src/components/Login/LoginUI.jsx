import React from 'react';
import './LoginUI.css';

function LoginUI({
                     studentId,
                     setStudentId,
                     password,
                     setPassword,
                     handleLogin,
                     error
                 }) {
    return (
        <div className="login-card-glass shadow-lg">
            <div className="text-center mb-5">
                <h1 className="dgu-logo">DguLaTeX</h1>
                <p className="text-secondary small">동국대학교 온라인 LaTeX 편집기</p>
            </div>

            {error && (
                <div className="alert alert-danger py-2 small text-center mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin}>
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

                <button className="btn btn-dgu-primary w-100 py-3 fw-bold" type="submit">
                    로그인
                </button>
            </form>
        </div>
    );
}

export default LoginUI;