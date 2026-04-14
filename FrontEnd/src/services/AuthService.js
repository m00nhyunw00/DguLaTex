/**
 * =================================================================
 * [Service] Authentication Service
 * 설명: API 모델(Model)과 커스텀 훅(Controller) 사이의 중계 역할을 수행
 * 주요 기능: 서버 응답 데이터 정제(Mapping), 앱 전역에서 공통으로 쓰이는 인증 로직 처리
 * =================================================================
 */

import { loginRequest } from '../api/auth';

export const AuthService = {
    /**
     * [Logic] 로그인 통합 서비스
     * 기능: API를 호출하여 결과를 받고, 이를 앱 표준 유저 규격으로 변환함.
     * @param {string} studentId - 사용자 학번/사번
     * @param {string} password - 사용자 비밀번호
     * @returns {Promise<Object>} 성공 여부와 정제된 유저 데이터를 포함한 객체
     */
    async login(studentId, password) {
        try {
            /* ---------------------------------------------------------
             * SECTION 1: API Model 호출
             * --------------------------------------------------------- */
            // auth.js의 loginRequest 호출
            const data = await loginRequest(studentId, password);

            /* ---------------------------------------------------------
             * SECTION 2: Data Transformation (Mapping)
             * 기능: 백엔드 데이터 필드명을 프론트엔드 도메인에 맞춰 변환
             * --------------------------------------------------------- */
            if (data && data.success) {
                return {
                    success: true,
                    user: {
                        id: data.user.id,
                        name: data.user.name,
                        // 여기서 서버 데이터(예: user_email)를 앱 규격(userEmail)으로 치환 가능
                    }
                };
            }

            return { success: false, message: "잘못된 응답 형식입니다." };

        } catch (error) {
            /* ---------------------------------------------------------
             * SECTION 3: Error Handling
             * --------------------------------------------------------- */
            console.error("[AuthService] 로그인 처리 중 예외 발생:", error.message);
            // 에러를 컨트롤러(Hook)로 전파하여 UI에서 에러 메시지를 띄우게 함
            throw error;
        }
    }
};