import { createAction, createReducer, on } from '@ngrx/store';

export interface ProductState {
  showProductCode: Boolean;
}

const initialState: ProductState = {
  showProductCode: false,
};

export const toggleShowProduct = createAction(
  '[Products Page] Toggle Show Product Code'
);

export const productReducer = createReducer(
  initialState,
  on(toggleShowProduct, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  }))
);
