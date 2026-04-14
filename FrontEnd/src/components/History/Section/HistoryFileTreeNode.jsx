/**
 * =================================================================
 * [View] History File Tree Node Component
 * 설명: 히스토리 모드에서 특정 버전의 개별 파일/폴더 노드를 렌더링
 * 주요 기능: 재귀 호출을 통한 트리 구조 시각화 및 과거 시점 파일 선택 기능
 * =================================================================
 */

import React from 'react';

/**
 * @param {Object} item - 노드 데이터 (id, name, type, children 등)
 * @param {number} depth - 트리 들여쓰기 깊이
 * @param {string} activeFileId - 현재 뷰어에 표시 중인 파일 ID
 * @param {Function} setActiveFileId - 파일 선택 변경 함수
 */
function HistoryFileTreeNode({ item, depth = 0, activeFileId, setActiveFileId }) {
    const isActive = activeFileId === item.id;

    return (
        <div className="tree-node-wrapper">
            {/* ---------------------------------------------------------
             * SECTION 1: Single Node Row
             * --------------------------------------------------------- */}
            <div
                className={`tree-item ${isActive ? 'active' : ''}`}
                style={{ paddingLeft: `${depth * 15 + 12}px` }}
                onClick={() => item.type === 'file' && setActiveFileId(item.id)}
            >
                <span className="me-2">{item.type === 'folder' ? '📁' : '📄'}</span>
                <span>{item.name}</span>
            </div>

            {/* ---------------------------------------------------------
             * SECTION 2: Recursive Children Rendering
             * --------------------------------------------------------- */}
            {item.children && item.children.length > 0 && (
                <div className="node-children">
                    {item.children.map((child) => (
                        <HistoryFileTreeNode
                            key={child.id}
                            item={child}
                            depth={depth + 1}
                            activeFileId={activeFileId}
                            setActiveFileId={setActiveFileId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HistoryFileTreeNode;