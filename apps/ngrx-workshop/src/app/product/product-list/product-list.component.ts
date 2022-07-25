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
import { select, Store } from '@ngrx/store';
import * as ProductListPageActions from './actions';
import { getProduct } from '../selector';
import { GlobalState } from '../reducer';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$?: Observable<BasicProduct[] | undefined>;
  customerRatings$?: Observable<Map<string, Rating>>;
  constructor(
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly store: Store<GlobalState>
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
