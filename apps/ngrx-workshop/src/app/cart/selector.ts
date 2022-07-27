import { createFeatureSelector, createSelector } from '@ngrx/store';
import { withLatestFrom } from 'rxjs';
import { CartProduct } from '../model/product';
import { getProduct } from '../product/selector';
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

export const getCartProducts = createSelector(
  getCartItems,
  getProduct,
  (cartItems, products) => {
    if (!cartItems || !products) return undefined;
    return Object.entries(cartItems)
      .map(([productId, quantity]): CartProduct | undefined => {
        const product = products.find((p) => p.id === productId);
        if (!product) return undefined;
        return {
          ...product,
          quantity,
        };
      })
      .filter((cartProduct): cartProduct is CartProduct => !!cartProduct);
  }
);

export const getCartTotal = createSelector(getCartProducts, (cartProducts) => {
  return cartProducts?.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
});
