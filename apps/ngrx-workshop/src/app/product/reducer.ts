import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as apiActions from '../product/actions';
import { CallState, LoadingState } from '../shared/callState';
import * as productListActions from './product-list/actions';

export interface ProductState {
  products: EntityState<Product>;
  productCallState: CallState;
}

export const productEntityAdapter = createEntityAdapter<Product>({
  sortComparer: (item1, item2) => {
    return item1.price - item2.price;
  },
});

export const initialState: ProductState = {
  products: productEntityAdapter.getInitialState(),
  productCallState: LoadingState.INIT,
};

export const productReducer = createReducer(
  initialState,
  on(productListActions.productsOpened, (state) => {
    return {
      ...state,
      productCallState: LoadingState.LOADING,
    };
  }),
  on(apiActions.productsFetched, (state, action) => {
    return {
      ...state,
      productCallState: LoadingState.LOADED,
      products: productEntityAdapter.upsertMany(
        action.products,
        state.products
      ),
    };
  }),
  on(apiActions.productFetchError, (state) => {
    return {
      ...state,
      products: productEntityAdapter.removeAll(state.products),
    };
  }),
  on(apiActions.productFetched, (state, { product }) => {
    return {
      ...state,
      products: productEntityAdapter.upsertOne(product, state.products),
      productCallState: LoadingState.LOADED,
    };
  })
);
