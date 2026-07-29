import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBuPOs3HCPoOMj1rIzfHOKd-UMDH3lJdbk',
    authDomain: 'yonseijin-94254.firebaseapp.com',
    projectId: 'yonseijin-94254',
    storageBucket: 'yonseijin-94254.firebasestorage.app',
    messagingSenderId: '435806643066',
    appId: '1:435806643066:web:88c146bb1910031bd42cc3',
    measurementId: 'G-SYKE550K71',
};

export const isFirebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// 값이 비어 있으면 초기화하지 않는다. 파이어베이스 연결 전에도 사이트가 빌드된다.
const app: FirebaseApp | null = isFirebaseReady ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;

export function requireFirebase() {
    if (!app) throw new Error('lib/firebase.ts 의 firebaseConfig 를 먼저 채워 주세요.');
    return { auth: getAuth(app), db: getFirestore(app), storage: getStorage(app) };
}

export const login = (email: string, password: string) =>
    signInWithEmailAndPassword(requireFirebase().auth, email, password);

export const logout = () => signOut(requireFirebase().auth);
