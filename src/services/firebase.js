import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function submitVictim({ name, phone, address, lat, lng }) {
	if (!name || !phone) throw new Error('Thiếu dữ liệu');
	// Cho phép lat/lng null, address có thể rỗng
	const data = {
		name,
		phone,
		address: address || '',
		location: (lat != null && lng != null) ? { lat, lng } : null,
		createdAt: serverTimestamp()
	};
	return addDoc(collection(db, 'victims'), data);
}

export function listenVictims(callback) {
	const q = query(collection(db, 'victims'), orderBy('createdAt', 'desc'));
	return onSnapshot(q, (snap) => {
		const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
		callback(list);
	});
}
