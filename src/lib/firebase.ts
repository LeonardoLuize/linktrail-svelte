import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  PUBLIC_API_KEY,
  PUBLIC_AUTH_DOMAIN,
  PUBLIC_PROJECT_ID,
  PUBLIC_STORAGE_BUCKET,
  PUBLIC_MESSAGING_SENDER_ID,
  PUBLIC_APP_ID,
  PUBLIC_MEASUREMENT_ID,
} from "$env/static/public";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: PUBLIC_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID,
  measurementId: PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export const analytics = getAnalytics(app);

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("Auth is not initialized or not in browser");
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();