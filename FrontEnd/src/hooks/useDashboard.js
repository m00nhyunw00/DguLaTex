/**
 * =================================================================
 * [Hook] Dashboard Business Logic Controller
 * 설명: 대시보드 내 프로젝트 목록 관리 및 액션(다운로드, 삭제 등) 처리
 * 주요 기능: 필터링, 신규 생성, 선택 삭제, 정교한 다운로드 피드백 제어
 * =================================================================
 */

import { useState, useMemo } from 'react';
import { MOCK_PROJECTS } from '../testdata/projectData.js';

export const useDashboard = (setSelectedProject) => {

    /* ---------------------------------------------------------
     * SECTION 1: State Definitions
     * --------------------------------------------------------- */
    const [projects, setProjects] = useState(MOCK_PROJECTS || []);
    const [activeMenu, setActiveMenu] = useState('all');

    /* ---------------------------------------------------------
     * SECTION 2: Filtering Logic
     * --------------------------------------------------------- */
    const filteredProjects = useMemo(() => {
        if (activeMenu === 'mine') return projects.filter(p => p.owner === 'me');
        if (activeMenu === 'shared') return projects.filter(p => p.owner !== 'me');
        return projects;
    }, [projects, activeMenu]);

    /* ---------------------------------------------------------
     * SECTION 3: Project Operations
     * --------------------------------------------------------- */

    /** [CREATE] 신규 프로젝트 생성 */
    const handleCreateProject = () => {
        const title = prompt("새 프로젝트 이름을 입력하세요:");
        if (title) {
            const newProj = {
                id: Date.now(),
                title,
                owner: 'me',
                updated: 'Just now',
                files: []
            };
            setProjects(prev => [newProj, ...prev]);
        }
    };

    /** [DELETE] 프로젝트 삭제 */
    const handleDeleteProject = (ids) => {
        const targetIds = Array.isArray(ids) ? ids : [ids];
        setProjects(prev => prev.filter(p => !targetIds.includes(p.id)));
    };

    /** * [DOWNLOAD] 다운로드 핸들러 (메시지 완전 보정)
     * 기능: 체크박스 일괄 선택 시와 개별 버튼 클릭 시 메시지를 완전히 분리함
     * @param {string|Array} ids - 다운로드 대상 ID 혹은 ID 배열
     * @param {string} type - 파일 형식 ('zip' | 'pdf')
     */
    const handleDownloadProject = (ids, type = 'zip') => {
        const typeLabel = type.toUpperCase();

        // 1. 체크박스를 통해 여러 개가 넘어온 경우 (배열이고 길이가 1보다 클 때)
        if (Array.isArray(ids) && ids.length > 1) {
            alert(`[${typeLabel}] 선택된 ${ids.length}개의 프로젝트 다운로드 중...`);
        }
        // 2. 개별 버튼을 눌렀거나, 체크박스지만 1개만 선택된 경우
        else {
            // 배열이면 첫 번째 요소 추출, 아니면 그대로 사용
            const targetId = Array.isArray(ids) ? ids[0] : ids;
            const target = projects.find(p => p.id === targetId);
            const title = target ? `'${target.title}'` : "프로젝트";

            // '선택된' 문구 없이 깔끔하게 출력
            alert(`[${typeLabel}] ${title} 파일 다운로드 중...`);
        }
    };

    /* ---------------------------------------------------------
     * SECTION 4: Public API Export
     * --------------------------------------------------------- */
    return {
        projects: filteredProjects,
        activeMenu,
        setActiveMenu,
        handleCreateProject,
        handleDeleteProject,
        handleDownloadProject,
        handleDoubleClick: (proj) => setSelectedProject(proj)
    };
};