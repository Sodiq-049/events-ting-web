import NotFound from '../../src/views/Asgard';
import Home from '../../src/views/Landing';
import Scanner from '../../src/views/Scanner';

const routes = {
    404: NotFound,
    '/': Home,
    '/scan': Scanner,
};

const navigateTo = async (url) => {
    window.history.pushState(null, '', url);
    router();
};

const router = async () => {
    const PageClass = new routes[location.pathname]() || new routes['404']();
    PageClass.injectTemplate();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});
