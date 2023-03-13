import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAtPjjxddPKmJZChQK7rlYnc5HInAv9MI0',
  authDomain: 'weekly-planner-32130.firebaseapp.com',
  projectId: 'weekly-planner-32130',
  storageBucket: 'weekly-planner-32130.appspot.com',
  messagingSenderId: '678653817613',
  appId: '1:678653817613:web:859a27ecd2b3ba47b1f644',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
