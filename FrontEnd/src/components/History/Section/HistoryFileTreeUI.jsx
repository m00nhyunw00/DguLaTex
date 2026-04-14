/**
 * =================================================================
 * [View] History File Tree UI Component
 * 설명: 히스토리 화면 좌측의 파일 탐색기 영역 전체를 관리함.
 * 주요 기능: 특정 버전의 파일 스냅샷 전체 리스트 출력 제어.
 * =================================================================
 */

import React from 'react';
import HistoryFileTreeNode from './HistoryFileTreeNode.jsx';

/**
 * @param {Array} files - 선택된 히스토리 버전의 파일 리스트
 * @param {string} activeFileId - 현재 선택된 파일 ID
 * @param {Function} setActiveFileId - 파일 선택 변경 함수
 */
function HistoryFileTreeUI({ files, activeFileId, setActiveFileId }) {
    return (
        /* ---------------------------------------------------------
         * SECTION 1: History Sidebar Container
         * 기능: 히스토리 모드 전용 다크 테마 사이드바 레이아웃 정의.
         * --------------------------------------------------------- */
        <aside className="sidebar border-end text-white">
            <div className="p-2 border-bottom small text-white-50 bg-secondary">
                FILES IN THIS VERSION
            </div>

            {/* ---------------------------------------------------------
             * SECTION 2: Recursive Node Start
             * --------------------------------------------------------- */}
            <div className="file-tree-container py-2 overflow-auto">
                {files && files.length > 0 ? (
                    files.map((file) => (
                        <HistoryFileTreeNode
                            key={file.id}
                            item={file}
                            activeFileId={activeFileId}
                            setActiveFileId={setActiveFileId}
                            depth={0}
                        />
                    ))
                ) : (
                    <div className="p-3 text-center text-white-50 small">
                        데이터가 없습니다.
                    </div>
                )}
            </div>
        </aside>
    );
}

export default HistoryFileTreeUI;