/**
 * =================================================================
 * [View] Preview UI Component
 * 설명: LaTeX 컴파일 결과인 PDF 시각화 및 제어 인터페이스를 제공
 * 수정: 누락되었던 onCheckErrors 프롭 추가 및 노란색 버튼 연결
 * =================================================================
 */

import React from 'react';

function PreviewUI({
                       pdfUrl,
                       isAutoCompile,
                       toggleAutoCompile,
                       onCompile,
                       onDownload,
                       onCheckErrors, // [수정] 누락되었던 프롭 추가
                       currentPage,
                       totalPages,
                       setPage
                   }) {
    return (
        <aside className="preview-section border-start d-flex flex-column">
            {/* SECTION 1: Preview Toolbar */}
            <div className="p-2 bg-light border-bottom d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-primary fw-bold" onClick={onCompile}>
                        ▶ Compile
                    </button>

                    <div className="form-check form-switch ms-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="autoCompile"
                            checked={isAutoCompile}
                            onChange={toggleAutoCompile}
                        />
                        <label className="form-check-label small text-secondary" htmlFor="autoCompile">Auto</label>
                    </div>
                </div>

                <div className="d-flex gap-1">
                    {/* [수정] 노란색 버튼에 onClick={onCheckErrors} 연결 */}
                    <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={onCheckErrors}
                        title="Logs"
                    >
                        ⚠️
                    </button>
                    <button className="btn btn-sm btn-outline-success" onClick={onDownload} title="Download PDF">⬇</button>
                </div>
            </div>

            {/* SECTION 2: PDF Viewer Area */}
            <div className="pdf-viewer flex-grow-1 position-relative pdf-viewer-container">
                {pdfUrl ? (
                    <iframe
                        src={`${pdfUrl}#page=${currentPage}`}
                        width="100%"
                        height="100%"
                        title="PDF Preview"
                        className="pdf-frame"
                    />
                ) : (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-white-50">
                        <span className="no-pdf-icon">📄</span>
                        <p className="mt-3">No PDF Generated. Click Compile.</p>
                    </div>
                )}

                {/* SECTION 3: Floating Page Navigation */}
                {pdfUrl && (
                    <div className="page-nav-overlay position-absolute bottom-0 start-50 translate-middle-x mb-3 shadow-lg">
                        <div className="btn-group bg-dark rounded-pill p-1 border border-secondary">
                            <button
                                className="btn btn-sm btn-dark rounded-circle border-0"
                                onClick={() => setPage(Math.max(1, currentPage - 1))}
                            >
                                ▲
                            </button>
                            <span className="text-white px-3 align-self-center small fw-bold page-info-text">
                                {currentPage} / {totalPages || 1}
                            </span>
                            <button
                                className="btn btn-sm btn-dark rounded-circle border-0"
                                onClick={() => setPage(Math.min(totalPages || 1, currentPage + 1))}
                            >
                                ▼
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default PreviewUI;