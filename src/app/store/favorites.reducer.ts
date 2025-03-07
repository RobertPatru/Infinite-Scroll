import { createReducer } from '@ngrx/store';
import { initialFavoriteListState } from './favorites.state';

export const favoritesReducer = createReducer(
  initialFavoriteListState,
);


