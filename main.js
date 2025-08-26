/*
 * Script principal para la maqueta de consulta de comprobantes.
 * Genera dinámicamente una tabla con datos simulados y gestiona la
 * interacción del menú contextual al hacer clic derecho sobre las filas.
 */

// Datos de ejemplo: una colección de comprobantes con información de creación
// y (opcional) de anulación. En una aplicación real estos datos vendrían de
// una base de datos o de una API.
const comprobantes = [
  {
    suc: '00',
    cm: 'NPX',
    comprobante: 'Nota de Pedido',
    referencia: '2',
    numero: '00000-000002',
    fecha: '12/10/22',
    importe: '263.442,63',
    cliente: '00017',
    nombre: 'ASOCIACIÓN DE LA SAGRADA FAMILIA',
    creacion: {
      usuario: 'mjuarez',
      fecha: '2022-10-12T10:15:00'
    },
    anulacion: null
  },
  {
    suc: '00',
    cm: 'NPX',
    comprobante: 'Nota de Pedido',
    referencia: '3',
    numero: '00000-000003',
    fecha: '12/10/22',
    importe: '67.762,01',
    cliente: '00017',
    nombre: 'ASOCIACIÓN DE LA SAGRADA FAMILIA',
    creacion: {
      usuario: 'mjuarez',
      fecha: '2022-10-12T12:20:00'
    },
    anulacion: null
  },
  {
    suc: 'SFB',
    cm: 'SFB',
    comprobante: 'Factura B',
    referencia: '1',
    numero: '00001-000006',
    fecha: '12/10/22',
    importe: '181.620,13',
    cliente: '00017',
    nombre: 'ASOCIACIÓN DE LA SAGRADA FAMILIA',
    creacion: {
      usuario: 'pperez',
      fecha: '2022-10-12T14:40:00'
    },
    anulacion: null
  },
  {
    suc: 'RMX',
    cm: 'RMX',
    comprobante: 'Remito',
    referencia: '',
    numero: '00001-000009',
    fecha: '13/10/22',
    importe: '27.000,00',
    cliente: '00018',
    nombre: 'CENTRO CULTURAL ITALIANO',
    creacion: {
      usuario: 'ggonzalez',
      fecha: '2022-10-13T09:05:00'
    },
    anulacion: {
      usuario: 'ggonzalez',
      fecha: '2022-10-14T16:30:00'
    }
  },
  {
    suc: 'RMX',
    cm: 'RMX',
    comprobante: 'Remito',
    referencia: '',
    numero: '00001-000010',
    fecha: '13/10/22',
    importe: '5.789,90',
    cliente: '00019',
    nombre: 'INSTITUTO DULCÍSIMO NOMBRE DE JESÚS',
    creacion: {
      usuario: 'mmartinez',
      fecha: '2022-10-13T11:20:00'
    },
    anulacion: null
  },
  {
    suc: 'SFB',
    cm: 'SFB',
    comprobante: 'Factura B',
    referencia: '5',
    numero: '00001-000011',
    fecha: '14/10/22',
    importe: '3.064,65',
    cliente: '00020',
    nombre: 'INSTITUTO DULCÍSIMO NOMBRE DE JESÚS',
    creacion: {
      usuario: 'mmartinez',
      fecha: '2022-10-14T10:05:00'
    },
    anulacion: null
  },
  {
    suc: 'REX',
    cm: 'REX',
    comprobante: 'Recibo',
    referencia: '',
    numero: '00001-000007',
    fecha: '13/10/22',
    importe: '45.820,22',
    cliente: '00018',
    nombre: 'CENTRO CULTURAL ITALIANO',
    creacion: {
      usuario: 'pperez',
      fecha: '2022-10-13T15:00:00'
    },
    anulacion: {
      usuario: 'pperez',
      fecha: '2022-10-15T13:15:00'
    }
  },
  {
    suc: 'NPX',
    cm: 'NPX',
    comprobante: 'Nota de Pedido',
    referencia: '1',
    numero: '00000-000004',
    fecha: '13/10/22',
    importe: '95.000,00',
    cliente: '00017',
    nombre: 'ASOCIACIÓN DE LA SAGRADA FAMILIA',
    creacion: {
      usuario: 'mjuarez',
      fecha: '2022-10-13T10:00:00'
    },
    anulacion: null
  }
];

// Traducciones de los días de la semana al español
const diasSemana = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
];

/**
 * Devuelve un objeto con la información formateada de fecha y hora a partir
 * de una cadena ISO. Incluye el día de la semana en español.
 * @param {string} isoString - Fecha ISO (e.g. "2022-10-12T10:15:00").
 * @returns {{dia: string, fecha: string, hora: string}}
 */
