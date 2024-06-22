import express from "express";
import { calculatePi } from "../apis/pi/calculatePi";
import { getPi } from "../apis/pi/getPi";

const piRouter = express.Router();

piRouter.get("/v1/getPi", getPi);
piRouter.post("/v1/calculatePi", calculatePi);

export default piRouter;
