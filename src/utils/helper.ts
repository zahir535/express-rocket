export const gregoryRecursion = (iterations: number) => {
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

export const calculatePiGregory = (iterations: number) => {
  // Gregory-Leibniz series
  return gregoryRecursion(iterations);
};

export const limit = (num: number) => {
  // pi = num * sin(180 / num);
  // Convert the angle to radians
  // todo - check if its possible not to use Math.PI
  const angleInRadians = (180 / num) * (Math.PI / 180);

  // Calculate π using the given formula
  const pi = num * Math.sin(angleInRadians);

  return pi;
};

export const calculatePiLimit = (num: number) => {
  // limit method
  return limit(num);
};
