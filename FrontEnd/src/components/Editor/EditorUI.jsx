import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './EditorUI.css';
import '../Bar.css';

function EditorUI({
                      userName,
                      projectName,
                      handleLogout,
                      backToDashboard,
                      goToHistory,
                      files,
                      activeFile,
                      setActiveFileId,
                      onEditorChange,
                      handleEditorDidMount,
                      insertSnippet,
                      editorOptions
                  }) {
    // 우클릭 컨텍스트 메뉴 상태
    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, target: null });

    // 우클릭 이벤트 핸들러
    const handleContextMenu = (e, item) => {
        e.preventDefault();
        // 브라우저 기본 메뉴 방지 및 커스텀 메뉴 위치 설정
        setContextMenu({ show: true, x: e.pageX, y: e.pageY, target: item });
    };

    // 파일 트리 재귀 렌더링 함수
    const renderTree = (items, depth = 0) => {
        if (!items || !Array.isArray(items)) return null;
        return items.map(item => (
            <div key={item.id}>
                <div
                    className={`tree-item ${activeFile?.id === item.id ? 'active' : ''}`}
                    style={{ paddingLeft: `${depth * 15 + 12}px` }}
                    onClick={() => item.type === 'file' && setActiveFileId(item.id)}
                    onContextMenu={(e) => handleContextMenu(e, item)}
                >
                    <span className="me-2">{item.type === 'folder' ? '📁' : '📄'}</span>
                    <span>{item.name}</span>
                </div>
                {item.children && renderTree(item.children, depth + 1)}
            </div>
        ));
    };

    return (
        <div className="full-layout" onClick={() => setContextMenu({ ...contextMenu, show: false })}>
            {/* 상단 네비바 */}
            <nav className="navbar navbar-dark top-nav-fixed">
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-link nav-back-btn text-decoration-none p-0 me-3"
                        onClick={backToDashboard}
                        style={{ border: 'none', boxShadow: 'none' }}
                    >
                        <span style={{ fontSize: '1.2rem', textDecoration: 'none', display: 'inline-block' }}>&larr;</span>
                    </button>
                    <span className="navbar-brand fw-bold text-dgu m-0">DguLaTeX</span>
                    <span className="ms-3 text-white-50 small d-none d-md-inline">| {projectName}</span>
                </div>

                <div className="ms-auto d-flex align-items-center gap-3">
                    <button className="btn btn-sm btn-outline-light" onClick={goToHistory}>📜 히스토리</button>
                    <span className="text-white small">
                        <strong className="text-dgu" style={{ color: 'var(--dgu-orange)' }}>{userName}</strong>님 접속 중
                    </span>
                    <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>로그아웃</button>
                </div>
            </nav>

            <div className="main-content">
                {/* 1. 왼쪽 사이드바: 파일 트리 */}
                <aside className="sidebar">
                    <div className="sidebar-header p-2 border-bottom d-flex gap-2 bg-light">
                        <button className="btn btn-xs btn-outline-secondary" title="New File" onClick={() => alert('New File')}>📄+</button>
                        <button className="btn btn-xs btn-outline-secondary" title="New Folder" onClick={() => alert('New Folder')}>📁+</button>
                        <button className="btn btn-xs btn-outline-secondary" title="Upload" onClick={() => alert('Upload')}>⬆️</button>
                    </div>
                    <div className="file-tree-container py-2">
                        {renderTree(files)}
                    </div>
                </aside>

                {/* 2. 중앙: 에디터 섹션 */}
                <main className="editor-section">
                    <div className="editor-toolbar p-1 bg-light border-bottom d-flex gap-1 align-items-center">
                        <div className="dropdown">
                            <button className="btn btn-sm btn-light border dropdown-toggle" data-bs-toggle="dropdown">Insert</button>
                            <ul className="dropdown-menu shadow">
                                <li className="dropdown-item" onClick={() => insertSnippet('\\begin{equation}\n  ${selected}\n\\end{equation}')}>수식 (Equation)</li>
                                <li className="dropdown-item" onClick={() => insertSnippet('\\begin{figure}\n  \\centering\n  \\caption{${selected}}\n\\end{figure}')}>그림 (Figure)</li>
                                <li className="dropdown-item" onClick={() => insertSnippet('\\tableofcontents')}>목차 (TOC)</li>
                            </ul>
                        </div>
                        <button className="btn btn-sm btn-light border" onClick={() => insertSnippet('\\textbf{${selected}}')}><b>B</b></button>
                        <button className="btn btn-sm btn-light border" onClick={() => insertSnippet('\\textit{${selected}}')}><i>I</i></button>
                    </div>
                    <div className="flex-grow-1" style={{ minHeight: '0' }}>
                        {activeFile ? (
                            <Editor
                                height="100%"
                                theme="light"
                                defaultLanguage="latex"
                                value={activeFile.content}
                                onMount={handleEditorDidMount}
                                onChange={onEditorChange}
                                options={editorOptions}
                            />
                        ) : (
                            <div className="p-5 text-center text-muted">파일을 선택해주세요.</div>
                        )}
                    </div>
                </main>

                {/* 3. 오른쪽: PDF 미리보기 */}
                <section className="preview-section">
                    <div className="preview-toolbar p-2 bg-dark d-flex align-items-center gap-2">
                        <button className="btn btn-sm btn-success fw-bold px-3">▶ 컴파일</button>
                        <div className="form-check form-switch text-white small m-0">
                            <input className="form-check-input" type="checkbox" id="autoCheck" />
                            <label className="form-check-label" htmlFor="autoCheck">Auto</label>
                        </div>
                    </div>
                    <div className="pdf-viewer">
                        <div className="paper-page shadow mx-auto bg-white p-5" style={{ width: '100%', minHeight: '100%' }}>
                            <h5 className="fw-bold border-bottom pb-2">미리보기: {activeFile?.name || ''}</h5>
                            <pre className="mt-4" style={{ whiteSpace: 'pre-wrap', fontFamily: 'serif', fontSize: '0.95rem' }}>
                                {activeFile?.content || '선택된 파일 내용이 없습니다.'}
                            </pre>
                        </div>
                    </div>
                </section>
            </div>

            {/* [수정 및 강화] 커스텀 컨텍스트 메뉴 */}
            {contextMenu.show && (
                <div className="context-menu shadow border" style={{ top: contextMenu.y, left: contextMenu.x }}>
                    {/* 공통 메뉴 */}
                    <div className="menu-item" onClick={() => alert(`${contextMenu.target.name} 이름 변경`)}>이름 변경</div>

                    {/* 파일 전용 메뉴 */}
                    {contextMenu.target?.type === 'file' && (
                        <>
                            <div className="menu-item" onClick={() => alert(`${contextMenu.target.name} 다운로드`)}>다운로드</div>
                            <div className="menu-item" onClick={() => alert(`${contextMenu.target.name}을 메인 문서로 설정`)}>Set as main document</div>
                        </>
                    )}

                    {/* 공통 삭제 */}
                    <div className="menu-item text-danger border-bottom" onClick={() => alert(`${contextMenu.target.name} 삭제`)}>삭제</div>

                    {/* 하단 추가 메뉴 (오버리프 스타일) */}
                    <div className="menu-item" onClick={() => alert('새 파일 생성')}>새 파일</div>
                    <div className="menu-item" onClick={() => alert('새 폴더 생성')}>새 폴더</div>
                    <div className="menu-item" onClick={() => alert('파일 업로드')}>업로드</div>
                </div>
            )}
        </div>
    );
}

export default EditorUI;