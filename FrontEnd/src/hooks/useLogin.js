/**
 * =================================================================
 * [Hook] Login Business Logic Controller
 * 설명: 로그인 폼 상태 관리 및 AuthService를 이용한 인증 프로세스 제어
 * 시정 사항: 데이터의 직접적인 처리를 Service 레이어에 위임하여 관심사 분리
 * =================================================================
 */

import { useState } from 'react';
import { AuthService } from '../services/AuthService';

/**
 * @param {Function} setIsLoggedIn - 전역 인증 상태 변경 세터
 * @param {Function} setUser - 전역 사용자 정보 세터
 */
export const useLogin = (setIsLoggedIn, setUser) => {

    /* ---------------------------------------------------------
     * SECTION 1: Local Input State
     * --------------------------------------------------------- */
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    /* ---------------------------------------------------------
     * SECTION 2: Event Handlers (Service Integration)
     * --------------------------------------------------------- */
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // [시정] api/auth를 직접 부르는 대신 Service 레이어를 통해 데이터 요청
            const result = await AuthService.login(studentId, password);

            if (result.success) {
                setUser(result.user);
                setIsLoggedIn(true);
                setError('');
            }
        } catch (err) {
            // Service에서 발생한 구체적인 에러 메시지를 상태에 반영
            setIsLoggedIn(false);
            setError(err.message || '인증 서버와의 통신에 실패했습니다.');
        }
    };

    /* ---------------------------------------------------------
     * SECTION 3: Public API
     * --------------------------------------------------------- */
    return {
        studentId,
        setStudentId,
        password,
        setPassword,
        error,
        handleLogin
    };
};