import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore();

const collectionName = "predictions";

export const uploadPredictionResult = async (data: any) => {
    const docRef = firestore.collection(collectionName).doc(data.id);
    await docRef.set(data);
};

export const getPredictionHistoriesFromFirestore = async () => {
    const snapshot = await firestore.collection(collectionName).get();
    return snapshot.docs.map((doc) => doc.data());
};
