/**
 * =================================================================
 * [Page] History Page Component
 * 설명: 프로젝트의 버전 관리(History) 로직과 전용 인터페이스(UI)를 결합
 * 주요 기능: 프로젝트 ID 기반 히스토리 데이터 로드, 롤백 핸들러 주입 및 뷰 전환 중개
 * =================================================================
 */

import React from 'react';
import HistoryUI from '../components/History/HistoryUI';
import { useHistory } from '../hooks/useHistory';

/**
 * @param {Object} user - 현재 인증된 사용자 정보
 * @param {Object} project - 대시보드 또는 에디터에서 선택된 현재 프로젝트 객체
 * @param {Function} backToEditor - 히스토리 조회를 마치고 에디터로 돌아가는 내비게이션 함수
 */
function HistoryPage({ user, project, backToEditor }) {

    /* ---------------------------------------------------------
     * SECTION 1: History Logic Integration
     * 기능: useHistory 훅을 통해 특정 프로젝트의 시점별 데이터를 로드하고 상태를 관리
     * 비고: project.id를 기반으로 관련 히스토리 셋(Mock/API)을 매칭
     * --------------------------------------------------------- */
    const historyData = useHistory(project.id);

    /* ---------------------------------------------------------
     * SECTION 2: UI View Composition
     * 기능: 가공된 히스토리 상태와 복구 관련 핸들러를 HistoryUI 컴포넌트로 전파
     * --------------------------------------------------------- */
    return (
        <HistoryUI
            projectName={project.title} // 화면 상단에 표시될 프로젝트명
            backToEditor={backToEditor}   // 뒤로가기 액션 연동
            {...historyData}             // historyList, selectedHistory, rollback 함수 등을 일괄 전달
        />
    );
}

export default HistoryPage;