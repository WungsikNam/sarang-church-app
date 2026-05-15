import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAeG2JI3Kf1sZZUpsMPr_iUvI5ktROxO4o",
  authDomain: "sarangchurch.firebaseapp.com",
  projectId: "sarangchurch",
  storageBucket: "sarangchurch.firebasestorage.app",
  messagingSenderId: "381342715422",
  appId: "1:381342715422:web:161a1f3f193d5d74a6680f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function loadDoc(key) {
  const snap = await getDoc(doc(db, 'cms', key));
  return snap.exists() ? snap.data().value : null;
}

export async function saveDoc(key, value) {
  await setDoc(doc(db, 'cms', key), { value });
}

export async function uploadPhoto(file, path) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}
