import React from 'react';
// Monaco Editor: VS Code 기반 웹 에디터 인터페이스 구현을 위한 외부 라이브러리
import Editor from '@monaco-editor/react';
import './EditorPage.css';

/**
 * EditorPage Component
 * @description 로그인 인증 성공 후 진입하는 메인 편집 및 미리보기 대시보드
 * * @param {Object} props
 * @param {string} props.email - 현재 세션 사용자 식별자
 * @param {function} props.handleLogout - 상위 App 컴포넌트의 인증 해제 함수
 * @param {string} props.latexCode - 실시간 편집 중인 LaTeX 원문 데이터
 * @param {function} props.setLatexCode - 에디터 입력값 업데이트용 상태 변경 함수
 */
function EditorPage({ email, handleLogout, latexCode, setLatexCode }) {
    return (
        // 레이아웃 루트 컨테이너 (Viewport 가득 채우기 설정)
        <div className="full-layout">

            {/* Top Navigation Bar: 프로젝트 로고 및 사용자 제어 영역 */}
            <nav className="navbar navbar-dark top-nav shadow-sm">
                <span className="navbar-brand fw-bold">DguLaTeX</span>
                <div className="d-flex align-items-center">
                    {/* 세션 사용자 정보 노출 */}
                    <small className="text-white me-3 opacity-75">{email}님 접속 중</small>

                    {/* 컴파일 실행 버튼: 추후 백엔드 엔진 연동 포인트 */}
                    <button
                        className="btn btn-sm btn-light fw-bold me-2 text-dgu"
                        onClick={() => alert('컴파일 준비 중...')}
                    >
                        컴파일
                    </button>

                    {/* 로그아웃 처리: 호출 시 상위 isLoggedIn 상태 false 전환 */}
                    <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </nav>

            {/* Main Content Area: Flex 기반 3단 레이아웃(Sidebar / Editor / Preview) */}
            <div className="d-flex flex-grow-1 overflow-hidden">

                {/* [좌측] 파일 시스템 사이드바 (File Explorer) */}
                <aside className="sidebar p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold text-muted small">파일 목록</span>
                        {/* 새 리소스 생성 버튼: 인터랙션 구현 예정 */}
                        <button className="btn btn-sm p-0 text-dgu fw-bold" style={{ fontSize: '1.2rem' }}>+</button>
                    </div>
                    {/* Active File Item: 현재 활성화된 파일 표시 */}
                    <div className="p-2 rounded file-item-active small d-flex align-items-center">
                        📄 main.tex
                    </div>
                </aside>

                {/* [중앙] 모나코 에디터 섹션 (Core Editor) */}
                <main className="editor-section">
                    <div className="p-1 px-3 border-bottom small text-muted bg-light">main.tex</div>
                    <div className="flex-grow-1">
                        <Editor
                            height="100%"               // 가용한 최대 높이 점유
                            defaultLanguage="latex"      // LaTeX 문법 하이라이팅 적용
                            theme="light"               // 기본 밝은 테마
                            value={latexCode}           // 상태(State) 기반 데이터 바인딩
                            // 사용자 입력 발생 시 상태 동기화 (One-way Data Flow)
                            onChange={(v) => setLatexCode(v)}
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false }, // 가독성 확보를 위한 미니맵 비활성화
                                wordWrap: 'on'               // 수평 스크롤 방지를 위한 자동 줄바꿈
                            }}
                        />
                    </div>
                </main>

                {/* [우측] 렌더링 미리보기 섹션 (PDF 시뮬레이터) */}
                <section className="preview-section">
                    {/* A4 규격 기반 페이퍼 캔버스 디자인 적용 */}
                    <div className="paper-canvas shadow">
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '2.5rem', color: '#333' }}>DguLaTeX Project</h1>
                            <p className="text-muted">Dongguk University Student</p>
                        </div>

                        <hr className="my-5" />

                        <h5>1. Introduction</h5>
                        <p style={{ lineHeight: '1.8' }}>렌더링 가이드 결과물 출력 영역</p>

                        {/* 실시간 텍스트 매핑: 에디터 입력 데이터를 동적으로 투영 */}
                        <pre className="mt-4 p-3 bg-light border rounded small">
                            {latexCode}
                        </pre>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default EditorPage;