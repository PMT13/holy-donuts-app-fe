import {Component, Input, OnInit} from '@angular/core';
import {IProduct, IProductCategory} from 'src/app/Interfaces/IProduct';
import {CartService} from "../../services/cart.service";
import {ProductService} from "../../services/product.service";
import { IAccount } from 'src/app/Interfaces/IAccount';
import {AccountService} from "../../services/account.service";
import { Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product!: IProduct;
  @Input() categories!: IProductCategory[];
  @Input() cartCount!: number
  alertMessage!: string;
  alert: string = "";
  user!: IAccount;
  onDestroy = new Subject();
  //private subscription: Subscription;
  errorMessage: string | null = null;

  constructor(private cartService: CartService, private productService: ProductService,
              private accountService: AccountService) {
      this.user = this.accountService.getUser();

  }


  ngOnInit(): void {
    this.accountService.$user.pipe(takeUntil(this.onDestroy)).subscribe(user => {
      this.user = user;
    });
    this.productService.$categoryError.pipe(takeUntil(this.onDestroy)).subscribe(message => this.errorMessage = message);

  }


  deleteProduct() {
    this.productService.deleteProduct(this.product.id)
  }

  updateProduct() {
    this.productService.$productToUpdate.next(
      {...this.product});
  }

  addToCartClick(product: IProduct) {
    const itemInCart = this.cartService.cart.products.find(item => item.id === product.id);
    if(itemInCart === undefined){
      this.cartService.addToCart(this.product);
      this.alertMessage = product.name + " added to cart!"
      this.alert = "success";
      setTimeout(() => {
        this.alert = "";
      }, 3000);
      }else{
        this.alertMessage = product.name + " is already in cart!"
        this.alert = "warning";
        setTimeout(() => {
          this.alert = "";
        }, 3000);
    }
  }
}

