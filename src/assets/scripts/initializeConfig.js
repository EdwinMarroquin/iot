const clearLocalVar = (name) =>
  localStorage.getItem(name) === undefined
    ? localStorage.removeItem(name)
    : null;

const clearAllLocalVar = () => localStorage.clear();

const setLocalVar = (name, value = "") => {
  console.log(name, value);
  localStorage.getItem(name) === undefined ||
  localStorage.getItem(name) === null
    ? localStorage.setItem(name, value)
    : null;
};

const setLocalVars = (obj) => {
  if (typeof obj === "object" && obj.length !== 0) {
    obj.map((o) => {
      setLocalVar(o.name, o.value);
    });
  } else {
    console.error("Formato incorrecto!");
  }
};

const updateLocalVar = (name, value) => localStorage.setItem(name, value);

const getLocalVar = (name) => localStorage.getItem(name);

const getLocalVars = (obj) => {
  if (typeof obj === "object" && obj.length !== 0) {
    return obj.map((o) => {
      return { name: o, value: getLocalVar(o) };
    });
  } else {
    console.error("Formato incorrecto!");
  }
};

const getAllLocalVars = () => localStorage;

export {
  clearLocalVar,
  clearAllLocalVar,
  setLocalVar,
  setLocalVars,
  updateLocalVar,
  getLocalVar,
  getLocalVars,
  getAllLocalVars,
};
