const addZeros = (val) => (val <= 9) ? `0${val}` : val;
const c2f = (c) =>  c * (9 / 5) + 32;

const f2c = (t) => (t - 32) * (5 / 9);

const h2HH = (time) => {

}
export { c2f, f2c, h2HH, addZeros };
