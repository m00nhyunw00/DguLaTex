import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LoginPage from './pages/LoginPage.jsx'; // 새로 만든 페이지 임포트
import EditorPage from './components/EditorPage/EditorPage.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [latexCode, setLatexCode] = useState('\\documentclass{article}...');

    return (
        <>
            {isLoggedIn ? (
                <EditorPage
                    handleLogout={() => setIsLoggedIn(false)}
                    latexCode={latexCode}
                    setLatexCode={setLatexCode}
                />
            ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )}
        </>
    );
}

export default App;