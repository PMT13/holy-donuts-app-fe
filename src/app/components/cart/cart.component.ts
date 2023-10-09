import { Component, OnDestroy } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {ICart} from "../../Interfaces/ICart";
import {Subject, Subscription, takeUntil} from "rxjs";
import { IProduct } from 'src/app/Interfaces/IProduct';
import { NavService } from 'src/app/services/nav.service';
import {AccountService} from "../../services/account.service";
import {IAccount} from "../../Interfaces/IAccount";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy{
  emptyCart!: boolean;
  cartInfo!: ICart;

  errorMessage!: string;
  error!: boolean;

  sub: Subscription;
  subTwo: Subscription;
  subThree: Subscription;
  isPurchase: boolean = false;
  user!: IAccount

  constructor(private cartService: CartService, private navService: NavService, private accountService: AccountService) {
    this.sub = this.cartService.cartError.subscribe(error => this.error = error);
    this.subTwo = this.cartService.cartErrorMsg.subscribe(message => this.errorMessage = message);
    this.user = this.accountService.getUser();
    this.cartInfo = this.cartService.cart;
    if(this.cartInfo !== undefined) {
      if (this.cartInfo.quantity === 0) {
        this.emptyCart = true
      } else {
        this.emptyCart = false;
      }
    }

    this.subThree =
      this.cartService.$cart.subscribe({
        next: data => {
          this.cartInfo = data;
          if(this.cartInfo.quantity === 0){
            this.emptyCart = true
          }else{
            this.emptyCart = false;
          }
        },
        error: (err) => {
          this.errorMessage = "Couldn't get cart :(";
          this.error = true;
        }
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subTwo.unsubscribe();
    this.subThree.unsubscribe();
  }

  removeFromCart(product:IProduct) {
    this.cartService.removeFromCart(product);
    if(this.cartService.cart.quantity === 0){
      this.emptyCart = true;
    }
  }

  backToStore(){
    this.navService.$isViewingStore.next(true);
    this.navService.$isViewingCart.next(false);
  }

  addPurchase() {
    this.cartService.addCartToPurchases();
    console.log('checkout works')
    this.isPurchase = true
  }
}


