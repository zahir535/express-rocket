"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePiLimit = exports.limit = exports.calculatePiGregory = exports.gregoryRecursion = void 0;
const gregoryRecursion = (iterations) => {
    // pi = pi = 4/1 - 4/3 + 4/5 - 4/7 + 4/9 ....
    let pi = 0;
    let denominator = 1;
    let sign = 1;
    for (let i = 0; i < iterations; i++) {
        pi += sign * (4 / denominator);
        denominator += 2;
        sign *= -1; // alternates the sign
    }
    return pi;
};
exports.gregoryRecursion = gregoryRecursion;
const calculatePiGregory = (iterations) => {
    // Gregory-Leibniz series
    return (0, exports.gregoryRecursion)(iterations);
};
exports.calculatePiGregory = calculatePiGregory;
const limit = (num) => {
    // pi = num * sin(180 / num);
    // Convert the angle to radians
    // todo - check if its possible not to use Math.PI
    const angleInRadians = (180 / num) * (Math.PI / 180);
    // Calculate π using the given formula
    const pi = num * Math.sin(angleInRadians);
    return pi;
};
exports.limit = limit;
const calculatePiLimit = (num) => {
    // limit method
    return (0, exports.limit)(num);
};
exports.calculatePiLimit = calculatePiLimit;
//# sourceMappingURL=helper.js.map