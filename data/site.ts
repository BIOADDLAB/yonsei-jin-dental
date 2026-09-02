export type Line = { text: string; strong?: boolean };

export const CLINIC = {
    name: '연세진치과',
    nameEn: 'Yonsei Jin Dental',
    owner: '조진세',
    address: '경기도 여주시 세종로 375-1, 2층',
    lat: 37.2651789,
    lng: 127.6399568,
    tel: '031-883-0045',
    bizNo: '627-02-01230',
    hours: [
        { day: '월 / 수', time: '9:00 ~ 18:00' },
        { day: '화 / 금', time: '9:00 ~ 20:30', note: '야간진료' },
        { day: '토 요 일', time: '9:00 ~ 12:30' },
    ],
    lunch: { day: '점 심 시 간', time: '12:30 ~ 14:00' },
    closedDay: '목요일 휴진',
    notes: ['진료종료 1시간 전 접수마감 / 예약진료'],
    parking: '주차 가능',
};

export const NAV = [
    { label: '병원철학', href: '#philosophy' },
    { label: '특별함', href: '#special' },
    { label: '특화진료', href: '#signature' },
    { label: '의료진소개', href: '#doctor' },
    { label: '학술·연구', href: '#research' },
    { label: '진료안내', href: '#core' },
];

// 우측 하단 고정 버튼
export const FLOATING = [
    { label: '간편상담', href: 'tel:031-883-0045', icon: '/images/i-flo-01.svg' },
    // #ISSUE: 카카오톡은 채널이 없는것 같아서 일단 제외 함
    // { label: '카카오톡', href: 'https://pf.kakao.com/_yonseijin', icon: '/images/i-flo-02.svg' },
    { label: '네이버\n예약', href: 'https://naver.me/59vHMVNw', icon: '/images/i-flo-03.svg' },
];

export const PHILOSOPHY = {
    eyebrow: 'Our Philosophy',
    title: '연세진치과의 진료철학',
    desc: [
        '여주에서 14년, 한 가지 마음으로 진료해 왔습니다.',
        '치아 때문에, 비용 때문에, 두려움 때문에\n치료를 미루는 분이 없기를 바라는 마음입니다.',
    ],
    image: '/images/img-ph.jpg',
    alt: '연세진치과 진료실에서 환자에게 파노라마 영상을 설명하는 모습',
    slides: [
        {
            lead: '',
            title: '환자분의 치아를 먼저 생각합니다',
            body: '가장 좋은 치아는 원래 갖고 있는 환자분의 치아입니다.\n뺄 수 있는 치아라도 살릴 방법이 있다면, 신경치료를 비롯해 할 수 있는 모든 방법을 먼저 찾습니다.\n발치와 임플란트는 언제나 마지막 선택입니다.',
        },
        {
            title: '환자가 결정합니다.',
            body: '무엇을 언제 치료할지,\n그 선택의 주인은 언제나 환자분입니다.',
        },
        {
            title: '덜 아프게 치료합니다.',
            body: '통증과 두려움을 덜어내는 일을\n먼저 생각합니다.',
        },
    ],
};

type SpecialCareItem = {
    no: string;
    tone: 'light' | 'dark';
    title: string[];
    highlight?: string;
    body: Line[];
    image: string;
    alt: string;
    imagePosition: string;
};

