/**
 * =================================================================
 * [Hook] Project History Controller
 * 설명: 특정 프로젝트의 과거 시점(Version) 데이터를 관리하고 탐색하는 로직을 담당
 * 주요 기능: 시점별 파일 트리 로드, 재귀적 파일 탐색, 프로젝트/파일 단위 복구 핸들링
 * =================================================================
 */

import { useState, useEffect } from 'react';
import { MOCK_HISTORY } from '../testdata/historyData.js';

/**
 * @param {string} projectId - 히스토리 데이터를 조회할 프로젝트의 고유 식별자
 */
export const useHistory = (projectId) => {

    /* ---------------------------------------------------------
     * SECTION 1: State Definitions
     * --------------------------------------------------------- */

    // 해당 프로젝트에 귀속된 전체 히스토리 리스트 추출
    const historyList = MOCK_HISTORY[projectId] || [];

    // 현재 사용자가 선택하여 조회 중인 특정 히스토리 버전 상태
    const [selectedHistory, setSelectedHistory] = useState(historyList[0] || null);

    // 히스토리 뷰어 내 에디터에 표시될 활성 파일의 ID 상태
    const [activeFileId, setActiveFileId] = useState('');

    /* ---------------------------------------------------------
     * SECTION 2: Side Effects
     * 기능: 선택된 버전이 변경될 때마다 해당 버전의 파일 구성을 초기화
     * --------------------------------------------------------- */
    useEffect(() => {
        if (selectedHistory) {
            // 새 버전을 선택 시, 사용자 편의를 위해 트리 내 첫 번째 파일을 자동 탐색하여 활성화
            const firstFile = findFirstFile(selectedHistory.files);
            if (firstFile) setActiveFileId(firstFile.id);
        }
    }, [selectedHistory]);

    /* ---------------------------------------------------------
     * SECTION 3: Tree Traversal Algorithms (Recursive)
     * 기능: 중첩된 트리 구조 내에서 노드를 효율적으로 탐색하기 위한 재귀 함수
     * --------------------------------------------------------- */

    /**
     * [재귀 탐색] 트리 내에서 'file' 타입인 첫 번째 객체를 찾아 반환
     * @param {Array} items - 탐색 대상 노드 배열
     */
    const findFirstFile = (items) => {
        if (!items || !Array.isArray(items)) return null;
        for (const item of items) {
            if (item.type === 'file') return item;
            if (item.children) {
                const found = findFirstFile(item.children);
                if (found) return found;
            }
        }
        return null;
    };

    /**
     * [재귀 탐색] 제공된 고유 ID와 일치하는 파일 객체를 탐색하여 반환
     * @param {Array} items - 탐색 대상 노드 배열
     * @param {string} id - 찾고자 하는 파일의 ID
     */
    const findFileById = (items, id) => {
        if (!items || !Array.isArray(items)) return null;
        for (const item of items) {
            if (item.id === id) return item;
            if (item.children) {
                const found = findFileById(item.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    // 현재 선택된 파일 데이터 객체 도출 (View에서 참조)
    const activeFile = findFileById(selectedHistory?.files, activeFileId);

    /* ---------------------------------------------------------
     * SECTION 4: Rollback Action Handlers
     * 기능: 과거의 데이터를 현재 작업 영역으로 복원하기 위한 명령 인터페이스
     * --------------------------------------------------------- */

    /**
     * [프로젝트 단위 복구] 선택한 시점의 모든 파일 스냅샷으로 전체 복원 수행
     * @param {string} historyId - 복구 지점이 되는 히스토리 ID
     */
    const rollbackProject = (historyId) => {
        const target = historyList.find(h => h.id === historyId);
        alert(`[프로젝트 롤백] ${target.time} 시점의 모든 파일로 복구합니다.`);
    };

    /**
     * [파일 단위 복구] 현재 뷰어에서 보고 있는 특정 파일만 해당 버전으로 개별 복원
     */
    const rollbackFile = () => {
        if (!activeFile) return;
        alert(`[파일 롤백] 현재 보고 있는 '${activeFile.name}' 파일만 이 버전으로 복구합니다.`);
    };

    /* ---------------------------------------------------------
     * SECTION 5: Public API Export
     * --------------------------------------------------------- */
    return {
        historyList,
        selectedHistory,
        setSelectedHistory,
        activeFile,
        activeFileId,
        setActiveFileId,
        rollbackProject,
        rollbackFile
    };
};