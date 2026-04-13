import { useState, useMemo } from 'react';

/**
 * [Hook] 대시보드 로직 관리
 * @param {Array} initialProjects - App에서 주입받는 전체 프로젝트 리스트
 * @param {Function} setSelectedProject - 선택된 프로젝트를 App 상태로 올리는 함수
 */
export const useDashboard = (initialProjects, setSelectedProject) => {
    // 이제 데이터를 직접 가져오지 않고 주입받은 데이터를 초기값으로 씁니다.
    const [projects, setProjects] = useState(initialProjects || []);
    const [activeMenu, setActiveMenu] = useState('all');

    // [1] 필터링 로직
    const filteredProjects = useMemo(() => {
        if (activeMenu === 'mine') return projects.filter(p => p.owner === 'me');
        if (activeMenu === 'shared') return projects.filter(p => p.owner !== 'me');
        return projects;
    }, [projects, activeMenu]);

    // [2] 프로젝트 생성
    const handleCreateProject = () => {
        const title = prompt("새 프로젝트 이름을 입력하세요:");
        if (title) {
            const newProj = {
                id: Date.now(),
                title,
                owner: 'me',
                updated: new Date().toISOString().split('T')[0],
                files: {
                    'main.tex': `\\documentclass{article}\n\\begin{document}\n\\section{${title}}\n새로운 프로젝트가 시작되었습니다.\n\\end{document}`
                }
            };
            setProjects(prev => [newProj, ...prev]);
        }
    };

    // [3] 프로젝트 삭제 (단일/다중 통합)
    const handleDeleteProject = (ids) => {
        const targetIds = Array.isArray(ids) ? ids : [ids];
        setProjects(prev => prev.filter(p => !targetIds.includes(p.id)));
    };

    // [4] 프로젝트 더블클릭 (App의 상태 변경)
    const handleDoubleClick = (project) => {
        setSelectedProject(project);
    };

    return {
        projects: filteredProjects,
        activeMenu,
        setActiveMenu,
        handleCreateProject,
        handleDeleteProject,
        handleDoubleClick
    };
};