export const SPECIAL_CARE: { eyebrow: string; title: string; items: SpecialCareItem[] } = {
    eyebrow: 'Yonsei JIN Special Care',
    title: '연세진치과의 특별함',
    items: [
        {
            no: '01',
            tone: 'light',
            title: ['환자분의 치아를 먼저 생각합니다'],
            highlight: '가장 좋은 치아는 원래 갖고 있는\n환자분의 치아입니다.',
            body: [
                { text: '뺄 수 있는 치아라도 살릴 방법이 있다면,\n신경치료를 비롯해 ' },
                { text: '할 수 있는 모든 방법을 먼저 찾습니다.', strong: true },
                { text: '\n발치와 임플란트는 언제나 마지막 선택입니다.' },
            ],
            image: '/images/img-sc-01.jpg',
            alt: '연세진치과 원장이 모형으로 칫솔질을 설명하는 모습',
            imagePosition: '50% 50%',
        },
        {
            no: '02',
            tone: 'dark',
            title: ['대학병원급 디지털 첨단 장비로 정밀하게,', '여주 유일 풀아치까지!'],
            highlight: '손끝의 감에만 의존하지 않습니다.',
            body: [
                { text: '수술 전 3D 디지털 진단과 설계를 바탕으로,\n' },
                { text: '계획된 위치에 정확하게 치료합니다.', strong: true },
                { text: '\n잇몸 절개를 최소화하는 디오나비 네비게이션 임플란트,\n그리고 ' },
                {
                    text: '임플란트 4~6개로 한쪽 턱 전체를 다시 세우는\n디오나비 풀아치까지 정밀한 디지털 기술로 진료합니다.',
                    strong: true,
                },
            ],
            image: '/images/img-ex-01.jpg',
            alt: '연세진치과 디지털 진단 장비',
            imagePosition: '50% 50%',
        },
        {
            no: '03',
            tone: 'dark',
            title: ['덜 아픈 치료를 지향합니다'],
            highlight: '아픔을 오래 겪어본 사람은,\n아픈 것을 참는 일이 얼마나 고단한지 압니다.',
            body: [
                { text: '"이 정도는 참으세요"라는 말이 환자분께\n얼마나 무거운지 알기에, ' },
                { text: '연세진치과는 통증과 두려움을\n더는 일을 늘 먼저 생각합니다.', strong: true },
                { text: ' 절개를 줄이고 회복을\n앞당기는 방법으로, 치과에 대한 두려움까지 덜어드립니다.' },
            ],
            image: '/images/img-sc-03.jpg',
            alt: '연세진치과 원장이 외과 진료를 진행하는 모습',
            imagePosition: '50% 50%',
        },
        {
            no: '04',
            tone: 'light',
            title: ['끝까지 책임지는 진료'],
            highlight: '좋은 치료는 환자분의 이야기를\n끝까지 듣는데서 시작한다고 믿습니다.',
            body: [
                {
                    text: '어디가 어떻게 불편하신지 충분히 듣고, 무엇을 치료할지는\n언제나 환자분 자신이 결정하실 수 있도록 있는 그대로\n설명드립니다.',
                    strong: true,
                },
                {
                    text: ' 치료가 끝나는 순간까지, 그리고 그 이후로도\n환자분의 구강 건강을 곁에서 책임지고 살펴드립니다.',
                },
            ],
            image: '/images/img-sc-04.jpg',
            alt: '연세진치과 원장이 환자에게 임플란트 계획을 설명하는 모습',
            imagePosition: '50% 50%',
        },
    ],
};

export const SIGNATURE_CARE = [
    { title: '임플란트', image: '/images/img-teeth-01.jpg' },
    { title: '치아교정', image: '/images/img-teeth-02.jpg' },
    { title: '디지털 풀아치', image: '/images/img-teeth-03.jpg' },
    { title: '보철진료', image: '/images/img-teeth-04.jpg' },
];

export const DOCTOR = {
    name: '조진세',
    role: '대표원장',
    image: '/images/img-doc.jpg',
    groups: [
        {
            label: '학력',
            items: ['연세대학교 치과대학 졸업', '통합치의학과 전문의'],
        },
        {
            label: '약력',
            items: [
                '일본 동경치과대학 교환학생 연수',
                '오스템 AIC 임플란트 TRAINING COURSE 수료',
                '유펜엔도연구회 SEMINAR 수료',
                '덴티움 심미보철 SEMINAR 수료',
                '국내 TWEED 교정 COURSE 수료 (한국지회, 서울)',
                '미국 TWEED INTERNATIONAL FOUNDATION',
                '교정 COURSE 수료 (미국 애리조나 투쏜)',
            ],
        },
        {
            label: '',
            items: [
                '한국치과교정연구회 이사',
                '한국치과교정연구회 교수부원',
                '한국치과교정연구회 강원지부 INSTRUCTOR',
                '대한치과보철학회 정회원',
            ],
        },
    ],
};

