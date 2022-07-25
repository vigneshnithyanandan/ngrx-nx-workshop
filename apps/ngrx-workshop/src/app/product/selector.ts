import { GlobalState } from './reducer';

export const getProduct = (state: GlobalState) => state.product.products;
