// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDl3KUuA_gEESGzjEy4v6Tth8nbMdIXP2g',
	authDomain: 'scientia-artilce.firebaseapp.com',
	projectId: 'scientia-artilce',
	storageBucket: 'scientia-artilce.appspot.com',
	messagingSenderId: '292185163249',
	appId: '1:292185163249:web:858380ea4f25a756e17050'
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
