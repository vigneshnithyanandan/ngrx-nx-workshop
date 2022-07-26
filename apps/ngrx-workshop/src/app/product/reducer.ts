import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import * as apiActions from '../product/actions';

export interface ProductState {
  products?: BasicProduct[];
}

export const initialState: ProductState = {
  products: undefined,
};

export const productReducer = createReducer(
  initialState,
  on(apiActions.productsFetched, (state, { products }) => {
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
  }),
  on(apiActions.productFetched, (state, { product }) => {
    const newProducts = [...(state.products ?? [])]?.map((productFromState) => {
      if (productFromState.id === product.id) {
        const newProduct = { ...productFromState, ...product };
        return newProduct;
      }
      return productFromState;
    });
    console.log(newProducts);
    return {
      ...state,
      products: newProducts,
    };
  })
);
