/**
 * =================================================================
 * [Page] Editor Page Component
 * 설명: 온라인 편집기의 메인 비즈니스 로직(Hook)과 사용자 인터페이스(UI)를 결합
 * 주요 기능: 프로젝트 ID 기반 데이터 로드, 에디터 상태 관리 연동 및 화면 전환 액션 중개
 * =================================================================
 */

import React from 'react';
import EditorUI from '../components/Editor/EditorUI';
import { useEditor } from '../hooks/useEditor';

/**
 * @param {Object} user - 현재 인증된 사용자 정보
 * @param {Object} project - 대시보드에서 선택된 프로젝트 정보
 * @param {Function} handleLogout - 로그아웃 처리 핸들러
 * @param {Function} backToDashboard - 대시보드 복귀 함수
 * @param {Function} goToHistory - 히스토리 화면 이동 함수
 */
function EditorPage({ user, project, handleLogout, backToDashboard, goToHistory }) {

    /* ---------------------------------------------------------
     * SECTION 1: Editor Logic Integration
     * 기능: useEditor 훅에 프로젝트 ID를 전달하여 데이터 획득 및 로직 인스턴스화
     * 비고: 데이터 로직이 훅 내부로 이동하여 페이지 코드의 가독성 향상
     * --------------------------------------------------------- */
    const editorLogic = useEditor(project.id);

    /* ---------------------------------------------------------
     * SECTION 2: UI View Composition
     * 기능: 가공된 에디터 상태와 외부 핸들러를 UI 레이아웃으로 전달
     * --------------------------------------------------------- */
    return (
        <EditorUI
            userName={user.name}
            projectName={project.title}
            handleLogout={handleLogout}
            backToDashboard={backToDashboard}
            goToHistory={goToHistory}
            {...editorLogic} // 훅에서 반환된 모든 상태와 제어 함수 전달
        />
    );
}

export default EditorPage;