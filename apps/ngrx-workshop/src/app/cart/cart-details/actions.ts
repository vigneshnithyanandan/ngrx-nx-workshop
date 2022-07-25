import { CartItem } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const timerTick = createAction('[Cart Effects] Timer tick');

export const fetchCartItemsSuccess = createAction(
  '[Cart Page] Fetched Cart Items',
  props<{ cartItems: CartItem[] }>()
);

export const fetchCartItemsError = createAction(
  '[Cart Page] Fetch Cart Items Error'
);

export const cartPageOpened = createAction('[Cart Page] Opened');

export const cartPagePurchaseCompleted = createAction(
  '[Cart Page] Purchase Completed'
);
