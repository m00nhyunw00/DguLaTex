/**
 * =================================================================
 * [View] File Tree Node Component
 * 설명: 개별 파일/폴더 항목을 렌더링하며, 우클릭 시 본인의 타입을 정확히 전달
 * =================================================================
 */

import React, { useState } from 'react';

function FileTreeNode({ item, activeFileId, setActiveFileId, handleContextMenu, depth }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = (e) => {
        e.stopPropagation();
        if (item.type === 'folder') {
            setIsOpen(!isOpen);
        } else {
            setActiveFileId(item.id);
        }
    };

    return (
        <div className="tree-node-wrapper">
            {/* 항목 렌더링 영역 - 여기서 우클릭 이벤트 발생 시 본인의 item 정보를 넘김 */}
            <div
                className={`tree-item ${activeFileId === item.id ? 'active' : ''}`}
                style={{ paddingLeft: `${depth * 15 + 15}px` }}
                onClick={handleClick}
                onContextMenu={(e) => handleContextMenu(e, item)} // 핵심: 여기서 item.type이 결정됨
            >
                <span className="me-2">{item.type === 'folder' ? (isOpen ? '📂' : '📁') : '📄'}</span>
                <span>{item.name}</span>
            </div>

            {/* 폴더일 경우 자식 노드 재귀 렌더링 */}
            {item.type === 'folder' && isOpen && item.children && (
                <div className="tree-children">
                    {item.children.map((child) => (
                        <FileTreeNode
                            key={child.id}
                            item={child}
                            activeFileId={activeFileId}
                            setActiveFileId={setActiveFileId}
                            handleContextMenu={handleContextMenu} // 하위로 계속 전파
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default FileTreeNode;