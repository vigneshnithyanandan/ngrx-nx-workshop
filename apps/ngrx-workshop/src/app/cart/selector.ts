import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CART_FEATURE } from './reducer';

export const cartFeature = createFeatureSelector<CartState>(CART_FEATURE);

export const getCartItems = createSelector(
  cartFeature,
  (state) => state.cartItems
);

export const getCartItemsCount = createSelector(getCartItems, (cartItems) => {
  return Object.values(cartItems).reduce((acc, amount) => {
    return acc + amount;
  }, 0);
});
