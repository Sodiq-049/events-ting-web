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
                <input type="text" id="barcodeInput" placeholder="Scan or Enter Barcode" autofocus>
                <button id="scanButton">Fetch Info</button>
            </section>
            <section class="attendee-section">
                <h2>Attendee Information</h2>
                <div id="attendeeInfo" class="info-card">
                    <!-- Attendee details will load here -->
                    <p>No attendee information available.</p>
                </div>
                <button id="checkInButton" disabled>Check In</button>
            </section>
        `;
        this.setupScanner();
    }

    setupScanner() {
        const scanButton = document.getElementById('scanButton');
        const checkInButton = document.getElementById('checkInButton');
        const attendeeInfo = document.getElementById('attendeeInfo');

        scanButton.addEventListener('click', () => {
            const barcode = document.getElementById('barcodeInput').value.trim();
            if (!barcode) {
                alert('Please enter a barcode');
                return;
            }

            // Simulate API call for fetching attendee info
            const attendeeData = {
                name: "John Doe",
                ticketType: "VIP",
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

        checkInButton.addEventListener('click', () => {
            alert('Attendee checked in successfully!');
            checkInButton.disabled = true; // Disable the button after check-in
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

