import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private action$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) =>
            ProductsApiActions.productsLoadedSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsApiActions.productsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((newProduct) =>
            ProductsApiActions.productAddedSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(ProductsApiActions.productAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map(() => ProductsApiActions.productUpdatedSuccess({ product })),
          catchError((error) =>
            of(ProductsApiActions.productUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductsApiActions.productDeletedSuccess({ id })),
          catchError((error) =>
            of(ProductsApiActions.productDeletedFail({ message: error }))
          )
        )
      )
    )
  );
}
