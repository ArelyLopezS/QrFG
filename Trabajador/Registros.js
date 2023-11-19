// Definir una función para abrir la base de datos
function openDB() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('QrEscaneados', 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('QrDatas')) {
                db.createObjectStore('QrDatas', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onerror = event => {
            reject(event.target.error);
        };
    });
}

// Función para cargar registros y mostrar en la tabla
function loadRecords() {
    openDB()
        .then(db => {
            const transaction = db.transaction('QrDatas', 'readwrite'); // Ahora con permisos de escritura
            const objectStore = transaction.objectStore('QrDatas');
            const request = objectStore.openCursor();
            const recordsTableBody = document.getElementById('recordsTableBody');

            recordsTableBody.innerHTML = ''; // Limpiar la tabla antes de cargar nuevos registros

            const idReservaMap = {}; // Mapa para almacenar el estado y conteo de cada IDReserva

            request.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                    const record = cursor.value;
                    const idReserva = record.content.IDReserva;

                    // Verificar el estado y conteo de la IDReserva
                    if (!idReservaMap[idReserva]) {
                        idReservaMap[idReserva] = { estado: 'Entrada', conteo: 1 };
                    } else if (idReservaMap[idReserva].estado === 'Entrada') {
                        idReservaMap[idReserva].estado = 'Salida';
                        idReservaMap[idReserva].conteo = 2;
                    } else {
                        console.log(`Lo siento, Qr no valido para IDReserva: ${idReserva}`);
                        cursor.continue();
                        return; // No guardar entradas posteriores para esta IDReserva
                    }

                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${record.date}</td>
                        <td>${idReserva}</td>
                        <td>${record.content.Matricula}</td>
                        <td>${record.content.Hora}</td>
                        <td>${record.content.Fecha}</td>
                        <td>${idReservaMap[idReserva].estado}</td>
                    `;
                    recordsTableBody.appendChild(newRow);
                    cursor.continue();
                }
            };
        })
        .catch(error => {
            console.error('Error al abrir la base de datos:', error);
        });
}

// Actualizar la página cuando se hace clic en el botón de actualización
const updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', () => {
    loadRecords();
});

// Cargar registros al cargar la página
loadRecords();
