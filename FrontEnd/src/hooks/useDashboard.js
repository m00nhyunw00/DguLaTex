/**
 * =================================================================
 * [Hook] Dashboard Business Logic Controller
 * 설명: 대시보드 내 프로젝트 목록의 상태 관리 및 비즈니스 로직을 담당
 * 주요 기능: 프로젝트 필터링, 신규 프로젝트 생성, 단일/다중 삭제 및 상세 페이지 진입 제어
 * =================================================================
 */

import { useState, useMemo } from 'react';
// 데이터 소스를 Hook 내부에서 직접 관리하여 실제 API 호출 구조와 통일
import { MOCK_PROJECTS } from '../testdata/projectData.js';

/**
 * @param {Function} setSelectedProject - 선택된 프로젝트를 전역 상태로 승격시키기 위한 핸들러
 */
export const useDashboard = (setSelectedProject) => {

    /* ---------------------------------------------------------
     * SECTION 1: State Definitions
     * --------------------------------------------------------- */

    // 프로젝트 원본 데이터 상태 관리 (MOCK_PROJECTS 직접 참조)
    const [projects, setProjects] = useState(MOCK_PROJECTS || []);

    // 좌측 사이드바 메뉴 선택 상태 ('all' | 'mine' | 'shared')
    const [activeMenu, setActiveMenu] = useState('all');

    /* ---------------------------------------------------------
     * SECTION 2: Filtering Logic (Memoized)
     * 기능: 현재 선택된 메뉴 카테고리에 따라 프로젝트 목록을 동적으로 필터링함
     * 최적화: projects나 activeMenu가 변경될 때만 재계산 수행
     * --------------------------------------------------------- */
    const filteredProjects = useMemo(() => {
        if (activeMenu === 'mine') return projects.filter(p => p.owner === 'me');
        if (activeMenu === 'shared') return projects.filter(p => p.owner !== 'me');
        return projects; // 'all'인 경우 전체 반환
    }, [projects, activeMenu]);

    /* ---------------------------------------------------------
     * SECTION 3: Project CRUD Operations
     * --------------------------------------------------------- */

    /**
     * [CREATE] 신규 프로젝트 생성
     * 기능: 사용자로부터 제목을 입력받아 기본 LaTeX 템플릿을 포함한 새 프로젝트 객체를 생성함
     */
    const handleCreateProject = () => {
        const title = prompt("새 프로젝트 이름을 입력하세요:");
        if (title) {
            const newProj = {
                id: Date.now(),
                title,
                owner: 'me',
                updated: new Date().toISOString().split('T')[0],
                files: [
                    {
                        id: Date.now() + 1,
                        name: 'main.tex',
                        type: 'file',
                        content: `\\documentclass{article}\n\\begin{document}\n\\section{${title}}\n새로운 프로젝트가 시작되었습니다.\n\\end{document}`
                    }
                ]
            };
            setProjects(prev => [newProj, ...prev]); // 최신 프로젝트를 리스트 최상단에 추가
        }
    };

    /**
     * [DELETE] 프로젝트 삭제 (단일 및 다중 통합 처리)
     * 기능: 전달받은 ID 혹은 ID 배열에 해당하는 프로젝트를 목록에서 제거함
     * @param {string|Array} ids - 삭제 대상이 되는 단일 ID 혹은 ID 배열
     */
    const handleDeleteProject = (ids) => {
        const targetIds = Array.isArray(ids) ? ids : [ids];
        setProjects(prev => prev.filter(p => !targetIds.includes(p.id)));
    };

    /* ---------------------------------------------------------
     * SECTION 4: Navigation & Interaction
     * --------------------------------------------------------- */

    /**
     * 프로젝트 상세 진입 (더블 클릭)
     * 기능: 특정 프로젝트 선택 시 상위 App 컴포넌트에 알림으로써 에디터 화면으로 전환을 유도함
     */
    const handleDoubleClick = (project) => {
        setSelectedProject(project);
    };

    /* ---------------------------------------------------------
     * SECTION 5: Public API Export
     * --------------------------------------------------------- */
    return {
        projects: filteredProjects, // 필터링이 완료된 프로젝트 리스트
        activeMenu,
        setActiveMenu,
        handleCreateProject,
        handleDeleteProject,
        handleDoubleClick
    };
};