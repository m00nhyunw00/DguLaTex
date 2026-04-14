/**
 * =================================================================
 * [Root] Main Application Component
 * 설명: 어플리케이션의 최상위 엔트리 포인트로, 전역 상태 및 라우팅을 제어함.
 * 주요 기능: 사용자 인증 상태 관리, 조건부 렌더링을 통한 페이지 전환 제어.
 * =================================================================
 */

import React, { useState, useEffect } from 'react';

/* ---------------------------------------------------------
 * SECTION 1: Page Imports (Path Correction)
 * [시정] 디렉토리 구조 이미지에 맞춰 확장자와 경로를 엄격히 통일함.
 * --------------------------------------------------------- */
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EditorPage from './pages/EditorPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';

function App() {
    /* ---------------------------------------------------------
     * SECTION 2: Global State Management
     * --------------------------------------------------------- */
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ id: '', name: '' });
    const [selectedProject, setSelectedProject] = useState(null);
    const [viewMode, setViewMode] = useState('editor');

    /* ---------------------------------------------------------
     * SECTION 3: Logic Handlers
     * --------------------------------------------------------- */

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({ id: '', name: '' });
        setSelectedProject(null);
        setViewMode('editor');
    };

    /* ---------------------------------------------------------
     * SECTION 4: Navigation Control (popstate)
     * --------------------------------------------------------- */
    useEffect(() => {
        const handleBack = () => {
            if (selectedProject) {
                if (viewMode === 'history') {
                    setViewMode('editor');
                } else {
                    setSelectedProject(null);
                }
            }
        };

        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', handleBack);

        return () => window.removeEventListener('popstate', handleBack);
    }, [selectedProject, viewMode]);

    /* ---------------------------------------------------------
     * SECTION 5: Conditional Rendering (Routing)
     * --------------------------------------------------------- */

    // 1. 미인증 상태
    if (!isLoggedIn) {
        return <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={handleLoginSuccess} />;
    }

    // 2. 대시보드 (프로젝트 미선택)
    if (!selectedProject) {
        return (
            <DashboardPage
                user={user}
                handleLogout={handleLogout}
                setSelectedProject={setSelectedProject}
            />
        );
    }

    // 3. 프로젝트 상세 - 히스토리 모드
    if (viewMode === 'history') {
        return (
            <HistoryPage
                user={user}
                project={selectedProject}
                backToEditor={() => setViewMode('editor')}
            />
        );
    }

    // 4. 프로젝트 상세 - 에디터 모드 (Default)
    return (
        <EditorPage
            user={user}
            project={selectedProject}
            handleLogout={handleLogout}
            backToDashboard={() => setSelectedProject(null)}
            goToHistory={() => setViewMode('history')}
        />
    );
}

export default App;