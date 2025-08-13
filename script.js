// 전역 변수 선언
let selectedIndustry = '';
let currentQuestions = [];
let answers = {};

// 설문 데이터 구조 (25개 문항: 공통 10개 + 업종별 15개)
const surveyData = {
    common: [
        {
            question: "우리 매장의 주요 고객을 한 문장으로 설명할 수 있다.",
            example: {
                wrong: "20~40대 여성",
                right: {
                    fb: "점심시간이 짧은 직장인",
                    medical: "허리 통증이 있는 30대 워킹맘", 
                    fitness: "출산 후 체형 관리가 필요한 30대 여성"
                }
            },
            options: [
                "전혀 정의되지 않았다",
                "나이·성별 등만 포함되어 있다",
                "직업 등은 포함했으나 상황은 모호하다",
                "상황과 고민이 일부 반영되어 있다",
                "명확한 상황+고민 중심으로 뾰족하게 정의되어 있다"
            ]
        },
        {
            question: "우리 매장만의 상품/서비스는 차별점이 명확하다.",
            example: {
                right: {
                    fb: "ㅇㅇ먹을 땐 우리 매장",
                    medical: "ㅇㅇ분야 특화 진료 + 완치까지 개인별 관리",
                    fitness: "개인별 운동 처방 + 홈 트레이닝 가이드"
                }
            },
            options: [
                "차별점이 전혀 없다",
                "약간의 차이는 있으나 모호하다",
                "차별점은 있으나 고객이 인지하기 어렵다",
                "고객이 어느 정도 인지할 수 있다",
                "고객이 명확히 인지하고 선택 이유가 된다"
            ]
        },
        {
            question: "고객이 우리 매장을 재방문하는 명확한 이유가 있다.",
            example: {
                right: {
                    fb: "단골 고객만을 위한 특별한 메뉴/서비스",
                    medical: "치료 후 관리 프로그램 + 건강 관리 시스템",
                    fitness: "개인별 목표 달성 프로그램 + 성과 추적"
                }
            },
            options: [
                "재방문 이유가 불분명하다",
                "가격이나 위치 등 소극적 이유",
                "서비스나 품질의 일반적 만족",
                "특별한 경험이나 혜택 제공",
                "다른 곳에서 대체 불가능한 가치 제공"
            ]
        },
        {
            question: "고객의 평생가치(CLV)를 정확히 파악하고 있다.",
            example: {
                right: {
                    fb: "평균 고객이 6개월간 15만원 소비",
                    medical: "환자 1명당 연간 치료비 80만원",
                    fitness: "회원 1명당 평균 12개월 이용 120만원"
                }
            },
            options: [
                "전혀 파악하지 못한다",
                "대략적인 감각만 있다",
                "일부 데이터는 있으나 정확하지 않다",
                "어느 정도 정확히 파악하고 있다",
                "정확한 데이터와 분석 시스템이 있다"
            ]
        },
        {
            question: "고객의 재방문 주기와 패턴을 체계적으로 관리한다.",
            example: {
                right: {
                    fb: "고객별 방문 주기 알림 + 맞춤 프로모션 발송",
                    medical: "치료 스케줄 관리 + 정기 검진 알림",
                    fitness: "운동 주기 분석 + 개인별 동기부여 메시지"
                }
            },
            options: [
                "전혀 관리하지 않는다",
                "간헐적으로 확인만 한다",
                "기본적인 기록은 유지한다",
                "패턴 분석 후 일부 관리한다",
                "체계적 관리 시스템으로 자동화되어 있다"
            ]
        },
        {
            question: "고객 등급별 맞춤형 서비스나 혜택을 제공한다.",
            example: {
                right: {
                    fb: "방문 횟수별 개인 맞춤 메뉴 추천/할인",
                    medical: "치료 이력별 우선 예약 + 맞춤 건강 상담",
                    fitness: "운동 성과별 전문 트레이닝 + 영양 상담"
                }
            },
            options: [
                "모든 고객을 동일하게 대한다",
                "VIP 정도만 구분한다",
                "간단한 등급 구분은 있다",
                "등급별 차별화된 혜택 제공",
                "개인화된 맞춤형 서비스 시스템 운영"
            ]
        },
        {
            question: "고객 불만이나 피드백을 체계적으로 수집하고 개선한다.",
            example: {
                wrong: "불만 발생 시에만 수집",
                right: {
                    fb: "매월 만족도 조사 + 개선사항 피드백",
                    medical: "진료 후 만족도 조사 + 치료 결과 추적",
                    fitness: "운동 효과 평가 + 프로그램 개선 반영"
                }
            },
            options: [
                "피드백 수집 체계가 없다",
                "불만 발생 시에만 대응한다",
                "간헐적으로 의견을 수렴한다",
                "정기적으로 피드백을 수집한다",
                "실시간 피드백 시스템으로 즉시 개선"
            ]
        },
        {
            question: "경쟁업체 대비 우리의 강점을 고객이 명확히 인식한다.",
            example: {
                right: {
                    fb: "ㅇㅇ하면 이 집이 최고라서 선택",
                    medical: "ㅇㅇ치료엔 이 병원이 전문이라서 선택",
                    fitness: "개인별 관리가 체계적이고 세심해서 선택"
                }
            },
            options: [
                "경쟁업체와 차이가 없다",
                "약간의 차이만 있다",
                "일부 고객만 인식한다",
                "대부분 고객이 어느 정도 인식한다",
                "모든 고객이 명확히 인식하고 선택한다"
            ]
        }
    ],
    industries: {
        fb: [
            // F&B 업종별 질문들 (기존 내용 그대로)
            {
                question: "우리 매장의 시그니처 메뉴나 특화 상품이 있다.",
                example: {
                    wrong: "우리 집은 모든 메뉴가 다 맛있다",
                    right: "할머니 레시피 김치찌개 + 비법 양념장"
                },
                options: [
                    "특화 상품이 없다",
                    "일반적인 인기 메뉴만 있다",
                    "어느 정도 특색있는 메뉴가 있다",
                    "차별화된 시그니처 메뉴가 있다",
                    "고객이 꼭 먹으러 오는 대표 메뉴가 있다"
                ]
            },
            {
                question: "우리 매장의 타겟 고객층이 명확하게 정의되어 있다.",
                example: {
                    wrong: "누구나 와도 된다",
                    right: "직장인 점심식사, 20-30대 여성 브런치"
                },
                options: [
                    "타겟이 전혀 정해지지 않았다",
                    "나이대 정도만 생각한다",
                    "어느 정도 고객층은 파악하고 있다",
                    "명확한 타겟 고객이 있다",
                    "타겟 고객에 최적화된 매장 운영"
                ]
            },
            {
                question: "테이블 회전율 최적화를 위한 체계적 관리를 한다.",
                example: {
                    wrong: "바쁠 때만 서두른다",
                    right: "시간대별 평균 식사시간 분석 + 예약 시스템 연동"
                },
                options: [
                    "관리하지 않는다",
                    "바쁜 시간만 신경쓴다",
                    "기본적인 시간 관리는 한다",
                    "체계적으로 회전율을 관리한다",
                    "예약 시스템과 연동된 최적화 운영"
                ]
            },
            {
                question: "단골손님의 선호 메뉴와 주문 패턴을 파악한다.",
                example: {
                    wrong: "자주 오는 손님을 기억한다",
                    right: "고객별 선호 메뉴 + 방문 시간대 + 동반자 패턴 기록"
                },
                options: [
                    "전혀 파악하지 못한다",
                    "자주 오는 손님 정도만 기억",
                    "일부 단골의 선호도 파악",
                    "주요 단골들의 패턴 관리",
                    "모든 고객의 주문 이력 데이터화"
                ]
            },
            {
                question: "계절별, 시간대별 메뉴 구성과 가격 전략이 있다.",
                example: {
                    wrong: "메뉴는 항상 동일하다",
                    right: "여름 냉메뉴 + 점심 세트메뉴 + 저녁 술안주 메뉴"
                },
                options: [
                    "메뉴 구성 변화가 없다",
                    "계절 메뉴 정도만 있다",
                    "시간대별 메뉴를 일부 운영",
                    "계절/시간별 전략적 메뉴 구성",
                    "데이터 기반 최적화된 메뉴 전략"
                ]
            },
            {
                question: "여러 플랫폼의 리뷰와 평점을 체계적으로 관리한다.",
                example: {
                    wrong: "가끔 리뷰를 확인한다",
                    right: "매일 리뷰 모니터링 + 즉시 답변 + 개선사항 반영"
                },
                options: [
                    "관리하지 않는다",
                    "가끔 확인만 한다",
                    "부정적 리뷰에만 대응",
                    "정기적으로 모니터링하고 대응",
                    "리뷰 관리 전담 시스템 운영"
                ]
            },
            {
                question: "포장, 배달 등 채널별 수익성을 정확히 파악한다.",
                example: {
                    right: "플랫폼 수수료 + 포장재 + 배달비 + 시간 비용 종합 분석"
                },
                options: [
                    "파악하지 않는다",
                    "매출만 확인한다",
                    "기본적인 수익률 계산",
                    "채널별 수익성 분석",
                    "실시간 채널별 수익성 최적화"
                ]
            },
            {
                question: "고객의 재방문을 유도하는 특별한 프로그램이 있다.",
                example: {
                    right: "방문 주기별 맞춤 쿠폰 + 생일 특별 메뉴 + VIP 전용 이벤트"
                },
                options: [
                    "특별한 프로그램이 없다",
                    "간단한 적립 제도만 있다",
                    "기본적인 멤버십 운영",
                    "차별화된 리워드 프로그램",
                    "개인화된 혜택 자동 제공 시스템"
                ]
            },
            {
                question: "식재료 원가 관리와 메뉴 가격 책정이 체계적이다.",
                example: {
                    right: "재료비 + 인건비 + 임대료 + 목표 수익률 종합 계산"
                },
                options: [
                    "감각적으로 책정한다",
                    "기본적인 원가만 계산",
                    "주요 메뉴의 원가 관리",
                    "모든 메뉴의 정확한 원가 관리",
                    "실시간 원가 변동 반영 시스템"
                ]
            },
            {
                question: "매장 분위기와 서비스가 타겟 고객에게 최적화되어 있다.",
                example: {
                    right: "30대 직장인 점심식사를 위한 빠른 주문/결제 + 조용한 환경"
                },
                options: [
                    "특별한 컨셉이 없다",
                    "기본적인 인테리어만 있다",
                    "어느 정도 컨셉은 있다",
                    "타겟에 맞는 분위기 연출",
                    "고객 여정 전체가 최적화되어 있다"
                ]
            },
            {
                question: "지역/상권 특성을 반영한 차별화된 메뉴나 서비스가 있다.",
                example: {
                    right: "지역/상권을 반영한 메뉴 네이밍 + 동네 주민 취향 반영 메뉴"
                },
                options: [
                    "반영할 생각을 해본 적이 없다",
                    "반영할 생각만 해봤다",
                    "반영할 시도는 해봤다",
                    "지역/상권의 특성을 고려한 메뉴가 있다",
                    "지역/상권 대표 맛집으로 인정받는 수준"
                ]
            },
            {
                question: "직원 서비스 교육과 고객 응대 매뉴얼이 체계화되어 있다.",
                example: {
                    right: "상황별 응대 매뉴얼 + 정기 교육 + 서비스 평가 시스템"
                },
                options: [
                    "교육 시스템이 없다",
                    "기본적인 업무 교육만",
                    "서비스 교육은 간헐적으로",
                    "정기적인 서비스 교육 실시",
                    "표준화된 서비스 매뉴얼과 지속 교육"
                ]
            },
            {
                question: "SNS와 고객 유입 목적의 온라인 마케팅을 체계적으로 운영한다.",
                example: {
                    right: "콘텐츠 달력 + 타겟별 맞춤 광고 + 성과 분석"
                },
                options: [
                    "하지 않는다",
                    "가끔 SNS에 포스팅",
                    "정기적인 SNS 운영",
                    "체계적인 콘텐츠 마케팅",
                    "데이터 기반 통합 디지털 마케팅"
                ]
            },
            {
                question: "고객의 대기시간을 최소화하는 시스템이 있다.",
                example: {
                    right: "주문량 예측 + 조리시간 예측 + 대기 알림 시스템"
                },
                options: [
                    "대기시간 관리를 하지 않는다",
                    "바쁜 시간에만 신경쓴다",
                    "기본적인 대기 관리",
                    "효율적인 대기 관리 시스템",
                    "예약과 대기를 통합 관리하는 시스템"
                ]
            },
            {
                question: "매장의 브랜드 아이덴티티가 명확하고 일관성 있게 표현된다.",
                example: {
                    right: "모든 접점에서 일관된 브랜드 경험"
                },
                options: [
                    "브랜드 아이덴티티가 없다",
                    "기본적인 로고나 간판만",
                    "어느 정도 통일된 디자인",
                    "명확한 브랜드 컨셉과 표현",
                    "모든 접점에서 일관된 브랜드 경험"
                ]
            }
        ],
        medical: [
            // 의료 업종별 질문들
            {
                question: "우리 병원의 진료 분야는 시장에서 뚜렷하게 포지셔닝되어 있다.",
                example: {
                    wrong: "내과, 통증 클리닉",
                    right: "30~50대 사무직 대상 '거북목+체형 불균형' 치료 전문 병원"
                },
                options: [
                    "어떤 전문인지 애매하거나 없다",
                    "진료과목은 있지만 브랜딩되지 않았다",
                    "전문성은 있으나 고객은 잘 모른다",
                    "홍보·브랜딩으로 인지도가 있다",
                    "고객이 우리 병원을 분야 대표로 인식한다"
                ]
            },
            {
                question: "진료 전 고객 정보를 기반으로 맞춤 진료가 이루어진다.",
                example: {
                    wrong: "그냥 접수하고 진료",
                    right: "사전 문진표 작성+맞춤 진료 진행"
                },
                options: [
                    "진료 시작 전 별다른 준비 없음",
                    "문진표 작성만 한다",
                    "사전정보 확인은 있으나 단순함",
                    "고객 정보 분석 후 진료 진행함",
                    "고객이 맞춤 진료를 체감할 수 있음"
                ]
            },
            {
                question: "고객의 치료 과정이 체계적이고 단계적으로 제시된다.",
                example: {
                    wrong: "진료 후 끝",
                    right: "1차 진료 → 2주 경과 확인 → 재활 가이드 → 예방법 교육"
                },
                options: [
                    "1회 진료로 끝나는 경우가 많다",
                    "필요시에만 추가 진료 제안한다",
                    "대략적인 치료 계획은 있다",
                    "체계적인 치료 과정을 제시한다",
                    "고객이 전체 여정을 이해하고 따라간다"
                ]
            },
            {
                question: "진료 후 사후관리와 추가 케어 시스템이 운영된다.",
                example: {
                    wrong: "진료 완료 후 별도의 연락 없음",
                    right: "3일 후 컨디션 확인 + 1주 후 경과 체크 + 생활습관 관리 안내"
                },
                options: [
                    "진료 완료 후 연락 없음",
                    "문제 있을 때만 재방문 안내",
                    "간헐적으로 안부 연락",
                    "정기적인 사후관리 연락",
                    "체계화된 단계별 사후관리 프로그램"
                ]
            },
            {
                question: "고객에게 동일한 문제가 재발하지 않도록 하는 예방 솔루션을 제공한다.",
                example: {
                    right: "개인별 예방 운동법 + 생활습관 개선 가이드 + 정기 점검 일정"
                },
                options: [
                    "예방에 대한 안내가 거의 없다",
                    "일반적인 주의사항만 안내",
                    "간단한 예방법 정도 제공",
                    "개인별 맞춤 예방 솔루션 제공",
                    "예방중심 통합관리 프로그램 운영"
                ]
            },
            {
                question: "고객이 치료 과정에서 자신의 상태 변화를 명확히 인식할 수 있다.",
                example: {
                    right: "치료 전후 비교 데이터 + 객관적 지표 + 시각적 자료 제공"
                },
                options: [
                    "주관적 느낌에만 의존",
                    "의사 설명 정도만 있음",
                    "간단한 비교는 가능함",
                    "객관적 데이터로 변화 확인 가능",
                    "고객이 변화를 수치와 시각으로 체감"
                ]
            },
            {
                question: "우리만의 독특한 치료법이나 접근 방식이 있다.",
                example: {
                    right: "특화된 치료 + 맞춤 처방 + 생활패턴 교정법"
                },
                options: [
                    "일반적인 치료만 제공",
                    "약간의 차별점은 있음",
                    "특정 분야에서 독자적 방법 있음",
                    "여러 분야에서 차별화된 접근법",
                    "고객이 우리만의 독특함을 선택 이유로 말함"
                ]
            },
            {
                question: "대기시간 최소화와 예약 시스템이 효율적으로 운영된다.",
                example: {
                    right: "실시간 대기현황 + 예약 시간 준수 + 대기시간 예측 안내"
                },
                options: [
                    "대기시간 관리가 안 됨",
                    "기본적인 예약만 받음",
                    "어느 정도 시간 관리는 함",
                    "효율적인 예약 시스템 운영",
                    "고객이 대기시간 예측 가능한 시스템"
                ]
            },
            {
                question: "진료비와 치료 과정의 투명성이 보장된다.",
                example: {
                    right: "사전 치료계획 + 비용 안내 + 단계별 필요 비용 투명 공개"
                },
                options: [
                    "비용에 대한 사전 안내 없음",
                    "진료 후 비용 안내",
                    "대략적인 비용은 미리 안내",
                    "상세한 비용 구조 사전 설명",
                    "모든 과정과 비용이 완전 투명"
                ]
            },
            {
                question: "고객과의 소통이 원활하고 충분한 설명이 제공된다.",
                example: {
                    right: "환자가 이해할 때까지 설명 + 질문 시간 충분히 제공"
                },
                options: [
                    "설명이 부족하거나 형식적",
                    "기본적인 설명만 제공",
                    "질문하면 어느 정도 답변",
                    "충분하고 이해하기 쉬운 설명",
                    "고객이 완전히 이해하고 납득할 때까지 소통"
                ]
            },
            {
                question: "타 병원과 차별화되는 서비스나 부가가치를 제공한다.",
                example: {
                    right: "홈케어 가이드 및 재발 방지 콘텐츠 제공"
                },
                options: [
                    "차별화 서비스가 없음",
                    "약간의 부가 서비스",
                    "일부 특별한 서비스 제공",
                    "다양한 부가가치 서비스",
                    "고객이 부가가치 때문에 선택하는 수준"
                ]
            },
            {
                question: "치료 효과에 대한 객관적 데이터를 관리하고 활용한다.",
                example: {
                    right: "치료 전후 데이터 + 효과 분석 + 개선점 도출"
                },
                options: [
                    "데이터 관리를 안 함",
                    "기본적인 진료 기록만",
                    "일부 데이터는 관리함",
                    "체계적인 데이터 관리",
                    "데이터 기반 치료 효과 분석 활용"
                ]
            },
            {
                question: "병원 내 시설과 장비가 고객 경험에 최적화되어 있다.",
                example: {
                    right: "편안한 대기공간 + 최신 장비"
                },
                options: [
                    "기본적인 시설만 있음",
                    "필요한 장비는 갖춰져 있음",
                    "어느 정도 쾌적한 환경",
                    "고객 중심으로 설계된 공간",
                    "모든 시설이 고객 경험 극대화에 맞춰짐"
                ]
            },
            {
                question: "온라인과 오프라인 고객 관리가 통합적으로 이루어진다.",
                example: {
                    right: "온라인 예약 + 모바일 상담 + 온라인 건강관리 콘텐츠"
                },
                options: [
                    "오프라인 관리만",
                    "기본적인 온라인 예약 정도",
                    "일부 온라인 서비스 제공",
                    "온오프라인 연계 서비스",
                    "완전 통합된 디지털 고객관리 시스템"
                ]
            },
            {
                question: "고객별 맞춤형 자동화 관리 시스템이 구축되어 있다.",
                example: {
                    right: "치료 일정 자동 알림 + 맞춤 케어 메시지 + 이탈 예측 기반 자동화 메시지/케어 운영"
                },
                options: [
                    "자동화 시스템 전혀 없음",
                    "기본적인 예약 알림 정도",
                    "일부 자동화 서비스",
                    "고객별 맞춤 자동화 일부 운영",
                    "이탈 예측 기반 자동화 메시지/케어 운영"
                ]
            }
        ],
        fitness: [
            // 피트니스 업종별 질문들
            {
                question: "우리 센터는 명확한 타겟 고객을 대상으로 서비스를 설계하고 있다.",
                example: {
                    right: "허리 통증 겪는 30~50대 직장 여성 대상 체형 교정 필라테스"
                },
                options: [
                    "특정 대상 없이 모두에게 마케팅 중",
                    "연령대 정도만 구분함",
                    "고객 유형은 있지만 수업이나 메시지에 반영되지 않음",
                    "특정 타겟 중심으로 콘텐츠와 수업이 구성됨",
                    "고객도 스스로 '나 같은 사람을 위한 센터'라 느낀다"
                ]
            },
            {
                question: "우리가 제공하는 수업은 다른 센터에서 쉽게 따라할 수 없는 강점이 있다.",
                example: {
                    right: "족저근막염 전문 회복 운동, 출산 후 골반 회복 루틴"
                },
                options: [
                    "대부분 센터와 유사한 구성",
                    "차별화를 시도했지만 아직 미약함",
                    "특정 클래스에서 차별성 있음",
                    "전반적인 커리큘럼이 차별화되어 있음",
                    "고객이 우리 수업의 독보적 특성을 설명할 수 있음"
                ]
            },
            {
                question: "고객의 현재 신체 상태와 생활 습관을 정확히 진단하는 프로세스가 있다.",
                example: {
                    right: "문진표+자세 체크+생활 루틴 인터뷰 후 분석 리포트 제공"
                },
                options: [
                    "운동 전 별다른 진단 없음",
                    "간단한 체크리스트만 있음",
                    "측정은 하지만 수업에 반영되지 않음",
                    "수업 설계에 진단 결과가 반영됨",
                    "진단 결과로 고객이 현재 상태를 명확히 인식함"
                ]
            },
            {
                question: "고객의 운동 목표는 단순히 체중이나 근육량이 아니라 감정적 니즈까지 포함한다.",
                example: {
                    right: "허리 통증 없이 퇴근하고 싶어요, 드레스를 입을 때 당당해지고 싶어요"
                },
                options: [
                    "단순히 체중 감량만 목표로 설정",
                    "체형 개선 정도만 강조함",
                    "목표 설정은 있지만 감정적인 측면은 부족함",
                    "감정 포함 목표 설정을 시도하고 있음",
                    "고객의 감정까지 구체적으로 반영된 목표를 설정함"
                ]
            },
            {
                question: "고객의 운동 목표는 구체적이고 수치+행동+감정이 포함된 형태로 기록된다.",
                example: {
                    right: "8주 내 허벅지 둘레 -3cm + 근무 시 목 통증 제로"
                },
                options: [
                    "목표 설정 자체가 없음",
                    "체중/근육량 중심 수치만 기록됨",
                    "일부 행동 기반 목표 반영됨",
                    "목표에 감정/습관 변화도 포함됨",
                    "고객이 목표를 완전히 이해하고 동기부여됨"
                ]
            },
            {
                question: "운동 진행 중 주간/월간 단위로 피드백을 제공하는 시스템이 있다.",
                example: {
                    right: "주간 체크 메시지 + 월간 바디 리포트 + 맞춤 제안"
                },
                options: [
                    "피드백 전혀 없음",
                    "트레이너 구두 피드백만 있음",
                    "비정기적인 피드백 있음",
                    "정기적인 피드백이 시스템화됨",
                    "피드백 결과에 따라 수업 내용이 조정됨"
                ]
            },
            {
                question: "고객의 신체뿐 아니라 감정, 스트레스, 수면, 식습관 등 다양한 요소가 수업에 반영된다.",
                example: {
                    right: "야간 스트레칭 루틴, 업무스트레스 완화 루틴 포함"
                },
                options: [
                    "신체만 고려한 수업 구성",
                    "피드백 시 언급되지만 수업 반영은 약함",
                    "트레이너에 따라 간헐적 반영됨",
                    "특정 수업에서 감정/습관 요소 반영됨",
                    "전반적인 커리큘럼에서 감정·습관 요소가 일관되게 녹아 있음"
                ]
            },
            {
                question: "수업 중 제공되는 설명이나 운동 설계는 전문성을 기반으로 한다.",
                example: {
                    right: "해부학적 설명 + 일상활용 가이드 동시 제공"
                },
                options: [
                    "설명 거의 없음",
                    "단순한 구호 위주 설명",
                    "일부 동작에만 전문 해설 제공됨",
                    "전반적으로 이해하기 쉬운 설명 제공됨",
                    "고객이 배우는 느낌을 받고, 질문을 자주 함"
                ]
            },
            {
                question: "회원이 자신의 변화 과정을 스스로 체감하고 인식할 수 있도록 안내하고 있다.",
                example: {
                    right: "비포-애프터 사진, 점검 리포트 제공"
                },
                options: [
                    "변화 과정을 전달하지 않음",
                    "고객 스스로 느끼는 데 의존",
                    "변화가 있을 때만 설명",
                    "정기적 설명 있지만 시각적 전달 부족",
                    "고객이 변화 데이터를 보고 동기부여 받음"
                ]
            },
            {
                question: "수업 이후에도 고객과의 연결이 유지되는 사후관리 콘텐츠/피드백이 운영된다.",
                example: {
                    right: "수업 요약 메시지 전송, 3일 뒤 맞춤 피드백 메시지 자동 전송"
                },
                options: [
                    "수업 후 아무 접점 없음",
                    "예약 안내 정도의 알림만 보냄",
                    "정기성은 없지만 피드백 제공",
                    "일부 고객 대상으로 수업 연계 콘텐츠 제공",
                    "전 회원 대상 사후 피드백/콘텐츠 자동 운영 중"
                ]
            },
            {
                question: "센터가 전달하는 마케팅 메시지는 강점과 타겟에 대해 명확하고 일관성 있다.",
                example: {
                    right: "모든 채널에 일관되게 표현됨"
                },
                options: [
                    "콘텐츠마다 포지션이 달라 고객 혼란",
                    "강점은 있지만 일관성이 없음",
                    "일관성 있게 표현하려 시도 중",
                    "모든 채널에서 동일 메시지 사용",
                    "고객이 그 메시지를 스스로 표현함"
                ]
            },
            {
                question: "고객도 우리가 어떤 분야에 전문화되어 있는지 정확히 인지하고 있다.",
                example: {
                    right: "후기나 입소문에서 특정 문제 해결 전문가로 언급됨"
                },
                options: [
                    "고객이 우리 강점을 말하지 못함",
                    "강점은 있지만 고객 인식 낮음",
                    "고객 중 일부는 이해함",
                    "후기나 대화에서 강점이 자주 언급됨",
                    "신규 고객이 강점 듣고 찾아옴"
                ]
            },
            {
                question: "회원별 운동 결과/과정 데이터를 수치화하고 관리한다.",
                example: {
                    right: "운동 출석률 / 체형 변화 점수 / 목표 달성율"
                },
                options: [
                    "데이터를 수집하지 않음",
                    "수기로 기록하지만 체계화 안됨",
                    "일부 고객만 기록 중",
                    "전체 고객 대상 수치화 기록 운영",
                    "고객도 내 데이터를 인지하고 활용함"
                ]
            },
            {
                question: "수업 준비나 마케팅 전략에 실제 데이터가 활용되고 있다.",
                example: {
                    right: "이탈고객 분석 → 루틴 개선, 상위 고객 분석 → 마케팅 타겟 조정"
                },
                options: [
                    "직관에 따라 수업 진행함",
                    "고객 피드백은 있지만 반영 안 됨",
                    "고객 피드백 부분적 참고만 함",
                    "데이터 기반 수업 구성 일부 진행 중",
                    "고객 피드백 기반 자동화된 분석 활용 중"
                ]
            },
            {
                question: "회원 관리, 수업 안내, 재방문 유도 등 전반에 자동화된 시스템이 적용되어 있다.",
                example: {
                    right: "3일 미참여 시 자동 리마인드 메시지, 목표별 케어 메시지 자동 전송"
                },
                options: [
                    "전혀 자동화되어 있지 않음",
                    "수기 관리 위주로 운영",
                    "예약만 자동 시스템 있음",
                    "수업·알림·이탈 관리 일부 자동화됨",
                    "고객별 상황에 따라 전방위 자동화 시스템 구축"
                ]
            }
        ]
    }
};

