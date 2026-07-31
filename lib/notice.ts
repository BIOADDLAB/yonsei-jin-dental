'use client';

import { useCallback, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, writeBatch } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { isFirebaseReady, requireFirebase } from '@/lib/firebase';

const COLLECTION = 'notices';
const MAX_NOTICES = 15;

export type Notice = {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    content: string;
    order: number;
};

export type NoticeInput = Omit<Notice, 'id' | 'order'> & { order?: number };

export const NOTICE_FALLBACK: Notice[] = [
    {
        id: 'n6',
        title: '주차 이용 안내 공지드립니다.',
        date: '2026-07-15',
        imageUrl: '',
        content: '건물 주차장을 무료로 이용하실 수 있습니다.',
        order: 0,
    },
    {
        id: 'n5',
        title: '비급여 진료비 안내 공지드립니다.',
        date: '2026-07-14',
        imageUrl: '',
        content: '비급여 진료비용을 안내드립니다.',
        order: 1,
    },
    {
        id: 'n4',
        title: '네이버 예약 이용 안내 공지드립니다.',
        date: '2026-07-10',
        imageUrl: '',
        content: '네이버 예약으로 진료 예약이 가능합니다.',
        order: 2,
    },
    {
        id: 'n3',
        title: '여름휴가 휴진 일정 안내 공지드립니다.',
        date: '2026-07-08',
        imageUrl: '',
        content: '여름휴가 기간 동안 휴진합니다.',
        order: 3,
    },
    {
        id: 'n2',
        title: '6월 진료일정 변경 안내 공지드립니다.',
        date: '2026-06-28',
        imageUrl: '',
        content: '6월 넷째 주 진료 일정이 변경됩니다.',
        order: 4,
    },
    {
        id: 'n1',
        title: '6월 휴진안내 공지드립니다.',
        date: '2026-06-25',
        imageUrl: '',
        content: '6월 중 휴진 일정을 안내드립니다.',
        order: 5,
    },
];

export async function fetchNotices(): Promise<Notice[]> {
    if (!isFirebaseReady) return NOTICE_FALLBACK;

    const { db } = requireFirebase();
    const snapshot = await getDocs(query(collection(db, COLLECTION), orderBy('order', 'asc')));
    return snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<Notice, 'id'>),
    }));
}

export async function createNotice(input: NoticeInput) {
    const list = await fetchNotices();
    if (list.length >= MAX_NOTICES) {
        throw new Error(`공지사항은 최대 ${MAX_NOTICES}개까지 등록할 수 있습니다.`);
    }

    const { db } = requireFirebase();
    // 새 글은 맨 위(order: 0), 기존 글 order +1
    const batch = writeBatch(db);
    list.forEach((item) => {
        batch.update(doc(db, COLLECTION, item.id), { order: item.order + 1 });
    });
    const refDoc = doc(collection(db, COLLECTION));
    batch.set(refDoc, {
        title: input.title,
        date: input.date,
        imageUrl: input.imageUrl,
        content: input.content,
        order: 0,
    });
    await batch.commit();
}

export async function updateNotice(id: string, input: NoticeInput) {
    const { db } = requireFirebase();
    await updateDoc(doc(db, COLLECTION, id), {
        title: input.title,
        date: input.date,
        imageUrl: input.imageUrl,
        content: input.content,
    });
}

export async function deleteNotice(id: string) {
    const { db } = requireFirebase();
    await deleteDoc(doc(db, COLLECTION, id));

    // 삭제 후 order 재정렬
    const list = await fetchNotices();
    const batch = writeBatch(db);
    list.forEach((item, index) => {
        batch.update(doc(db, COLLECTION, item.id), { order: index });
    });
    await batch.commit();
}

/** 드래그로 바꾼 순서 저장 */
export async function reorderNotices(orderedIds: string[]) {
    const { db } = requireFirebase();
    const batch = writeBatch(db);
    orderedIds.forEach((id, index) => {
        batch.update(doc(db, COLLECTION, id), { order: index });
    });
    await batch.commit();
}

export async function uploadNoticeImage(file: File) {
    const { storage } = requireFirebase();
    const snapshot = await uploadBytes(ref(storage, `notices/${Date.now()}-${file.name}`), file);
    return getDownloadURL(snapshot.ref);
}

export function useNotices() {
    const [version, setVersion] = useState(0);
    const [state, setState] = useState<{ notices: Notice[]; loading: boolean }>({
        notices: [],
        loading: true,
    });

    useEffect(() => {
        let alive = true;
        fetchNotices()
            .then((notices) => {
                if (alive) setState({ notices, loading: false });
            })
            .catch(() => {
                if (alive) setState({ notices: NOTICE_FALLBACK, loading: false });
            });
        return () => {
            alive = false;
        };
    }, [version]);

    const reload = useCallback(() => setVersion((prev) => prev + 1), []);

    return { notices: state.notices, loading: state.loading, reload };
}
