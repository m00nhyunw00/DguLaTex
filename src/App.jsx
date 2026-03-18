import { useState } from 'react';
// 부트스트랩 디자인 라이브러리
import 'bootstrap/dist/css/bootstrap.min.css';
// 우리가 만든 커스텀 스타일
import './App.css';
// VS Code급 에디터 컴포넌트
import Editor from '@monaco-editor/react';

function App() {
    /* -----------------------------------------------------------
       1. 상태(State) 관리: 값이 변하면 화면이 자동으로 바뀝니다.
       ----------------------------------------------------------- */
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [email, setEmail] = useState('');              // 입력한 아이디
    const [password, setPassword] = useState('');        // 입력한 비밀번호
    const [error, setError] = useState('');              // 에러 메시지
    const [latexCode, setLatexCode] = useState(          // 에디터 코드 내용
        '\\documentclass{article}\n\\begin{document}\nHello DguLaTeX!\n\\end{document}'
    );

    /* -----------------------------------------------------------
       2. 이벤트 처리 함수: 버튼 클릭 등의 동작을 정의합니다.
       ----------------------------------------------------------- */

    // 로그인 시도 시 실행되는 함수
    const handleLogin = (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        // 간단한 아이디/비밀번호 체크 로직
        if (email === 'dgu' && password === '1234') {
            setIsLoggedIn(true);
            setError(''); // 성공 시 에러 문구 삭제
        } else {
            setIsLoggedIn(false);
            setError('아이디 또는 비밀번호가 잘못되었습니다.'); // 실패 시 문구 출력
        }
    };

    // 로그아웃 시 실행되는 함수
    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
        setError(''); // 로그아웃 시 모든 데이터 초기화
    };

    /* -----------------------------------------------------------
       3. 화면 구성(Rendering): 조건에 따라 다른 화면을 보여줍니다.
       ----------------------------------------------------------- */

    // [A] 로그인 성공: 편집기(메인) 화면
    if (isLoggedIn) {
        return (
            <div className="full-layout">
                {/* 상단바 */}
                <nav className="navbar navbar-dark top-nav shadow-sm">
                    <span className="navbar-brand fw-bold">DguLaTeX</span>
                    <div className="d-flex align-items-center">
                        <small className="text-white me-3 opacity-75">{email}님 접속 중</small>
                        {/* 컴파일 버튼: 주황색 포인트 디자인 */}
                        <button className="btn btn-sm btn-light fw-bold me-2 text-dgu" onClick={() => alert('컴파일 준비 중...')}>
                            컴파일
                        </button>
                        <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </div>
                </nav>

                {/* 메인 3분할 영역 */}
                <div className="d-flex flex-grow-1 overflow-hidden">

                    {/* 왼쪽: 파일 사이드바 */}
                    <aside className="sidebar p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fw-bold text-muted small">파일 목록</span>
                            <button className="btn btn-sm p-0 text-dgu fw-bold" style={{ fontSize: '1.2rem' }}>+</button>
                        </div>
                        {/* 현재 열린 파일 표시 */}
                        <div className="p-2 rounded file-item-active small d-flex align-items-center">
                            📄 main.tex
                        </div>
                    </aside>

                    {/* 중앙: 모나코 에디터 영역 */}
                    <main className="editor-section">
                        <div className="p-1 px-3 border-bottom small text-muted bg-light">main.tex</div>
                        <div className="flex-grow-1">
                            <Editor
                                height="100%"
                                defaultLanguage="latex"
                                theme="light"
                                value={latexCode}
                                onChange={(v) => setLatexCode(v)} // 타이핑할 때마다 latexCode 업데이트
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    wordWrap: 'on'
                                }}
                            />
                        </div>
                    </main>

                    {/* 오른쪽: 결과 미리보기 (PDF 시뮬레이션) */}
                    <section className="preview-section">
                        <div className="paper-canvas shadow">
                            {/*<div style={{ textAlign: 'center' }}>*/}
                            {/*    <h1 style={{ fontSize: '2.5rem', color: '#333' }}>DguLaTeX Project</h1>*/}
                            {/*    <p className="text-muted">Dongguk University Student</p>*/}
                            {/*</div>*/}
                            {/*<hr className="my-5" />*/}
                            <p style={{ lineHeight: '1.8' }}>
                                이곳은 결과물이 출력되는 미리보기 창입니다.
                                현재 에디터에 작성된 내용은 다음과 같습니다:
                            </p>
                            {/* 에디터 내용을 실시간으로 보여주는 박스 */}
                            <pre className="mt-4 p-3 bg-light border rounded small">
                                {latexCode}
                            </pre>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    // [B] 로그인 전: 로그인 카드 화면
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light w-100">
            <div className="card p-4 shadow-sm border-0" style={{ width: '360px' }}>
                <h2 className="text-center mb-4 fw-bold text-dgu">DguLaTeX</h2>

                {/* 에러 발생 시에만 보여주는 경고 박스 */}
                {error && (
                    <div className="alert alert-danger p-2 small text-center mb-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    {/* 아이디 입력칸 */}
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">아이디</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="아이디를 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* 비밀번호 입력칸 */}
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="비밀번호를 입력하세요"
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

export default App;