'use client';

import { useCallback, useEffect, useState } from 'react';

export type Notice = {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    content: string;
};

export type NoticeInput = Omit<Notice, 'id'>;

/* ────────────────────────────────────────────────────────────
   공지사항 데이터 계층.
   지금은 목데이터를 브라우저에 보관한다.
   API 가 준비되면 아래 CRUD 네 함수의 본문만 fetch 로 바꾸면 되고
   화면 쪽 코드는 손대지 않아도 된다.
   ──────────────────────────────────────────────────────────── */

const STORAGE_KEY = 'yonseijin.notices';

const SEED: Notice[] = [
    {
        id: 'n1',
        title: '6월 휴진안내 공지드립니다.',
        date: '2026-06-25',
        imageUrl: '',
        content:
            '6월 중 휴진 일정을 안내드립니다.\n\n· 6월 6일(토) 현충일 휴진\n· 6월 20일(토) 학회 참석으로 휴진\n\n방문 전 진료 일정을 확인해 주시기 바랍니다.',
    },
    {
        id: 'n2',
        title: '6월 진료일정 변경 안내 공지드립니다.',
        date: '2026-06-28',
        imageUrl: '',
        content:
            '6월 넷째 주 진료 일정이 아래와 같이 변경됩니다.\n\n· 수요일 진료 시간 9:00 ~ 18:00 → 9:00 ~ 15:00\n\n예약하신 분께는 개별 연락드립니다.',
    },
    {
        id: 'n3',
        title: '여름휴가 휴진 일정 안내 공지드립니다.',
        date: '2026-07-08',
        imageUrl: '',
        content:
            '여름휴가 기간 동안 아래와 같이 휴진합니다.\n\n· 8월 4일(월) ~ 8월 8일(금)\n\n8월 11일(월)부터 정상 진료합니다.',
    },
    {
        id: 'n4',
        title: '네이버 예약 이용 안내 공지드립니다.',
        date: '2026-07-10',
        imageUrl: '',
        content:
            '네이버 예약으로 진료 예약이 가능합니다.\n\n네이버에서 연세진치과를 검색하신 뒤 예약하기를 눌러 주세요.\n예약 변경과 취소도 네이버에서 바로 하실 수 있습니다.',
    },
    {
        id: 'n5',
        title: '비급여 진료비 안내 공지드립니다.',
        date: '2026-07-14',
        imageUrl: '',
        content:
            '비급여 진료비용을 안내드립니다.\n\n자세한 항목과 금액은 내원 시 접수처에 비치된 안내문을 확인해 주시기 바랍니다.',
    },
    {
        id: 'n6',
        title: '주차 이용 안내 공지드립니다.',
        date: '2026-07-15',
        imageUrl: '',
        content:
            '건물 주차장을 무료로 이용하실 수 있습니다.\n\n· 진료 시 2시간 무료\n· 접수처에 차량 번호를 알려 주세요.',
    },
];

const read = (): Notice[] => {
    if (typeof window === 'undefined') return SEED;
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        return saved ? (JSON.parse(saved) as Notice[]) : SEED;
    } catch {
        return SEED;
    }
};

const write = (list: Notice[]) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

const byDateDesc = (a: Notice, b: Notice) => b.date.localeCompare(a.date);

export async function getNotices(): Promise<Notice[]> {
    return [...read()].sort(byDateDesc);
}

export async function createNotice(input: NoticeInput): Promise<Notice> {
    const notice: Notice = { ...input, id: `n${Date.now()}` };
    write([...read(), notice]);
    return notice;
}

export async function updateNotice(id: string, input: NoticeInput): Promise<void> {
    write(read().map((item) => (item.id === id ? { ...input, id } : item)));
}

export async function deleteNotice(id: string): Promise<void> {
    write(read().filter((item) => item.id !== id));
}

/** 목록을 불러오고 다시 불러오는 훅. 표시 컴포넌트는 이것만 쓴다 */
export function useNotices() {
    const [version, setVersion] = useState(0);
    const [state, setState] = useState<{ notices: Notice[]; loading: boolean }>({
        notices: [],
        loading: true,
    });

    useEffect(() => {
        let alive = true;
        getNotices()
            .then((notices) => {
                if (alive) setState({ notices, loading: false });
            })
            .catch(() => {
                if (alive) setState({ notices: [], loading: false });
            });
        return () => {
            alive = false;
        };
    }, [version]);

    const reload = useCallback(() => setVersion((prev) => prev + 1), []);

    return { notices: state.notices, loading: state.loading, reload };
}
