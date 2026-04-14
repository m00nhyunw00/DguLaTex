/**
 * =================================================================
 * [Component] History UI View (Final Orchestrator)
 * 설명: 히스토리 화면의 4대 영역(Nav, Tree, Editor, List)을 최종 조립
 * 수정 사항: 모든 하위 구역을 독립 컴포넌트로 분리하여 구조적 완결성 확보
 * =================================================================
 */

import React from 'react';
import HistoryFileTreeUI from './Section/HistoryFileTreeUI.jsx';
import HistoryEditorUI from './Section/HistoryEditorUI.jsx';
import HistoryListUI from './Section/HistoryListUI.jsx';
import './HistoryUI.css';
import '../Common.css';

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
    return (
        <div className="full-layout history-mode">

            {/* SECTION 1: Top Navigation Bar */}
            <nav className="navbar navbar-dark top-nav-fixed shadow-sm">
                <div className="d-flex align-items-center">
                    <button className="btn btn-sm nav-back-btn" onClick={backToEditor}>
                        <span className="nav-arrow">&larr;</span>
                    </button>
                    <div className="project-title-divider">
                        {projectName}
                    </div>
                </div>

                <div className="ms-auto d-flex align-items-center gap-3">
                    <button className="btn btn-sm btn-restore-main fw-bold" onClick={rollbackFile}>
                        Restore this file
                    </button>
                </div>
            </nav>

            <div className="main-content">
                {/* SECTION 2: Left Sidebar Area */}
                <HistoryFileTreeUI
                    files={selectedHistory?.files}
                    activeFileId={activeFileId}
                    setActiveFileId={setActiveFileId}
                />

                {/* SECTION 3: Central Editor Area */}
                <HistoryEditorUI
                    selectedHistory={selectedHistory}
                    activeFile={activeFile}
                />

                {/* SECTION 4: Right History List Area */}
                <HistoryListUI
                    historyList={historyList}
                    selectedHistory={selectedHistory}
                    setSelectedHistory={setSelectedHistory}
                    rollbackProject={rollbackProject}
                />
            </div>
        </div>
    );
}

export default HistoryUI;