export const RESEARCH = {
    eyebrow: 'Research & Academic Activities',
    title: '학술·연구',
    desc: '연세진치과는 더 안전하고 정확한 치료를\n위해 끊임없이 연구하고 노력합니다.',
    tabs: [
        {
            id: 'in-house',
            label: '원내 학술 활동',
            title: '함께 보는 진료',
            image: '/images/img-card-00.jpg',
            imagePosition: '50% 70%',
            alt: '연세진치과 의료진이 수술 환자 브리핑을 진행하는 모습',
            tagEn: 'Clinical Study',
            items: [
                '매주 수술 환자 브리핑 1회,\n교육 미팅 2회 상시 진행',
                '수술을 앞둔 환자의 상태를 의료진이\n함께 검토하고 준비하는 시스템',
            ],
        },
        {
            id: 'conference',
            label: '대외 학술대회',
            title: '끊임없는 연구와 교류',
            image: '/images/img-card-01.jpg',
            imagePosition: '50% 50%',
            alt: '2025년 정기학술대회 및 정기대의원 총회 참석 단체 사진',
            tagEn: 'Academic Forum',
            items: [
                '사)한국치과교정연구회 정기학술대회 및\n대의원 총회 지속 참석 (2024~2025 등)',
                '최신 임상 지견 공유를 위한 학술 활동 참여',
            ],
        },
        {
            id: 'ortho-research',
            label: '교정 연구 및 교육',
            title: '교정 연구 및 교육',
            image: '/images/img-card-02.jpg',
            imagePosition: '50% 50%',
            alt: '교정 실습 교육에서 참가자들을 지도하는 모습',
            tagEn: 'Ortho Research',
            items: [
                '現 (사)한국치과교정연구회 교수부원 및 강원지부 인스트럭터 활동',
                '국내외 치과의사 대상 KORI 인스트럭터 참여',
                '체계적인 임상 교육 및 실습 지도',
            ],
        },
        {
            id: 'global-training',
            label: '글로벌 교정 연수',
            title: '해외 교정 연수',
            image: '/images/img-card-03.jpg',
            imagePosition: '50% 50%',
            alt: '미국 TWEED 교정 코스 해외 연수 단체 사진',
            tagEn: 'Global Training',
            items: ['미국 애리조나 TWEED 국제 재단 교정 코스 수료', '전문적인 교정학 연수 과정 이수'],
        },
    ],
};

/** 학술·연구 4개 버튼 = 공지사항 섹션의 학술활동 카테고리. 관리자에서 이 id 로 글을 저장한다 */
export const ACADEMIC_CATEGORIES = RESEARCH.tabs.map(({ id, label }) => ({ id, label }));

/** 한 페이지 사이트라 별도 주소가 없다. 팝업 링크는 이 섹션 앵커를 쓴다 */
export const SECTION_ANCHORS = [
    { href: '#philosophy', label: '병원철학' },
    { href: '#special', label: '특별함' },
    { href: '#signature', label: '특화진료' },
    { href: '#doctor', label: '의료진소개' },
    { href: '#research', label: '학술·연구' },
    { href: '#core', label: '진료안내' },
    { href: '#faq', label: '자주 묻는 질문' },
    { href: '#notice', label: '공지사항' },
    { href: '#contact', label: '오시는 길' },
];

/* 핵심역량 5개 탭.
   slides  = 네이비 카드 페이저 (권해드립니다 / 비교 / 진행과정 / 약속)
   systems = 하단 시스템 블록 페이저 */

type CoreSlide = {
    image: string;
    alt: string;
    title: string;
    // 약속 카드의 우측 상단 번호
    no?: number;
    // 체크 리스트형
    items?: string[];
    // 문단형. \n 은 PC 에서만 줄바꿈된다
    body?: string;
    // 약속 카드의 굵은 소제목
    head?: string;
    // 진행과정 스텝. 번호는 렌더링에서 01부터 자동 부여한다
    steps?: string[];
};

type CoreShot = { image: string; alt: string; size: 'wide' | 'narrow' | 'slim' };

