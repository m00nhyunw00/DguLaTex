import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// [시정] 부트스트랩 CSS 파일을 App.css보다 위에 임포트하세요.
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
// Global Style (App.css는 bootstrap 아래에 위치해야 디자인이 반영됩니다)
import './App.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);