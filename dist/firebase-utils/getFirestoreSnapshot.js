"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirestoreSnapshot = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../config/firebase");
/**
 *
 * @param collectionName: string
 * @param objectKey: string
 * @param keyCondition: string | boolean | number
 * @param orderByKey?: string
 * @param orderArrangement?: "asc" | "desc"
 * @param docLimit?: number
 * @returns array of {docId, docData}
 */
const getFirestoreSnapshot = (_a) => __awaiter(void 0, [_a], void 0, function* ({ collectionName, orderByKey, objectKey, orderArrangement = "asc", }) {
    const db = (0, firestore_1.getFirestore)(firebase_1.app);
    try {
        const snapShotData = [];
        const collectionRef = (0, firestore_1.collection)(db, collectionName);
        // todo - orderBy("timeStamp") will throw an error
        const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.orderBy)(orderByKey ? orderByKey : "", orderArrangement));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            snapShotData.push({ docId: doc.id, docData: doc.data() });
        });
        return snapShotData;
    }
    catch (e) {
        return e;
    }
});
exports.getFirestoreSnapshot = getFirestoreSnapshot;
//# sourceMappingURL=getFirestoreSnapshot.js.map