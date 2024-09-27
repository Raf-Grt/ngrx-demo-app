import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductState = {
  showProductCode: false,
  loading: false,
  products: [],
  errorMessage: '',
};

export const productReducer = createReducer(
  initialState,
  // TOGGLE ACTION
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  // LOAD ACTIONS
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
    products: [],
  })),
  on(ProductsApiActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(ProductsApiActions.productsLoadedFail, (state, { message }) => ({
    ...state,
    products: [],
    errorMessage: message,
    loading: false,
  })),
  // ADD ACTIONS
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsApiActions.productAddedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product],
  })),
  on(ProductsApiActions.productAddedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  // UPDATE ACIONS
  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsApiActions.productUpdatedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map((existingProduct) =>
      existingProduct.id === product.id ? product : existingProduct
    ),
  })),
  on(ProductsApiActions.productUpdatedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  // DELETE ACTIONS
  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsApiActions.productDeletedSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter(
      (existingProduct) => existingProduct.id !== id
    ),
  })),
  on(ProductsApiActions.productDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  }))
);
