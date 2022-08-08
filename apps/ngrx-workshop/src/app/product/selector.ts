import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterParam } from '../router/selector';
import { productEntityAdapter, ProductState } from './reducer';

const { selectAll, selectEntities } = productEntityAdapter.getSelectors();

const getProductState = createFeatureSelector<ProductState>('product');

export const getProductEntityState = createSelector(
  getProductState,
  (productState) => {
    return productState.products;
  }
);

export const getProduct = createSelector(getProductEntityState, selectAll);

export const getProductCallState = createSelector(
  getProductState,
  (productState) => productState.productCallState
);

export const getCurrentProduct = createSelector(
  getProductEntityState,
  getRouterParam('productId'),
  (entityState, id) => {
    if (id == null) {
      return undefined;
    }
    return selectEntities(entityState)[id];
  }
);