// 점수별 상세 진단 정보
const detailedGradeInfo = {
    0: {
        title: "위험 단계",
        class: "grade-danger",
        status: "현재 시장에서 경쟁력이 매우 부족한 상태입니다. 고객 관리 시스템과 차별화 전략의 전면적인 개선이 시급합니다.",
        improvements: [
            "고객 정의부터 다시 시작해야 합니다",
            "기본적인 고객 관리 시스템 구축이 필요합니다",
            "최소한의 차별화 포인트라도 만들어야 합니다",
            "고객 데이터 수집과 분석 체계를 갖춰야 합니다",
            "재방문 유도를 위한 기본 시스템을 구축하세요"
        ],
        actions: [
            "타겟 고객을 명확히 정의하고 그들의 니즈를 파악하세요",
            "고객 관리 도구를 도입하여 기본 데이터부터 수집하세요",
            "경쟁업체 분석을 통해 차별화 포인트를 찾으세요",
            "고객 재방문을 위한 간단한 혜택 시스템을 만드세요",
            "직원 서비스 교육부터 체계화하세요"
        ]
    },
    1: {
        title: "개선 필요",
        class: "grade-warning", 
        status: "기본적인 시스템은 갖춰져 있으나 체계적인 고객 관리와 차별화가 부족합니다. 단계적 개선을 통해 경쟁력을 높여야 합니다.",
        improvements: [
            "고객 세분화와 맞춤형 서비스가 필요합니다",
            "데이터 기반 의사결정 체계를 구축해야 합니다",
            "고객 재방문 주기 관리가 체계화되어야 합니다",
            "서비스 차별화 포인트를 명확히 해야 합니다",
            "피드백 수집과 개선 프로세스가 필요합니다"
        ],
        actions: [
            "고객 등급별 차별화된 서비스를 설계하세요",
            "고객 방문 패턴을 분석하여 맞춤형 마케팅을 시작하세요",
            "고객 만족도 조사를 정기적으로 실시하세요",
            "경쟁업체 대비 차별화 포인트를 강화하세요",
            "직원 교육을 통해 서비스 품질을 일정하게 유지하세요"
        ]
    },
    2: {
        title: "성장 중",
        class: "grade-info",
        status: "경쟁업체 대비 어느 정도 차별화가 이루어져 있고 기본적인 고객 관리가 되고 있습니다. 시스템을 더욱 정교화하여 시장 점유율을 확대할 때입니다.",
        improvements: [
            "고객 생애가치 관리가 더욱 정교해져야 합니다",
            "자동화된 고객 관리 시스템 도입이 필요합니다",
            "데이터 분석 역량을 강화해야 합니다",
            "브랜드 아이덴티티를 더욱 명확히 해야 합니다",
            "고객 경험의 일관성을 높여야 합니다"
        ],
        actions: [
            "CRM 시스템을 도입하여 고객 관리를 자동화하세요",
            "고객별 맞춤형 마케팅 캠페인을 설계하세요",
            "브랜드 가이드라인을 만들어 일관된 경험을 제공하세요",
            "고객 여정을 매핑하고 각 단계를 최적화하세요",
            "리뷰와 평점 관리를 체계화하세요"
        ]
    },
    3: {
        title: "독점 근접",
        class: "grade-success",
        status: "시장에서 강력한 경쟁력을 갖추고 고객들이 당신을 선택하는 이유가 명확합니다. 이제 시장 독점을 위한 마지막 단계에 접어들었습니다.",
        improvements: [
            "완전 자동화된 고객 관리 시스템 구축",
            "예측 분석을 통한 선제적 고객 관리",
            "개인화 수준을 극대화해야 합니다",
            "고객 커뮤니티 구축과 생태계 확장",
            "지속적 혁신을 위한 R&D 투자"
        ],
        actions: [
            "AI 기반 고객 행동 예측 시스템을 도입하세요",
            "고객 커뮤니티를 구축하여 브랜드 충성도를 높이세요",
            "개인화된 상품/서비스 추천 시스템을 구축하세요",
            "시장 확장을 위한 새로운 채널을 개발하세요",
            "고객 성공 팀을 구성하여 장기 관계를 관리하세요"
        ]
    },
    4: {
        title: "독점 완성",
        class: "grade-excellent",
        status: "축하합니다! 당신은 해당 시장에서 독점적 지위를 확보했습니다. 고객들이 다른 대안을 고려하지 않고 당신을 선택하는 구조가 완성되었습니다.",
        improvements: [
            "시장 지배력 유지를 위한 지속적 혁신",
            "새로운 시장 개척과 사업 확장 검토",
            "고객 평생가치 극대화 전략 고도화",
            "업계 스탠다드 설정자로서의 리더십 발휘",
            "지속 가능한 성장을 위한 조직 역량 강화"
        ],
        actions: [
            "새로운 시장이나 고객 세그먼트로 확장하세요",
            "업계의 베스트 프랙티스를 만들어 리더십을 공고히 하세요",
            "고객과의 관계를 파트너십 수준으로 발전시키세요",
            "지속적 혁신을 위한 조직 문화를 구축하세요",
            "사회적 가치 창출을 통해 브랜드 가치를 높이세요"
        ]
    }
};

