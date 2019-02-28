'use strict';
window.customElements.define(
    'maven-card',
    class extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: 'open',
            });
            shadowRoot.innerHTML = `
                <style>
                    :host{
                        height: 100%;
                    }

                    .m-maven-card {
                        background: var(--card-backgroundColor, transparent);
                        display: flex;
                        flex-direction: column;
                    }

                    .is-image-card.m-maven-card {
                        position: relative;
                    }

                    .is-list-card.m-maven-card {
                        flex-direction: row;
                        justify-content: flex-start;
                    }

                    .m-maven-card--media {
                        flex: 100%;
                        width: 100%;
                        overflow: hidden;
                    }

                    .m-maven-card--media-wrapper {
                        padding-top: 56%;
                        position: relative;
                        width: 100%;
                    }

                    .is-list-card .m-maven-card--media {
                        flex: 33.33%;
                        width: 33.33%;
                    }

                    .is-portrait-image .m-maven-card--media {
                        padding-top: 125%;
                    }

                    .m-maven-card--media img {
                        max-width: 100%;
                        object-fit: cover;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }

                    .is-portrait-image .m-maven-card--media img {
                        min-height: 100%;
                        width: auto;
                    }

                    .is-list-card .m-maven-card--media img {
                        height: auto;
                        min-width: 100%
                    }

                    .m-maven-card--content {
                        align-items: flex-start;
                        padding-bottom: 15px;
                        padding-top: 15px;
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                    }

                    .is-center-align .m-maven-card--content {
                        align-items: center;

                    }

                    .is-list-card .m-maven-card--content {
                        margin-left: 15px;
                        padding: 0;
                        flex: 66.67%;
                        width: 66.67%;
                    }

                    .has-background .m-maven-card--content {
                        padding: 15px;
                    }

                    .m-maven-card--section-label {
                        color: var(--card-sectionLabel-color, #000000);
                        font: var(--card-sectionLabel-font);
                        text-decoration: none;
                        text-transform: var(--card-sectionLabel-textTransform, none);
                    }

                    .has-section-background .m-maven-card--section-label {
                        background: var(--card-sectionLabel-backgroundColor, transparent);
                        padding: 5px;
                    }

                    .m-maven-card--site-label {
                        color: var(--card-site-color, #000000);
                        display: inline-block;
                        font: var(--card-site-font);
                        margin-top: 15px;
                        text-decoration: none;
                        text-transform: var(--card-site-textTransform, none);
                    }

                    .has-site-background .m-maven-card--site-label {
                        background: var(--card-site-backgroundColor, transparent);
                        padding: 5px;
                    }

                    .m-maven-card--title-link {
                        display: block;
                        padding-top: 10px;
                        text-decoration: none;
                    }

                    .m-maven-card--title {
                        color: var(--card-title-color, #000000);
                        font: var(--card-title-font);
                        margin: 0;
                        padding: 0;
                        text-transform: var(--card-title-textTransform, none);
                    }

                    .m-maven-card--teaser {
                        color: var(--card-subTitle-color, #000000);
                        flex: 2;
                        font: var(--card-subTitle-font);
                        padding-top: 10px;
                        text-transform: var(--card-subTitle-textTransform, none);
                    }
                </style>
                <div class="m-maven-card"></div>`;
            this.cardData = JSON.parse(this.querySelector('script').textContent);
        }

        connectedCallback() {
            this._render();
        }

        _render() {
            const data = this.cardData;
            const cardContainer = this.shadowRoot.querySelector('.m-maven-card');

            if (data) {

                cardContainer.classList.add(...data.classnames);
                cardContainer.innerHTML = `
                <div class="m-maven-card--media">
                    <div class="m-maven-card--media-wrapper">
                        <img src="${data.image.src}">
                    </div>
                </div>
                <div class="m-maven-card--content">
                    <a href="${data.label.link}" target="_blank" class="m-maven-card--section-label">${data.label
                    .displayName}</a>
                    <a href="${data.link}" target="_blank" class="m-maven-card--title-link">
                        <h2 class="m-maven-card--title">${data.title}</h2>
                    </a>
                    <div class="m-maven-card--teaser">
                        ${data.subTitle}
                    </div>
                    <a href="${data.site.link}" target="_blank" class="m-maven-card--site-label">
                        ${data.site.displayName}
                    </a>
                </div>
            </div>`;
            }
        }
    }
);