type CoreSystem = {
    title: string;
    desc: string;
    devices?: { name: string; sub?: string; desc: string }[];
    shots: CoreShot[];
};

export type CoreTab = {
    id: string;
    label: string;
    title: { top: string; lead?: string; bottom: string };
    desc: Line[];
    expertise?: { title: Line[]; body: string; image: string; alt: string };
    slides: CoreSlide[];
    systems?: CoreSystem[];
};

export const CORE_TABS: CoreTab[] = [
    {
        id: 'navigation-implant',
        label: '네비게이션 임플란트',
        title: { top: '잇몸 절개는 최소로, 정확함은 최대로', lead: '덜 아픈', bottom: '네비게이션 임플란트' },
        desc: [
            {
                text: '수술 전 3D CT와 디지털 설계를 바탕으로,\n미리 계획한 위치에 정확하게 임플란트를 심는 방식입니다.\n',
            },
            {
                text: '잇몸을 넓게 절개하지 않고 최소한의 부위로만 진행하기 때문에,\n통증과 붓기는 줄이고 정확도는 높인 치료입니다',
                strong: true,
            },
        ],
        slides: [
            {
                image: '/images/img-who-01.jpg',
                alt: '연세진치과 네비게이션 임플란트 상담을 안내하는 의료진',
                title: '이런 분께 권해드립니다',
                items: [
                    '정확하고 안전한 임플란트를 원하시는 분',
                    '임플란트 수술의 통증과 부기가 걱정되시는 분',
                    '잇몸 절개에 부담을 느끼시는 분',
                    '당뇨·고혈압 등으로 출혈이나 회복이 걱정되시는 분',
                    '수술 시간을 줄이고 빠르게 일상으로 돌아가고 싶으신 분',
                ],
            },
            {
                image: '/images/img-who-02.jpg',
                alt: '네비게이션 임플란트와 일반 임플란트의 차이를 설명하는 장면',
                title: '일반 임플란트와 무엇이 다를까요?',
                body: '기존 임플란트는 절개로 인해 통증과 붓기, 출혈이 많았습니다.\n네비게이션 임플란트는 3D CT 기반의 정밀 분석과 맞춤형\n가이드를 통해 정확하게 식립하며, 최소 절개로 빠른 회복을 돕습니다.',
            },
            {
                image: '/images/img-who-03.jpg',
                alt: '네비게이션 임플란트 진행 과정을 안내하는 장면',
                title: '진행과정',
                steps: ['정밀 진단', '디지털 설계', '가이드 제작', '무절개 식립', '최종 보철'],
            },
        ],
        systems: [
            {
                title: '디오나비 디지털\n임플란트 시스템',
                desc: '연세진치과는 국내 대표\n디지털 임플란트 시스템인\n디오나비를 활용해\n정밀한 수술을 진행합니다.',
                shots: [
                    { image: '/images/img-ex-01.jpg', alt: '디오나비 디지털 임플란트 수술 계획 장비', size: 'wide' },
                    {
                        image: '/images/img-dio-1000-v.jpg',
                        alt: '환자 구강 스캔을 진행하는 네비게이션 임플란트 진료 장면',
                        size: 'narrow',
                    },
                ],
            },
            {
                title: '디오 1000례\n시술 인증',
                desc: '원장님은 디오나비 시술\n1000례를 달성하였습니다.\n오랜 임상 경험에서 나오는\n정확함으로 환자분의 안전한\n치료를 책임집니다.',
                shots: [
                    {
                        image: '/images/img-dio-1000.jpg',
                        alt: '디오나비 1,000례 달성 인증패 (DIOnavi. Thousand Club, 2024.9)',
                        size: 'wide',
                    },
                    {
                        image: '/images/img-ex-01.jpg',
                        alt: '디오나비 1,000례 달성 인증패',
                        size: 'narrow',
                    },
                ],
            },
        ],
    },
    {
        id: 'orthodontics',
        label: '치아교정',
        title: { top: '나의 상태를 충분히', bottom: '이해하고 시작하는 교정' },
        desc: [
            {
                text: '교정은 짧게는 1년, 길게는 몇 년에 걸친 긴 여정입니다.\n연세진치과는 환자분이 자신의 상태와 치료 과정을 ',
            },
            { text: '충분히 이해하고 스스로 동기부여가 되었을 때,', strong: true },
            { text: '\n정밀한 분석과 치료계획을 거쳐 교정치료를 시작합니다.' },
        ],
        expertise: {
            title: [{ text: '연세진치과', strong: true }, { text: '의 교정 전문성' }],
            body: '연세진치과 원장은 (사)한국치과교정연구회 교수부원 및\n강원지부 인스트럭터로 활동하며, 서울 TWEED 코스에서\n국내외 치과의사들의 실습을 지도하고 있습니다.\n\n교육생으로 시작해 오랜 학술 활동과 임상 경험을 쌓아왔으며,\n구강의 기능과 심미를 함께 고려한 정밀한 교정 치료를 통해\n환자에게 적합한 치료 계획을 세웁니다.',
            image: '/images/img-doc.jpg',
            alt: '연세진치과 조진세 대표원장 교정 진료 소개',
        },
        slides: [
            {
                image: '/images/img-who-01.jpg',
                alt: '연세진치과 치아교정 상담을 안내하는 의료진',
                title: '이런 분께 권해드립니다',
                items: [
                    '치아 배열이나 부정교합이 고민이신 분',
                    '돌출입 등 얼굴 라인까지 개선하고 싶으신 분',
                    '임플란트나 보철 치료를 위해 치아 위치를 바로잡아야 하는 분',
                    '앞니 등 일부만 부분적으로 교정하고 싶으신 분',
                    '성장기 자녀의 교정 시기를 고민하는 부모님',
                ],
            },
            {
                image: '/images/img-who-04.jpg',
                alt: '',
                title: '진행과정',
                steps: ['정밀 진단', '분석 및 상담', '장치 선택 및 부착', '교정 치료', '유지 관리\n(유지장치)'],
            },
        ],
        systems: [
            {
                title: '폭넓은\n교정 범위',
                desc: '성인은 물론 소아·청소년 교정까지,\n전체 교정과 부분 교정을 폭넓게\n진료합니다. 임플란트나 보철 전\n필요한 부분 교정, 앞니 부분 교정 등\n환자분의 상황에 맞는 다양한\n치료가 가능합니다.',
                shots: [
                    { image: '/images/img-ex-03.jpg', alt: '치아교정 장치를 부착한 환자의 미소', size: 'wide' },
                    { image: '/images/img-ex-04.jpg', alt: '치아교정 장치가 부착된 교정 모형', size: 'narrow' },
                ],
            },
            {
                title: '다양한\n장치 선택',
                desc: '환자분의 상태와 선호에 맞춰\n여러 장치를 선택하실 수 있습니다.',
                devices: [
                    { name: '메탈 교정', desc: '가장 기본적이고 효율적인 방식' },
                    { name: '세라믹 자가결찰 교정', sub: '(클리피씨)', desc: '치아색과 유사해 눈에 덜 띄는 방식' },
                    { name: '투명교정', sub: '(세라핀)', desc: '투명하게 착용하고 스스로 탈착이 가능한 방식' },
                ],
                shots: [
                    { image: '/images/img-ex-04.jpg', alt: '치아교정 장치가 부착된 교정 모형', size: 'wide' },
                    { image: '/images/img-ex-03.jpg', alt: '치아교정 장치를 부착한 환자의 미소', size: 'narrow' },
                ],
            },
        ],
    },
    {
        id: 'digital-full-arch',
        label: '디지털 풀아치',
        title: { top: '이가 거의 없어도, 하루 만에\n다시 웃을 수 있습니다', bottom: '디오나비 풀아치 임플란트' },
        desc: [
            { text: '디지털 풀아치는 치아를 대부분 잃은 경우,\n' },
            { text: '임플란트 4~6개로 전체 치아를 회복하는 치료입니다.', strong: true },
            { text: '\n' },
            { text: '틀니의 불편함을 줄이고, 자연스러운 심미와\n씹는 기능', strong: true },
            { text: '을 함께 되찾을 수 있도록 돕습니다.' },
        ],
        slides: [
            {
                image: '/images/img-who-01.jpg',
                alt: '연세진치과 디지털 풀아치 임플란트 상담을 안내하는 의료진',
                title: '이런 분께 권해드립니다',
                items: [
                    '치아를 대부분 잃어 틀니를 고민하고 계신 분',
                    '틀니가 불편해 제대로 씹지 못하시는 분',
                    '전체 임플란트를 원하지만 비용이 부담되시는 분',
                    '잇몸뼈가 부족해 일반 임플란트가 어렵다고 들으신 분',
                    '빠르게 치아 기능과 외모를 회복하고 싶으신 분',
                ],
            },
            {
                image: '/images/img-who-05.jpg',
                alt: '틀니와 전체 임플란트의 차이를 설명하는 장면',
                title: '틀니, 전체 임플란트와 무엇이 다를까요?',
                body: '틀니는 비용이 낮고 회복이 빠른 반면 씹는 힘과 착용감이 아쉽고,\n전체 임플란트는 우수하지만 비용과 회복 기간 부담이 큽니다.\n\n디지털 풀아치는 틀니의 불편함과 전체 임플란트의 높은 비용,\n그 사이의 부담을 덜어주는 현실적인 대안입니다.',
            },
            {
                image: '/images/img-who-06.jpg',
                alt: '디지털 풀아치 진행 과정을 안내하는 장면',
                title: '진행과정',
                steps: [
                    '정밀 진단',
                    '디지털 설계',
                    '임시 보철 제작',
                    '임플란트 식립',
                    '당일 임시\n치아 장착',
                    '최종 보철',
                ],
            },
        ],
        systems: [
            {
                title: '여주 유일,\n디오나비 풀아치 시스템',
                desc: '연세진치과는 여주에서 디오나비\n풀아치 시스템을 도입해 진료하는\n유일한 치과입니다. 정밀한 디지털\n진단과 설계를 바탕으로, 환자 한 분께\n맞는 정확한 치료 계획을 세웁니다.',
                shots: [
                    { image: '/images/img-ex-05.jpg', alt: '디오나비 풀아치 임플란트 식립 모형', size: 'wide' },
                    { image: '/images/img-ex-06.jpg', alt: '풀아치 임플란트 보철 구조 모형', size: 'slim' },
                    { image: '/images/img-ex-07.jpg', alt: '임플란트 구조를 단면으로 보여주는 이미지', size: 'slim' },
                ],
            },
            {
                title: '수술 당일\n임시 치아',
                desc: '수술 전 미리 디지털로 설계하고\n임시 보철을 제작하기 때문에,\n수술 당일 바로 임시 치아를 장착해\n드립니다. 이가 없는 상태로 오래\n지내실 필요 없이, 그날부터 웃고\n식사하실 수 있습니다.',
                shots: [
                    { image: '/images/img-ex-05.jpg', alt: '디오나비 풀아치 임플란트 식립 모형', size: 'slim' },
                    { image: '/images/img-ex-06.jpg', alt: '풀아치 임플란트 보철 구조 모형', size: 'wide' },
                    { image: '/images/img-ex-07.jpg', alt: '임플란트 구조를 단면으로 보여주는 이미지', size: 'slim' },
                ],
            },
            {
                title: '최소한의 임플란트로,\n합리적인 비용',
                desc: '턱 전체에 임플란트를 심는 대신,\n힘을 가장 잘 지탱하는 위치에 4~6개만\n정밀하게 식립합니다. 수술 부담과 비용은\n줄이면서도 안정적으로 치아 전체를\n지지할 수 있습니다.',
                shots: [
                    { image: '/images/img-ex-05.jpg', alt: '디오나비 풀아치 임플란트 식립 모형', size: 'slim' },
                    { image: '/images/img-ex-06.jpg', alt: '풀아치 임플란트 보철 구조 모형', size: 'slim' },
                    { image: '/images/img-ex-07.jpg', alt: '임플란트 구조를 단면으로 보여주는 이미지', size: 'wide' },
                ],
            },
        ],
    },
    {
        id: 'tooth-preservation',
        label: '자연치아 보존원칙',
        title: { top: '가장 좋은 치아는', bottom: '원래 내 치아입니다' },
        desc: [
            {
                text: '임플란트가 아무리 발전해도, 자연치아를 완전히 대신할 수는 없습니다.\n연세진치과는 살릴 수 있는 치아라면 ',
            },
            {
                text: '먼저 보존하는 것을 원칙으로 하며,\n자연치아를 지키기 위한 모든 방법을 먼저 찾습니다.',
                strong: true,
            },
        ],
        slides: [
            {
                image: '/images/img-t4-01.jpg',
                alt: '연세진치과 자연치아 보존 진료를 준비하는 의료진',
                title: '연세진치과의 약속',
                no: 1,
                head: '살릴 수 있는 치아는 먼저 살립니다.',
                body: '신경까지 손상된 치아라도 곧바로 빼지 않고,\n신경치료(근관치료)를 통해 자연치아를 최대한\n보존하는 것을 우선합니다.\n\n발치와 임플란트는 다른 방법으로 치아를 살리기\n어려울 때 선택하는 마지막 단계입니다.',
            },
            {
                image: '/images/img-t4-02.jpg',
                alt: '재신경치료를 검토하는 연세진치과 의료진',
                title: '연세진치과의 약속',
                no: 2,
                head: '어려운 치료라도, 살릴 가능성이 있다면 시도합니다.',
                body: '한 번 신경치료를 받은 치아에 다시\n문제가 생겨도 바로 발치를 권하지 않습니다.\n\n재신경치료는 까다로운 치료지만,\n자연치아를 지킬 가능성이 있다면\n먼저 그 방법을 고려합니다.',
            },
            {
                image: '/images/img-t4-03.jpg',
                alt: '발치 여부를 신중히 판단하는 연세진치과 진료 장면',
                title: '연세진치과의 약속',
                no: 3,
                head: '발치는 신중하게, 환자마다 다르게 판단합니다',
                body: '치아를 빼야 하는 기준은 정해진 공식으로\n나눌 수 없습니다. 치아의 상태, 뿌리와 잇몸뼈의 조건,\n앞으로의 사용 가능성을 하나하나 살펴, 환자분마다\n가장 나은 방향을 신중히 판단합니다.\n\n살릴 수 없는 치아를 무리하게 붙잡지도, 살릴 수 있는 \n치아를 쉽게 포기하지도 않습니다.',
            },
        ],
    },
    {
        id: 'sterilization',
        label: '철저한 위생관리',
        title: { top: '눈에 보이지 않는 곳까지,', bottom: '환자의 안전을 먼저 생각합니다' },
        desc: [
            { text: '치과 치료는 입안의 예민한 조직을 다루는 만큼, 감염 관리가 무엇보다 중요합니다.\n연세진치과는 ' },
            {
                text: '모든 기구와 장비를 원칙에 따라 철저히 멸균·소독하여,\n환자분이 안심하고 치료받으실 수 있는 환경을 유지',
                strong: true,
            },
            { text: '하고 있습니다.' },
        ],
        slides: [
            {
                image: '/images/img-who-10.jpg',
                alt: '연세진치과 진료 기구를 멸균 소독기에 넣어 관리하는 모습',
                title: '연세진치과의 약속',
                no: 1,
                head: '매일 빠짐없이, 철저한 멸균 관리',
                body: '오토클레이브(고압증기 멸균기)와 핸드피스 전용\n멸균 소독기를 매일 빠짐없이 가동하여,\n진료에 사용되는 기구를 철저히 멸균 관리합니다.',
            },
            {
                image: '/images/img-who-11.jpg',
                alt: '개별 파우치에 포장해 멸균한 진료 기구',
                title: '연세진치과의 약속',
                no: 2,
                head: '환자마다 새 기구, 개별 포장 멸균',
                body: '진료에 사용하는 기본 기구(미러, 핀셋, 익스플로러 등)는\n개별 파우치에 포장해 멸균한 뒤,\n환자 한 분마다 새것을 개봉해 사용합니다.\n\n앞선 진료에 쓰인 기구가 다음 환자에게\n그대로 사용되는 일은 없습니다.',
            },
            {
                image: '/images/img-who-12.jpg',
                alt: '핸드피스 전용 멸균기를 운용하는 모습',
                title: '연세진치과의 약속',
                no: 3,
                head: '핸드피스 전용 멸균기 운용',
                body: '입안에서 회전하는 핸드피스는\n감염 관리가 까다로운 장비입니다.\n\n연세진치과는 니트람(Nitram) 핸드피스\n전용 멸균기를 갖추고 체계적으로 멸균·관리하여,\n보이지 않는 부분까지 놓치지 않습니다.',
            },
            {
                image: '/images/img-who-13.jpg',
                alt: '외과 진료용 기구를 멸균 관리하는 모습',
                title: '연세진치과의 약속',
                no: 4,
                head: '수술·발치 기구의 철저한 멸균',
                body: '임플란트 수술과 발치 등 외과 진료에 사용되는\n모든 기구는 엄격한 멸균·소독 과정을 거쳐 관리합니다.',
            },
        ],
    },
];