// 점수에 따른 등급 결정 함수
function getGradeByScore(percentage) {
    if (percentage >= 0 && percentage <= 20) return 0;
    if (percentage >= 21 && percentage <= 40) return 1;
    if (percentage >= 41 && percentage <= 60) return 2;
    if (percentage >= 61 && percentage <= 80) return 3;
    if (percentage >= 81 && percentage <= 100) return 4;
    return 0;
}

// 답변 기반 개인화 분석 함수
function analyzeAnswers(answers, questions) {
    const improvements = [];
    const strategies = [];
    const weakAreas = [];
    const strongAreas = [];

    // 답변 분석하여 개인화된 피드백 생성
    Object.entries(answers).forEach(([questionIndex, score]) => {
        const question = questions[parseInt(questionIndex)];
        if (score <= 2) {
            weakAreas.push(question.question);
            
            // 업종별 맞춤 분석
            if (selectedIndustry === 'fb') {
                if (question.question.includes('고객') && question.question.includes('정의')) {
                    improvements.push('타겟 고객을 구체적으로 정의하고 세분화해야 합니다');
                    strategies.push('고객의 상황과 고민을 중심으로 페르소나를 재설계하세요');
                }
                if (question.question.includes('차별화') || question.question.includes('시그니처')) {
                    improvements.push('경쟁업체와 구별되는 독특한 메뉴나 서비스가 필요합니다');
                    strategies.push('지역 특성과 고객 니즈를 반영한 시그니처 메뉴를 개발하세요');
                }
                if (question.question.includes('재방문') || question.question.includes('단골')) {
                    improvements.push('고객 재방문을 유도하는 특별한 이유를 만들어야 합니다');
                    strategies.push('개인별 선호도 기반 맞춤 서비스와 리워드 프로그램을 구축하세요');
                }
            } else if (selectedIndustry === 'medical') {
                if (question.question.includes('포지셔닝') || question.question.includes('전문')) {
                    improvements.push('병원의 전문 분야를 명확히 하고 브랜딩해야 합니다');
                    strategies.push('특정 질환이나 연령대에 특화된 전문 클리닉으로 포지셔닝하세요');
                }
                if (question.question.includes('진료') && question.question.includes('맞춤')) {
                    improvements.push('환자별 맞춤형 진료 프로세스가 필요합니다');
                    strategies.push('사전 문진과 검사를 통한 개인별 치료 계획을 수립하세요');
                }
                if (question.question.includes('사후관리') || question.question.includes('예방')) {
                    improvements.push('치료 후 지속적인 관리 시스템이 필요합니다');
                    strategies.push('단계별 사후관리 프로그램과 예방 솔루션을 제공하세요');
                }
            } else if (selectedIndustry === 'fitness') {
                if (question.question.includes('타겟') || question.question.includes('고객')) {
                    improvements.push('명확한 타겟 고객 정의와 맞춤형 서비스 설계가 필요합니다');
                    strategies.push('특정 고민을 가진 고객군을 타겟으로 전문화된 프로그램을 개발하세요');
                }
                if (question.question.includes('차별화') || question.question.includes('독특')) {
                    improvements.push('다른 센터와 구별되는 독특한 운동 프로그램이 필요합니다');
                    strategies.push('특정 문제 해결에 특화된 전문 프로그램을 개발하세요');
                }
                if (question.question.includes('진단') || question.question.includes('측정')) {
                    improvements.push('체계적인 신체 진단과 상태 분석 프로세스가 필요합니다');
                    strategies.push('과학적 측정과 분석을 통한 개인별 운동 처방을 제공하세요');
                }
            }
        } else if (score >= 4) {
            strongAreas.push(question.question);
        }
    });

    return {
        weakAreas,
        strongAreas,
        improvements: improvements.slice(0, 5), // 최대 5개
        strategies: strategies.slice(0, 5) // 최대 5개
    };
}

