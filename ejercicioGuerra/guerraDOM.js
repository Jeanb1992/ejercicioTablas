function crearFormularioSubmarino() {
  const form = document.createElement("form");
  form.id = "formSubmarino";
  form.innerHTML = `
    <h3>Formulario de definición de vida y el poder del submarino</h3>
    <label>
      Vida del submarino:
      <input type="number" id="vidaSubmarino" value="2500" min="1" required>
    </label>
    <br>
    <label>
      Poder del submarino:
      <input type="number" id="poderSubmarino" value="500" min="1" required>
    </label>
    <br>
    <button type="submit">Guardar</button>
  `;

  // Evento para guardar los valores
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const vida = parseInt(document.getElementById("vidaSubmarino").value, 10);
    const poder = parseInt(document.getElementById("poderSubmarino").value, 10);
    console.log(`Vida = ${vida}, Poder = ${poder}`);
  });

  return form;
}

function crearFormularioCalculoVida() {
  const tipos = [
    { nombre: "Soldados Regulares", id: "soldadosRegulares", num: 2, den: 12 },
    { nombre: "Soldados Profesionales", id: "soldadosProfesionales", num: 3, den: 12 },
    { nombre: "Soldados Elite", id: "soldadosElite", num: 4, den: 12 },
    { nombre: "Carros Tanque", id: "carrosTanque", num: 7, den: 12 },
    { nombre: "Helicópteros", id: "helicopteros", num: 8, den: 12 },
    { nombre: "Aviones de Combate", id: "avionesCombate", num: 10, den: 12 }
  ];

  const form = document.createElement("form");
  form.id = "formCalculoVida";
  form.innerHTML = `<h3>Formulario de definición de cálculo de vida</h3>`;

  tipos.forEach(tipo => {
    form.innerHTML += `
      <label>
        ${tipo.nombre}:
        <input type="number" min="1" id="num_${tipo.id}" value="${tipo.num}"> /
        <input type="number" min="1" id="den_${tipo.id}" value="${tipo.den}">
      </label><br>
    `;
  });

  form.innerHTML += `<button type="submit">Guardar</button>`;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const valores = {};
    tipos.forEach(tipo => {
      const num = parseInt(document.getElementById(`num_${tipo.id}`).value, 10);
      const den = parseInt(document.getElementById(`den_${tipo.id}`).value, 10);
      valores[tipo.nombre] = { num, den };
    });
    console.log("Vida", valores);
  });

  return form;
}


function crearContenedorEjercitos() {
  const section = document.createElement('section');
  section.id = 'info-ejercitos';
  return section;
}


function crearBotonCrearEjercitos(onClick) {
  const btn = document.createElement('button');
  btn.id = 'btnCrearEjercitos';
  btn.textContent = 'Crear Ejércitos';
  btn.addEventListener('click', onClick);
  return btn;
}


function mostrarEjercitos(ejercito1, ejercito2) {
  const contenedor = document.getElementById('info-ejercitos');
  contenedor.innerHTML = '';
  
  
  const tabla1 = document.createElement('table');
  tabla1.innerHTML = `<caption>${ejercito1.nombre}</caption>
    <tr><th>Tipo</th><th>Cantidad</th></tr>`;
  Object.keys(ejercito1).forEach(tipo => {
    if (ejercito1[tipo] && ejercito1[tipo].cantidad !== undefined) {
      tabla1.innerHTML += `<tr><td>${tipo}</td><td>${ejercito1[tipo].cantidad}</td></tr>`;
    }
  });
  
  
  const tabla2 = document.createElement('table');
  tabla2.innerHTML = `<caption>${ejercito2.nombre}</caption>
    <tr><th>Tipo</th><th>Cantidad</th></tr>`;
  Object.keys(ejercito2).forEach(tipo => {
    if (ejercito2[tipo] && ejercito2[tipo].cantidad !== undefined) {
      tabla2.innerHTML += `<tr><td>${tipo}</td><td>${ejercito2[tipo].cantidad}</td></tr>`;
    }
  });
  
  contenedor.appendChild(tabla1);
  contenedor.appendChild(tabla2);
}

