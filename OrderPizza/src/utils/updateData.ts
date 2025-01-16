import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";

const updateData = async () => {
  const idArr: Array<string> = [
    "5lCtQVeg1OFufbpI24Tq",
    "GUbJizPjowb22rnFFVd2",
    "WtRBVduz6A6RSB6LfeEN",
    "c8vTuOnPNKWeYyJbxTUY",
    "mysVdrCdnqlDWOWS6Cyv",
  ];

  const promises = idArr.map(async (id, index) => {
    try {
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const now = new Date();
        now.setHours(10 + index, 0, 0, 0);

        const currentDate = Timestamp.fromDate(now);
        const updatedData = {
          ...docSnap.data(),
          date: currentDate,
        };

        await updateDoc(docRef, updatedData);
        console.log(`Dokument ${id} zaktualizowany.`);
      } 
    } catch (error) {
      console.error(error);
    }
  });

  await Promise.all(promises);

};

export default updateData;
