import BaseView from './BaseView';
import { languages } from './a11y/lang';

const language = 'en';
const lang = languages[language][404];
export default class NotFound extends BaseView {
    constructor() {
        super();
        this.setTitle(lang.title);
    }

    getHtml() {
        return `
            <div id="asguard" class="screen" style="display: block">
                <p>${lang.tagline}</p>
            </div>
        `;
    }

    injectTemplate() {
        document.querySelector('#main-page').innerHTML = this.getHtml();
    }
}
