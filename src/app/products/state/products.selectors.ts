import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sumProducts } from 'src/app/utils/sum-products';
import { getRouterSelectors } from '@ngrx/router-store';
import * as fromProducts from './products.reducer';

export const selectProductState =
  createFeatureSelector<fromProducts.ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  fromProducts.selectProducts
);

export const selectProductsEntities = createSelector(
  selectProductState,
  fromProducts.selectProductEntities
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

export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
  selectProductsEntities,
  selectRouteParams,
  (productsEntities, { id }) => productsEntities[id]
);
