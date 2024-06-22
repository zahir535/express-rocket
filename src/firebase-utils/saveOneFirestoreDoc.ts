import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";

interface saveOneFirestoreDocProps<T> {
  collectionName: string;
  data: T;
}

/**
 *
 * @param collectionName: string
 * @param data: T
 * @returns  document id
 */
export const saveOneFirestoreDoc = async <T>({
  collectionName,
  data,
}: saveOneFirestoreDocProps<T>) => {
  const db = getFirestore(app);

  try {
    const collectionRef = collection(db, collectionName);
    return addDoc(collectionRef, data);
  } catch (e) {
    return e;
  }
};
