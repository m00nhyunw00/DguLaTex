/**
 * =================================================================
 * [Hook] Editor Business Logic Controller
 * 설명: 메인 에디터의 상태 관리 및 Monaco Editor 인스턴스와의 상호작용을 제어
 * 주요 기능: 파일 트리 내 객체 탐색, 실시간 코드 동기화, 에디터 명령(스니펫 삽입) 및 설정 관리
 * =================================================================
 */

import { useState, useEffect, useRef } from 'react';
import { MOCK_PROJECTS } from '../testdata/projectData.js';

/**
 * @param {string} projectId - 편집할 프로젝트의 고유 식별자
 */
export const useEditor = (projectId) => {

    /* ---------------------------------------------------------
     * SECTION 1: State & Ref Definitions
     * --------------------------------------------------------- */

    // 프로젝트 리스트에서 해당 ID의 파일을 찾아 초기 상태로 설정
    const initialProject = MOCK_PROJECTS.find(p => p.id === projectId);
    const [files, setFiles] = useState(initialProject?.files || []);

    // 현재 에디터 화면에 렌더링 중인 파일의 고유 ID
    const [activeFileId, setActiveFileId] = useState('');

    // Monaco Editor 인스턴스 참조 변수
    const editorRef = useRef(null);

    /* ---------------------------------------------------------
     * SECTION 2: Data Navigation (Recursive)
     * --------------------------------------------------------- */

    const findFileById = (items, id) => {
        if (!items || !Array.isArray(items)) return null;
        for (const item of items) {
            if (item.id === id) return item;
            if (item.children) {
                const found = findFileById(item.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const activeFile = findFileById(files, activeFileId);

    /* ---------------------------------------------------------
     * SECTION 3: Initialization
     * --------------------------------------------------------- */

    useEffect(() => {
        if (files.length > 0) {
            const firstFile = files.find(f => f.type === 'file');
            if (firstFile) setActiveFileId(firstFile.id);
        }
    }, []);

    /* ---------------------------------------------------------
     * SECTION 4: Monaco Editor Integrations
     * --------------------------------------------------------- */

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const insertSnippet = (snippet) => {
        if (!editorRef.current) return;
        const editor = editorRef.current;
        const selection = editor.getSelection();
        const model = editor.getModel();
        const selectedText = model.getValueInRange(selection);
        const newText = snippet.replace('${selected}', selectedText);

        editor.executeEdits('snippet', [{
            range: selection,
            text: newText,
            forceMoveMarkers: true
        }]);
        editor.focus();
    };

    const onEditorChange = (value) => {
        if (!activeFileId) return;
        const updateRecursive = (items) => items.map(item => {
            if (item.id === activeFileId) return { ...item, content: value };
            if (item.children) return { ...item, children: updateRecursive(item.children) };
            return item;
        });
        setFiles(prev => updateRecursive(prev));
    };

    /* ---------------------------------------------------------
     * SECTION 5: Editor Configurations
     * --------------------------------------------------------- */
    const editorOptions = {
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        smoothScrolling: true,
    };

    return {
        files,
        activeFile,
        setActiveFileId,
        onEditorChange,
        handleEditorDidMount,
        insertSnippet,
        editorOptions,
        // PDF 관련 인터페이스 (추후 로직 추가용)
        pdfUrl: null,
        isAutoCompile: false,
        toggleAutoCompile: () => {},
        onCompile: () => {},
        onDownload: () => {},
        currentPage: 1,
        totalPages: 1,
        setPage: () => {}
    };
};