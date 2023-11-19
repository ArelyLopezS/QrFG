// Definir una función para abrir la base de datos
function openDB() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('QrEscaneados', 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('QrDatas', { keyPath: 'id', autoIncrement: true });
        };

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onerror = event => {
            reject(event.target.error);
        };
    });
}

// Modificar la función para agregar escaneo a la base de datos
function addScanToDB(scanData) {
    openDB()
        .then(db => {
            const transaction = db.transaction('QrDatas', 'readwrite');
            const objectStore = transaction.objectStore('QrDatas');
            const request = objectStore.add(scanData);

            request.onsuccess = event => {
                console.log('Escaneo guardado en la base de datos.');
                alert("Escaneado el QR con Exito");
            };

            request.onerror = event => {
                console.error('Error al guardar el escaneo en la base de datos:', event.target.error);
            };
        })
        .catch(error => {
            console.error('Error al abrir la base de datos:', error);
        });
}

var app = new Vue({
    el: '#app',
    data: {
        scanner: null,
        activeCameraId: null,
        cameras: [],
        latestScan: null,
        isCameraOn: false
    },
    mounted: function () {
        var self = this;
        self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
        self.scanner.addListener('scan', function (content, image) {
            const formattedData = formatData(content); // Formatear los datos
            self.latestScan = formattedData;
            addScanToDB({ content: formattedData, date: new Date() }); // Llamar a la función para guardar el escaneo en la base de datos
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            self.cameras = cameras;
            if (cameras.length > 0) {
                self.activeCameraId = cameras[0].id;
                self.scanner.start(cameras[0]);
                self.isCameraOn = true;
                 alert('Lo siento, no tienes reservas por el momento. Realiza una reserva en SIASE y vuelve más tarde.');
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    },
    methods: {
        formatName: function (name) {
            return name || '(unknown)';
        },
        selectCamera: function (camera) {
            this.activeCameraId = camera.id;
            this.scanner.start(camera);
            this.isCameraOn = true;
        },
        toggleCamera: function () {
            if (this.isCameraOn) {
                this.scanner.stop();
                this.isCameraOn = false;
            } else {
                this.selectCamera(this.cameras[0]);
            }
        }
    }
});

// Función para formatear los datos
function formatData(content) {
    try {
        const data = JSON.parse(content);
        if (data && typeof data === 'object') {
            const formattedData = {
                'IDReserva': data.IDReserva || '',
                'Matricula': data.Matricula || '',
                'Hora': data.Hora || '',
                'Fecha': data.Fecha || ''
            };
            return formattedData;
        }
    } catch (error) {
        console.error('Error al formatear los datos:', error);
    }
    // Si no se pudo formatear correctamente, puedes devolver un objeto con valores predeterminados o nulos:
    return {
        'IDReserva': '',
        'Matricula': '',
        'Hora': '',
        'Fecha': ''
    };
}