// Contenedor para el log de turnos
function crearContenedorLog() {
  const section = document.createElement('section');
  section.id = 'log-guerra';
  section.innerHTML = '<h3>Log de turnos e Informe Final</h3>';
  return section;
}

// Botón para iniciar la guerra
function crearBotonFight(onClick) {
  const btn = document.createElement('button');
  btn.id = 'btnFight';
  btn.textContent = 'Guerra';
  btn.addEventListener('click', onClick);
  return btn;
}

// Mostrar log en el contenedor de log
function agregarLog(mensaje) {
  const logDiv = document.getElementById('log-guerra');
  if (logDiv) {
    const p = document.createElement('p');
    p.textContent = mensaje;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
  }
}

// Mostrar informe final en tablas en el DOM
function mostrarInformeFinal(ganador, ejercitoA, ejercitoB, tipos, estadisticas) {
  const logDiv = document.getElementById('log-guerra');
  if (!logDiv) return;

  // Resumen de unidades
  function resumenUnidades(ejercito) {
    const resumen = {
      perdidas: {},
      ilesas: {},
      heridas: {}
    };
    tipos.forEach(tipo => {
      if (ejercito[tipo] && Array.isArray(ejercito[tipo].vidas)) {
        const vidas = ejercito[tipo].vidas;
        const maxVida = window.valorVida[tipo];
        resumen.perdidas[tipo] = vidas.filter(v => v === 0).length;
        resumen.ilesas[tipo] = vidas.filter(v => v === maxVida).length;
        resumen.heridas[tipo] = vidas.filter(v => v > 0 && v < maxVida * 0.3).length;
      } else {
        resumen.perdidas[tipo] = 0;
        resumen.ilesas[tipo] = 0;
        resumen.heridas[tipo] = 0;
      }
    });
    return resumen;
  }

  const resumenA = resumenUnidades(ejercitoA);
  const resumenB = resumenUnidades(ejercitoB);

  // Tabla de eliminados
  const tablaEliminados = document.createElement('table');
  tablaEliminados.innerHTML = `<caption>Unidades eliminadas</caption><tr><th>Tipo</th><th>Eliminados por ${ejercitoA.nombre}</th><th>Eliminados por ${ejercitoB.nombre}</th></tr>`;
  tipos.forEach(tipo => {
    tablaEliminados.innerHTML += `<tr><td>${tipo}</td><td>${estadisticas[ejercitoA.nombre].eliminados[tipo]}</td><td>${estadisticas[ejercitoB.nombre].eliminados[tipo]}</td></tr>`;
  });

  // Tabla resumen A
  const tablaResumenA = document.createElement('table');
  tablaResumenA.innerHTML = `<caption>Resumen ${ejercitoA.nombre}</caption><tr><th>Tipo</th><th>Perdidas</th><th>Ilesas</th><th>Heridas</th></tr>`;
  tipos.forEach(tipo => {
    tablaResumenA.innerHTML += `<tr><td>${tipo}</td><td>${resumenA.perdidas[tipo]}</td><td>${resumenA.ilesas[tipo]}</td><td>${resumenA.heridas[tipo]}</td></tr>`;
  });

  // Tabla resumen B
  const tablaResumenB = document.createElement('table');
  tablaResumenB.innerHTML = `<caption>Resumen ${ejercitoB.nombre}</caption><tr><th>Tipo</th><th>Perdidas</th><th>Ilesas</th><th>Heridas</th></tr>`;
  tipos.forEach(tipo => {
    tablaResumenB.innerHTML += `<tr><td>${tipo}</td><td>${resumenB.perdidas[tipo]}</td><td>${resumenB.ilesas[tipo]}</td><td>${resumenB.heridas[tipo]}</td></tr>`;
  });

  // Ganador y estadísticas generales
  const resumenFinal = document.createElement('article');
  resumenFinal.innerHTML = `
    <h4>Ganador: ${ganador ? ganador : 'Empate'}</h4>
    <p>Cantidad de ataques efectivos de ${ejercitoA.nombre}: ${estadisticas[ejercitoA.nombre].ataquesEfectivos}</p>
    <p>Cantidad de ataques efectivos de ${ejercitoB.nombre}: ${estadisticas[ejercitoB.nombre].ataquesEfectivos}</p>
    <p>Cantidad de golpes críticos de ${ejercitoA.nombre}: ${estadisticas[ejercitoA.nombre].golpesCriticos}</p>
    <p>Cantidad de golpes críticos de ${ejercitoB.nombre}: ${estadisticas[ejercitoB.nombre].golpesCriticos}</p>
  `;

  logDiv.appendChild(tablaEliminados);
  logDiv.appendChild(tablaResumenA);
  logDiv.appendChild(tablaResumenB);
  logDiv.appendChild(resumenFinal);
}

