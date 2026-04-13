import { useState, useEffect, useRef } from 'react';

export const useEditor = (initialFiles) => {
    // [상태] 트리 구조 파일 리스트
    const [files, setFiles] = useState(Array.isArray(initialFiles) ? initialFiles : []);
    const [activeFileId, setActiveFileId] = useState('');
    const editorRef = useRef(null);

    // [Helper] 트리에서 ID로 파일 객체 찾기 (재귀)
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

    // 현재 활성화된 파일 객체 계산
    const activeFile = findFileById(files, activeFileId);

    // 프로젝트 전환 시 데이터 초기화
    useEffect(() => {
        if (Array.isArray(initialFiles) && initialFiles.length > 0) {
            setFiles(initialFiles);
            // 첫 번째 파일(type: 'file')을 기본 선택
            const firstFile = initialFiles.find(f => f.type === 'file');
            if (firstFile) {
                setActiveFileId(firstFile.id);
            }
        }
    }, [initialFiles]);

    // 모나코 에디터 마운트 시 인스턴스 저장
    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    // 코드 스니펫 삽입 (Overleaf 툴바 기능용)
    const insertSnippet = (snippet) => {
        if (!editorRef.current) return;
        const editor = editorRef.current;
        const selection = editor.getSelection();
        const model = editor.getModel();
        const selectedText = model.getValueInRange(selection);

        // ${selected}를 드래그한 텍스트로 치환
        const newText = snippet.replace('${selected}', selectedText);

        editor.executeEdits('snippet', [{
            range: selection,
            text: newText,
            forceMoveMarkers: true
        }]);
        editor.focus();
    };

    // 에디터 내용 변경 시 트리 구조 상태 업데이트
    const onEditorChange = (value) => {
        if (!activeFileId) return;

        const updateRecursive = (items) => items.map(item => {
            if (item.id === activeFileId) return { ...item, content: value };
            if (item.children) return { ...item, children: updateRecursive(item.children) };
            return item;
        });

        setFiles(prev => updateRecursive(prev));
    };

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
        editorOptions
    };
};