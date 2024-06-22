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
exports.getPi = void 0;
const data_1 = require("../../data");
const getFirestoreSnapshot_1 = require("../../firebase-utils/getFirestoreSnapshot");
const getPi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const props = {
        collectionName: data_1.COLLECTION_NAMES.PI_VALUES,
        orderByKey: "piValues",
    };
    try {
        const response = yield (0, getFirestoreSnapshot_1.getFirestoreSnapshot)(props);
        // example response
        // [{"docId":"2Q9E9CCr3bb5cVZTPc8Y","docData":{"method":"gregory","piValues":3.058402765927333}},{"docId":"vgWE8HcZGEQajV66mHCQ","docData":{"piValues":3.121594652591011,"method":"gregory"}}]
        let nearestPiValue = 0;
        let smallestPiDifferences = 100000;
        response
            .map((eachDoc) => {
            return eachDoc.docData;
        })
            .map((eachDoc) => {
            // ensure the number is always positive num
            const isNearerNumber = eachDoc.piValues > Math.PI
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
    }
    catch (error) {
        return res.json({
            data: null,
            error: "Error getting a snapshot.",
        });
    }
});
exports.getPi = getPi;
//# sourceMappingURL=getPi.js.map