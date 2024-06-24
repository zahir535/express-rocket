import { Request, Response } from "express";
import { COLLECTION_NAMES } from "../../data";
import { calculatePiGregory, calculatePiLimit } from "../../utils";
import { saveOneFirestoreDoc } from "../../firebase-utils";

export type piMethodsTypes = "gregory" | "limit";

export interface PIData {
  method: piMethodsTypes;
  piValues: number;
  values: number;
}

export const calculatePi = async (req: Request, res: Response) => {
  // check available methods or formula to do the calculations
  const isAvailableMethods =
    req.query.method.toString() === "gregory" ||
    req.query.method.toString() === "limit";

  const calculationMethod: piMethodsTypes =
    req.query.method && isAvailableMethods
      ? (req.query.method.toString() as piMethodsTypes)
      : "gregory";

  // check if method is gregory, is iteration value passed in the body ?
  // if not, used the default
  const passedIteration =
    req.body.iteration !== undefined &&
    typeof req.body.iteration === "number" &&
    req.body.iteration > 0
      ? req.body.iteration
      : undefined;
  const defaultIteration: number = passedIteration || 50;

  // check if method is limit, is a big number passed in the body ?
  // if not, return error
  const passedBigNumber =
    req.body.bigNumber !== undefined &&
    typeof req.body.bigNumber === "number" &&
    req.body.bigNumber > 0;

  let calculatedPiValue = undefined;
  if (calculationMethod === "gregory") {
    calculatedPiValue = calculatePiGregory(defaultIteration);
  }

  if (calculationMethod === "limit") {
    if (passedBigNumber) {
      calculatedPiValue = calculatePiLimit(req.body.bigNumber);
    } else {
      return res.json({
        data: null,
        error: "Error in bigNumber key in body.",
      });
    }
  }

  if (calculatedPiValue === undefined) {
    return res.json({
      data: null,
      error: "Error in calculating the Pi.",
    });
  }

  const data: PIData = {
    method: calculationMethod,
    piValues: calculatedPiValue,
    values:
      calculationMethod === "limit" ? req.body.bigNumber : defaultIteration,
  };
  const getProps = {
    collectionName: COLLECTION_NAMES.PI_VALUES,
    data: data,
  };

  saveOneFirestoreDoc<any>(getProps)
    .then((response) => {
      return res.json({
        data: {
          message: "Success",
          result: {
            data: response,
          },
        },
        error: null,
      });
    })
    .catch(() => {
      return res.json({
        data: null,
        error: "Error in saveOneFirestoreDoc",
      });
    });
};
