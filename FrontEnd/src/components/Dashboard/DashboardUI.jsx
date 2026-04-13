import React, { useState } from 'react';
import './DashboardUI.css';
import '../Bar.css';

function DashboardUI({
                         userName,
                         handleLogout,
                         projects,
                         activeMenu,
                         setActiveMenu,
                         handleCreateProject,
                         handleDoubleClick,
                         handleDeleteProject // 이제 (ids) => ... 형태의 함수를 받음
                     }) {
    const [selectedIds, setSelectedIds] = useState([]);

    // 모달 관련 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);

    // 체크박스 로직
    const toggleAll = () => {
        if (selectedIds.length === projects.length && projects.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(projects.map(p => p.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // --- 삭제 프로세스 ---

    const openDeleteModal = (id = null) => {
        setTargetId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (targetId) {
            // [수정] 단일 ID를 넘김
            handleDeleteProject(targetId);
            setSelectedIds(prev => prev.filter(id => id !== targetId));
        } else {
            // [수정] 선택된 ID 배열 전체를 한 번에 넘김 (성능 최적화)
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
        <div className="d-flex flex-column w-100 h-100 project-dashboard">
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
                <aside className="dashboard-sidebar">
                    <button className="btn-create-project w-100" onClick={handleCreateProject}>+ 신규 프로젝트</button>
                    <ul className="sidebar-menu">
                        <li className={activeMenu === 'all' ? 'active' : ''} onClick={() => setActiveMenu('all')}>전체 프로젝트</li>
                        <li className={activeMenu === 'mine' ? 'active' : ''} onClick={() => setActiveMenu('mine')}>나의 프로젝트</li>
                        <li className={activeMenu === 'shared' ? 'active' : ''} onClick={() => setActiveMenu('shared')}>공유받은 프로젝트</li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            <h4 className="fw-bold m-0 me-3">
                                {activeMenu === 'all' ? '전체 프로젝트' : activeMenu === 'mine' ? '나의 프로젝트' : '공유받은 프로젝트'}
                            </h4>
                            {selectedIds.length > 0 && (
                                <div className="batch-actions">
                                    <button className="btn btn-sm btn-outline-secondary me-2">프로젝트 다운로드</button>
                                    <button className="btn btn-sm btn-outline-secondary me-2">PDF 다운로드</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal()}>삭제</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm overflow-hidden">
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
                                <tr key={proj.id} onDoubleClick={() => handleDoubleClick(proj)} className={selectedIds.includes(proj.id) ? 'table-active' : ''} style={{ cursor: 'pointer' }}>
                                    <td className="ps-4 py-3" onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" className="form-check-input" checked={selectedIds.includes(proj.id)} onChange={() => toggleSelect(proj.id)} />
                                    </td>
                                    <td className="py-3"><strong>{proj.title}</strong></td>
                                    <td className="py-3 small text-muted">{proj.owner === 'me' ? 'You' : proj.owner}</td>
                                    <td className="py-3 small text-muted">{proj.updated}</td>
                                    <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                                        <button className="btn btn-link btn-sm text-secondary text-decoration-none me-2">프로젝트 다운로드</button>
                                        <button className="btn btn-link btn-sm text-secondary text-decoration-none me-2">PDF 다운로드</button>
                                        <button className="btn btn-link btn-sm text-danger text-decoration-none" onClick={() => openDeleteModal(proj.id)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* 삭제 확인 모달 */}
            {isModalOpen && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal-content card shadow-lg animate__animated animate__zoomIn">
                        <div className="card-body p-4 text-center">
                            <h5 className="fw-bold mb-3">프로젝트 삭제</h5>
                            <p className="text-muted mb-4">
                                {targetId
                                    ? "이 프로젝트를 정말로 삭제하시겠습니까?"
                                    : `선택한 ${selectedIds.length}개의 프로젝트를 정말로 삭제하시겠습니까?`}
                                <br />삭제된 데이터는 복구할 수 없습니다.
                            </p>
                            <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-light px-4" onClick={closeModal}>취소</button>
                                <button className="btn btn-danger px-4" onClick={confirmDelete}>삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardUI;