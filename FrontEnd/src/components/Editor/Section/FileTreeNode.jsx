/**
 * =================================================================
 * [View] File Tree Node Component
 * 설명: 파일 시스템의 개별 항목(파일/폴더)을 계층적으로 출력
 * 주요 기능: 재귀 호출을 통한 트리 구조 시각화 및 선택 이벤트 전파
 * =================================================================
 */

import React from 'react';

/**
 * @param {Object} item - 노드 데이터 (id, name, type, children 등)
 * @param {number} depth - 들여쓰기 깊이
 * @param {string} activeFileId - 활성화된 파일 ID
 * @param {Function} setActiveFileId - 파일 선택 함수
 */
function FileTreeNode({ item, depth = 0, activeFileId, setActiveFileId }) {
    const isActive = activeFileId === item.id;

    return (
        <div className="tree-node-wrapper">
            {/* ---------------------------------------------------------
            * SECTION 1: Single Item Row
            * --------------------------------------------------------- */}
            <div
                className={`tree-item ${isActive ? 'active' : ''}`}
                style={{ paddingLeft: `${depth * 15 + 12}px` }}
                onClick={() => item.type === 'file' && setActiveFileId(item.id)}
            >
                <span className="me-2">{item.type === 'folder' ? '📁' : '📄'}</span>
                <span className="node-name">{item.name}</span>
            </div>

            {/* ---------------------------------------------------------
            * SECTION 2: Recursive Children Rendering
            * --------------------------------------------------------- */}
            {item.children && item.children.length > 0 && (
                <div className="node-children">
                    {item.children.map((child) => (
                        <FileTreeNode
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

export default FileTreeNode;