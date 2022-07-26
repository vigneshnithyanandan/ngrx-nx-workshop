import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import * as productActions from '../actions';
import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { getCurrentProduct } from '../selector';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product$ = this.store.select(getCurrentProduct);
  private customerRating$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private readonly router: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly cartService: CartService,
    private readonly location: Location,
    private readonly store: Store
  ) {
    this.store.dispatch(productActions.porductPageOpened());
    // this.productId$
    //   .pipe(switchMap((id) => this.ratingService.getRating(id)))
    //   .subscribe((productRating) =>
    //     this.customerRating$.next(productRating && productRating.rating)
    //   );
  }

  setRating(productId: string, rating: Rating) {
    this.ratingService
      .setRating({ productId, rating })
      .pipe(
        map((arr) =>
          arr.find((productRating) => productId === productRating.productId)
        ),
        filter(
          (productRating): productRating is NonNullable<typeof productRating> =>
            productRating != null
        ),
        map((productRating) => productRating.rating)
      )
      .subscribe((newRating) => this.customerRating$.next(newRating));
  }

  addToCart(productId: string) {
    this.store.dispatch(productActions.addToCart({ productId }));
    // this.cartService.addProduct(productId);
  }

  back() {
    this.location.back();
  }
}
