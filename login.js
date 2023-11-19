document.addEventListener("DOMContentLoaded", function ()
{
    // Abrir o crear la base de datos
    var request = indexedDB.open("usuariosDB", 1);
    var db;

    request.onupgradeneeded = function (event)
    {
        db = event.target.result;

        // Crea un almacén de objetos para usuarios con una clave primaria
        var objectStore = db.createObjectStore("usuarios", { keyPath: "matricula" });

        // Agregar los nuevos usuarios
        objectStore.add({ type: "Alumno", matricula: "123456", password: "hello123" });
        objectStore.add({ type: "Alumno", matricula: "654321", password: "password" });
        objectStore.add({ type: "Alumno", matricula: "101010", password: "palomitas" });
        objectStore.add({ type: "Trabajador", matricula: "555555", password: "admin" });
        objectStore.add({ type: "Alumno", matricula: "111111", password: "contra" });
    };

    // Manejar el éxito de la apertura de la base de datos
    request.onsuccess = function (event)
    {
        db = event.target.result; // Asignar la base de datos

        // Escuchar el envío del formulario de inicio de sesión
        document.getElementById("login-form").addEventListener("submit", function (e)
        {
            e.preventDefault();
            var type = document.getElementById("type").value;
            var matricula = document.getElementById("matricula").value;
            var password = document.getElementById("password").value;

            // Ahora puedes abrir una transacción de lectura en el almacén de objetos de usuarios
            var transaction = db.transaction("usuarios", "readonly");
            var objectStore = transaction.objectStore("usuarios");

            // Buscar el usuario en la base de datos
            var request = objectStore.get(matricula);

            request.onsuccess = function (event)
            {
                var user = event.target.result;

                if (user && user.password === password && user.type === type)
                {
                    // Usuario autenticado con éxito
                    // Almacena la matrícula en Local Storage
                    localStorage.setItem("matricula", matricula);

                    if (type === "Alumno")
                    {
                        // Redirigir a la página de Alumno con la matrícula como parámetro en la URL
                        window.location.href = "InicioAlumno.html?matricula=" + matricula;
                    }
                    else if (type === "Trabajador")
                    {
                        // Redirigir a la página de Trabajador
                        window.location.href = "InicioTrabajador.html";
                    }
                }
                else
                {
                    // Usuario no encontrado, contraseña incorrecta o tipo incorrecto
                    document.getElementById("status").textContent = "Usuario, contraseña o tipo son incorrectos";
                }
            };
        });
    };
});