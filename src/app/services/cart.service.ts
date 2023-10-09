import { Injectable, OnDestroy } from '@angular/core';
import {BehaviorSubject, first, Subject, Subscription} from "rxjs";
import {HttpService} from "./http.service";
import {AccountService} from "./account.service";
import {IProduct} from "../Interfaces/IProduct";
import { ICart } from '../Interfaces/ICart';
import { IPurchases } from '../Interfaces/IPurchases';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy{
  cartErrorMsg = new BehaviorSubject<string>("Error Occured");
  cartError = new BehaviorSubject<boolean>(false);

  cart!: ICart;
  $cart:Subject<ICart> = new Subject<ICart>();

  purchases!: IPurchases;
  $purchases:Subject<IPurchases> = new Subject<IPurchases>();

  sub: Subscription;
  constructor(private httpService: HttpService, private accountService: AccountService) {
    this.setCartFromDB(this.accountService.getUser().cartId);
    this.setPurchasesFromDB(this.accountService.getUser().purchasesId);
    this.sub = this.accountService.$user.subscribe(
      (account) => {
        this.setCartFromDB(account.cartId);
        this.setPurchasesFromDB(account.purchasesId);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addToCart(product: IProduct) {
    this.cart.products.push(product);
    this.cart.quantity++;
    this.cart.totalCost += product.price;
    this.httpService.updateCart(this.cart).pipe(first()).subscribe({
      next: () => {},
      error: (err) => {
        this.cartErrorMsg.next("Couldn't add to cart!");
        this.cartError.next(true);
      }
    });
  }

  removeFromCart(product: IProduct) {
    this.cart.products = this.cart.products.filter(cartItem => product.id !== cartItem.id);
    this.cart.quantity--;
    this.cart.totalCost -= product.price;
    this.httpService.updateCart(this.cart).pipe(first()).subscribe({
      next: () => {},
      error: (err) => {
        this.cartErrorMsg.next("Couldn't remove from cart!");
        this.cartError.next(true);
      }
    })
  }

  addCartToPurchases() {
    console.log("test")
    this.purchases.pastCarts.push(this.cart);
    console.log("test 2")
    this.httpService.updatePurchases(this.accountService.getUser().id,this.purchases).pipe(first()).subscribe({
      next: () => {
        this.cart.products = [];
        this.cart.quantity = 0;
        this.cart.totalCost = 0;
        const newUser = this.accountService.accountNewCart(this.accountService.getUser().id);
      },
      error: (err) => {
        this.cartErrorMsg.next("Unsuccessful checkout! No fees will be charged!");
        this.cartError.next(true);
      }
    })
  }

  setCartFromDB(cartId: number){
    this.httpService.getCartById(cartId).pipe(first()).subscribe({
      next: data => {
        this.cart = data;
        this.$cart.next(this.cart);
      },
      error: (err) => {
        this.cartErrorMsg.next("Couldn't find cart!");
        this.cartError.next(true);
      }
    });
  }

  setPurchasesFromDB(purchasesId: number){
    this.httpService.getPurchasesById(purchasesId).pipe(first()).subscribe({
      next: data => {
        this.purchases = data;
        this.$purchases.next(this.purchases);
      },
      error: (err) => {
        this.cartErrorMsg.next("Error occured during transaction!");
        this.cartError.next(true);
      }
    });
  }
}


