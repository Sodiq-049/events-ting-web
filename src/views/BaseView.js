export default class BaseView {
    constructor() {}

    setTitle(title) {
        document.title = title;
    }

    getHtml() {
        return '';
    }

    injectTemplate() {}
}