// 업종 선택
function selectIndustry(industry) {
    selectedIndustry = industry;
    
    // 버튼 상태 업데이트
    document.querySelectorAll('.industry-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // 설문 문항 생성
    generateQuestions();
    
    // UI 업데이트
    document.getElementById('industrySelection').classList.add('hidden');
    document.getElementById('progressSection').classList.remove('hidden');
    document.getElementById('submitSection').classList.remove('hidden');
}

// 설문 문항 생성
function generateQuestions() {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    
    // 공통 문항 + 업종별 문항 결합
    currentQuestions = [...surveyData.common, ...surveyData.industries[selectedIndustry]];
    
    currentQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        
        // 예시 처리: 공통 질문은 업종별 예시, 업종별 질문은 단일 예시
        let rightExample = question.example.right;
        if (typeof rightExample === 'object' && rightExample[selectedIndustry]) {
            rightExample = rightExample[selectedIndustry];
        } else if (typeof rightExample === 'object') {
            // 객체인데 해당 업종이 없으면 첫 번째 값 사용
            rightExample = Object.values(rightExample)[0];
        }
        
        questionDiv.innerHTML = `
            <div class="question-title">Q${index + 1}. ${question.question}</div>
            <div class="example-section">
                <div class="example-title">💡 예시</div>
                <div class="example-content">
                    ${question.example.wrong ? `<div class="example-wrong">❌ ${question.example.wrong}</div>` : ''}
                    <div class="example-right">✅ ${rightExample}</div>
                </div>
            </div>
            <div class="options-grid">
                ${question.options.map((option, optionIndex) => `
                    <button class="option-btn" data-question="${index}" data-value="${optionIndex + 1}">
                        ${optionIndex + 1}점<br>${option}
                    </button>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
    
    // 옵션 버튼 이벤트 리스너 추가
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', selectAnswer);
    });
}

