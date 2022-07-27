import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartProduct } from '../../model/product';
import { CartService } from '../cart.service';
import { ProductService } from '../../product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import {
  getCartItems,
  getCartItemsCount,
  getCartProducts,
  getCartTotal,
} from '../selector';
import { cartPageOpened, cartPagePurchaseCompleted } from './actions';

const cartDetailsVm = createSelector(
  getCartProducts,
  getCartTotal,
  (products, total) => ({ products, total })
);
@Component({
  selector: 'ngrx-nx-workshop-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent {
  cartDetailsVm$ = this.store.select(cartDetailsVm);
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.store.dispatch(cartPageOpened());
  }

  removeOne(id: string) {
    this.cartService.removeProduct(id);
  }

  removeAll() {
    this.cartService.removeAll();
  }

  purchase(products: CartProduct[]) {
    this.cartService
      .purchase(
        products.map(({ id, quantity }) => ({ productId: id, quantity }))
      )
      // 👇 really important not to forget to subscribe
      .subscribe((isSuccess) => {
        this.store.dispatch(cartPagePurchaseCompleted());
        if (isSuccess) {
          this.cartService.getCartProducts();
          this.router.navigateByUrl('');
        } else {
          this.snackBar.open('Purchase error', 'Error', {
            duration: 2500,
          });
        }
      });
  }
}
