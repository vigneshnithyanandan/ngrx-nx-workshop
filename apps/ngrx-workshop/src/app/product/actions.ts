import { BasicProduct } from "@ngrx-nx-workshop/api-interfaces";
import { createAction, props } from "@ngrx/store";

export const productFetched = createAction('[Product List page] Product list fetched', props<{products:BasicProduct[]}>())

export const productFetchError = createAction('[Product List page] Product list error');
