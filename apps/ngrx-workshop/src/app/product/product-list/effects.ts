import { ApplicationRef, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ProductService } from '../product.service';
import * as ProductListPageActions from './actions';
import * as apiActions from '../actions';
import * as cartActions from '../../cart/action';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as productActions from '../actions';
import { getRouterParam } from '../../router/selector';
import { Store } from '@ngrx/store';
import * as cartDetailActions from '../../cart/cart-details/actions';

@Injectable({ providedIn: 'root' })
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef,
    private readonly store: Store
  ) {}

  readonly fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductListPageActions.productsOpened,
        cartDetailActions.cartPageOpened
      ),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => apiActions.productsFetched({ products })),
          catchError(() => of(apiActions.productFetchError()))
        )
      )
    )
  );

  readonly fetchProduct = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.porductPageOpened),
      withLatestFrom(this.store.select(getRouterParam('productId'))),
      map(([, productId]) => productId),
      switchMap((productId) => {
        return this.productService
          .getProduct(productId ?? '')
          .pipe(map((product) => apiActions.productFetched({ product })));
      })
    );
  });

  readonly fetchProductError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(apiActions.productFetchError, cartActions.addToCartFailure),
        tap(() => {
          this.snackBar.open('Something went wrong!', 'Error', {
            duration: 2500,
          });
        })
      );
    },
    { dispatch: false }
  );
}
