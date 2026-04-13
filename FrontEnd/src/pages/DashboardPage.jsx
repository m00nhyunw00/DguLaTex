import React from 'react';
import DashboardUI from '../components/Dashboard/DashboardUI';
import { useDashboard } from '../hooks/useDashboard';
// 데이터 임포트 위치를 훅 내부에서 페이지 수준으로 끌어올렸습니다.
import { MOCK_PROJECTS } from '../testdata/projectData.js';

function DashboardPage({ user, handleLogout, setSelectedProject }) {
    // 훅에 데이터와 상태 변경 함수를 주입합니다.
    const dashboardLogic = useDashboard(MOCK_PROJECTS, setSelectedProject);

    return (
        <DashboardUI
            userName={user.name}
            handleLogout={handleLogout}
            {...dashboardLogic}
        />
    );
}

export default DashboardPage;