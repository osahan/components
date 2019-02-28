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
                        background: var(--card-backgroundColor, transparent);
                        display: flex;
                        flex-direction: column;
                    }

                    .m-maven-card--content {
                        padding: 10px;
                    }

                    .m-maven-card--section-label {
                        color: var(--card-sectionLabel-color, #000000);
                        background: var(--card-sectionLabel-backgroundColor, transparent);
                        font: var(--card-sectionLabel-font);
                        padding: 5px;
                        text-decoration: none;
                        text-transform: uppercase;
                    }

                    .m-maven-card--title-link {
                        text-decoration: none;
                    }

                    .m-maven-card--title {
                        color: var(--card-title-color, #000000);
                        font: var(--component-title-font);
                    }

                    .m-maven-card--teaser {
                        color: var(--card-subTitle-color, #000000);
                        font: var(--card-subTitle-font);
                    }
                </style>
                <div class="m-maven-card"></div>`;
        this.cardData = JSON.parse(this.querySelector('script').textContent);
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        const data = this.cardData
        const cardContainer = this.shadowRoot.querySelector('.m-maven-card');

        if (data) {
            cardContainer.innerHTML = `
                <img src="${data.image.src}">
                <div class="m-maven-card--content">
                    <a href="${data.label.link}" class="m-maven-card--section-label">${data.label.displayName}</a>
                    <a href="${data.link}" class="m-maven-card--title-link">
                        <h2 class="m-maven-card--title">${data.title}</h2>
                    </a>
                    <div class="m-maven-card--teaser">
                        ${data.subTitle}
                    </div>
                </div>
            </div>`;
        }
    }
});