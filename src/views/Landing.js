import BaseView from './BaseView';
import { languages } from './a11y/lang';

const language = 'en';
const lang = languages[language].home;

export default class Home extends BaseView {
    constructor() {
        super();
        this.setTitle(lang.title);
    }

    getHtml() {
        return `
            <div id="landingPage" class="screen" style="display: block">
                <h1>Welcome to the Ticket Check-In System</h1>
                <p>Select an event to start checking in attendees.</p>
            </div>
        `;
    }

    injectTemplate() {
        document.querySelector('#main-page').innerHTML = this.getHtml();
    }
}
