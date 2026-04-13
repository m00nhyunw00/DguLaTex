import React from 'react';
import EditorUI from '../components/Editor/EditorUI';
import { useEditor } from '../hooks/useEditor';

// props에 goToHistory 추가 (App.jsx에서 내려줌)
function EditorPage({ user, project, handleLogout, backToDashboard, goToHistory }) {
    // 훅 호출
    const {
        files,
        activeFile,
        setActiveFileId,
        onEditorChange,
        handleEditorDidMount,
        insertSnippet,
        editorOptions
    } = useEditor(project.files);

    return (
        <EditorUI
            userName={user.name}
            projectName={project.title}
            handleLogout={handleLogout}
            backToDashboard={backToDashboard}
            goToHistory={goToHistory} // UI로 함수 전달
            files={files}
            activeFile={activeFile}
            setActiveFileId={setActiveFileId}
            onEditorChange={onEditorChange}
            handleEditorDidMount={handleEditorDidMount}
            insertSnippet={insertSnippet}
            editorOptions={editorOptions}
        />
    );
}

export default EditorPage;