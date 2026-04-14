/**
 * =================================================================
 * [Component] Dashboard UI View
 * 설명: 프로젝트 목록을 관리하고 인터랙션을 처리하는 메인 대시보드 뷰
 * 주요 기능: 프로젝트 리스트 렌더링, 단일/다중 선택 및 삭제, 다운로드,
 * 사이드바 메뉴 전환 등 전반적인 대시보드 레이아웃 제공
 * =================================================================
 */

import React, { useState } from 'react';
import './DashboardUI.css';
import '../Common.css';

function DashboardUI({
                         userName,             // [Prop] 현재 접속 중인 사용자 이름
                         handleLogout,         // [Prop] 로그아웃 실행 핸들러
                         projects,             // [Prop] 렌더링할 프로젝트 목록 데이터
                         activeMenu,           // [Prop] 현재 활성화된 사이드바 메뉴 상태
                         setActiveMenu,        // [Prop] 사이드바 메뉴 변경 함수
                         handleCreateProject,  // [Prop] 신규 프로젝트 생성 핸들러
                         handleDeleteProject,  // [Prop] 프로젝트 삭제 로직 (ID 또는 ID 배열)
                         handleDownloadProject, // [Prop] 프로젝트 다운로드 실행 핸들러
                         handleDoubleClick     // [Prop] 프로젝트 상세 진입(에디터 이동) 핸들러
                     }) {

    /* ---------------------------------------------------------
     * SECTION 1: Local State Management
     * 기능: UI 내부에서만 소요되는 선택 상태 및 모달 제어
     * --------------------------------------------------------- */

    // 체크박스로 선택된 프로젝트 ID 목록
    const [selectedIds, setSelectedIds] = useState([]);
    // 삭제 확인 모달 노출 여부
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 단일 삭제 시 타겟팅된 ID (일괄 삭제 시 null)
    const [targetId, setTargetId] = useState(null);

    /* ---------------------------------------------------------
     * SECTION 2: Selection & Modal Logic
     * 기능: 체크박스 전체 선택/해제 및 삭제 컨펌 로직 처리
     * --------------------------------------------------------- */

    /** [SELECT] 전체 선택 및 해제 토글 */
    const toggleAll = () => {
        if (selectedIds.length === projects.length && projects.length > 0) setSelectedIds([]);
        else setSelectedIds(projects.map(p => p.id));
    };

    /** [SELECT] 개별 항목 선택 및 해제 토글 */
    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    /** [MODAL] 삭제 확인 모달 열기 (대상 ID 지정 가능) */
    const openDeleteModal = (id = null) => {
        setTargetId(id);
        setIsModalOpen(true);
    };

    /** [ACTION] 최종 삭제 실행 (단일/일괄 구분 처리) */
    const confirmDelete = () => {
        if (targetId) {
            handleDeleteProject(targetId);
            setSelectedIds(prev => prev.filter(id => id !== targetId));
        } else {
            handleDeleteProject(selectedIds);
            setSelectedIds([]);
        }
        setIsModalOpen(false);
        setTargetId(null);
    };

    return (
        <div className="project-dashboard">

            {/* ---------------------------------------------------------
             * SECTION 3: Top Navigation Bar
             * 기능: 브랜드 로고 및 사용자 정보, 로그아웃 버튼 배치
             * --------------------------------------------------------- */ }
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

                {/* ---------------------------------------------------------
                 * SECTION 4: Sidebar Navigation
                 * 기능: 프로젝트 생성 및 카테고리 필터링 제어
                 * --------------------------------------------------------- */ }
                <aside className="dashboard-sidebar">
                    <button className="btn-create-project w-100" onClick={handleCreateProject}>+ 신규 프로젝트</button>
                    <ul className="sidebar-menu">
                        <li className={activeMenu === 'all' ? 'active' : ''} onClick={() => setActiveMenu('all')}>전체 프로젝트</li>
                        <li className={activeMenu === 'mine' ? 'active' : ''} onClick={() => setActiveMenu('mine')}>나의 프로젝트</li>
                        <li className={activeMenu === 'shared' ? 'active' : ''} onClick={() => setActiveMenu('shared')}>공유받은 프로젝트</li>
                    </ul>
                </aside>

                {/* ---------------------------------------------------------
                 * SECTION 5: Main Content Area
                 * 기능: 현재 프로젝트 목록 제목 및 일괄 처리 액션 바 노출
                 * --------------------------------------------------------- */ }
                <main className="dashboard-main">
                    <div className="d-flex justify-content-between align-items-center mb-3" style={{height: '40px'}}>
                        <h5 className="fw-bold m-0">{activeMenu.toUpperCase()} PROJECTS</h5>

                        {/* 다중 선택 시에만 나타나는 상단 액션 바 */}
                        {selectedIds.length > 0 && (
                            <div className="top-batch-actions animate__animated animate__fadeIn">
                                <button className="btn btn-sm btn-primary me-2" onClick={() => handleDownloadProject(selectedIds)}>다운로드</button>
                                <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal()}>삭제</button>
                            </div>
                        )}
                    </div>

                    {/* ---------------------------------------------------------
                     * SECTION 6: Project Table List
                     * 기능: 프로젝트 상세 데이터 그리드 표현 및 개별 관리 버튼 제공
                     * --------------------------------------------------------- */ }
                    <div className="table-container shadow-sm border-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                            <tr>
                                <th className="ps-4" style={{width: '40px'}}>
                                    <input type="checkbox" className="form-check-input" onChange={toggleAll} checked={selectedIds.length === projects.length && projects.length > 0}/>
                                </th>
                                <th>제목</th>
                                <th>소유자</th>
                                <th>마지막 수정</th>
                                <th className="text-end pe-4">실행</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projects.map((proj) => (
                                <tr key={proj.id} onDoubleClick={() => handleDoubleClick(proj)} className={selectedIds.includes(proj.id) ? 'table-row-selected' : ''}>
                                    <td className="ps-4" onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" className="form-check-input" checked={selectedIds.includes(proj.id)} onChange={() => toggleSelect(proj.id)}/>
                                    </td>
                                    <td><strong>{proj.title}</strong></td>
                                    <td className="small text-muted">{proj.owner === 'me' ? 'You' : proj.owner}</td>
                                    <td className="small text-muted">{proj.updated}</td>
                                    <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="row-action-buttons">
                                            <button className="btn btn-xs btn-outline-secondary" onClick={() => handleDownloadProject(proj.id, 'zip')}>Zip</button>
                                            <button className="btn btn-xs btn-outline-secondary" onClick={() => handleDownloadProject(proj.id, 'pdf')}>PDF</button>
                                            <button className="btn btn-xs btn-outline-danger" onClick={() => openDeleteModal(proj.id)}>삭제</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* ---------------------------------------------------------
             * SECTION 7: Modal Overlay (Delete Confirmation)
             * 기능: 중요 작업 실행 전 사용자의 최종 의사 확인
             * --------------------------------------------------------- */ }
            {isModalOpen && (
                <div className="custom-modal-overlay">
                    <div className="modal-content-box shadow-lg animate__animated animate__zoomIn">
                        <h5 className="fw-bold mb-3">삭제 확인</h5>
                        <p className="text-muted mb-4">
                            {targetId ? "이 프로젝트를 삭제하시겠습니까?" : `선택한 ${selectedIds.length}개의 프로젝트를 삭제하시겠습니까?`}
                            <br />이 작업은 되돌릴 수 없습니다
                        </p>
                        <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-light px-4" onClick={() => setIsModalOpen(false)}>취소</button>
                            <button className="btn btn-danger px-4" onClick={confirmDelete}>삭제</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardUI;