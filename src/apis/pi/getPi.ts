import { Request, Response } from "express";
import { COLLECTION_NAMES } from "../../data";
import {
  getFirestoreSnapshot,
  getFirestoreSnapshotProps,
} from "../../firebase-utils/getFirestoreSnapshot";
import { PIData } from "./calculatePi";

export const getPi = async (req: Request, res: Response) => {
  const props: getFirestoreSnapshotProps = {
    collectionName: COLLECTION_NAMES.PI_VALUES,
    orderByKey: "piValues",
  };

  try {
    const response = await getFirestoreSnapshot(props);
    // example response
    // [{"docId":"2Q9E9CCr3bb5cVZTPc8Y","docData":{"method":"gregory","piValues":3.058402765927333}},{"docId":"vgWE8HcZGEQajV66mHCQ","docData":{"piValues":3.121594652591011,"method":"gregory"}}]

    let nearestPiValue = 0;
    let smallestPiDifferences = 100000;
    response
      .map((eachDoc: any) => {
        return eachDoc.docData;
      })
      .map((eachDoc: PIData) => {
        // ensure the number is always positive num
        const isNearerNumber =
          eachDoc.piValues > Math.PI
            ? eachDoc.piValues - Math.PI
            : Math.PI - eachDoc.piValues;

        // if the differences is smaller, set the new value
        if (isNearerNumber < smallestPiDifferences)
          nearestPiValue = eachDoc.piValues;
      });

    return res.json({
      data: nearestPiValue,
      error: null,
    });
  } catch (error) {
    return res.json({
      data: null,
      error: "Error getting a snapshot.",
    });
  }
};
