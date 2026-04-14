/**
 * =================================================================
 * [Layout] Editor Layout Component
 * 설명: 에디터 화면의 4대 핵심 섹션(Nav, Tree, Monaco, Preview)을 조립
 * 수정 사항: 중앙 에디터 로직을 MonacoEditorUI로 분리하여 컴포넌트 구조 최적화
 * =================================================================
 */

import React from 'react';
import FileTreeUI from './Section/FileTreeUI.jsx';
import MonacoEditorUI from './Section/MonacoEditorUI.jsx'; // [신규] 분리된 에디터 UI
import PreviewUI from './Section/PreviewUI.jsx';
import './EditorUI.css';
import '../Common.css';

function EditorUI(props) {
    return (
        <div className="full-layout">
            {/* ---------------------------------------------------------
             * SECTION 1: Top Navigation Bar
             * --------------------------------------------------------- */}
            <nav className="navbar navbar-dark top-nav-fixed shadow-sm">
                <div className="d-flex align-items-center">
                    <button className="btn btn-sm nav-back-btn" onClick={props.backToDashboard}>
                        <span className="nav-arrow">&larr;</span>
                    </button>
                    <div className="project-title-divider">
                        {props.projectName}
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3 ms-auto">
                    <button className="btn btn-sm btn-history-custom px-3 py-1 fw-bold" onClick={props.goToHistory}>
                        🕒 History
                    </button>
                    <span className="text-white-50 small">
                        <strong className="text-dgu">{props.userName}</strong>님
                    </span>
                    <button className="btn btn-sm btn-logout-custom px-3 fw-bold" onClick={props.handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="main-content">
                {/* SECTION 2: Left Sidebar (File Tree) */}
                <FileTreeUI
                    files={props.files}
                    activeFileId={props.activeFile?.id}
                    setActiveFileId={props.setActiveFileId}
                />

                {/* SECTION 3: Central Editor Area */}
                <MonacoEditorUI
                    activeFile={props.activeFile}
                    onEditorChange={props.onEditorChange}
                    handleEditorDidMount={props.handleEditorDidMount}
                    insertSnippet={props.insertSnippet}
                    editorOptions={props.editorOptions}
                />

                {/* SECTION 4: Right Preview Area */}
                <PreviewUI
                    pdfUrl={props.pdfUrl}
                    isAutoCompile={props.isAutoCompile}
                    toggleAutoCompile={props.toggleAutoCompile}
                    onCompile={props.onCompile}
                    onDownload={props.onDownload}
                    currentPage={props.currentPage}
                    totalPages={props.totalPages}
                    setPage={props.setPage}
                />
            </div>
        </div>
    );
}

export default EditorUI;