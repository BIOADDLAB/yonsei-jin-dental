'use client';

import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { isFirebaseReady, requireFirebase } from '@/lib/firebase';

const COLLECTION = 'notices';

export type Notice = {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
};

export const NOTICE_FALLBACK: Notice[] = [
    { id: 'n6', title: '주차 이용 안내 공지드립니다.', date: '2026-07-15', imageUrl: '' },
    { id: 'n5', title: '비급여 진료비 안내 공지드립니다.', date: '2026-07-14', imageUrl: '' },
    { id: 'n4', title: '네이버 예약 이용 안내 공지드립니다.', date: '2026-07-10', imageUrl: '' },
    { id: 'n3', title: '여름휴가 휴진 일정 안내 공지드립니다.', date: '2026-07-08', imageUrl: '' },
    { id: 'n2', title: '6월 진료일정 변경 안내 공지드립니다.', date: '2026-06-28', imageUrl: '' },
    { id: 'n1', title: '6월 휴진안내 공지드립니다.', date: '2026-06-25', imageUrl: '' },
];

export async function fetchNotices(): Promise<Notice[]> {
    if (!isFirebaseReady) return NOTICE_FALLBACK;

    const { db } = requireFirebase();
    const snapshot = await getDocs(query(collection(db, COLLECTION), orderBy('date', 'desc')));
    return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<Notice, 'id'>) }));
}

export async function createNotice(input: Omit<Notice, 'id'>) {
    const { db } = requireFirebase();
    await addDoc(collection(db, COLLECTION), input);
}

export async function updateNotice(id: string, input: Omit<Notice, 'id'>) {
    const { db } = requireFirebase();
    await updateDoc(doc(db, COLLECTION, id), input);
}

export async function removeNotice(id: string) {
    const { db } = requireFirebase();
    await deleteDoc(doc(db, COLLECTION, id));
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
                if (alive) setState({ notices: [], loading: false });
            });
        return () => {
            alive = false;
        };
    }, [version]);

    const reload = useCallback(() => setVersion((prev) => prev + 1), []);

    return { notices: state.notices, loading: state.loading, reload };
}

export function useAdminUser() {
    const [state, setState] = useState<{ user: User | null; checking: boolean }>({
        user: null,
        checking: isFirebaseReady,
    });

    useEffect(() => {
        if (!isFirebaseReady) return;
        return onAuthStateChanged(requireFirebase().auth, (user) => {
            setState({ user, checking: false });
        });
    }, []);

    return state;
}
