import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  BasicProduct,
  Product,
  Rating,
} from '@ngrx-nx-workshop/api-interfaces';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';
import { createSelector, select, Store } from '@ngrx/store';
import * as ProductListPageActions from './actions';
import { getProduct, getProductCallState } from '../selector';
import { productsFetched } from '../actions';
import { LoadingState } from '../../shared/callState';

const productListVm = createSelector(
  getProduct,
  getProductCallState,
  (products, loadState) => ({ products, loadState })
);

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$?: Observable<Product[] | undefined>;
  customerRatings$?: Observable<Map<string, Rating>>;
  vm$ = this.store.select(productListVm);
  LOADING = LoadingState;
  constructor(
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(ProductListPageActions.productsOpened());
    this.products$ = this.store.pipe(select(getProduct));
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((arr) => {
        const ratingsMap = new Map<string, Rating>();
        for (const productRating of arr) {
          ratingsMap.set(productRating.productId, productRating.rating);
        }
        return ratingsMap;
      }),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }
}
