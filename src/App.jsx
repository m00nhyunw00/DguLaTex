//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import './App.css'

//function App() {
//  const [count, setCount] = useState(0)

//  return (
//    <>
//      <section id="center">
//        <div className="hero">
//          <img src={heroImg} className="base" width="170" height="179" alt="" />
//          <img src={reactLogo} className="framework" alt="React logo" />
//          <img src={viteLogo} className="vite" alt="Vite logo" />
//        </div>
//        <div>
//          <h1>Get started</h1>
//          <p>
//            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//          </p>
//        </div>
//        <button
//          className="counter"
//          onClick={() => setCount((count) => count + 1)}
//        >
//          Count is {count}
//        </button>
//      </section>

//      <div className="ticks"></div>

//      <section id="next-steps">
//        <div id="docs">
//          <svg className="icon" role="presentation" aria-hidden="true">
//            <use href="/icons.svg#documentation-icon"></use>
//          </svg>
//          <h2>Documentation</h2>
//          <p>Your questions, answered</p>
//          <ul>
//            <li>
//              <a href="https://vite.dev/" target="_blank">
//                <img className="logo" src={viteLogo} alt="" />
//                Explore Vite
//              </a>
//            </li>
//            <li>
//              <a href="https://react.dev/" target="_blank">
//                <img className="button-icon" src={reactLogo} alt="" />
//                Learn more
//              </a>
//            </li>
//          </ul>
//        </div>
//        <div id="social">
//          <svg className="icon" role="presentation" aria-hidden="true">
//            <use href="/icons.svg#social-icon"></use>
//          </svg>
//          <h2>Connect with us</h2>
//          <p>Join the Vite community</p>
//          <ul>
//            <li>
//              <a href="https://github.com/vitejs/vite" target="_blank">
//                <svg
//                  className="button-icon"
//                  role="presentation"
//                  aria-hidden="true"
//                >
//                  <use href="/icons.svg#github-icon"></use>
//                </svg>
//                GitHub
//              </a>
//            </li>
//            <li>
//              <a href="https://chat.vite.dev/" target="_blank">
//                <svg
//                  className="button-icon"
//                  role="presentation"
//                  aria-hidden="true"
//                >
//                  <use href="/icons.svg#discord-icon"></use>
//                </svg>
//                Discord
//              </a>
//            </li>
//            <li>
//              <a href="https://x.com/vite_js" target="_blank">
//                <svg
//                  className="button-icon"
//                  role="presentation"
//                  aria-hidden="true"
//                >
//                  <use href="/icons.svg#x-icon"></use>
//                </svg>
//                X.com
//              </a>
//            </li>
//            <li>
//              <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                <svg
//                  className="button-icon"
//                  role="presentation"
//                  aria-hidden="true"
//                >
//                  <use href="/icons.svg#bluesky-icon"></use>
//                </svg>
//                Bluesky
//              </a>
//            </li>
//          </ul>
//        </div>
//      </section>

//      <div className="ticks"></div>
//      <section id="spacer"></section>
//    </>
//  )
//}

//export default App

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // 예시: 실제로는 여기서 API 호출
        // fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
        //   .then(...)
        //   .catch(...)

        if (email === 'student@example.com' && password === '1234') {
            alert('로그인 성공!');
            setError('');
            // 여기서 리다이렉트 가능
        } else {
            setError('이메일 또는 비밀번호가 잘못되었습니다.');
        }
    };

    const handleSchoolLogin = () => {
        // 나중에 OAuth 로그인 연결 예정
        alert('학교 계정 로그인 기능 구현 예정');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '350px' }}>
                <h3 className="card-title text-center mb-3">로그인</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">이메일</label>
                        <input
                            type="email"
                            className="form-control"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        로그인
                    </button>
                </form>

                <hr />

                <button
                    onClick={handleSchoolLogin}
                    className="btn btn-outline-secondary w-100 mt-2"
                >
                    학교 계정으로 로그인
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
