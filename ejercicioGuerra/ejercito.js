function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const vidaSubmarino = 2500;
const valorVida = {
  soldadosRegulares: Math.round((2 / 12) * vidaSubmarino),
  soldadosProfesionales: Math.round((3 / 12) * vidaSubmarino),
  soldadosElite: Math.round((4 / 12) * vidaSubmarino),
  carrosTanque: Math.round((7 / 12) * vidaSubmarino),
  helicopteros: Math.round((8 / 12) * vidaSubmarino),
  avionesCombate: Math.round((10 / 12) * vidaSubmarino),
  submarinos: vidaSubmarino
};
const ataqueSubmarino = 500;
const valorAtaque = {
  soldadosRegulares: Math.round((1 / 14) * ataqueSubmarino),
  soldadosProfesionales: Math.round((2 / 14) * ataqueSubmarino),
  soldadosElite: Math.round((3 / 14) * ataqueSubmarino),
  carrosTanque: Math.round((4 / 14) * ataqueSubmarino),
  helicopteros: Math.round((5 / 14) * ataqueSubmarino),
  avionesCombate: Math.round((6 / 14) * ataqueSubmarino),
  submarinos: ataqueSubmarino
}

function crearEjercito(nombre) {
  const cantidadSoldadosRegulares = numeroAleatorio(500, 1000);
  const cantidadSoldadosProfesionales = numeroAleatorio(500, 1000);
  const cantidadSoldadosElite = numeroAleatorio(200, 300);
  const cantidadCarrosTanque = numeroAleatorio(50, 100);
  const cantidadHelicopteros = numeroAleatorio(30, 50);
  const cantidadAvionesCombate = numeroAleatorio(50, 75);
  const cantidadSubmarinos = numeroAleatorio(1, 2);
  return {
    nombre: nombre,
    soldadosRegulares: {
      cantidad: cantidadSoldadosRegulares,
      vidas: Array.from({ length: cantidadSoldadosRegulares }, () => valorVida.soldadosRegulares),
      ataque: Array.from({ length: cantidadSoldadosRegulares }, () => valorAtaque.soldadosRegulares)
    },
    soldadosProfesionales: {
      cantidad: cantidadSoldadosProfesionales,
      vidas: Array.from({ length: cantidadSoldadosProfesionales }, () => valorVida.soldadosProfesionales), 
      ataque: Array.from({ length: cantidadSoldadosProfesionales }, () => valorAtaque.soldadosProfesionales)
    },
    soldadosElite: {
      cantidad: cantidadSoldadosElite,
      vidas: Array.from({ length: cantidadSoldadosElite }, () => valorVida.soldadosElite),
      ataque: Array.from({ length: cantidadSoldadosElite }, () => valorAtaque.soldadosElite)
    },
    carrosTanque: {
      cantidad: cantidadCarrosTanque,
      vidas: Array.from({ length: cantidadCarrosTanque }, () => valorVida.carrosTanque),
      ataque: Array.from({ length: cantidadCarrosTanque }, () => valorAtaque.carrosTanque)
    },
    helicopteros: {
      cantidad: cantidadHelicopteros,
      vidas: Array.from({ length: cantidadHelicopteros }, () => valorVida.helicopteros),
      ataque: Array.from({ length: cantidadHelicopteros }, () => valorAtaque.helicopteros)
    },
    avionesCombate: {
      cantidad: cantidadAvionesCombate,
      vidas: Array.from({ length: cantidadAvionesCombate }, () => valorVida.avionesCombate),
      ataque: Array.from({ length: cantidadAvionesCombate }, () => valorAtaque.avionesCombate)
    },
    submarinos: {
      cantidad: cantidadSubmarinos,
      vidas: Array.from({ length: cantidadSubmarinos }, () => valorVida.submarinos),
      ataque: Array.from({ length: cantidadSubmarinos }, () => valorAtaque.submarinos)
    }
  };
}

const ejercito1 = crearEjercito("Ejercito 1");
const ejercito2 = crearEjercito("Ejercito 2");

// Calcular el total de unidades del ejército 1
const totalUnidades1 = ejercito1.soldadosRegulares.cantidad + ejercito1.soldadosProfesionales.cantidad + ejercito1.soldadosElite.cantidad + ejercito1.carrosTanque.cantidad + ejercito1.helicopteros.cantidad + ejercito1.avionesCombate.cantidad + ejercito1.submarinos.cantidad;

console.table({
    SoldadosRegulares: ejercito1.soldadosRegulares.cantidad,
    SoldadosProfesionales: ejercito1.soldadosProfesionales.cantidad,
    SoldadosElite: ejercito1.soldadosElite.cantidad,
    CarrosTanque: ejercito1.carrosTanque.cantidad,
    Helicopteros: ejercito1.helicopteros.cantidad,
    AvionesCombate: ejercito1.avionesCombate.cantidad,
    Submarinos: ejercito1.submarinos.cantidad
});
console.log("Cantidad total de unidades del ejército 1:", totalUnidades1);

