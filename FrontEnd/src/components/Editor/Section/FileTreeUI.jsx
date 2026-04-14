/**
 * =================================================================
 * [View] File Tree UI Component
 * 설명: 재귀적으로 렌더링되는 노드들에게 컨텍스트 메뉴 핸들러 전파
 * =================================================================
 */

import React from 'react';
import FileTreeNode from './FileTreeNode.jsx';

function FileTreeUI({ files, activeFileId, setActiveFileId, handleContextMenu }) {
    return (
        <aside className="sidebar border-end d-flex flex-column">
            <div className="p-2 border-bottom small text-muted bg-light d-flex justify-content-between align-items-center">
                <span className="fw-bold">FILES</span>
                <button className="btn btn-sm p-0" title="Add New File">＋</button>
            </div>

            <div className="file-tree-container py-2 flex-grow-1 overflow-auto">
                {files && files.length > 0 ? (
                    files.map((file) => (
                        <FileTreeNode
                            key={file.id}
                            item={file}
                            activeFileId={activeFileId}
                            setActiveFileId={setActiveFileId}
                            handleContextMenu={handleContextMenu} // 핸들러 전달
                            depth={0}
                        />
                    ))
                ) : (
                    <div className="p-3 text-center text-muted small">파일이 없습니다.</div>
                )}
            </div>
        </aside>
    );
}

export default FileTreeUI;