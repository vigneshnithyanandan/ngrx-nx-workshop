import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalState, ProductState } from './reducer';

const getProductState = createFeatureSelector<ProductState>('product');

export const getProduct = createSelector(getProductState, (productState) => {
  return productState.products;
});
