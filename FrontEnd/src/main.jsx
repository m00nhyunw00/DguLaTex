/**
 * =================================================================
 * [Entry] Application Root Entry Point
 * 설명: React 어플리케이션의 렌더링이 시작되는 최상위 진입점임.
 * 주요 기능: 외부 라이브러리 로드, 전역 스타일 우선순위 결정 및 DOM 마운트.
 * =================================================================
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* ---------------------------------------------------------
 * SECTION 1: Style Layering & Specificity
 * --------------------------------------------------------- */

// 1. 외부 프레임워크 스타일 (Bootstrap)을 가장 먼저 로드
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. 어플리케이션 메인 컴포넌트 로드
// [시정] 현재 폴더 위치를 명확히 표시
import App from './App.jsx';

// 3. 커스텀 전역 스타일 (App.css)
// Bootstrap을 덮어쓰기 위해 하단에 배치
import './App.css';

/* ---------------------------------------------------------
 * SECTION 2: DOM Rendering
 * --------------------------------------------------------- */

const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error("Critical Error: 'root' element not found in index.html");
} else {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}