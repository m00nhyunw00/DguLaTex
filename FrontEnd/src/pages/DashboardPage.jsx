/**
 * =================================================================
 * [Page] Dashboard Page Component
 * 설명: 대시보드 비즈니스 로직(Hook)과 시각적 요소(UI)를 결합하는 페이지 컴포넌트
 * 주요 기능: 프로젝트 원본 데이터 주입, 사용자 정보 전달 및 서비스 전역 상태(프로젝트 선택) 연동
 * =================================================================
 */

import React from 'react';
import DashboardUI from '../components/Dashboard/DashboardUI';
import { useDashboard } from '../hooks/useDashboard';

/**
 * @param {Object} user - 현재 인증된 사용자 정보 (이름, 아이디 등)
 * @param {Function} handleLogout - 로그아웃 처리를 위한 전역 핸들러
 * @param {Function} setSelectedProject - 특정 프로젝트 진입 시 App 수준에서 상태를 변경하기 위한 함수
 */
function DashboardPage({ user, handleLogout, setSelectedProject }) {

    /* ---------------------------------------------------------
     * SECTION 1: Business Logic Integration
     * 기능: useDashboard 훅을 통해 대시보드 운영 로직 인스턴스 생성
     * 비고: 데이터 획득 로직은 훅 내부로 캡슐화됨
     * --------------------------------------------------------- */
    const dashboardLogic = useDashboard(setSelectedProject);

    /* ---------------------------------------------------------
     * SECTION 2: UI Composition
     * 기능: 가공된 데이터와 로직 핸들러를 DashboardUI 컴포넌트로 전파
     * --------------------------------------------------------- */
    return (
        <DashboardUI
            userName={user.name}            // 사용자 이름 시각화용
            handleLogout={handleLogout}     // 로그아웃 액션 연동
            {...dashboardLogic}             // projects, filters, CRUD 핸들러 일괄 전달
        />
    );
}

export default DashboardPage;