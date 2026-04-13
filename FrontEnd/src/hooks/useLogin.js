import { useState } from 'react';
import { loginRequest } from '../api/auth';

export const useLogin = (setIsLoggedIn, setUser) => {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await loginRequest(studentId, password);
            if (result.success) {
                setUser(result.user); // {id: 'dgu', name: '김동국'} 저장
                setIsLoggedIn(true);
                setError('');
            }
        } catch (err) {
            setIsLoggedIn(false);
            setError(err.message || '로그인 정보가 틀립니다.');
        }
    };

    return { studentId, setStudentId, password, setPassword, error, handleLogin };
};