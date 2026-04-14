/**
 * =================================================================
 * [Layout] Editor Layout Component
 * 주요 수정: PreviewUI에 onDownload와 동일한 위계로 onCheckErrors 전달
 * =================================================================
 */

import React from 'react';
import FileTreeUI from './Section/FileTreeUI.jsx';
import MonacoEditorUI from './Section/MonacoEditorUI.jsx';
import PreviewUI from './Section/PreviewUI.jsx';
import './EditorUI.css';
import '../Common.css';

function EditorUI(props) {
    const { contextMenu, handleFileAction } = props;

    return (
        <div className="full-layout">
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
                    <button className="btn btn-sm btn-outline-light px-3" onClick={props.handleLogout}>
                        로그아웃
                    </button>
                </div>
            </nav>

            <div className="main-content">
                <FileTreeUI
                    files={props.files}
                    activeFileId={props.activeFile?.id}
                    setActiveFileId={props.setActiveFileId}
                    handleContextMenu={props.handleContextMenu}
                />

                <MonacoEditorUI
                    activeFile={props.activeFile}
                    onEditorChange={props.onEditorChange}
                    handleEditorDidMount={props.handleEditorDidMount}
                    editorOptions={props.editorOptions}
                />

                {/* ---------------------------------------------------------
                 * 프리뷰 섹션 (여기에 모든 버튼 핸들러가 집결됨)
                 * --------------------------------------------------------- */}
                <PreviewUI
                    pdfUrl={props.pdfUrl}
                    isAutoCompile={props.isAutoCompile}
                    toggleAutoCompile={props.toggleAutoCompile}
                    onCompile={props.onCompile}      // [파란버튼]
                    onDownload={props.onDownload}    // [초록버튼] - 작동 중
                    onCheckErrors={props.onCheckErrors} // [노란버튼] - 다운로드와 동일하게 주입
                    currentPage={props.currentPage}
                    totalPages={props.totalPages}
                    setPage={props.setPage}
                />
            </div>

            {/* 우클릭 메뉴 생략 없음 */}
            {contextMenu.visible && (
                <div
                    className="editor-context-menu shadow-lg"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="menu-item" onClick={() => handleFileAction('rename')}>이름 바꾸기</div>
                    {contextMenu.targetType === 'file' && (
                        <>
                            <div className="menu-item" onClick={() => handleFileAction('download')}>다운로드</div>
                            <div className="menu-item fw-bold text-primary" onClick={() => handleFileAction('setMain')}>Set as main document</div>
                        </>
                    )}
                    <div className="menu-item text-danger" onClick={() => handleFileAction('delete')}>삭제</div>
                    <div className="menu-divider"></div>
                    <div className="menu-item" onClick={() => handleFileAction('newFile')}>새로운 파일</div>
                    <div className="menu-item" onClick={() => handleFileAction('newFolder')}>새로운 폴더</div>
                    <div className="menu-item" onClick={() => handleFileAction('upload')}>업로드</div>
                </div>
            )}
        </div>
    );
}

export default EditorUI;