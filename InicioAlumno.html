document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const matriculaURL = url.searchParams.get("matricula");
    const matriculaLocalStorage = localStorage.getItem("matricula");
    const matricula = matriculaURL || matriculaLocalStorage;

    const matriculaElement = document.getElementById('matricula');
    matriculaElement.textContent = `Matrícula: ${matricula}`;

    const iframe = document.querySelector('iframe');
    iframe.src = 'Alumno/RegistroReserva.html' + `?matricula=${matricula}`;

    const cerrarSesionButton = document.getElementById("cerrar-sesion");
    cerrarSesionButton.addEventListener("click", function () {
        localStorage.removeItem("matricula");
        window.location.href = "login.html";
    });

    const encuestaButton = document.getElementById("encuesta-button");
    encuestaButton.addEventListener("click", function () {
        window.location.href = "Alumno/InicioEncuestas.html";
    });

    // Agregar reservas a la base de datos
    const dbPromise = window.indexedDB.open('ReservasDatabase', 1);
    dbPromise.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('datos')) {
            db.createObjectStore('datos', { keyPath: 'IDReserva' });
        }
    };

    dbPromise.onsuccess = (event) => {
        const db = event.target.result;

        const transaction = db.transaction('datos', 'readwrite');
        const datosStore = transaction.objectStore('datos');

        const reservas = [
            { IDReserva: "3567163", Matricula: "123456", Hora: "1 M2-M4", Fecha: "10/09/2021" },
            { IDReserva: "7654784", Matricula: "654321", Hora: "4 V2:V6", Fecha: "13/09/2021" },
            { IDReserva: "68411647", Matricula: "111111", Hora: "2 M4-V1", Fecha: "11/09/2021" },
            { IDReserva: "6784253", Matricula: "123456", Hora: "3 V6-n1", Fecha: "12/09/2021" },
            { IDReserva: "8445441", Matricula: "123456", Hora: "3 V2-V3", Fecha: "12/09/2021" },
            { IDReserva: "6465156", Matricula: "123456", Hora: "2 V3-V4", Fecha: "11/09/2021" },
            { IDReserva: "1454646", Matricula: "654321", Hora: "1 N1-N2", Fecha: "10/09/2021" },
            { IDReserva: "574154", Matricula: "111111", Hora: "1 N2-N4", Fecha: "10/09/2021" },
            { IDReserva: "945424", Matricula: "111111", Hora: "5 M2-M3", Fecha: "14/09/2021" },
            { IDReserva: "754844", Matricula: "654321", Hora: "4 M6-V3", Fecha: "13/09/2021" },
        ];

        reservas.forEach(reserva => {
            datosStore.add(reserva);
        });
    };

    const toggleNavButton = document.getElementById('toggle-nav');
    const navList = document.querySelector('.nav');

    toggleNavButton.addEventListener('click', function () {
        navList.classList.toggle('show');
    });
});
