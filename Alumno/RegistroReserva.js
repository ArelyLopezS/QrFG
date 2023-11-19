document.addEventListener('DOMContentLoaded', () => {
    const dbPromise = window.indexedDB.open('ReservasDatabase', 1);
    const dataList = document.getElementById('data-list');
    let reservasEncontradas = false;
    const url = new URL(window.location.href);
    const matricula = url.searchParams.get("matricula") || localStorage.getItem("matricula");

    dbPromise.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('datos')) {
            db.createObjectStore('datos', { keyPath: 'IDReserva' });
        }
    };

    dbPromise.onsuccess = (event) => {
        const db = event.target.result;

        function displayData() {
            dataList.innerHTML = '';

            const datosStore = db.transaction('datos').objectStore('datos');
            datosStore.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.Matricula === matricula) {
                        const row = dataList.insertRow();
                        const idReservaCell = row.insertCell(0);
                        const horaCell = row.insertCell(1);
                        const fechaCell = row.insertCell(2);

                        idReservaCell.textContent = cursor.value.IDReserva;
                        horaCell.textContent = cursor.value.Hora;
                        fechaCell.textContent = cursor.value.Fecha;

                        reservasEncontradas = true;
                    }
                    cursor.continue();
                } else {
                    if (!reservasEncontradas) {
                        alert('Lo siento, no tienes reservas por el momento. Realiza una reserva en SIASE y vuelve más tarde.');
                        window.top.location.href = "../Login.html";
                    }
                }
            };
        }

        displayData();
    };

    dbPromise.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
    };
});
