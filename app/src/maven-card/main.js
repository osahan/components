'use strict';
window.customElements.define('maven-card', class extends HTMLElement {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({
            mode: 'open'
        })
        shadowRoot.innerHTML = `
                <style>
                    .m-maven-card {
                        border: 1px solid var(--card-text-color, green);
                        display: flex;
                        flex-direction: column;
                    }
                    .m-maven-card--title {
                        font: var(--component-title-font-shorthand);
                    }
                </style>`;
        this.cardData = JSON.parse(this.querySelector('script').textContent);
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        const data = this.cardData

        if (data) {
            this.shadowRoot.innerHTML = `<div class="m-maven-card">
                <img src="${data.image.src}">
                <div class="m-maven-card--content">
                    <a href="${data.label.link}">${data.label.displayName}</a>
                    <a href="${data.link}">
                        <h2 class="m-maven-card--title">${data.title}</h2>
                    </a>
                    ${data.subTitle}
                </div>
            </div>`;
        }
    }
});