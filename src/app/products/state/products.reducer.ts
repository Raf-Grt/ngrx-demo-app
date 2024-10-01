import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState: ProductState = adapter.getInitialState({
  showProductCode: false,
  loading: false,
  errorMessage: '',
});

export const productReducer = createReducer(
  initialState,
  // TOGGLE ACTION
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  // LOAD ACTIONS
  on(ProductsPageActions.loadProducts, (state) =>
    adapter.setAll([], {
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(ProductsApiActions.productsLoadedSuccess, (state, { products }) =>
    adapter.setAll(products, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsApiActions.productsLoadedFail, (state, { message }) =>
    adapter.setAll([], {
      ...state,
      errorMessage: message,
      loading: false,
    })
  ),
  // ADD ACTIONS
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsApiActions.productAddedSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
    })
  ),
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
  on(ProductsApiActions.productUpdatedSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
      loading: false,
    })
  ),
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
  on(ProductsApiActions.productDeletedSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsApiActions.productDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  }))
);

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProductEntities = selectEntities;
export const selectProducts = selectAll;
