import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCC9gPhwhdELDjTVEWZLbGR9-XnRIaTra8',
    authDomain: 'yonsei-jin-dental.firebaseapp.com',
    projectId: 'yonsei-jin-dental',
    storageBucket: 'yonsei-jin-dental.firebasestorage.app',
    messagingSenderId: '330148754850',
    appId: '1:330148754850:web:8b4122806f6375c89faefb',
};

// 파이어베이스 콘솔 > 프로젝트 설정 > 내 앱 에서 복사한 값을 그대로 붙여넣는다.
// 회사 계정으로 이 객체 값만 통째로 교체한다.
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
// };

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
