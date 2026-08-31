'use client';

import { useCallback, useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { isFirebaseReady, requireFirebase } from '@/lib/firebase';

const COLLECTION = 'academics';

/** 학술활동 글 한 건. id 는 data/site.ts 의 ACADEMIC_CATEGORIES id 와 같다 */
export type Academic = {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    content: string;
};

export type AcademicInput = Omit<Academic, 'id'>;

export type AcademicMap = Record<string, Academic>;

export async function fetchAcademics(): Promise<AcademicMap> {
    if (!isFirebaseReady) return {};

    const { db } = requireFirebase();
    const snapshot = await getDocs(collection(db, COLLECTION));
    return Object.fromEntries(
        snapshot.docs.map((item) => [item.id, { id: item.id, ...(item.data() as AcademicInput) }]),
    );
}

/** 카테고리 id 하나에 글 한 건. 있으면 덮어쓰고 없으면 만든다 */
export async function saveAcademic(id: string, input: AcademicInput) {
    const { db } = requireFirebase();
    await setDoc(doc(db, COLLECTION, id), input);
}

export async function uploadAcademicImage(file: File) {
    const { storage } = requireFirebase();
    const snapshot = await uploadBytes(ref(storage, `academics/${Date.now()}-${file.name}`), file);
    return getDownloadURL(snapshot.ref);
}

export function useAcademics() {
    const [version, setVersion] = useState(0);
    const [state, setState] = useState<{ academics: AcademicMap; loading: boolean }>({
        academics: {},
        loading: true,
    });

    useEffect(() => {
        let alive = true;
        fetchAcademics()
            .then((academics) => {
                if (alive) setState({ academics, loading: false });
            })
            .catch(() => {
                if (alive) setState({ academics: {}, loading: false });
            });
        return () => {
            alive = false;
        };
    }, [version]);

    const reload = useCallback(() => setVersion((prev) => prev + 1), []);

    return { academics: state.academics, loading: state.loading, reload };
}
