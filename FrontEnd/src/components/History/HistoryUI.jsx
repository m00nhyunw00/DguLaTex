import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './HistoryUI.css';
import '../Bar.css';

function HistoryUI({
                       projectName,
                       backToEditor,
                       historyList,
                       selectedHistory,
                       setSelectedHistory,
                       activeFile,
                       activeFileId,
                       setActiveFileId,
                       rollbackProject,
                       rollbackFile
                   }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    const renderHistoryTree = (items, depth = 0) => {
        if (!items || !Array.isArray(items)) return null;
        return items.map(item => (
            <div key={item.id}>
                <div
                    className={`tree-item ${activeFileId === item.id ? 'active' : ''}`}
                    style={{ paddingLeft: `${depth * 15 + 12}px` }}
                    onClick={() => item.type === 'file' && setActiveFileId(item.id)}
                >
                    <span className="me-2">{item.type === 'folder' ? '📁' : '📄'}</span>
                    <span>{item.name}</span>
                </div>
                {item.children && renderHistoryTree(item.children, depth + 1)}
            </div>
        ));
    };

    return (
        <div className="full-layout history-mode" onClick={() => setOpenMenuId(null)}>
            {/* 상단 네비바 */}
            <nav className="navbar navbar-dark top-nav-fixed bg-dark px-3 shadow-sm">
                <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-light nav-back-btn" onClick={backToEditor}>
                        &larr; Back to editor
                    </button>
                    <span className="ms-3 text-white-50 small">| History Mode</span>
                </div>
                <div className="mx-auto text-white fw-bold">{projectName}</div>
                <button className="btn btn-sm btn-success fw-bold" onClick={rollbackFile}>
                    Restore this file
                </button>
            </nav>

            <div className="main-content">
                {/* 1. 왼쪽: 파일 트리 */}
                <aside className="sidebar border-end bg-dark text-white">
                    <div className="p-2 border-bottom small text-white-50 bg-secondary">FILES IN THIS VERSION</div>
                    <div className="file-tree-container py-2">
                        {renderHistoryTree(selectedHistory?.files)}
                    </div>
                </aside>

                {/* 2. 가운데: 에디터 영역 (Read-Only) */}
                <main className="editor-section">
                    <div className="p-2 bg-light border-bottom small d-flex justify-content-between align-items-center">
                        <span>Viewing Version: <strong>{selectedHistory?.time}</strong></span>
                        <span className="badge bg-secondary text-dark px-2 py-1">{activeFile?.name || 'No file selected'}</span>
                    </div>
                    <div className="flex-grow-1" style={{ minHeight: '0' }}>
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            defaultLanguage="latex"
                            value={activeFile?.content || ''}
                            options={{
                                readOnly: true,
                                fontSize: 14,
                                minimap: { enabled: false },
                                automaticLayout: true,
                                scrollBeyondLastLine: false
                            }}
                        />
                    </div>
                </main>

                {/* 3. 오른쪽: 히스토리 리스트 (750px) */}
                <aside className="history-list-side border-start bg-light">
                    <div className="p-3 border-bottom fw-bold text-center bg-white shadow-sm">Recent Activity</div>
                    <div className="history-items-container">
                        {historyList.map(h => (
                            <div
                                key={h.id}
                                className={`history-item p-4 border-bottom ${selectedHistory?.id === h.id ? 'selected' : ''}`}
                                onClick={() => setSelectedHistory(h)}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="d-flex flex-column">
                                        <span className="h6 mb-1 fw-bold">{h.time}</span>
                                        <span className="text-muted small mb-3">{h.changeDesc}</span>

                                        {/* 버전 표시 삭제하고 사용자 정보만 남김 */}
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="user-avatar-rect"></div>
                                            <span className="text-primary fw-bold small">{h.user}</span>
                                        </div>
                                    </div>

                                    <div className="history-menu-container">
                                        <button
                                            className="btn btn-outline-secondary btn-sm border-0 menu-trigger-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === h.id ? null : h.id);
                                            }}
                                        >
                                            <span style={{fontSize: '1.2rem'}}>⋮</span>
                                        </button>
                                        {openMenuId === h.id && (
                                            <div className="history-dropdown shadow-lg border">
                                                <div className="dropdown-item py-2" onClick={() => alert('Downloading...')}>
                                                    📥 Download version
                                                </div>
                                                <div className="dropdown-item py-2 text-danger fw-bold" onClick={() => rollbackProject(h.id)}>
                                                    🔄 Rollback Project
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default HistoryUI;