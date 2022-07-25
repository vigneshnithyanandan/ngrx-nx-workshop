import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { CartService } from '../cart.service';
import { getCartItemsCount } from '../selector';

@Component({
  selector: 'ngrx-nx-workshop-cart',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent {
  cartItemsCounter$ = this.store.pipe(select(getCartItemsCount));

  constructor(
    private readonly cartService: CartService,
    private readonly store: Store
  ) {
    this.cartService.getCartProducts();
  }
}
