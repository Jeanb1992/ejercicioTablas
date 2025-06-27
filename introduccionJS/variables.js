// String
let miString = "Hola";

// Number
let miNumero = 42;

// Boolean
let miBooleano = true;

// Undefined
let miIndefinido = undefined;

// Null
let miNulo = null;

// Symbol
let miSimbolo = Symbol("descripcion");

// BigInt
let miBigInt = 1234567890n;
console.clear();

console.groupCollapsed("Variables primitivas iniciales");
console.info("variables")
console.log("String:", miString);
console.error("Number:", miNumero);
console.debug("Boolean:", miBooleano);
console.log("Undefined:", miIndefinido);
console.error("Null:", miNulo);
console.debug("Symbol:", miSimbolo);
console.log("BigInt:", miBigInt);
console.table({
    miString,
    miNumero,
    miBooleano,
    miIndefinido,
    miNulo,
    miSimbolo,
    miBigInt,
  });
  console.time("Tiempo de cambio de variables");
console.groupEnd();

// Re asignacion de variables
miString = "adios";
miNumero = 100;
miBooleano = false;
miIndefinido = "Ahora definido";
miNulo = 0;
miSimbolo = Symbol("nuevo");
miBigInt = 9876543210n;

console.groupCollapsed("Variables primitivas modificadas");
console.debug("String:", miString);
console.log("Number:", miNumero);
console.error("Boolean:", miBooleano);
console.debug("Undefined:", miIndefinido);
console.log("Null:", miNulo);
console.error("Symbol:", miSimbolo);
console.debug("BigInt:", miBigInt);
 // Mostrar variables modificadas en una tabla
 console.table({
    miString,
    miNumero,
    miBooleano,
    miIndefinido,
    miNulo,
    miSimbolo,
    miBigInt
  }); 
  console.timeEnd("Tiempo de cambio de variables");
console.groupEnd();


 
  
 