export const FAQ = [
    {
        category: '네비게이션 임플란트',
        items: [
            {
                q: '기간은 얼마나 걸리나요?',
                a: '진단 후 보통 1~2주 안에 수술을 진행하며, 최종 보철까지는 일반적으로 약 2개월,\n뼈 이식이 필요한 경우 4~6개월까지 소요될 수 있습니다.',
            },
            {
                q: '진행 과정이 어떻게 되나요?',
                a: '정밀 진단 — 3D CT 촬영 및 구강 스캔으로 뼈와 신경, 잇몸 상태를 정확히 분석합니다.\n디지털 설계 — 촬영 데이터를 바탕으로 임플란트의 위치와 각도를 정밀하게 계획합니다.\n가이드 제작 — 설계대로 수술을 안내하는 맞춤 수술 가이드를 제작합니다.\n무절개 식립 — 가이드를 이용해 계획된 위치에 정확하게 임플란트를 심습니다.\n최종 보철',
            },
        ],
    },
    {
        category: '치아교정',
        items: [
            {
                q: '어떤 장치가 저에게 맞나요?',
                a: '치아 상태, 생활 방식, 선호도에 따라 적합한 장치가 다릅니다. 정밀 진단과 상담을 통해 가장 알맞은 방법을 함께 찾아드립니다.',
            },
            {
                q: '성인도 교정이 가능한가요?',
                a: '네. 교정에 나이 제한은 없습니다. 잇몸과 치아뼈가 건강하다면 성인도 얼마든지 교정이 가능합니다.',
            },
        ],
    },
    {
        category: '디지털 풀아치',
        items: [
            {
                q: '정말 임플란트 4~6개로 치아 전체가 지탱되나요?',
                a: '네. 힘을 가장 효율적으로 받는 위치에 임플란트를 배치하기 때문에, 적은 개수로도 안정적으로 전체 치아를 지지할 수 있습니다. 다만 잇몸뼈 상태에 따라 개수는 달라질 수 있습니다.',
            },
            {
                q: '수술 당일 바로 씹을 수 있나요?',
                a: '당일 임시 치아를 장착해 일상생활은 가능하지만, 임플란트가 뼈에 완전히 안정되기 전까지는 부드러운 음식 위주로 드시는 것이 좋습니다.',
            },
            {
                q: '비용은 어떻게 되나요?',
                a: '풀아치 치료는 심는 임플란트 개수와 보철 방식, 잇몸뼈 상태에 따라 환자분마다 달라집니다. 정확한 비용은 정밀 진단과 상담을 통해 안내해 드리니, 편하게 내원해 상담받아 보시길 권해드립니다.',
            },
        ],
    },
    // TODO: 자연치아 보존원칙 / 철저한 위생관리 FAQ 원고 미수령. items 배열만 채우면 바로 노출됨
    { category: '자연치아 보존원칙', items: [] },
    { category: '철저한 위생관리', items: [] },
];
