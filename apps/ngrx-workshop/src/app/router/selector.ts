import {
  getSelectors,
  MinimalRouterStateSnapshot,
  RouterReducerState,
} from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const ROUTER_FEATURE_KEY = 'router';

export const routerFeatureSelector =
  createFeatureSelector<RouterReducerState<MinimalRouterStateSnapshot>>(
    ROUTER_FEATURE_KEY
  );

export const selectRouterParam = getSelectors(
  routerFeatureSelector
).selectRouteParam;
