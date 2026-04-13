import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage.jsx';
import EditorPage from './pages/EditorPage';
import HistoryPage from './pages/HistoryPage'; // 히스토리 페이지 임포트

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ id: '', name: '' });
    const [selectedProject, setSelectedProject] = useState(null);

    // [추가] 에디터 모드와 히스토리 모드를 구분하는 상태
    // 'editor' 또는 'history' 값을 가집니다.
    const [viewMode, setViewMode] = useState('editor');

    const handleLoginSuccess = (userData) => {
        // userData는 { id: 'dgu', name: '김동국' } 형태
        setUser(userData);
        setIsLoggedIn(true);
    };

    useEffect(() => {
        const handleBack = () => {
            if (selectedProject) {
                // 히스토리 모드에서 뒤로가기 시 에디터로, 에디터에선 대시보드로
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

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({ id: '', name: '' });
        setSelectedProject(null);
        setViewMode('editor'); // 로그아웃 시 모드 초기화
    };

    // 1. 로그인 체크
    if (!isLoggedIn) {
        return <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={handleLoginSuccess} />;
    }

    // 2. 프로젝트 선택 체크 (대시보드)
    if (!selectedProject) {
        return (
            <DashboardPage
                user={user}
                handleLogout={handleLogout}
                setSelectedProject={setSelectedProject}
            />
        );
    }

    // 3. 히스토리 모드 판별
    if (viewMode === 'history') {
        return (
            <HistoryPage
                user={user}
                project={selectedProject}
                backToEditor={() => setViewMode('editor')}
            />
        );
    }

    // 4. 에디터 모드 (기본)
    return (
        <EditorPage
            user={user}
            project={selectedProject}
            handleLogout={handleLogout}
            backToDashboard={() => setSelectedProject(null)}
            goToHistory={() => setViewMode('history')} // 히스토리로 가는 함수 전달
        />
    );
}

export default App;