import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageAction } from './products.actions';
import { Product } from '../product.model';

export interface ProductState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: false,
  loading: false,
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(ProductsPageAction.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsPageAction.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductsApiActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  }))
);
