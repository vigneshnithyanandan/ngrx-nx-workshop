import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import * as apiActions from '../product/actions';

export interface GlobalState {
  product: ProductState;
}

export interface ProductState {
  products?: BasicProduct[];
}

export const initialState: ProductState = {
  products: undefined,
};

export const productReducer = createReducer(
  initialState,
  on(apiActions.productFetched, (state, { products }) => {
    return {
      ...state,
      products: [...products],
    };
  }),
  on(apiActions.productFetchError, (state) => {
    return {
      ...state,
      products: [],
    };
  })
);
