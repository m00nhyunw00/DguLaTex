/**
 * =================================================================
 * [Hook] Editor Business Logic Controller
 * 설명: 메인 에디터 상태 관리 및 프리뷰 액션 제어
 * 수정: 다운로드 로직과 동일한 위계로 오류 확인(onCheckErrors) 핸들러 배치
 * =================================================================
 */

import { useState, useEffect, useRef } from 'react';
import { MOCK_PROJECTS } from '../testdata/projectData.js';

export const useEditor = (projectId) => {
    const initialProject = MOCK_PROJECTS.find(p => p.id === projectId);
    const [files, setFiles] = useState(initialProject?.files || []);
    const [activeFileId, setActiveFileId] = useState('');
    const editorRef = useRef(null);

    // 자동 컴파일 상태 (팝업 없이 토글)
    const [isAutoCompile, setIsAutoCompile] = useState(false);

    // 컨텍스트 메뉴 상태
    const [contextMenu, setContextMenu] = useState({
        visible: false, x: 0, y: 0, targetId: null, targetType: null
    });

    /* ---------------------------------------------------------
     * SECTION: Interaction Handlers (다운로드와 동일 로직 적용)
     * --------------------------------------------------------- */

    /** [ACTION] 자동 컴파일 토글 */
    const toggleAutoCompile = () => setIsAutoCompile(prev => !prev);

    /** [ACTION] 수동 컴파일 실행 */
    const onCompile = () => alert("LaTeX 컴파일을 시작합니다.");

    /** [ACTION] 초록색 버튼: PDF 다운로드 (정상 작동 중) */
    const onDownload = () => alert("PDF 다운로드를 시작합니다.");

    /** [ACTION] 노란색 버튼: 컴파일 에러 확인 (다운로드와 동일 구조) */
    const onCheckErrors = () => alert("컴파일 에러 확인: 현재 발견된 오류가 없습니다.");

    /* ---------------------------------------------------------
     * SECTION: Context Menu & File Logic (생략 없음)
     * --------------------------------------------------------- */
    const handleContextMenu = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ visible: true, x: e.pageX, y: e.pageY, targetId: item.id, targetType: item.type });
    };

    const closeContextMenu = () => setContextMenu(prev => ({ ...prev, visible: false }));

    useEffect(() => {
        const handleClickOutside = () => closeContextMenu();
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handleFileAction = (actionType) => {
        const { targetId } = contextMenu;
        alert(`[${actionType}] 대상 ID: ${targetId}`);
        closeContextMenu();
    };

    /* ---------------------------------------------------------
     * SECTION: Editor Helper Logic
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

    useEffect(() => {
        if (files.length > 0) {
            const firstFile = files.find(f => f.type === 'file');
            if (firstFile) setActiveFileId(firstFile.id);
        }
    }, []);

    const handleEditorDidMount = (editor) => { editorRef.current = editor; };

    const onEditorChange = (value) => {
        if (!activeFileId) return;
        const updateRecursive = (items) => items.map(item => {
            if (item.id === activeFileId) return { ...item, content: value };
            if (item.children) return { ...item, children: updateRecursive(item.children) };
            return item;
        });
        setFiles(prev => updateRecursive(prev));
    };

    return {
        files,
        activeFile,
        setActiveFileId,
        onEditorChange,
        handleEditorDidMount,
        editorOptions: { fontSize: 14, minimap: { enabled: false }, automaticLayout: true },
        contextMenu,
        handleContextMenu,
        handleFileAction,
        isAutoCompile,
        toggleAutoCompile,
        onCompile,
        onDownload,
        onCheckErrors, // 이 값을 PreviewUI가 반드시 받아야 함
        pdfUrl: null,
        currentPage: 1,
        totalPages: 1,
        setPage: () => {}
    };
};