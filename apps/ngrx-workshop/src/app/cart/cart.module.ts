import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CartEffects } from './cart.effect';
import { cartReducer, CART_FEATURE } from './reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(CART_FEATURE, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  exports: [],
  providers: [],
})
export class CartModule {}
