import { createAction, props } from '@ngrx/store';

export const addToCartSuccess = createAction(
  '[Product List Page] Added to cart success'
);

export const addToCartFailure = createAction(
  '[Product List Page] Added to cart failure',
  props<{ productId: string }>()
);
