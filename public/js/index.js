// Define the Home view
class Home {
    injectTemplate() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <h1>Welcome to Event Tracker</h1>
            <p>Track your events with ease!</p>
        `;
    }
}

// Define the Scanner view
class Scanner {
    injectTemplate() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <section class="scanner-section">
                <h2>Scan Barcode</h2>
                <button id="startScanner">Start Camera Scanner</button>
                <div id="cameraContainer" class="camera-container" style="display: none;">
                    <video id="scannerCamera" autoplay></video>
                </div>
                <input type="text" id="barcodeInput" placeholder="Or Enter Barcode Manually" autofocus>
                <button id="scanButton">Fetch Info</button>
            </section>
            <section class="attendee-section">
                <h2>Attendee Information</h2>
                <div id="attendeeInfo" class="info-card">
                    <p>No attendee information available.</p>
                </div>
                <button id="checkInButton" disabled>Check In</button>
            </section>
        `;
        this.setupScanner();
    }

    setupScanner() {
        const startScannerButton = document.getElementById('startScanner');
        const cameraContainer = document.getElementById('cameraContainer');
        const scannerCamera = document.getElementById('scannerCamera');
        const scanButton = document.getElementById('scanButton');
        const barcodeInput = document.getElementById('barcodeInput');
        const attendeeInfo = document.getElementById('attendeeInfo');
        const checkInButton = document.getElementById('checkInButton');

        // Start camera scanner
        startScannerButton.addEventListener('click', () => {
            cameraContainer.style.display = 'block';
            Quagga.init(
                {
                    inputStream: {
                        name: 'Live',
                        type: 'LiveStream',
                        target: scannerCamera, // Render camera feed here
                    },
                    decoder: {
                        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'], // Supported barcode types
                    },
                },
                (err) => {
                    if (err) {
                        console.error('Error starting Quagga:', err);
                        alert('Failed to start camera. Please check permissions or try again.');
                        return;
                    }
                    Quagga.start();
                }
            );

            // Listen for detected barcodes
            Quagga.onDetected((data) => {
                const code = data.codeResult.code;
                barcodeInput.value = code; // Autofill the input with scanned code
                cameraContainer.style.display = 'none'; // Hide camera after scanning
                Quagga.stop();
            });
        });

        // Handle manual input scanning
        scanButton.addEventListener('click', () => {
            const barcode = barcodeInput.value.trim();
            if (!barcode) {
                alert('Please enter or scan a barcode');
                return;
            }

            // Simulate API call for fetching attendee info
            const attendeeData = {
                name: 'John Doe',
                ticketType: 'VIP',
                checkedIn: false,
            };

            // Display attendee information
            attendeeInfo.innerHTML = `
                <p><strong>Name:</strong> ${attendeeData.name}</p>
                <p><strong>Ticket Type:</strong> ${attendeeData.ticketType}</p>
                <p><strong>Status:</strong> ${attendeeData.checkedIn ? 'Already Checked In' : 'Not Checked In'}</p>
            `;

            checkInButton.disabled = attendeeData.checkedIn;
        });

        // Check-In button
        checkInButton.addEventListener('click', () => {
            alert('Attendee checked in successfully!');
            checkInButton.disabled = true; // Disable button after check-in
        });
    }
}

// Define the NotFound view
class NotFound {
    injectTemplate() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
        `;
    }
}

// Define routes
const routes = {
    404: NotFound,
    '/': Home,
    '/scan': Scanner,
};

// Navigation function
const navigateTo = async (url) => {
    window.history.pushState(null, '', url);
    router();
};

// Router function
const router = async () => {
    const path = location.pathname;
    const PageClass = routes[path] ? new routes[path]() : new routes[404]();
    PageClass.injectTemplate();
};

// Add event listeners for routing
window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});
