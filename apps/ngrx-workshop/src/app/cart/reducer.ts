import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as productActions from '../product/actions';
import * as cartActions from './cart-details/actions';
import * as cartStatusActions from './action';

export const CART_FEATURE = 'cart';

export interface CartState {
  cartItems: { [productId: string]: number };
}
const initialState: CartState = {
  cartItems: {},
};

function updateProductQuantity(productId: string, state: CartState): number {
  let quantity = 1;
  if (state.cartItems && state.cartItems[productId]) {
    quantity = state.cartItems[productId] + 1;
  }
  return quantity;
}

export const cartReducer = createReducer(
  initialState,
  on(productActions.addToCart, (state, { productId }) => ({
    ...state,
    cartItems: {
      ...state.cartItems,
      [productId]: updateProductQuantity(productId, state),
    },
  })),
  on(cartStatusActions.addToCartFailure, (state, { productId }) => {
    const currentQuantity = state.cartItems[productId];
    const newCartItems = { ...state.cartItems };
    if (currentQuantity && currentQuantity > 1) {
      --newCartItems[productId];
    } else {
      delete newCartItems[productId];
    }
    return {
      ...state,
      cartItems: newCartItems,
    };
  }),
  on(cartActions.fetchCartItemsSuccess, (state, { cartItems }) => {
    return {
      ...state,
      cartItems: cartItems.reduce(
        (acc: { [productId: string]: number }, { productId, quantity }) => {
          acc[productId] = quantity;
          return acc;
        },
        {}
      ),
    };
  })
);
