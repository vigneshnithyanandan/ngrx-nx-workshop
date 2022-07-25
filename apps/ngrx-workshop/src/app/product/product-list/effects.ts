import { ApplicationRef, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ProductService } from '../product.service';
import * as ProductListPageActions from './actions';
import * as apiActions from '../actions';
import * as cartActions from '../../cart/action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef
  ) {}

  readonly fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListPageActions.productsOpened),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => apiActions.productFetched({ products })),
          catchError(() => of(apiActions.productFetchError()))
        )
      )
    )
  );

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
