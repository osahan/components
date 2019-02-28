'use strict';
import {
    createCustomVariables
} from '../../lib/utils.js';
require('../maven-card/main.js');
window.customElements.define('maven-engage', class extends HTMLElement {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({
            mode: 'open'
        })
        shadowRoot.innerHTML = `
            <style>
                :host{
                    background: var(--component-title-backgroundColor, transparent);
                    display: block;
                }

                .m-maven-engage {
                    margin-left: auto;
                    margin-right: auto;
                }

                .m-maven-engage--header {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                }
                .m-maven-engage--title {
                    font: var(--component-title-font);
                    color: var(--component-title-color);
                }

                .m-maven-engage--logo {
                    width: 30px;
                }

                .m-maven-engage--content {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }
            </style>
            <section class="m-maven-engage">
                <h1 class="m-maven-engage--header">
                    <span class="m-maven-engage--title">From Maven Coalition</span>
                    <svg class="m-maven-engage--logo" viewBox="0 0 367.1 512"  x="0px" y="0px" xml:space="preserve"><path d="M194.9,264.1l80.5-80.5l-91.8-92l-92,92l80.5,80.5v156.2h23v-15.5h30.6v-23.6h-17.1v-23.3h17.1v-23.6h-30.6v-70.4h-0.2 V264.1z M124.6,183.8l59.4-59.4l59.4,59.4L220,207.2l-36-36l-36,36L124.6,183.8z M183.9,243.1l-27.5-27.5l27.5-27.5l27.5,27.5 L183.9,243.1z"></path></svg>
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
        const contentContainer = this.shadowRoot.querySelector('.m-maven-engage--content');
        streamData.then(data => {
            const customVariables = createCustomVariables(JSON.parse(this.querySelector('script').textContent));
            this.style.cssText += customVariables;

            if (data.cards && data.cards.length) {
                contentContainer.innerHTML = `${data.cards
                    .map((card, i) =>{
                        return `<maven-card>
                            <script type="application/json">${JSON.stringify(card)}</script>
                        </maven-card>`
                    })
                    .join('')
                }`;
            }
        });
    }
});