'use strict';
import {
    createCustomVariables
} from '../../lib/utils.js';
require('../maven-card/main.js');
const get = require('lodash.get');
window.customElements.define(
    'maven-engage',
    class extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: 'open',
            });
            shadowRoot.innerHTML = `
            <style>
                :host{
                    border: 1px solid transparent;
                    background: var(--component-backgroundColor, transparent);
                    display: flex;
                    width: inherit;
                }

                .m-maven-engage {
                    margin-left: auto;
                    margin-right: auto;
                }

                .m-maven-engage.has-background {
                    padding: 20px;
                }

                .m-maven-engage--header {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    margin: 0 0 20px;
                    padding: 0;
                }
                .m-maven-engage--title {
                    font: var(--component-title-font);
                    color: var(--component-title-color);
                }

                .m-maven-engage--logo {
                    width: 30px;
                }

                .m-maven-engage--content {
                    align-items: stretch;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .m-maven-engage--item {
                    margin-bottom: 20px;
                    flex: 0 1 100%;
                }

                .is-standard-card .m-maven-engage--item,
                .is-image-card .m-maven-engage--item {
                    min-width: 200px;
                    max-width: 300px;
                }


            </style>
            <section class="m-maven-engage">
                <h1 class="m-maven-engage--header">
                    <span class="m-maven-engage--title"></span>
                    <span class="m-maven-engage--logo">
                        <svg viewBox="0 0 367.1 512"  x="0px" y="0px" xml:space="preserve"><path d="M194.9,264.1l80.5-80.5l-91.8-92l-92,92l80.5,80.5v156.2h23v-15.5h30.6v-23.6h-17.1v-23.3h17.1v-23.6h-30.6v-70.4h-0.2 V264.1z M124.6,183.8l59.4-59.4l59.4,59.4L220,207.2l-36-36l-36,36L124.6,183.8z M183.9,243.1l-27.5-27.5l27.5-27.5l27.5,27.5 L183.9,243.1z"></path></svg>
                    </span>
                </h1>
                <div class="m-maven-engage--content"></div>
            </section>`;
        }

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
            const moduleBlock = this.shadowRoot.querySelector('.m-maven-engage');
            const contentContainer = this.shadowRoot.querySelector('.m-maven-engage--content');
            const componentTitle = this.shadowRoot.querySelector('.m-maven-engage--title');

            let cardClassNames = [];
            let componentClassNames = [];
            streamData.then(data => {
                this.config = JSON.parse(this.querySelector('script').textContent);
                this.style.cssText += createCustomVariables(this.config);

                const componentTitleText = get(this.config, 'component.title', 'From Maven Coalition');
                componentTitle.innerHTML = componentTitleText;

                const componentBackground = get(this.config, 'style.component.backgroundColor');

                if (componentBackground && componentBackground !== "transparent") {
                    componentClassNames.push('has-background');
                }

                const cardBackground = get(this.config, 'style.card.backgroundColor');
                if (cardBackground && cardBackground !== "transparent") {
                    cardClassNames.push('has-background');
                }

                const cardSectionBackground = get(this.config, 'style.card.sectionLabel.backgroundColor');
                if (cardSectionBackground && cardSectionBackground !== "transparent") {
                    cardClassNames.push('has-section-background');
                }

                const cardSiteBackground = get(this.config, 'style.card.site.backgroundColor');
                if (cardSiteBackground && cardSiteBackground !== "transparent") {
                    cardClassNames.push('has-site-background');
                }


                const cardTextAlign = get(this.config, 'style.card.textAlign');
                if (cardTextAlign && cardTextAlign === 'center') {
                    cardClassNames.push('is-center-align');
                }

                const cardImageStyle = get(this.config, 'style.card.imageStyle');
                if (cardImageStyle) {
                    switch (cardImageStyle) {
                        case 'landscape':
                            cardClassNames.push('is-landscape-image');
                            break;
                        case 'portrait': // not yet Supported
                            cardClassNames.push('is-portrait-image');
                            break;
                        case 'square': // not yet Supported
                            cardClassNames.push('is-square-image');
                            break;
                        case 'round': // not yet Supported
                            cardClassNames.push('is-round-image');
                            break;
                    }
                }

                const cardType = get(this.config, 'style.card.cardType');
                if (cardType) {
                    switch (cardType) {
                        case 'standard':
                            cardClassNames.push('is-standard-card');
                            componentClassNames.push('is-standard-card');
                            break;
                        case 'image': // not yet Supported
                            cardClassNames.push('is-image-card');
                            componentClassNames.push('is-image-card');
                            break;
                        case 'list': // not yet Supported
                            cardClassNames.push('is-list-card');
                            componentClassNames.push('is-list-card');
                            break;
                    }
                }
                moduleBlock.classList.add(...componentClassNames);

                if (data.cards && data.cards.length) {
                    contentContainer.innerHTML = `${data.cards
                        .map((card, i) => {
                            card.classnames = cardClassNames;
                            return `
                                <maven-card class="m-maven-engage--item">
                                    <script type="application/json">${JSON.stringify(card)}</script>
                                </maven-card>
                            `;
                        })
                        .join('')}`;
                }
            });
        }
    }
);