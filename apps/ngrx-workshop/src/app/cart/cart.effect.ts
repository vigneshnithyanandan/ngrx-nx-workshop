import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  defer,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { ProductService } from '../product/product.service';
import * as apiActions from './cart-details/actions';
import { CartService } from './cart.service';
import * as productDetailAction from '../product/actions';
import * as cardActions from '../cart/action';

@Injectable({ providedIn: 'root' })
export class CartEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService
  ) {}
  fetchCartItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        apiActions.timerTick,
        apiActions.cartPageOpened,
        apiActions.cartPagePurchaseCompleted
      ),
      switchMap(() => {
        return this.cartService.getCartProducts().pipe(
          map((cartItems) => {
            return apiActions.fetchCartItemsSuccess({ cartItems });
          })
        );
      })
    );
  });
  triggerTimerTick$ = createEffect(() => {
    return defer(() => {
      return timer(0, 30 * 60 * 1000).pipe(
        map(() => {
          return apiActions.timerTick();
        })
      );
    });
  });

  addProductToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailAction.addToCart),
      mergeMap(({ productId }) => {
        return this.cartService.addProduct(productId).pipe(
          map(() => {
            return cardActions.addToCartSuccess();
          }),
          catchError(() => {
            return of(cardActions.addToCartFailure({ productId }));
          })
        );
      })
    );
  });
}
