/**
 * =================================================================
 * [Component] Dashboard UI View
 * 설명: 프로젝트 목록을 관리하고 인터랙션을 처리하는 메인 대시보드 뷰.
 * 수정 사항: 인라인 스타일 제거 및 섹션별 CSS 클래스 기반 관리 체계 구축.
 * =================================================================
 */

import React, { useState } from 'react';
import './DashboardUI.css';
import '../Common.css';

function DashboardUI({
                         userName,
                         handleLogout,
                         projects,
                         activeMenu,
                         setActiveMenu,
                         handleCreateProject,
                         handleDoubleClick,
                         handleDeleteProject
                     }) {
    /* ---------------------------------------------------------
     * SECTION 1: Local State Management
     * --------------------------------------------------------- */
    const [selectedIds, setSelectedIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);

    /* ---------------------------------------------------------
     * SECTION 2: Selection & Modal Logic
     * --------------------------------------------------------- */
    const toggleAll = () => {
        if (selectedIds.length === projects.length && projects.length > 0) setSelectedIds([]);
        else setSelectedIds(projects.map(p => p.id));
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const openDeleteModal = (id = null) => {
        setTargetId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (targetId) {
            handleDeleteProject(targetId);
            setSelectedIds(prev => prev.filter(id => id !== targetId));
        } else {
            handleDeleteProject(selectedIds);
            setSelectedIds([]);
        }
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTargetId(null);
    };

    return (
        <div className="project-dashboard">
            {/* 파트 1: 상단 네비게이션 바 (공통 클래스 사용) */}
            <nav className="navbar navbar-dark top-nav-fixed shadow-sm">
                <span className="navbar-brand fw-bold text-dgu m-0">DguLaTeX</span>
                <div className="d-flex align-items-center ms-auto">
                    <span className="text-white me-3 small">
                        <strong className="text-dgu">{userName}</strong>님 접속 중
                    </span>
                    <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>로그아웃</button>
                </div>
            </nav>

            <div className="dashboard-wrapper">
                {/* 파트 2: 좌측 사이드바 (프로젝트 범위 선택 영역) */}
                <aside className="dashboard-sidebar">
                    <button className="btn-create-project w-100" onClick={handleCreateProject}>+ 신규 프로젝트</button>
                    <ul className="sidebar-menu">
                        <li className={activeMenu === 'all' ? 'active' : ''} onClick={() => setActiveMenu('all')}>전체 프로젝트</li>
                        <li className={activeMenu === 'mine' ? 'active' : ''} onClick={() => setActiveMenu('mine')}>나의 프로젝트</li>
                        <li className={activeMenu === 'shared' ? 'active' : ''} onClick={() => setActiveMenu('shared')}>공유받은 프로젝트</li>
                    </ul>
                </aside>

                {/* 파트 3: 우측 메인 리스트 (프로젝트 목록 영역) */}
                <main className="dashboard-main">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold m-0">
                            {activeMenu === 'all' ? '전체 프로젝트' : activeMenu === 'mine' ? '나의 프로젝트' : '공유받은 프로젝트'}
                        </h4>
                        {selectedIds.length > 0 && (
                            <div className="batch-actions">
                                <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal()}>일괄 삭제</button>
                            </div>
                        )}
                    </div>

                    <div className="table-container shadow-sm border-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                            <tr>
                                <th className="ps-4 py-3" style={{width: '50px'}}>
                                    <input type="checkbox" className="form-check-input" checked={selectedIds.length === projects.length && projects.length > 0} onChange={toggleAll} />
                                </th>
                                <th className="py-3">제목</th>
                                <th className="py-3">소유자</th>
                                <th className="py-3">마지막 수정</th>
                                <th className="text-center py-3">관리</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projects.map((proj) => (
                                <tr
                                    key={proj.id}
                                    onDoubleClick={() => handleDoubleClick(proj)}
                                    className={selectedIds.includes(proj.id) ? 'table-row-selected' : ''}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td className="ps-4 py-3" onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" className="form-check-input" checked={selectedIds.includes(proj.id)} onChange={() => toggleSelect(proj.id)} />
                                    </td>
                                    <td className="py-3"><strong>{proj.title}</strong></td>
                                    <td className="py-3 small text-muted">{proj.owner === 'me' ? 'You' : proj.owner}</td>
                                    <td className="py-3 small text-muted">{proj.updated}</td>
                                    <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                                        <button className="btn btn-link btn-table-action btn-sm text-danger" onClick={() => openDeleteModal(proj.id)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* 파트 4: 모달 오버레이 (삭제 컨펌) */}
            {isModalOpen && (
                <div className="custom-modal-overlay">
                    <div className="modal-content-box shadow-lg">
                        <h5 className="fw-bold mb-3">프로젝트 삭제</h5>
                        <p className="text-muted mb-4">정말로 삭제하시겠습니까?<br />삭제된 데이터는 복구할 수 없습니다.</p>
                        <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-light px-4" onClick={closeModal}>취소</button>
                            <button className="btn btn-danger px-4" onClick={confirmDelete}>삭제</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardUI;