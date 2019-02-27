'use strict';
window.customElements.define('maven-engage', class extends HTMLElement {

    connectedCallback() {
        this.fetchUrl = this.getAttribute('src');
        this._render();
    }

    _fetchStream() {
        return fetch(this.fetchUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            });
    }

    _render() {
        const streamData = this._fetchStream();

        streamData.then(data => {
            console.log(data);
        });

    }
});