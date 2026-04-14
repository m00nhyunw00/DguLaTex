/**
 * =================================================================
 * [View] History List UI Component
 * 설명: 프로젝트의 변경 이력 타임라인을 표시하고 상세 액션을 중개함.
 * 주요 기능: 버전 선택, 버전별 다운로드 및 프로젝트 단위 롤백 인터페이스 제공.
 * =================================================================
 */

import React, { useState } from 'react';

/**
 * @param {Array} historyList - 전체 변경 이력 배열
 * @param {Object} selectedHistory - 현재 선택된 히스토리 객체
 * @param {Function} setSelectedHistory - 히스토리 선택 변경 함수
 * @param {Function} rollbackProject - 프로젝트 단위 복구 실행 함수
 */
function HistoryListUI({ historyList, selectedHistory, setSelectedHistory, rollbackProject }) {
    // 점 3개 메뉴 오픈 상태 관리
    const [openMenuId, setOpenMenuId] = useState(null);

    return (
        <aside className="history-list-side border-start" onClick={() => setOpenMenuId(null)}>
            <div className="p-3 border-bottom fw-bold text-center bg-white shadow-sm">
                Recent Activity
            </div>

            <div className="history-items-container">
                {historyList.map(h => (
                    <div
                        key={h.id}
                        className={`history-item p-4 border-bottom ${selectedHistory?.id === h.id ? 'selected' : ''}`}
                        onClick={() => setSelectedHistory(h)}
                    >
                        <div className="d-flex justify-content-between align-items-start">
                            {/* 버전 정보 영역 */}
                            <div className="d-flex flex-column">
                                <span className="h6 mb-1 fw-bold">{h.time}</span>
                                <span className="text-muted small mb-3">{h.changeDesc}</span>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="user-avatar-rect"></div>
                                    <span className="text-primary fw-bold small">{h.user}</span>
                                </div>
                            </div>

                            {/* 컨텍스트 메뉴 (점 3개) */}
                            <div className="history-menu-container">
                                <button
                                    className="btn btn-outline-secondary btn-sm border-0 menu-trigger-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(openMenuId === h.id ? null : h.id);
                                    }}
                                >
                                    ⋮
                                </button>

                                {openMenuId === h.id && (
                                    <div className="history-dropdown shadow-lg animate__animated animate__fadeIn">
                                        <div className="dropdown-item" onClick={() => alert('Downloading...')}>
                                            📥 Download version
                                        </div>
                                        <div className="dropdown-item dropdown-item-restore fw-bold" onClick={() => rollbackProject(h.id)}>
                                            🔄 Rollback Project
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default HistoryListUI;