// 답변 선택
function selectAnswer(event) {
    const questionIndex = parseInt(event.target.dataset.question);
    const value = parseInt(event.target.dataset.value);
    
    // 같은 질문의 다른 버튼들 선택 해제
    const questionContainer = event.target.closest('.question-container');
    questionContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 현재 버튼 선택
    event.target.classList.add('selected');
    
    // 답변 저장
    answers[questionIndex] = value;
    
    // 진행 상황 업데이트
    updateProgress();
}

// 진행 상황 업데이트
function updateProgress() {
    const totalQuestions = currentQuestions.length;
    const answeredCount = Object.keys(answers).length;
    const progressPercentage = (answeredCount / totalQuestions) * 100;
    
    document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    document.getElementById('progressText').textContent = `${answeredCount}/${totalQuestions} 문항 완료`;
    
    // 모든 질문에 답변했으면 제출 버튼 활성화
    const submitBtn = document.getElementById('submitBtn');
    if (answeredCount === totalQuestions) {
        submitBtn.classList.add('active');
    } else {
        submitBtn.classList.remove('active');
    }
}

// 결과 표시
function showResults() {
    if (Object.keys(answers).length !== currentQuestions.length) {
        alert('모든 문항에 답변해주세요.');
        return;
    }

    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = currentQuestions.length * 5;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    // 점수별 등급 결정
    const gradeIndex = getGradeByScore(percentage);
    const grade = detailedGradeInfo[gradeIndex];
    
    // 답변 기반 개인화 분석 수행
    const personalizedAnalysis = analyzeAnswers(answers, currentQuestions);
    
    // 결과 섹션 업데이트
    document.getElementById('finalScore').textContent = percentage;
    document.getElementById('finalGrade').textContent = grade.title;
    document.getElementById('finalGrade').className = `grade-badge ${grade.class}`;
    
    // 등급 진행상황 시각화 업데이트
    updateGradeProgress(gradeIndex);
    
    // 현재 상태 분석 업데이트
    document.getElementById('statusAnalysis').textContent = grade.status;
    
    // 핵심 개선 포인트 업데이트
    const improvementPoints = document.getElementById('improvementPoints');
    improvementPoints.innerHTML = '';
    
    const combinedImprovements = [...personalizedAnalysis.improvements];
    if (combinedImprovements.length < 3) {
        grade.improvements.forEach(improvement => {
            if (combinedImprovements.length < 5 && !combinedImprovements.includes(improvement)) {
                combinedImprovements.push(improvement);
            }
        });
    }
        
    combinedImprovements.forEach(improvement => {
        const li = document.createElement('li');
        li.textContent = improvement;
        improvementPoints.appendChild(li);
    });
    
    // 추천 전략 방향 업데이트
    const actionPlan = document.getElementById('actionPlan');
    actionPlan.innerHTML = '';
    
    const combinedStrategies = [...personalizedAnalysis.strategies];
    if (combinedStrategies.length < 3) {
        grade.actions.forEach(action => {
            if (combinedStrategies.length < 5 && !combinedStrategies.includes(action)) {
                combinedStrategies.push(action);
            }
        });
    }
        
    combinedStrategies.forEach(action => {
        const li = document.createElement('li');
        li.textContent = action;
        actionPlan.appendChild(li);
    });
    
    // 섹션 전환
    document.getElementById('surveySection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    // 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 등급 진행상황 시각화 업데이트
function updateGradeProgress(currentGradeIndex) {
    const gradeSteps = document.querySelectorAll('.grade-step');
    
    gradeSteps.forEach((step, index) => {
        const stepGrade = parseInt(step.dataset.grade);
        
        // 모든 클래스 초기화
        step.classList.remove('current', 'completed');
        
        if (stepGrade < currentGradeIndex) {
            step.classList.add('completed');
        } else if (stepGrade === currentGradeIndex) {
            step.classList.add('current');
        }
    });
}

// 설문 재시작
function restartSurvey() {
    // 데이터 초기화
    selectedIndustry = '';
    currentQuestions = [];
    answers = {};
    
    // UI 초기화
    document.querySelectorAll('.industry-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('industrySelection').classList.remove('hidden');
    document.getElementById('progressSection').classList.add('hidden');
    document.getElementById('submitSection').classList.add('hidden');
    document.getElementById('questionsContainer').innerHTML = '';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0/25 문항 완료';
    document.getElementById('submitBtn').classList.remove('active');
    
    // 섹션 전환
    document.getElementById('surveySection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    
    // 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 결과 공유
function shareResults() {
    const scoreElement = document.getElementById('finalScore');
    const gradeElement = document.getElementById('finalGrade');
    
    if (!scoreElement || !gradeElement) {
        alert('먼저 설문을 완료해주세요.');
        return;
    }
    
    const score = scoreElement.textContent.trim();
    const grade = gradeElement.textContent.trim();
    
    if (!score || score === '-' || !grade) {
        alert('먼저 설문을 완료해주세요.');
        return;
    }
    
    const shareText = `시장 독점 진단 결과: ${score}점 (${grade})\n\n당신의 사업 경쟁력을 확인해보세요!\n${window.location.href}`;
    
    // 모바일 환경에서 Web Share API 우선 시도
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        navigator.share({
            title: '시장 독점 진단 결과',
            text: shareText,
            url: window.location.href
        }).catch((error) => {
            console.log('Share failed:', error);
            fallbackCopyTextToClipboard(shareText);
        });
    } else if (navigator.clipboard && window.isSecureContext) {
        // HTTPS 환경에서 클립보드 API 사용
        navigator.clipboard.writeText(shareText).then(() => {
            alert('결과가 클립보드에 복사되었습니다!');
        }).catch(() => {
            fallbackCopyTextToClipboard(shareText);
        });
    } else {
        // 폴백 방식
        fallbackCopyTextToClipboard(shareText);
    }
}

// 폴백 클립보드 복사
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
            alert('결과가 클립보드에 복사되었습니다!');
        } else {
            showShareModal(text);
        }
    } catch (err) {
        document.body.removeChild(textArea);
        showShareModal(text);
    }
}

// 공유 모달 표시
function showShareModal(text) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 25px;
            border-radius: 15px;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">결과 공유하기</h3>
            <textarea readonly style="
                width: 100%;
                height: 120px;
                padding: 12px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 14px;
                resize: none;
                font-family: inherit;
                line-height: 1.4;
                box-sizing: border-box;
            ">${text}</textarea>
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="this.closest('div').parentElement.remove()" style="
                    padding: 12px 24px;
                    background: #7C3AED;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#6d28d9'" onmouseout="this.style.background='#7C3AED'">닫기</button>
            </div>
            <p style="font-size: 12px; color: #64748b; margin: 15px 0 0 0; text-align: center; line-height: 1.4;">
                위 텍스트를 복사해서 SNS나 메신저로 공유해보세요.
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 배경 클릭시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // 텍스트 영역 클릭시 전체 선택
    const textarea = modal.querySelector('textarea');
    textarea.addEventListener('click', () => {
        textarea.select();
    });
}

