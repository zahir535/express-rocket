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
exports.calculatePi = void 0;
const data_1 = require("../../data");
const utils_1 = require("../../utils");
const firebase_utils_1 = require("../../firebase-utils");
const calculatePi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check available methods or formula to do the calculations
    const isAvailableMethods = req.query.method.toString() === "gregory" ||
        req.query.method.toString() === "limit";
    const calculationMethod = req.query.method && isAvailableMethods
        ? req.query.method.toString()
        : "gregory";
    // check if method is gregory, is iteration value passed in the body ?
    // if not, used the default
    const passedIteration = req.body.iteration !== undefined &&
        typeof req.body.iteration === "number" &&
        req.body.iteration > 0
        ? req.body.iteration
        : undefined;
    const defaultIteration = passedIteration || 50;
    // check if method is limit, is a big number passed in the body ?
    // if not, return error
    const passedBigNumber = req.body.bigNumber !== undefined &&
        typeof req.body.bigNumber === "number" &&
        req.body.bigNumber > 0;
    let calculatedPiValue = undefined;
    if (calculationMethod === "gregory") {
        calculatedPiValue = (0, utils_1.calculatePiGregory)(defaultIteration);
    }
    if (calculationMethod === "limit") {
        if (passedBigNumber) {
            calculatedPiValue = (0, utils_1.calculatePiLimit)(defaultIteration);
        }
        else {
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
    const data = {
        method: calculationMethod,
        piValues: calculatedPiValue,
    };
    const getProps = {
        collectionName: data_1.COLLECTION_NAMES.PI_VALUES,
        data: data,
    };
    (0, firebase_utils_1.saveOneFirestoreDoc)(getProps)
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
});
exports.calculatePi = calculatePi;
//# sourceMappingURL=calculatePi.js.map