// Calcular el total de unidades del ejército 2
const totalUnidades2 = ejercito2.soldadosRegulares.cantidad + ejercito2.soldadosProfesionales.cantidad + ejercito2.soldadosElite.cantidad + ejercito2.carrosTanque.cantidad + ejercito2.helicopteros.cantidad + ejercito2.avionesCombate.cantidad + ejercito2.submarinos.cantidad;

console.table({
    SoldadosRegulares: ejercito2.soldadosRegulares.cantidad,
    SoldadosProfesionales: ejercito2.soldadosProfesionales.cantidad,
    SoldadosElite: ejercito2.soldadosElite.cantidad,
    CarrosTanque: ejercito2.carrosTanque.cantidad,
    Helicopteros: ejercito2.helicopteros.cantidad,
    AvionesCombate: ejercito2.avionesCombate.cantidad,
    Submarinos: ejercito2.submarinos.cantidad
});
console.log("Cantidad total de unidades del ejército 2:", totalUnidades2);


//Se inicializa un objeto con todos los tipos de unidades
function guerra(ejercitoA, ejercitoB) {
  let turno = 1;
  const tipos = [
    'soldadosRegulares',
    'soldadosProfesionales',
    'soldadosElite',
    'carrosTanque',
    'helicopteros',
    'avionesCombate',
    'submarinos'
  ];

  
  let estadisticas = {
    [ejercitoA.nombre]: {
      golpesCriticos: 0,
      ataquesEfectivos: 0,
      eliminados: { soldadosRegulares: 0, soldadosProfesionales: 0, soldadosElite: 0, carrosTanque: 0, helicopteros: 0, avionesCombate: 0, submarinos: 0 },
    },
    [ejercitoB.nombre]: {
      golpesCriticos: 0,
      ataquesEfectivos: 0,
      eliminados: { soldadosRegulares: 0, soldadosProfesionales: 0, soldadosElite: 0, carrosTanque: 0, helicopteros: 0, avionesCombate: 0, submarinos: 0 },
    }
  };
//Se obtiene el numero de unidades vivas de cada ejercito lo mete en un array para datos de cada unidad
  function obtenerUnidadesVivas(ejercito) {
    const vivas = [];
    tipos.forEach(tipo => {
      ejercito[tipo].vidas.forEach((vida, id) => {
        if (vida > 0) {
          vivas.push({ tipo, id });
        }
      });
    });
    return vivas;
  }
//Se obtiene el numero de unidades vivas de cada ejercito lo mete en un objeto para guardar estadisticas
  function contarVivas(ejercito) {
    const conteo = {};
    tipos.forEach(tipo => {
      conteo[tipo] = ejercito[tipo].vidas.filter(v => v > 0).length;
    });
    return conteo;
  }

  // Elegir aleatoriamente quién inicia
  let turnoInicial = Math.random() < 0.5;

  while (obtenerUnidadesVivas(ejercitoA).length > 0 && obtenerUnidadesVivas(ejercitoB).length > 0) {
    console.log(`\nTurno ${turno}:`);
    let atacante = turnoInicial ? ejercitoA : ejercitoB;
    let defensor = turnoInicial ? ejercitoB : ejercitoA;
    let nombreAtacante = turnoInicial ? ejercitoA.nombre : ejercitoB.nombre;
    let nombreDefensor = turnoInicial ? ejercitoB.nombre : ejercitoA.nombre;

    // Todas las unidades vivas atacan
    const unidadesAtacantes = obtenerUnidadesVivas(atacante);

    unidadesAtacantes.forEach(({ tipo, id }) => {
      if (obtenerUnidadesVivas(defensor).length === 0) return;
      const ataqueMax = atacante[tipo].ataque[id];
      let ataque = numeroAleatorio(1, ataqueMax);
      // Golpe crítico
      if (ataque === ataqueMax) {
        estadisticas[nombreAtacante].golpesCriticos++;
      }
      // Penalización por clima
      const penalizacion = numeroAleatorio(0, 30) / 100;
      ataque = Math.round(ataque * (1 - penalizacion));
      // Elegir objetivo aleatorio
      const objetivos = obtenerUnidadesVivas(defensor);
      if (objetivos.length === 0) return;
      const objetivo = objetivos[numeroAleatorio(0, objetivos.length - 1)];
      // Daño previo
      const vidaAntes = defensor[objetivo.tipo].vidas[objetivo.id];
      // Calcular la nueva vida después del ataque
      const vidaDespues = vidaAntes - ataque;
      // Asignar la nueva vida, asegurando que no sea menor que 0
      if (vidaDespues < 0) {
        defensor[objetivo.tipo].vidas[objetivo.id] = 0;
      } else {
        defensor[objetivo.tipo].vidas[objetivo.id] = vidaDespues;
      }
      // Ataque efectivo
      if (vidaAntes > defensor[objetivo.tipo].vidas[objetivo.id]) {
        estadisticas[nombreAtacante].ataquesEfectivos++;
      }
      // Si la unidad fue eliminada
      if (vidaAntes > 0 && defensor[objetivo.tipo].vidas[objetivo.id] === 0) {
        estadisticas[nombreAtacante].eliminados[objetivo.tipo]++;
      }
    });

    // Mostrar estado
    const vivasA = contarVivas(ejercitoA);
    const vivasB = contarVivas(ejercitoB);
    console.log(`${ejercitoA.nombre}:`, vivasA);
    console.log(`${ejercitoB.nombre}:`, vivasB);

    turno++;
    turnoInicial = !turnoInicial;
  }

  // Resultado final
  let ganador = null;
  if (obtenerUnidadesVivas(ejercitoA).length > 0) {
    ganador = ejercitoA.nombre;
    console.log(`\n¡${ejercitoA.nombre} ganó la guerra!`);
  } else if (obtenerUnidadesVivas(ejercitoB).length > 0) {
    ganador = ejercitoB.nombre;
    console.log(`\n¡${ejercitoB.nombre} ganó la guerra!`);
  } 

  mostrarEstadisticasFinales(ganador, ejercitoA, ejercitoB, tipos, estadisticas);
}

