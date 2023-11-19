document.addEventListener('DOMContentLoaded', () =>
{
    // Obtener la matrícula de la URL (puedes ajustar cómo se obtiene según tu configuración)
    const url = new URL(window.location.href);
    const matriculaURL = url.searchParams.get("matricula");

    const matriculaLocalStorage = localStorage.getItem("matricula");

    // Combinar ambas matrículas (usar la de la URL si está disponible, de lo contrario, usar la del Local Storage)
    const matricula = matriculaURL || matriculaLocalStorage;

    // Mostrar la matrícula en la página
    const matriculaElement = document.getElementById('matricula');
    matriculaElement.textContent = `Matrícula Empleado: ${matricula}`;

    // Botón "Cerrar Sesión"
    const cerrarSesionButton = document.getElementById("cerrar-sesion");
    cerrarSesionButton.addEventListener("click", function()
    {
        // Limpiar la matrícula del Local Storage al cerrar sesión
        localStorage.removeItem("matricula");

        // Redirigir a "login.html" al cerrar sesión
        window.location.href = "login.html";
    });

    // Botón "Escaneo QR" - Abre la página "scanner.html" en el iframe
    const scannerButton = document.getElementById("scannerqr-button");
    scannerButton.addEventListener("click", function()
    {
        const iframe = document.querySelector('iframe[name="scanner-frame"]');
        iframe.src = "Trabajador/scanner.html";
    });

    // Botón "Registro de Qr" - Abre la página "encuestas.html" en el iframe
    const escaneosButton = document.getElementById("escaneos-button");
    escaneosButton.addEventListener("click", function()
    {
        const iframe = document.querySelector('iframe[name="scanner-frame"]');
        iframe.src = "Trabajador/RegistrosQr.html";
    });

    const encuestasButton = document.getElementById("encuestas-button");
    encuestasButton.addEventListener("click", function()
    {
        const iframe = document.querySelector('iframe[name="scanner-frame"]');
        iframe.src = "Trabajador/RespuestasEncuestas.html";
    });
});