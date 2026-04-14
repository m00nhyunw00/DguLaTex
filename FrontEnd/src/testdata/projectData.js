/**
 * =================================================================
 * [Data] Global Projects Mock Dataset
 * 설명: 대시보드 리스트 출력 및 에디터 초기 로드를 위한 프로젝트 전체 데이터셋임.
 * * [데이터 구조 설계]
 * - id (Number): 프로젝트 고유 식별자
 * - title (String): 대시보드에 표시될 프로젝트 제목
 * - owner (String): 소유자 식별자 ('me'는 본인, 그 외 이름은 공유받은 프로젝트로 분류)
 * - updated (String): 마지막 수정 일자 (YYYY-MM-DD)
 * - files (Array): 프로젝트 내 파일/폴더의 계층 구조 (Tree Structure)
 * - id (String): 노드 고유 ID (p{project_id}_{f|d}_{index})
 * - name (String): 파일명 또는 폴더명 (확장자 포함)
 * - type (String): 'file' 또는 'folder'로 구분
 * - content (String): 파일일 경우 내포된 텍스트 데이터 (LaTeX 소스 등)
 * - children (Array): 폴더일 경우 하위 노드들을 재귀적으로 포함
 * * [주요 활용 지점]
 * 1. Dashboard: owner 값에 따라 '나의 프로젝트'와 '공유받은 프로젝트' 필터링 수행.
 * 2. Editor: 프로젝트 진입 시 해당 files 배열을 useEditor 훅의 초기 상태로 주입.
 * 3. Search/Sort: title 및 updated 필드를 활용한 리스트 정렬 및 검색 기능의 대상.
 * =================================================================
 */

export const MOCK_PROJECTS = [
    {
        id: 1,
        title: '2026_종합설계_중간보고서',
        owner: 'me',
        updated: '2026-04-13',
        files: [
            { id: 'p1_f1', name: 'main.tex', type: 'file', content: '\\documentclass{article}\n\\begin{document}\n\\section{서론}\n종합설계 최종 수정본입니다.\n\\end{document}' },
            { id: 'p1_d1', name: 'sections', type: 'folder', children: [
                    { id: 'p1_f2', name: 'intro.tex', type: 'file', content: '\\section{Introduction}' },
                    { id: 'p1_d1_1', name: 'logic', type: 'folder', children: [
                            { id: 'p1_f3', name: 'algorithm.tex', type: 'file', content: '% 알고리즘 상세' }
                        ]}
                ]},
            { id: 'p1_f4', name: 'references.bib', type: 'file', content: '@article{dgu2026}' },
            { id: 'p1_f5', name: 'dgu_style.sty', type: 'file', content: '% DGU Custom Style' }
        ]
    },
    {
        id: 2,
        title: '운영체제_CPU_스케줄러',
        owner: 'me',
        updated: '2026-04-10',
        files: [
            { id: 'p2_f1', name: 'report.tex', type: 'file', content: '\\chapter{OS Project}' },
            { id: 'p2_d1', name: 'src', type: 'folder', children: [
                    { id: 'p2_f2', name: 'sched.cpp', type: 'file', content: 'void main(){}' },
                    { id: 'p2_d1_1', name: 'headers', type: 'folder', children: [
                            { id: 'p2_f3', name: 'sched.h', type: 'file', content: 'class Scheduler;' }
                        ]}
                ]},
            { id: 'p2_f4', name: 'readme.md', type: 'file', content: '# OS Task' },
            { id: 'p2_f5', name: 'test.py', type: 'file', content: 'import os' }
        ]
    },
    {
        id: 3,
        title: '데이터베이스_ER모델링',
        owner: '이동국',
        updated: '2026-03-25',
        files: [
            { id: 'p3_f1', name: 'db_final.tex', type: 'file', content: '\\section{ERD Analysis}' },
            { id: 'p3_d1', name: 'sql_scripts', type: 'folder', children: [
                    { id: 'p3_f2', name: 'schema.sql', type: 'file', content: 'CREATE TABLE users...' },
                    { id: 'p3_d1_1', name: 'data', type: 'folder', children: [
                            { id: 'p3_f3', name: 'seed.sql', type: 'file', content: 'INSERT INTO...' }
                        ]}
                ]},
            { id: 'p3_f4', name: 'erd.png', type: 'file', content: '[ERD Image Binary]' },
            { id: 'p3_f5', name: 'notes.txt', type: 'file', content: 'Meeting minutes for DB' }
        ]
    },
    {
        id: 4,
        title: '알고리즘_정렬_연구',
        owner: '박동국',
        updated: '2026-03-20',
        files: [
            { id: 'p4_f1', name: 'analysis.tex', type: 'file', content: '\\section{Sorting Efficiency}' },
            { id: 'p4_d1', name: 'bench', type: 'folder', children: [
                    { id: 'p4_f2', name: 'quick_sort.py', type: 'file', content: 'def qsort():' },
                    { id: 'p4_d1_1', name: 'raw_data', type: 'folder', children: [
                            { id: 'p4_f3', name: 'results.csv', type: 'file', content: 'time,1.2ms' }
                        ]}
                ]},
            { id: 'p4_f4', name: 'main.tex', type: 'file', content: '\\input{analysis}' },
            { id: 'p4_f5', name: 'biblio.bib', type: 'file', content: '' }
        ]
    },
    {
        id: 5,
        title: '네트워크_패킷_분석',
        owner: 'me',
        updated: '2026-04-12',
        files: [
            { id: 'p5_f1', name: 'network.tex', type: 'file', content: '\\section{TCP/IP Analysis}' },
            { id: 'p5_d1', name: 'capture', type: 'folder', children: [
                    { id: 'p5_f2', name: 'packet.pcap', type: 'file', content: '[Pcap data]' },
                    { id: 'p5_d1_1', name: 'scripts', type: 'folder', children: [
                            { id: 'p5_f3', name: 'analyze.py', type: 'file', content: 'print("Analyzing")' }
                        ]}
                ]},
            { id: 'p5_f4', name: 'flowchart.png', type: 'file', content: '' },
            { id: 'p5_f5', name: 'references.bib', type: 'file', content: '' }
        ]
    }
];