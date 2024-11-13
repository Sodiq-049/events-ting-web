import { fetchEvents } from '../service/api';
import BaseView from './BaseView';
import { languages } from './a11y/lang';

const lang = 'en';
export default class Events extends BaseView {
    constructor() {
        super();
        this.setTitle(languages[lang].events.title);
    }

    async getHtml() {
        const events = await fetchEvents();
        if (!events.success) {
            return `
                <div id="eventsPage" class="screen" style="display: block">
                    <p>${languages[lang].events.failToLoad}</p>
                    <a href="/" class="nav__link" data-link>Home</a>
                </div>
            `;
        }

        const eventsData = events.data;

        if (!eventsData?.length) {
            return `
            <div id="eventsPage" class="screen" style="display: block">
                <p>${languages[lang].events.noEvents}</p>
                <a href="/" class="nav__link" data-link>Home</a>
            </div>
        `;
        }

        const eventsContainer = document.createElement('ul');
        eventsContainer.id = eventsData.id;
        eventsContainer.classList.add('eventsList');
        for (const data of eventsData) {
            const eventEntry = document.createElement('li');
            eventEntry.id = data.id;
            eventEntry.classList.add('eventsListItem');
            const eventLink = document.createElement('a');
            eventLink.setAttribute('data-link', '');
            eventLink.href = `${env.ApiBaseUrl}/events/${data.id}`;
            eventLink.innerText = data.name;
            eventEntry.appendChild(eventLink);
            eventsContainer.appendChild(eventEntry);
        }

        return `
            <div id="eventsPage" class="screen" style="display: block">
                ${eventsContainer}
            </div>
        `;
    }
}
