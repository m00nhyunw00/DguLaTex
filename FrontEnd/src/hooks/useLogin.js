import { useState } from 'react';
import { loginRequest } from '../api/auth';

/**
 * [Controller] 로그인 로직 전용 커스텀 훅
 */
export const useLogin = (setIsLoggedIn) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // API 요청 시뮬레이션
            const result = await loginRequest(email, password);
            if (result.success) {
                setIsLoggedIn(true); // App의 전역 로그인 상태 변경
                setError('');
            }
        } catch (err) {
            setIsLoggedIn(false);
            setError(err.message); // 에러 메시지 세팅
        }
    };

    return { email, setEmail, password, setPassword, error, handleLogin };
};