import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterParam } from '../router/selector';
import { ProductState } from './reducer';

const getProductState = createFeatureSelector<ProductState>('product');

export const getProduct = createSelector(getProductState, (productState) => {
  return productState.products;
});

export const getCurrentProduct = createSelector(
  getProduct,
  getRouterParam('productId'),
  (products, id) => {
    if (products && id) {
      return products.find((product) => product.id === id);
    }
    return undefined;
  }
);
