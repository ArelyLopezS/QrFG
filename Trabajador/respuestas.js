// Función para abrir la base de datos "Encuestas"
function openEncuestasDB() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("Encuestas", 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("Respuestas de Encuestas")) {
                db.createObjectStore("Respuestas de Encuestas", { keyPath: "id", autoIncrement: true });
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

// Función para obtener y mostrar las respuestas de los usuarios
function mostrarRespuestas() {
    // Abrir la base de datos "Encuestas"
    openEncuestasDB().then(db => {
        const transaction = db.transaction("Respuestas de Encuestas", "readonly");
        const objectStore = transaction.objectStore("Respuestas de Encuestas");

        const respuestasTable = document.getElementById("respuestas-table").querySelector("tbody");
        respuestasTable.innerHTML = ""; // Limpiar la tabla

        objectStore.openCursor().onsuccess = event => {
            const cursor = event.target.result;
            if (cursor) {
                const fecha = new Date(cursor.value.date);
                const satisfaccion = cursor.value.satisfaccion;
                const navegacionFacil = cursor.value.navegacionFacil;
                const disenoAtractivo = cursor.value.disenoAtractivo;
                const rapidezNavegacion = cursor.value.rapidezNavegacion;
                const ayudaAccesoGym = cursor.value.ayudaAccesoGym;
                const mejorasSugeridas = cursor.value.mejorasSugeridas;
                const otrosServicios = cursor.value.otrosServicios;

                const newRow = respuestasTable.insertRow();
                const dateCell = newRow.insertCell(0);
                const satisfaccionCell = newRow.insertCell(1);
                const navegacionFacilCell = newRow.insertCell(2);
                const disenoAtractivoCell = newRow.insertCell(3);
                const rapidezNavegacionCell = newRow.insertCell(4);
                const ayudaAccesoGymCell = newRow.insertCell(5);
                const mejorasSugeridasCell = newRow.insertCell(6);
                const otrosServiciosCell = newRow.insertCell(7);
                
                
                dateCell.textContent = fecha.toLocaleString();
                satisfaccionCell.textContent = satisfaccion;
                navegacionFacilCell.textContent = navegacionFacil;
                disenoAtractivoCell.textContent = disenoAtractivo;
                rapidezNavegacionCell.textContent = rapidezNavegacion;
                ayudaAccesoGymCell.textContent = ayudaAccesoGym;
                mejorasSugeridasCell.textContent = mejorasSugeridas;
                otrosServiciosCell.textContent = otrosServicios;

                cursor.continue();
            }
        };
    });
}

// Event listener para el botón "Actualizar"
document.getElementById("actualizar-button").addEventListener("click", function() {
    mostrarRespuestas();
});

// Cargar las respuestas al cargar la página
mostrarRespuestas();


// Agregar un evento al botón de actualización
actualizarButton.addEventListener("click", function() {
    // Recargar la página actual al hacer clic en el botón de actualización
    location.reload();
});
