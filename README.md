# 👩🏻‍💻 DguLaTex 
```
DguLaTeX는 동국대학교 학생 전용 웹 기반 LaTeX 편집 및 협업 툴을 최종 목표로 하고 있습니다.
사용자 친화적인 인터페이스와 실시간 협업 기능을 통해 학술 문서 작성을 지원합니다.
````

## 🙆🏻‍♀️ Team

✨ **2026-1-종설1-8조** ✨

| 구분 | 이름 | 전공 | 역할 | 깃허브 아이디 |
| :--- | :--- | :--- | :--- | :--- |
| **팀장** | 문현우 | 컴퓨터·AI학부 | 프론트엔드 | m00nhyunw00 |
| **팀원** | 정서영 | 컴퓨터·AI학부 | DB 설계 | standupnow |
| **팀원** | 오재원 | 멀티미디어공학과 | 백엔드 | K1N01 |

## 🍎 프로젝트 소개

  * **강의명**: 2026-1 종합설계프로젝트1
  * **기간**: 2026.03.06 \~ 2026.06.19

### 개발 환경 및 기술 스택

**✨ Front-End** <br>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/BS-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">

**✨ Server** <br>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">

**✨ DB** <br>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

-----

### 프로젝트 디렉토리 구조 (MVC)

<details>
<summary>📂 Frontend 구조 (React + Vite)</summary>

| 폴더명                 |           역할            | 설명                                   |
|:--------------------|:-----------------------:|:-------------------------------------| 
| **src/api/**        |      **Protocol**       | 백엔드 통신을 위한 기본 설정 (Axios Instance 등)  |
| **src/services/**   |    **Model (Data)**     | 서버(DB)에 데이터를 요청하는 순수 통신 로직           |
| **src/hooks/**      |     **Controller**      | 비즈니스 로직 처리 및 상태 관리 (Custom Hooks)    | 
| **src/pages/**      |    **View (Layout)**    | 훅과 UI를 조립하여 구성하는 독립적인 화면 단위          | 
| **src/components/** |      **View (UI)**      | 재사용 가능한 순수 디자인 부품 (Atomic Components) |
| **src/testdata/**   |      **Mock Data**      | API 연결 전 사용하는 임시 테스트 데이터 모음          |
| **src/assets/**     |       **Static**        | 로고, 이미지, 아이콘 등 정적 자원 보관              | 
| **pakage.json**     | **Manifest** | 프로젝트 정보, 라이브러리 의존성 및 실행 스크립트 관리 |
| **.env**            | **Environment Variables**   | 서버 주소 등 보안 및 환경 설정 변수 관리 (공개 공유 X) |

</details>

<details>
<summary>📂 Backend 구조 (Node.js Express)</summary>

| 폴더명 | 역할 | 설명 |
| :--- | :---: | :--- |
| **src/models/** | **Model** | DB 스키마 및 테이블 정의 |
| **src/routes/** | **Route** | API 엔드포인트 정의 및 경로 매핑 |
| **src/controllers/** | **Controller** | 실제 데이터 처리 로직 및 응답 반환 |
| **src/app.js** | - | 서버 시작점 및 미들웨어 설정 |

</details>

-----

## ✏️ 사용법

### 1. Git Clone

```bash
git clone [https://github.com/m00nhyunw00/DguLaTex](https://github.com/m00nhyunw00/DguLaTex)
cd DguLaTex
```

### 환경 설정 (최초 1회)

반드시 각 폴더(`FrontEnd`, `BackEnd`)로 이동하여 패키지를 설치해야 합니다.

**✨ Front-End**

```bash
cd FrontEnd
npm install
```

**✨ Back-End**

```bash
cd BackEnd
npm install
```

### 3. 프로젝트 실행

**✨ Front-End**

```bash
cd FrontEnd
npm run dev
# 접속 주소: http://localhost:5173
```

**✨ Back-End**

```bash
cd BackEnd
# 서버 시작 (스크립트에 따라 npm start 또는 npm run dev)
npm start
```

-----

## 🌴 Branch & Commit Convention

### 🌿 Branch Strategy

  * **main**: 배포용 안정 브랜치
  * **develop**: 개발 통합 브랜치 (Default)
  * **feature/**: 개별 기능 개발용 (ex: `feature/login`)
  * **docs**: README 등 문서 작업용

### 🎯 Commit Message Format

  * `feat:` 새로운 기능 추가
  * `fix:` 버그 수정
  * `docs:` 문서 수정
  * `style:` 코드 포맷 변경 (로직 변경 없음)
  * `refactor:` 코드 리팩토링
  * `chore:` 빌드 업무, 패키지 설정 수정 등

-----

## 🎀 Meeting Minutes

[Notion 회의록 확인하기](https://www.notion.so/655509cd9cbf82e7832e01447da3d796?source=copy_link)
