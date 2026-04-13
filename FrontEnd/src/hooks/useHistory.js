import { useState, useEffect } from 'react';
import { MOCK_HISTORY } from '../testdata/historyData.js';

export const useHistory = (projectId) => {
    const historyList = MOCK_HISTORY[projectId] || [];
    const [selectedHistory, setSelectedHistory] = useState(historyList[0] || null);
    const [activeFileId, setActiveFileId] = useState('');

    useEffect(() => {
        if (selectedHistory) {
            const firstFile = findFirstFile(selectedHistory.files);
            if (firstFile) setActiveFileId(firstFile.id);
        }
    }, [selectedHistory]);

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

    const activeFile = findFileById(selectedHistory?.files, activeFileId);

    // [추가] 프로젝트 단위 롤백
    const rollbackProject = (historyId) => {
        const target = historyList.find(h => h.id === historyId);
        alert(`[프로젝트 롤백] ${target.time} 시점의 모든 파일로 복구합니다.`);
    };

    // [추가] 파일 단위 롤백
    const rollbackFile = () => {
        if (!activeFile) return;
        alert(`[파일 롤백] 현재 보고 있는 '${activeFile.name}' 파일만 이 버전으로 복구합니다.`);
    };

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