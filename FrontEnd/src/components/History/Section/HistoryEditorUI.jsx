/**
 * =================================================================
 * [View] History Editor UI Component
 * 설명: 히스토리 모드에서 과거 시점의 코드를 시각화하는 조회 전용 영역임.
 * 주요 기능: Read-only 에디터 렌더링 및 현재 조회 중인 버전 정보 표시.
 * =================================================================
 */

import React from 'react';
import Editor from '@monaco-editor/react';

/**
 * @param {Object} selectedHistory - 현재 선택된 히스토리 버전 객체
 * @param {Object} activeFile - 현재 뷰어에 표시 중인 파일 객체
 */
function HistoryEditorUI({ selectedHistory, activeFile }) {
    return (
        <main className="editor-section bg-white">
            {/* ---------------------------------------------------------
             * SECTION 1: Version Info Toolbar
             * --------------------------------------------------------- */}
            <div className="p-2 bg-light border-bottom small d-flex justify-content-between align-items-center">
                <span>Viewing Version: <strong>{selectedHistory?.time}</strong></span>
                <span className="badge bg-secondary text-dark px-2 py-1">
                    {activeFile?.name || 'No file selected'}
                </span>
            </div>

            {/* ---------------------------------------------------------
             * SECTION 2: Read-only Editor Engine
             * --------------------------------------------------------- */}
            <div className="flex-grow-1">
                <Editor
                    height="100%"
                    theme="vs"
                    defaultLanguage="latex"
                    value={activeFile?.content || ''}
                    options={{
                        readOnly: true, // 과거 데이터 수정을 방지하는 핵심 옵션
                        fontSize: 14,
                        minimap: { enabled: false },
                        automaticLayout: true,
                        scrollBeyondLastLine: false
                    }}
                />
            </div>
        </main>
    );
}

export default HistoryEditorUI;