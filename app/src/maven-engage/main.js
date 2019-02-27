'use strict';
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
                    // border: 1px solid var(--card-text-color);
                }
                .m-maven-engage {
                    border: 1px solid var(--card-text-color);
                    margin-left: auto;
                    margin-right: auto;
                }

                .m-maven-engage--title {
                    font: var(--component-title-font-shorthand);
                }

                .m-maven-engage--content {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

            </style>
            <section class="m-maven-engage">
                <h1 class="m-maven-engage--title">From Maven Coalition</h1>
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
        console.log(this.shadowRoot, contentContainer);

        streamData.then(data => {
            console.log(data);
            if (data.cards && data.cards.length) {
                contentContainer.innerHTML = `${data.cards
                    .map((card, i) =>{
                        return `<maven-card>
                            <script>${JSON.stringify(card)}</script>
                        </maven-card>`
                    })
                    .join('')
                }`;
            }
        });
    }
});