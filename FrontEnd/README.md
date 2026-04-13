# 🎨 Front-End (React + Vite)

사용자가 보는 화면과 데이터를 연결하는 프론트엔드입니다.

### 📁 폴더 구조 및 MVC 역할 분담

| 폴더명 | MVC 역할 | 설명 |
| :--- | :---: | :--- |
| **src/api/** | **Model** | 백엔드 API와 통신하는 함수 모음 (Axios, Fetch 등) |
| **src/assets/** | - | 로고, 이미지, 아이콘, 폰트 등 정적 자원 보관 |
| **src/components/**| **View** | 재사용 가능한 UI 부품 (버튼, 입력창, 모달 등) |
| **src/hooks/** | **Controller**| 로직 처리, 상태 관리, View와 Model 연결 (Custom Hooks) |
| **src/pages/** | **View** | 독립적인 화면 단위 (예: `LoginPage.jsx`, `MainPage.jsx`) |

### 🚀 실행 방법
1. `cd frontend`
2. `npm install` (최초 1회)
3. `npm run dev`

### ⚠️ 주의사항
- **환경 변수**: 백엔드 서버 주소는 `.env` 파일의 `VITE_API_URL`을 참조하세요.
- **코드 분리**: 로직(Controller)은 `hooks`에, 디자인(View)은 `components/pages`에 작성하여 유지보수성을 높입니다.
- **정적 파일**: 브라우저 탭 아이콘이나 이미지 파일은 `src/assets`에 넣고 `import`해서 사용하세요.