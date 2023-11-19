document.addEventListener('DOMContentLoaded', () =>
{
    // Obtener la matrícula de la URL (puedes ajustar cómo se obtiene según tu configuración)
    const url = new URL(window.location.href);
    const matriculaURL = url.searchParams.get("matricula");

    // Obtener la matrícula del Local Storage
    const matriculaLocalStorage = localStorage.getItem("matricula");

    // Combinar ambas matrículas (usar la de la URL si está disponible, de lo contrario, usar la del Local Storage)
    const matricula = matriculaURL || matriculaLocalStorage;

    // Mostrar la matrícula en la página
    const matriculaElement = document.getElementById('matricula');
    matriculaElement.textContent = `Matrícula: ${matricula}`;

    // Botón "Cerrar Sesión"
    const cerrarSesionButton = document.getElementById("cerrar-sesion");
    cerrarSesionButton.addEventListener("click", function()
    {
        // Limpiar la matrícula del Local Storage al cerrar sesión
        localStorage.removeItem("matricula");

        // Redirigir a "login.html" al cerrar sesión
        window.location.href = "/login.html";
    });


    // Botón "Inicio" - Redirigir a la página de encuestas
    const inicioButton = document.getElementById("inicio-button");
    inicioButton.addEventListener("click", function()
    {
        // Redirigir a la página de encuestas
        window.location.href = "/InicioAlumno.html";
    });
});

function redirigir(url)
{
    window.location.href = url;
}