// iframe 높이 자동 조정 (웹플로우 iframe 연동용)
function adjustIframeHeight() {
    if (window.parent && window.parent !== window) {
        try {
            const height = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            
            // 추가 여백을 포함한 높이 계산
            const adjustedHeight = height + 100;
            
            // 부모 window에 높이 정보 전송
            window.parent.postMessage({
                type: 'iframe-height',
                height: adjustedHeight
            }, '*');
            
            // 모바일 환경 추가 조정
            if (window.innerWidth <= 768) {
                window.parent.postMessage({
                    type: 'iframe-height',
                    height: adjustedHeight + 200
                }, '*');
            }
        } catch (e) {
            console.log('iframe height adjustment failed:', e);
        }
    }
}

// 페이지 로드 및 크기 변경 시 높이 조정
document.addEventListener('DOMContentLoaded', adjustIframeHeight);
window.addEventListener('resize', adjustIframeHeight);

// MutationObserver로 DOM 변경 감지하여 높이 조정
const observer = new MutationObserver(() => {
    setTimeout(adjustIframeHeight, 100);
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
});

// 업종 선택, 결과 표시, 재시작 시 높이 조정 트리거
const originalSelectIndustry = selectIndustry;
const originalShowResults = showResults;
const originalRestartSurvey = restartSurvey;

