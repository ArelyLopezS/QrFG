document.addEventListener('DOMContentLoaded', () =>
{
    const dbPromise = window.indexedDB.open('ReservasDatabase', 1);
    const idSelection = document.getElementById('id-selection');
    const generateButton = document.getElementById('generate-qr');
    const qrCodeContainer = document.getElementById('qrcode');
    let qrcode = null;

    // Obtener la matrícula del LocalStorage
    const matriculaLocalStorage = localStorage.getItem("matricula");

    dbPromise.onupgradeneeded = (event) =>
    {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('datos'))
        {
            db.createObjectStore('datos', { keyPath: 'IDReserva' });
        }
    };

    dbPromise.onsuccess = (event) =>
    {
        const db = event.target.result;

        // Obtener las ID de reserva y agregarlas al menú desplegable
        const datosStore = db.transaction('datos').objectStore('datos');
        datosStore.openCursor().onsuccess = (event) =>
        {
            const cursor = event.target.result;
            if (cursor)
            {
                // Filtrar reservaciones por matrícula del LocalStorage
                if (cursor.value.Matricula === matriculaLocalStorage)
                {
                    const option = document.createElement('option');
                    option.value = cursor.value.IDReserva;
                    option.textContent = cursor.value.IDReserva;
                    idSelection.appendChild(option);
                }
                cursor.continue();
            }
        };

        generateButton.addEventListener('click', () =>
        {
            const selectedId = idSelection.value;
            if (selectedId)
            {
                const datosStore = db.transaction('datos').objectStore('datos');
                const request = datosStore.get(selectedId);

                request.onsuccess = (event) =>
                {
                    const data = event.target.result;
                    if (data)
                    {
                        // Elimina el código QR anterior antes de generar uno nuevo
                        if (qrcode)
                        {
                            qrcode.clear();
                            qrcode.makeCode(JSON.stringify(data));
                        }
                        else
                        {
                            qrcode = new QRCode(qrCodeContainer,
                            {
                                text: JSON.stringify(data),
                                width: 128,
                                height: 128,
                            });
                        }
                    }
                };
            }
        });
    };

    const saveAsImageButton = document.getElementById('save-as-image');
    
    // Agregar lógica para guardar el código QR como imagen
    saveAsImageButton.addEventListener('click', () => {
        saveQRCodeAsImage();
    });

    // Función para guardar el código QR como imagen con margen blanco
function saveQRCodeAsImage() {
    const canvas = qrCodeContainer.querySelector('canvas');
    if (canvas) {
        // Crear un nuevo canvas con margen blanco
        const canvasWithMargin = document.createElement('canvas');
        const context = canvasWithMargin.getContext('2d');

        // Ajustar el tamaño del nuevo canvas con margen
        const margin = 10; // Puedes ajustar el tamaño del margen según tus preferencias
        canvasWithMargin.width = canvas.width + 2 * margin;
        canvasWithMargin.height = canvas.height + 2 * margin;

        // Llenar el nuevo canvas con color blanco
        context.fillStyle = '#ffffff'; // Color blanco
        context.fillRect(0, 0, canvasWithMargin.width, canvasWithMargin.height);

        // Dibujar el código QR en el nuevo canvas con margen
        context.drawImage(canvas, margin, margin);

        // Obtener la URL de la imagen del nuevo canvas
        const imageURL = canvasWithMargin.toDataURL('image/png');

        // Crear un enlace y descargar la imagen
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'codigo_qr_con_margen.png';
        link.click();
    } else {
        console.error('No se encontró el elemento canvas del código QR.');
        alert("Acción denegada, selecciona una ID de una reserva y genera el código Qr para su guardado posterior.")
    }
}


    dbPromise.onerror = (event) =>
    {
        console.error('Error al abrir la base de datos:', event.target.error);
    };
});