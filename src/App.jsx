import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    // 1. 로그인 여부를 관리하는 상태 추가
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // 2. 'dgu' 아이디와 '1234' 비밀번호 체크 로직 (테스팅용 마스터 계정)
        if (email === 'dgu' && password === '1234') {
            setIsLoggedIn(true); // 로그인 성공 상태로 변경
            setError('');
        } else {
            setError('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // 다시 로그인 화면으로 돌아가기
        setEmail('');
        setPassword('');
    };

    // 3. 로그인 성공 시 보여줄 "빈 페이지" (조건부 렌더링)
    if (isLoggedIn) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
                <h2 className="mb-4">로그인을 성공하였습니다.</h2>
                <button className="btn btn-secondary" onClick={handleLogout}>
                    로그인 화면으로 돌아가기
                </button>
            </div>
        );
    }

    // 4. 로그인 전 보여줄 "로그인 화면"
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '350px' }}>
                <h3 className="card-title text-center mb-3">로그인</h3>

                {error && <div className="alert alert-danger p-2" style={{ fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">아이디</label>
                        <input
                            type="text" // 이메일 형식이 아닌 'moon'을 쓰기 위해 text로 변경
                            className="form-control"
                            placeholder="아이디를 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;