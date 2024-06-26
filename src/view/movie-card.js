import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createMovieCardTemplate } from './view-template/movie-card-template.js';

export default class MovieCard extends AbstractStatefulView {
  #handlePopupClick = null;
  #handleClickAlreadyWatched = null;
  #handleClickFavorite = null;
  #handleClickWatchlist = null;

  constructor({ movie, onPopupClick, onAlreadyWatched, onFavoriteClick, onWatchlistClick }) {
    super();
    this._setState(MovieCard.parseMovieToState(movie));
    this.#handlePopupClick = onPopupClick;
    this.#handleClickAlreadyWatched = onAlreadyWatched;
    this.#handleClickFavorite = onFavoriteClick;
    this.#handleClickWatchlist = onWatchlistClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#popupClickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#clickAlreadyWatchedHandler);
    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
  }

  get template() {
    return createMovieCardTemplate(this._state);
  }

  #popupClickHandler = (event) => {
    event.preventDefault();

    if (event.target.type === 'button') {
      return;
    }

    this.#handlePopupClick();
  };

  #clickAlreadyWatchedHandler = (event) => {
    event.preventDefault();
    this.#handleClickAlreadyWatched();
  };

  #clickFavoriteHandler = (event) => {
    event.preventDefault();
    this.#handleClickFavorite();
  };

  #clickWatchlistHandler = (event) => {
    event.preventDefault();
    this.#handleClickWatchlist();
  };

  static parseMovieToState(movie) {
    return {
      ...movie,
      isDisable: false,
    };
  }
}
