"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calculatePi_1 = require("../apis/pi/calculatePi");
const getPi_1 = require("../apis/pi/getPi");
const piRouter = express_1.default.Router();
piRouter.get("/v1/getPi", getPi_1.getPi);
piRouter.post("/v1/calculatePi", calculatePi_1.calculatePi);
exports.default = piRouter;
//# sourceMappingURL=pi.js.map