import AbstractView from '../framework/view/abstract-view.js';

function createLoadingTemplate() {
  return `
  <section class="films-list">
    <h2 class="films-list__title">Loading...</h2>
  </section>
  `;
}

export default class Loading extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
