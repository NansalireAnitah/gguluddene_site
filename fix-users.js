import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwkxK1meIH0Ud2Pide0c9PQEsWebPWUvs",
  authDomain: "gguluddene.firebaseapp.com",
  projectId: "gguluddene",
  storageBucket: "gguluddene.firebasestorage.app",
  messagingSenderId: "418864999337",
  appId: "1:418864999337:web:fb6468f95c6633b670b2b8",
  measurementId: "G-L6V7HQQSJ9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixUsers() {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    console.log(`Found ${snapshot.size} user documents`);
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() || {};
      const updatedData = {
        name: typeof data.name === 'string' && data.name.trim() ? data.name : "Unknown",
        email: typeof data.email === 'string' && data.email.trim() ? data.email : `unknown_${docSnap.id}@example.com`,
        status: typeof data.status === 'string' && data.status.trim() ? data.status : "pending",
        role: typeof data.role === 'string' && data.role.trim() ? data.role : "user",
        createdAt: typeof data.createdAt === 'string' && data.createdAt.trim() ? data.createdAt : new Date().toISOString()
      };
      await setDoc(doc(db, "users", docSnap.id), updatedData, { merge: true });
      console.log(`Updated user ${docSnap.id}:`, JSON.stringify(updatedData));
    }
    console.log("All users updated");
  } catch (e) {
    console.error("Error fixing users:", e.message, e.stack);
  }
}

fixUsers();