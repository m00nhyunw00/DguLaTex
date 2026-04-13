export const MOCK_HISTORY = {
    1: [
        {
            id: 'h1_1', time: 'Today, 10:30 PM', user: 'me', changeDesc: 'Final Polish',
            files: [
                { id: 'h1_1_f1', name: 'main.tex', type: 'file', content: '최종 보고서 완결본입니다.' },
                { id: 'h1_1_d1', name: 'sections', type: 'folder', children: [
                        { id: 'h1_1_f2', name: 'intro.tex', type: 'file', content: '최종 서론' },
                        { id: 'h1_1_d1_1', name: 'logic', type: 'folder', children: [
                                { id: 'h1_1_f3', name: 'algorithm.tex', type: 'file', content: '알고리즘 최종' }
                            ]}
                    ]}
            ]
        },
        {
            id: 'h1_2', time: 'Today, 02:15 PM', user: 'me', changeDesc: 'Added logic section',
            files: [
                { id: 'h1_2_f1', name: 'main.tex', type: 'file', content: '로직 섹션 추가 중...' },
                { id: 'h1_2_d1', name: 'sections', type: 'folder', children: [
                        { id: 'h1_2_f2', name: 'intro.tex', type: 'file', content: '서론 수정' }
                    ]}
            ]
        },
        { id: 'h1_3', time: 'Yesterday, 09:00 PM', user: 'me', changeDesc: 'Fixed bibliography', files: [{ id: 'h1_3_f1', name: 'main.tex', type: 'file', content: '참고문헌 포맷 수정' }] },
        { id: 'h1_4', time: 'Apr 11, 03:00 PM', user: 'me', changeDesc: 'Draft v2', files: [{ id: 'h1_4_f1', name: 'main.tex', type: 'file', content: '두 번째 초안' }] },
        { id: 'h1_5', time: 'Apr 10, 10:00 AM', user: 'me', changeDesc: 'Project Init', files: [{ id: 'h1_5_f1', name: 'main.tex', type: 'file', content: '% 초기 생성' }] }
    ],
    2: [
        {
            id: 'h2_1', time: 'Apr 10, 04:00 PM', user: 'me', changeDesc: 'Completed Scheduler',
            files: [
                { id: 'h2_1_f1', name: 'report.tex', type: 'file', content: '스케줄러 보고서 완료' },
                { id: 'h2_1_d1', name: 'src', type: 'folder', children: [
                        { id: 'h2_1_f2', name: 'sched.cpp', type: 'file', content: 'void main() { // Final }' }
                    ]}
            ]
        },
        { id: 'h2_2', time: 'Apr 09, 05:30 PM', user: 'me', changeDesc: 'Fixed priority bug', files: [{ id: 'h2_2_f1', name: 'report.tex', type: 'file', content: '우선순위 버그 해결' }] },
        { id: 'h2_3', time: 'Apr 08, 01:00 PM', user: 'me', changeDesc: 'Added header files', files: [{ id: 'h2_3_f1', name: 'report.tex', type: 'file', content: '헤더 파일 구성 완료' }] },
        { id: 'h2_4', time: 'Apr 07, 11:00 AM', user: 'me', changeDesc: 'Outline defined', files: [{ id: 'h2_4_f1', name: 'report.tex', type: 'file', content: '전체 아웃라인 잡음' }] },
        { id: 'h2_5', time: 'Apr 06, 09:00 AM', user: 'me', changeDesc: 'Initial Setup', files: [{ id: 'h2_5_f1', name: 'report.tex', type: 'file', content: '% OS 시작' }] }
    ],
    3: [
        {
            id: 'h3_1', time: 'Mar 25, 06:00 PM', user: '이동국', changeDesc: 'ERD Final Version',
            files: [
                { id: 'h3_1_f1', name: 'db_final.tex', type: 'file', content: 'ERD 최종 분석 보고서' },
                { id: 'h3_1_d1', name: 'sql_scripts', type: 'folder', children: [
                        { id: 'h3_1_f2', name: 'schema.sql', type: 'file', content: '-- 최종 스키마' }
                    ]}
            ]
        },
        { id: 'h3_2', time: 'Mar 24, 02:00 PM', user: '이동국', changeDesc: 'Updated SQL types', files: [{ id: 'h3_2_f1', name: 'db_final.tex', type: 'file', content: 'SQL 데이터 타입 수정' }] },
        { id: 'h3_3', time: 'Mar 23, 10:00 AM', user: 'me', changeDesc: 'Added relationship diagram', files: [{ id: 'h3_3_f1', name: 'db_final.tex', type: 'file', content: '관계도 삽입' }] },
        { id: 'h3_4', time: 'Mar 22, 04:00 PM', user: '이동국', changeDesc: '3NF Normalization', files: [{ id: 'h3_4_f1', name: 'db_final.tex', type: 'file', content: '3차 정규화 수행' }] },
        { id: 'h3_5', time: 'Mar 21, 01:00 PM', user: 'me', changeDesc: 'DB Project Started', files: [{ id: 'h3_5_f1', name: 'db_final.tex', type: 'file', content: '% DB 시작' }] }
    ],
    4: [
        {
            id: 'h4_1', time: 'Mar 20, 05:00 PM', user: '박동국', changeDesc: 'Analysis Complete',
            files: [
                { id: 'h4_1_f1', name: 'analysis.tex', type: 'file', content: '정렬 성능 분석 완료' },
                { id: 'h4_1_d1', name: 'bench', type: 'folder', children: [
                        { id: 'h4_1_f2', name: 'quick_sort.py', type: 'file', content: '# Final Test' }
                    ]}
            ]
        },
        { id: 'h4_2', time: 'Mar 19, 11:30 PM', user: 'me', changeDesc: 'Run benchmarks', files: [{ id: 'h4_2_f1', name: 'analysis.tex', type: 'file', content: '벤치마크 데이터 수집' }] },
        { id: 'h4_3', time: 'Mar 18, 08:00 PM', user: '박동국', changeDesc: 'Refactored Python script', files: [{ id: 'h4_3_f1', name: 'analysis.tex', type: 'file', content: '파이썬 코드 리팩토링' }] },
        { id: 'h4_4', time: 'Mar 17, 03:00 PM', user: 'me', changeDesc: 'Added citations', files: [{ id: 'h4_4_f1', name: 'analysis.tex', type: 'file', content: '인용구 추가' }] },
        { id: 'h4_5', time: 'Mar 16, 10:00 AM', user: '박동국', changeDesc: 'Algo Init', files: [{ id: 'h4_5_f1', name: 'analysis.tex', type: 'file', content: '% 알고리즘 과제' }] }
    ],
    5: [
        {
            id: 'h5_1', time: 'Apr 12, 09:00 PM', user: 'me', changeDesc: 'TCP Analysis Finished',
            files: [
                { id: 'h5_1_f1', name: 'network.tex', type: 'file', content: 'TCP/IP 분석 보고서 최종' },
                { id: 'h5_1_d1', name: 'capture', type: 'folder', children: [
                        { id: 'h5_1_f2', name: 'packet.pcap', type: 'file', content: '[Final packet data]' }
                    ]}
            ]
        },
        { id: 'h5_2', time: 'Apr 11, 10:00 PM', user: 'me', changeDesc: 'Captured packets', files: [{ id: 'h5_2_f1', name: 'network.tex', type: 'file', content: '패킷 캡처 완료' }] },
        { id: 'h5_3', time: 'Apr 10, 08:20 PM', user: 'me', changeDesc: 'Setup Lab environment', files: [{ id: 'h5_3_f1', name: 'network.tex', type: 'file', content: '실험 환경 구축' }] },
        { id: 'h5_4', time: 'Apr 09, 02:00 PM', user: 'me', changeDesc: 'Updated Bibliography', files: [{ id: 'h5_4_f1', name: 'network.tex', type: 'file', content: '참고문헌 업데이트' }] },
        { id: 'h5_5', time: 'Apr 08, 11:00 AM', user: 'me', changeDesc: 'Network Start', files: [{ id: 'h5_5_f1', name: 'network.tex', type: 'file', content: '% 네트워크 시작' }] }
    ]
};