"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("firebase/app");
require("dotenv").config();
const firebaseConfig = {
    apiKey: "AIzaSyBjnMrexuMCZL39xojNrqH-gGTsIiD73JE",
    authDomain: "express-naluri.firebaseapp.com",
    projectId: "express-naluri",
    storageBucket: "express-naluri.appspot.com",
    messagingSenderId: "478343526894",
    appId: "1:478343526894:web:f2fadc9bd8872ebe99f6ff",
    measurementId: "G-2J6Z1LHEXV",
};
exports.app = (0, app_1.initializeApp)(firebaseConfig);
//# sourceMappingURL=firebase.js.map