/**
 * [Model] 인증 관련 API 통신 모듈
 * .env에 설정된 백엔드 주소를 사용합니다.
 */
// Vite 환경 변수 불러오기
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (email, password) => {
    try {
        // 주소 부분을 템플릿 리터럴로 변경
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId: email,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            return data;
        } else {
            throw new Error(data.message || "로그인에 실패했습니다.");
        }
    } catch (error) {
        console.error("API 통신 에러:", error);
        throw new Error(error.message || "서버와 통신할 수 없습니다.");
    }
};