selectIndustry = function(...args) {
    originalSelectIndustry.apply(this, args);
    setTimeout(adjustIframeHeight, 300);
};

showResults = function(...args) {
    const result = originalShowResults.apply(this, args);
    setTimeout(adjustIframeHeight, 300);
    return result;
};

restartSurvey = function(...args) {
    const result = originalRestartSurvey.apply(this, args);
    setTimeout(adjustIframeHeight, 300);
    return result;
};

// 결과 다운로드
function downloadResults() {
    const score = document.getElementById('finalScore').textContent;
    const grade = document.getElementById('finalGrade').textContent;
    const status = document.getElementById('statusAnalysis').textContent;
    
    const improvements = Array.from(document.getElementById('improvementPoints').children)
        .map(li => `• ${li.textContent}`).join('\n');
    
    const strategies = Array.from(document.getElementById('actionPlan').children)
        .map(li => `• ${li.textContent}`).join('\n');
    
    const resultText = `
시장 독점 진단 결과
==================

점수: ${score}점
등급: ${grade}

현재 상태 분석:
${status}

핵심 개선 포인트:
${improvements}

추천 전략 방향:
${strategies}

진단일: ${new Date().toLocaleDateString('ko-KR')}
    `.trim();
    
    const blob = new Blob([resultText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '시장독점진단결과.txt';
    link.click();
}
