const setLocalVar = (name, value = "") => {
  localStorage.getItem(name) === undefined
    ? localStorage.setItem(name, value)
    : null;
};

const setLocalVars = (obj) => {
  if (typeof a === "object" || obj.length > 0) {
    obj.map((o) => {
      console.log(o.value)
      setLocalVar(o.name, o.value);
    });
  } else {
    console.error("Formato incorrecto!");
  }
};

export { setLocalVar, setLocalVars };