// Botón para nueva guerra
function crearBotonNuevaGuerra(onClick) {
  const btn = document.createElement('button');
  btn.id = 'btnNuevaGuerra';
  btn.textContent = 'Nueva Guerra';
  btn.disabled = true;
  btn.addEventListener('click', onClick);
  return btn;
}

// Espera a que el DOM esté listo y agrega el formulario
window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById("app");
  if (app) {
    
    const main = document.createElement('main');

    // Primera columna: formularios y crear ejércitos
    const sectionConfiguracion = document.createElement('section');

    
    const formSubmarino = crearFormularioSubmarino();
    
    const formCalculo = crearFormularioCalculoVida();
   
    const btnCrearEjercitos = crearBotonCrearEjercitos(() => {
      const vidaSubmarino = parseInt(document.getElementById('vidaSubmarino').value, 10);
      const poderSubmarino = parseInt(document.getElementById('poderSubmarino').value, 10);
      const tipos = [
        { id: "soldadosRegulares" },
        { id: "soldadosProfesionales" },
        { id: "soldadosElite" },
        { id: "carrosTanque" },
        { id: "helicopteros" },
        { id: "avionesCombate" }
      ];
      const fracciones = {};
      tipos.forEach(tipo => {
        const num = parseInt(document.getElementById(`num_${tipo.id}`).value, 10);
        const den = parseInt(document.getElementById(`den_${tipo.id}`).value, 10);
        fracciones[tipo.id] = { num, den };
      });
      window.valorVida = {
        soldadosRegulares: Math.round((fracciones.soldadosRegulares.num / fracciones.soldadosRegulares.den) * vidaSubmarino),
        soldadosProfesionales: Math.round((fracciones.soldadosProfesionales.num / fracciones.soldadosProfesionales.den) * vidaSubmarino),
        soldadosElite: Math.round((fracciones.soldadosElite.num / fracciones.soldadosElite.den) * vidaSubmarino),
        carrosTanque: Math.round((fracciones.carrosTanque.num / fracciones.carrosTanque.den) * vidaSubmarino),
        helicopteros: Math.round((fracciones.helicopteros.num / fracciones.helicopteros.den) * vidaSubmarino),
        avionesCombate: Math.round((fracciones.avionesCombate.num / fracciones.avionesCombate.den) * vidaSubmarino),
        submarinos: vidaSubmarino
      };
      window.valorAtaque = {
        soldadosRegulares: Math.round((fracciones.soldadosRegulares.num / fracciones.soldadosRegulares.den) * poderSubmarino),
        soldadosProfesionales: Math.round((fracciones.soldadosProfesionales.num / fracciones.soldadosProfesionales.den) * poderSubmarino),
        soldadosElite: Math.round((fracciones.soldadosElite.num / fracciones.soldadosElite.den) * poderSubmarino),
        carrosTanque: Math.round((fracciones.carrosTanque.num / fracciones.carrosTanque.den) * poderSubmarino),
        helicopteros: Math.round((fracciones.helicopteros.num / fracciones.helicopteros.den) * poderSubmarino),
        avionesCombate: Math.round((fracciones.avionesCombate.num / fracciones.avionesCombate.den) * poderSubmarino),
        submarinos: poderSubmarino
      };
      const ejercito1 = crearEjercito("Ejercito 1");
      const ejercito2 = crearEjercito("Ejercito 2");
      mostrarEjercitos(ejercito1, ejercito2);
      window.ejercito1 = ejercito1;
      window.ejercito2 = ejercito2;
      if (!document.getElementById('btnFight')) {
        sectionEjercitos.appendChild(crearBotonFight(async () => {
          const logDiv = document.getElementById('log-guerra');
          if (logDiv) {
            logDiv.innerHTML = '';
          }
          const resultado = await guerra(window.ejercito1, window.ejercito2);
          mostrarInformeFinal(resultado.ganador, resultado.ejercitoA, resultado.ejercitoB, resultado.tipos, resultado.estadisticas);
          btnNuevaGuerra.disabled = false;
        }));
      }
      console.log(`[Crear Ejércitos] Valores usados: Vida = ${vidaSubmarino}, Poder = ${poderSubmarino}`);
      document.getElementById('btnCrearEjercitos').disabled = true;
    });
    btnCrearEjercitos.id = 'btnCrearEjercitos';
    sectionConfiguracion.appendChild(formSubmarino);
    sectionConfiguracion.appendChild(formCalculo);
    sectionConfiguracion.appendChild(btnCrearEjercitos);

    
    const sectionEjercitos = document.createElement('section');
    // Info de ejércitos
    const contenedorEjercitos = crearContenedorEjercitos();
    sectionEjercitos.appendChild(contenedorEjercitos);

    
    const sectionLog = document.createElement('section');
    // Log de guerra
    const contenedorLog = crearContenedorLog();
    sectionLog.appendChild(contenedorLog);
    // Botón nueva guerra
    const btnNuevaGuerra = crearBotonNuevaGuerra(() => {
      contenedorEjercitos.innerHTML = '';
      // Limpiar solo el contenido del log, no el título
      const logDiv = document.getElementById('log-guerra');
      if (logDiv) {
        logDiv.innerHTML = '';
      }
      document.getElementById('formSubmarino').reset();
      document.getElementById('formCalculoVida').reset();
      btnCrearEjercitos.disabled = false;
      const btnFight = document.getElementById('btnFight');
      if (btnFight) btnFight.remove();
      btnNuevaGuerra.disabled = true;
    });
    btnNuevaGuerra.id = 'btnNuevaGuerra';
    sectionLog.appendChild(btnNuevaGuerra);

    
    main.appendChild(sectionConfiguracion);
    main.appendChild(sectionEjercitos);
    main.appendChild(sectionLog);

 
    const header = document.createElement('header');
    header.innerHTML = '<h1>La Guerra en DOM</h1>';
    app.appendChild(header);
    app.appendChild(main);
    
    // Mostrar ejércitos iniciales si existen (después de que todo esté creado)
    if (typeof ejercito1 !== 'undefined' && typeof ejercito2 !== 'undefined') {
      mostrarEjercitos(ejercito1, ejercito2);
      window.ejercito1 = ejercito1;
      window.ejercito2 = ejercito2;
      
      // Agregar botón Fight inicial
      sectionEjercitos.appendChild(crearBotonFight(async () => {
        const logDiv = document.getElementById('log-guerra');
        if (logDiv) {
          logDiv.innerHTML = '';
        }
        const resultado = await guerra(window.ejercito1, window.ejercito2);
        mostrarInformeFinal(resultado.ganador, resultado.ejercitoA, resultado.ejercitoB, resultado.tipos, resultado.estadisticas);
        btnNuevaGuerra.disabled = false;
      }));
    }
  }
}); 