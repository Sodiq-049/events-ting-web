import { Html5QrcodeScanner } from 'html5-qrcode';
import BaseView from './BaseView';
import { languages } from './a11y/lang';

const language = 'en';
const lang = languages[language].scanner;

export default class Scanner extends BaseView {
    constructor() {
        super();
        this.setTitle(lang.title);
    }

    getHtml() {
        const template = `
            <div id="scannerContainer" class="screen" onload="setupScanner()">
                <h1>${lang.title}</h1>
                <div id="reader"></div>
                <p>${lang.tagline}</p>
            </div>
        `;
        return template;
    }

    setupScanner() {
        const scanResult = {
            status: 'pending',
            message: '',
        };

        async function onScanSuccess(qrCodeMessage) {
            scanResult.status = 'success';
            scanResult.message = qrCodeMessage;
            window.localStorage.setItem(
                'scan-result',
                JSON.stringify(scanResult)
            );
            scanner.clear();
        }

        function onScanFailure(error) {
            scanResult.status = 'fail';
            scanResult.message = `${error}`;
            window.localStorage.setItem(
                'scan-result',
                JSON.stringify(scanResult)
            );
        }

        const scanner = this.getScannerInstance();
        scanner.render(onScanSuccess, onScanFailure);
    }

    injectTemplate() {
        document.querySelector('#main-page').innerHTML = this.getHtml();
        this.setupScanner();
    }

    getScannerInstance() {
        const reader = document.getElementById('reader');
        if (!this.scanner) {
            this.scanner = new Html5QrcodeScanner(
                reader.id,
                {
                    qrbox: {
                        width: 450,
                        height: 450,
                    },
                    fps: 20,
                },
                true
            );
        }

        return this.scanner;
    }
}