guerra(ejercito1, ejercito2); 

function mostrarEstadisticasFinales(ganador, ejercitoA, ejercitoB, tipos, estadisticas) {
  // Para saber el valor máximo de vida de cada tipo
  function getValorVida(tipo) {
    return valorVida[tipo];
  }

  function resumenUnidades(ejercito, nombre) {
    const resumen = {
      perdidas: {},
      ilesas: {},
      heridas: {}
    };
    tipos.forEach(tipo => {
      const vidas = ejercito[tipo].vidas;
      const maxVida = getValorVida(tipo);
      resumen.perdidas[tipo] = vidas.filter(v => v === 0).length;
      resumen.ilesas[tipo] = vidas.filter(v => v === maxVida).length;
      resumen.heridas[tipo] = vidas.filter(v => v > 0 && v < maxVida * 0.3).length;
    });
    return resumen;
  }

  const resumenA = resumenUnidades(ejercitoA, ejercitoA.nombre);
  const resumenB = resumenUnidades(ejercitoB, ejercitoB.nombre);

  // Tabla de eliminados
  const tablaEliminados = {};
  tipos.forEach(tipo => {
    tablaEliminados[tipo] = {
      [`Eliminados por ${ejercitoA.nombre}`]: estadisticas[ejercitoA.nombre].eliminados[tipo],
      [`Eliminados por ${ejercitoB.nombre}`]: estadisticas[ejercitoB.nombre].eliminados[tipo]
    };
  });

  // Tabla de resumen de cada ejército
  const tablaResumenA = {};
  const tablaResumenB = {};
  tipos.forEach(tipo => {
    tablaResumenA[tipo] = {
      Perdidas: resumenA.perdidas[tipo],
      Ilesas: resumenA.ilesas[tipo],
      Heridas: resumenA.heridas[tipo]
    };
    tablaResumenB[tipo] = {
      Perdidas: resumenB.perdidas[tipo],
      Ilesas: resumenB.ilesas[tipo],
      Heridas: resumenB.heridas[tipo]
    };
  });

  console.log("\n===== ESTADÍSTICAS FINALES =====");
  console.log("Ganador:", ganador );

  console.log("\nUnidades eliminadas por cada ejército:");
  console.table(tablaEliminados);

  console.log(`\nResumen de ${ejercitoA.nombre} (Perdidas, Ilesas, Heridas):`);
  console.table(tablaResumenA);

  console.log(`\nResumen de ${ejercitoB.nombre} (Perdidas, Ilesas, Heridas):`);
  console.table(tablaResumenB);

  console.log(`\nCantidad de ataques efectivos de ${ejercitoA.nombre}:`, estadisticas[ejercitoA.nombre].ataquesEfectivos);
  console.log(`Cantidad de ataques efectivos de ${ejercitoB.nombre}:`, estadisticas[ejercitoB.nombre].ataquesEfectivos);
  console.log(`\nCantidad de golpes críticos de ${ejercitoA.nombre}:`, estadisticas[ejercitoA.nombre].golpesCriticos);
  console.log(`Cantidad de golpes críticos de ${ejercitoB.nombre}:`, estadisticas[ejercitoB.nombre].golpesCriticos);
}