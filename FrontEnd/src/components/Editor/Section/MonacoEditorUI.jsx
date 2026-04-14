/**
 * =================================================================
 * [View] Monaco Editor UI Component
 * 설명: 에디터 화면의 중앙 영역으로, 실제 코드 편집 엔진과 편집 도구를 관리
 * =================================================================
 */

import React from 'react';
import Editor from '@monaco-editor/react';

/**
 * @param {Object} activeFile - 현재 활성화된 파일 객체
 * @param {Function} onEditorChange - 에디터 내용 변경 핸들러
 * @param {Function} handleEditorDidMount - 에디터 마운트 콜백
 * @param {Function} insertSnippet - 코드 삽입 함수
 * @param {Object} editorOptions - Monaco 에디터 설정 객체
 */
function MonacoEditorUI({
                            activeFile,
                            onEditorChange,
                            handleEditorDidMount,
                            insertSnippet,
                            editorOptions
                        }) {
    return (
        <main className="editor-section">
            {/* ---------------------------------------------------------
             * SECTION 1: Editor Toolbar
             * 기능: 자주 사용하는 LaTeX 문법을 즉시 삽입하는 버튼 모음
             * --------------------------------------------------------- */}
            <div className="editor-toolbar border-bottom p-1 d-flex gap-1">
                <button className="btn btn-sm btn-white border" onClick={() => insertSnippet('\\textbf{${selected}}')}><b>B</b></button>
                <button className="btn btn-sm btn-white border" onClick={() => insertSnippet('\\textit{${selected}}')}><i>I</i></button>
                <button className="btn btn-sm btn-white border" onClick={() => insertSnippet('\\section{${selected}}')}>Section</button>
            </div>

            {/* ---------------------------------------------------------
             * SECTION 2: Editor Instance
             * 기능: Monaco Editor 코어 엔진 렌더링
             * --------------------------------------------------------- */}
            <div className="editor-wrapper-inner">
                <Editor
                    height="100%"
                    theme="vs" // 화이트 테마 유지
                    defaultLanguage="latex"
                    value={activeFile?.content || ''}
                    onChange={onEditorChange}
                    onMount={handleEditorDidMount}
                    options={{
                        ...editorOptions,
                        minimap: { enabled: true },
                        fontSize: 14,
                        renderLineHighlight: 'all',
                        backgroundColor: '#ffffff'
                    }}
                />
            </div>
        </main>
    );
}

export default MonacoEditorUI;