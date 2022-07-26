import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

// list of all product details fetched

export const productsFetched = createAction(
  '[Product List page] Product list fetched',
  props<{ products: BasicProduct[] }>()
);

export const productFetchError = createAction(
  '[Product List page] Product list error'
);

// single product details fetched
export const productFetched = createAction(
  '[Product details page], Product detail fetched',
  props<{ product: Product }>()
);

export const addToCart = createAction(
  '[Product List page] Add to cart clicked',
  props<{ productId: string }>()
);

export const porductPageOpened = createAction('[Product Page] Opened');