function formatearFechaHora(isoString) {
  const date = new Date(isoString);
  const dia = diasSemana[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return {
    dia,
    fecha: `${dd}/${mm}/${yyyy}`,
    hora: `${hh}:${mi}:${ss}`
  };
}

/**
 * Construye la tabla HTML y asigna los manejadores de eventos de contexto.
 */
function inicializarTabla() {
  const tbody = document.querySelector('#comprobantes-table tbody');
  let filaSeleccionada = null;

  comprobantes.forEach((comp, index) => {
    const tr = document.createElement('tr');
    tr.dataset.index = index;

    // Selección (checkbox)
    const tdSel = document.createElement('td');
    tdSel.classList.add('sel-col');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    tdSel.appendChild(checkbox);
    tr.appendChild(tdSel);

    // Sucursal
    const tdSuc = document.createElement('td');
    tdSuc.textContent = comp.suc;
    tr.appendChild(tdSuc);

    // Código de comprobante (cm)
    const tdCm = document.createElement('td');
    tdCm.textContent = comp.cm;
    tr.appendChild(tdCm);

    // Descripción del comprobante
    const tdComp = document.createElement('td');
    tdComp.textContent = comp.comprobante;
    tr.appendChild(tdComp);

    // Referencia
    const tdRef = document.createElement('td');
    tdRef.textContent = comp.referencia;
    tr.appendChild(tdRef);

    // Número
    const tdNum = document.createElement('td');
    tdNum.textContent = comp.numero;
    tr.appendChild(tdNum);

    // Fecha
    const tdFecha = document.createElement('td');
    tdFecha.textContent = comp.fecha;
    tr.appendChild(tdFecha);

    // Importe
    const tdImporte = document.createElement('td');
    tdImporte.textContent = comp.importe;
    tdImporte.style.textAlign = 'right';
    tr.appendChild(tdImporte);

    // Cliente
    const tdCliente = document.createElement('td');
    tdCliente.textContent = comp.cliente;
    tr.appendChild(tdCliente);

    // Nombre
    const tdNombre = document.createElement('td');
    tdNombre.textContent = comp.nombre;
    tr.appendChild(tdNombre);

    // Manejador del clic derecho sobre la fila
    tr.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      // Quitar selección previa, si la hubiera
      if (filaSeleccionada && filaSeleccionada !== tr) {
        filaSeleccionada.classList.remove('selected');
      }
      // Marcar la fila como seleccionada
      tr.classList.add('selected');
      filaSeleccionada = tr;
      mostrarMenuContextual(ev, comp);
    });

    tbody.appendChild(tr);
  });

  // Ocultar el menú contextual al hacer clic en cualquier lugar fuera del menú
  document.addEventListener('click', (ev) => {
    const menu = document.getElementById('context-menu');
    if (!ev.target.closest('#context-menu')) {
      ocultarMenuContextual();
      // Desmarcar la fila seleccionada
      if (filaSeleccionada) {
        filaSeleccionada.classList.remove('selected');
        filaSeleccionada = null;
      }
    }
  });

  // También cerrar el menú al presionar la tecla Esc
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      ocultarMenuContextual();
      if (filaSeleccionada) {
        filaSeleccionada.classList.remove('selected');
        filaSeleccionada = null;
      }
    }
  });
}

/**
 * Muestra el menú contextual con la información del comprobante.
 * @param {MouseEvent} ev
 * @param {Object} comp
 */
function mostrarMenuContextual(ev, comp) {
  const menu = document.getElementById('context-menu');
  // Construir el contenido del menú
  let html = '';
  // Información de creación
  const datosCreacion = formatearFechaHora(comp.creacion.fecha);
  html += '<div class="context-section">';
  html += '<div class="context-header">Creación</div>';
  html += `<div class="context-item"><span class="label">Usuario:</span> ${comp.creacion.usuario}</div>`;
  html += `<div class="context-item"><span class="label">Día:</span> ${datosCreacion.dia}</div>`;
  html += `<div class="context-item"><span class="label">Fecha:</span> ${datosCreacion.fecha}</div>`;
  html += `<div class="context-item"><span class="label">Hora:</span> ${datosCreacion.hora}</div>`;
  html += '</div>';
  // Información de anulación, si existe
  if (comp.anulacion) {
    const datosAnulacion = formatearFechaHora(comp.anulacion.fecha);
    html += '<div class="context-section">';
    html += '<div class="context-header">Anulación</div>';
    html += `<div class="context-item"><span class="label">Usuario:</span> ${comp.anulacion.usuario}</div>`;
    html += `<div class="context-item"><span class="label">Día:</span> ${datosAnulacion.dia}</div>`;
    html += `<div class="context-item"><span class="label">Fecha:</span> ${datosAnulacion.fecha}</div>`;
    html += `<div class="context-item"><span class="label">Hora:</span> ${datosAnulacion.hora}</div>`;
    html += '</div>';
  }
  menu.innerHTML = html;
  // Mostrar el menú
  menu.style.display = 'block';
  // Posicionarlo cerca del cursor, ajustando si se sale de la pantalla
  const menuRect = menu.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  let posX = ev.pageX;
  let posY = ev.pageY;
  // Ajustar horizontalmente si sobrepasa el ancho disponible
  if (posX + menuRect.width > viewportWidth) {
    posX = viewportWidth - menuRect.width - 10;
  }
  // Ajustar verticalmente si sobrepasa el alto disponible
  if (posY + menuRect.height > viewportHeight) {
    posY = viewportHeight - menuRect.height - 10;
  }
  menu.style.left = `${posX}px`;
  menu.style.top = `${posY}px`;
}

/**
 * Oculta el menú contextual.
 */
function ocultarMenuContextual() {
  const menu = document.getElementById('context-menu');
  menu.style.display = 'none';
}

// Esperar a que el DOM esté listo para inicializar la tabla
document.addEventListener('DOMContentLoaded', () => {
  inicializarTabla();
});