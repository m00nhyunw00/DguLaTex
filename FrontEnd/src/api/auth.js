/**
 * [Model] 인증 관련 API 통신 모듈
 * 현재는 백엔드 없이 테스트를 위해 가짜 응답(Mock)을 반환합니다.
 */
export const loginRequest = async (email, password) => {
    // 실제 서버 통신 느낌을 주기 위한 지연 시간 (0.5초)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 정적 계정 검증 로직 (나중에 fetch/axios로 교체)
    if (email === 'dgu' && password === '1234') {
        return { success: true, message: "로그인 성공" };
    } else {
        throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");
    }
};