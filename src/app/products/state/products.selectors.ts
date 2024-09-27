import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products.reducer';
import { sumProducts } from 'src/app/utils/sum-products';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (productsState) => productsState.products
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (productsState) => productsState.loading
);

export const selectProductsShowCode = createSelector(
  selectProductState,
  (productsState) => productsState.showProductCode
);

export const selectProductsErrorMessage = createSelector(
  selectProductState,
  (productsState) => productsState.errorMessage
);

export const selectProductsTotal = createSelector(selectProducts, (products) =>
  sumProducts(products)
);
