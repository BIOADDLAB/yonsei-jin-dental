'use client';

// 메인 팝업 설정 — Firestore settings/popup 문서 한 건에 탭 배열을 통째로 저장한다.
//  · 읽기는 화면 진입 시 1회. 문서가 없거나 규칙에 막혀도 null 을 돌려주고 팝업만 안 뜬다(화면은 안 죽음)
//  · 이미지는 Storage 의 popups 폴더에 올린다

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { isFirebaseReady, requireFirebase } from '@/lib/firebase';

/** 팝업 탭 하나. imageUrl 은 Firebase Storage 다운로드 주소 */
export interface PopupTab {
    /** 오른쪽 목록에 보이는 짧은 이름. 예: 8월 휴진 안내 */
    label: string;
    imageUrl: string;
    /** 이미지를 눌렀을 때 이동할 주소. 비우면 링크 없이 이미지만 보여준다 */
    linkUrl?: string;
}

export interface PopupSetting {
    enabled: boolean;
    tabs: PopupTab[];
}

/** 탭 최대 개수 — 관리자 화면과 팝업이 같은 값을 본다 */
export const POPUP_MAX_TABS = 5;

/** 권장 이미지 규격. 인스타 세로 게시물(4:5)과 같다 */
export const POPUP_IMAGE_WIDTH = 1080;
export const POPUP_IMAGE_HEIGHT = 1350;

const COLLECTION = 'settings';
const DOCUMENT = 'popup';

export async function getPopupSetting(): Promise<PopupSetting | null> {
    if (!isFirebaseReady) return null;

    try {
        const { db } = requireFirebase();
        const snap = await getDoc(doc(db, COLLECTION, DOCUMENT));
        return snap.exists() ? (snap.data() as PopupSetting) : null;
    } catch {
        return null;
    }
}

export async function savePopupSetting(data: PopupSetting) {
    const { db } = requireFirebase();
    await setDoc(doc(db, COLLECTION, DOCUMENT), data);
}

export async function uploadPopupImage(file: File) {
    const { storage } = requireFirebase();
    const snapshot = await uploadBytes(ref(storage, `popups/${Date.now()}-${file.name}`), file);
    return getDownloadURL(snapshot.ref);
}

/** 교체·삭제된 팝업 이미지를 Storage 에서 지운다. 이미 없으면 조용히 넘어간다 */
export async function deletePopupImage(url: string) {
    if (!url.includes('/o/')) return;
    try {
        const { storage } = requireFirebase();
        await deleteObject(ref(storage, url));
    } catch {}
}
