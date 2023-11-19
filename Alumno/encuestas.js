// Event listener para el botón "Salir e ir al apartado de Encuestas"
document.getElementById("regresarInicio-button").addEventListener("click", function()
{
            // Redirigir a la página "InicioAlumno.html"
            window.location.href = "../InicioAlumno.html"; // Sube un nivel para acceder a "InicioAlumno.html"
});

// Event listener para el botón "Salir e ir al apartado de Inicio"
document.getElementById("salir-button").addEventListener("click", function()
{
    // Redirigir a la página "InicioAlumno.html"
    window.location.href = "InicioEncuestas.html"; // Sube un nivel para acceder a "InicioAlumno.html"
});


// Crear la base de datos "Encuestas" y la tabla "Respuestas de Encuestas"
function openEncuestasDB()
{
    return new Promise((resolve, reject) =>
    {
        const request = window.indexedDB.open("Encuestas", 1);

        request.onupgradeneeded = event =>
        {
            const db = event.target.result;
            const objectStore = db.createObjectStore("Respuestas de Encuestas", { keyPath: "id", autoIncrement: true });
        };

        request.onsuccess = event =>
        {
            resolve(event.target.result);
        };

        request.onerror = event =>
        {
            reject(event.target.error);
        };
    });
}

// Event listener para el formulario de encuesta
document.getElementById("encuesta-form").addEventListener("submit", function(event)
{
    event.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los datos del formulario
    const satisfaccion = document.getElementById("opcion-satisfaccion").value;
    const navegacionFacil = document.getElementById("navegacion-facil").value;
    const disenoAtractivo = document.getElementById("diseno-atractivo").value;
    const rapidezNavegacion = document.getElementById("rapidez-navegacion").value;
    const ayudaAccesoGym = document.getElementById("ayuda-acceso-gym").value;
    const mejorasSugeridas = document.getElementById("mejoras-sugeridas").value;
    const otrosServicios = document.getElementById("otros-servicios").value;

    // Abrir la base de datos "Encuestas"
    openEncuestasDB().then(db =>
    {
        const transaction = db.transaction("Respuestas de Encuestas", "readwrite");
        const objectStore = transaction.objectStore("Respuestas de Encuestas");

        // Crear un objeto con los datos de la encuesta
        const encuestaData =
        {
            satisfaccion,
            navegacionFacil,
            disenoAtractivo,
            rapidezNavegacion,
            ayudaAccesoGym,
            mejorasSugeridas,
            otrosServicios,
            date: new Date()
        };

        // Agregar el objeto a la tabla "Respuestas de Encuestas"
        const request = objectStore.add(encuestaData);

        request.onsuccess = () =>
        {
            // Encuesta guardada con éxito
            console.log("Encuesta guardada en la base de datos.");
            alert("Encuesta Guardada Exitosamente")
            // Puedes mostrar un mensaje de confirmación al usuario aquí si lo deseas.
        };

        request.onerror = () =>
        {
            // Error al guardar la encuesta
            console.error("Error al guardar la encuesta en la base de datos.");
            // Puedes mostrar un mensaje de error al usuario aquí si lo deseas.
        };
    });
});