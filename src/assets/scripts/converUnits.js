import { getLocalVar } from "@/assets/scripts/initializeConfig.js";

const addZeros = (val) => (val <= 9 ? `0${val}` : val);

const c2f = (c) => c * (9 / 5) + 32;

const f2c = (t) => (t - 32) * (5 / 9);

const parseUnits = (v) => {
  let res;
  if (getLocalVar("unitsTemp") === "fahrenheit") {
    res = `${parseFloat(c2f(v)).toFixed(2)} °F`;
  } else {
    res = `${parseFloat(v).toFixed(2)} °C`;
  }
  return res;
};

export { c2f, f2c, addZeros, parseUnits };
