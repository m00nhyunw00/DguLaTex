/**
 * =================================================================
 * [Model] Authentication API Module
 * 설명: 백엔드 서버와 통신하여 사용자 인증(Login)을 처리하는 데이터 모델 레이어임.
 * 주요 기능: Vite 환경 변수 기반의 API 호출 및 서버 응답 데이터 규격화.
 * =================================================================
 */

/**
 * API 베이스 URL 설정
 * Vite 프로젝트의 .env 파일(VITE_API_URL)에서 설정값을 동적으로 로드함.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * 사용자 로그인 인증 요청
 * @param {string} email - 사용자 계정(학번/사번)
 * @param {string} password - 비밀번호
 * @returns {Promise<Object>} 서버에서 반환한 성공 데이터({success, user})
 * @throws {Error} 서버 응답 실패 시 또는 네트워크 에러 발생 시 예외 발생
 */
export const loginRequest = async (email, password) => {
    try {
        /**
         * Fetch API를 이용한 비동기 POST 요청
         * 엔드포인트: ${API_BASE_URL}/api/auth/login
         */
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // 서버의 DTO 규격(studentId)에 맞춰 데이터 맵핑
            body: JSON.stringify({
                studentId: email,
                password: password,
            }),
        });

        // 응답 본문 파싱
        const data = await response.json();

        /**
         * HTTP 상태 코드 및 성공 여부 검증
         * response.ok: 200-299 상태 코드 확인
         * data.success: 백엔드에서 정의한 비즈니스 로직 성공 여부 확인
         */
        if (response.ok && data.success) {
            return data;
        } else {
            // 서버에서 전달한 에러 메시지가 있을 경우 이를 활용하여 예외를 던짐
            throw new Error(data.message || "로그인에 실패했습니다.");
        }
    } catch (error) {
        // 네트워크 단절이나 서버 다운 등 예기치 못한 통신 에러 로그 출력
        console.error("API 통신 에러:", error);

        // 에러를 상위 컨트롤러(useLogin 훅)로 전파하여 UI에 피드백을 주도록 함
        throw new Error(error.message || "서버와 통신할 수 없습니다.");
    }
};