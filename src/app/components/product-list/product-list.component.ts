import {Component, OnDestroy} from '@angular/core';
import {IProduct} from "../../Interfaces/IProduct";
import {ProductService} from "../../services/product.service";
import {Subject, takeUntil} from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ProductInputComponent} from "../product-input/product-input.component";
import {AccountService} from "../../services/account.service";
import {IAccount} from "../../Interfaces/IAccount";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnDestroy {
  productList: IProduct[] = []
  errorMessage: string | null = null;
  onDestroy = new Subject();
  user !: IAccount;


  constructor(private accountService: AccountService,private productService: ProductService, private modalService: NgbModal) {
    this.productService.$productList.pipe(takeUntil(this.onDestroy)).subscribe(
      productList => this.productList = productList
    );
    this.productService.$productError.pipe(takeUntil(this.onDestroy)).subscribe(
      message => this.errorMessage = message
    )
    this.user = this.accountService.getUser();

  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  //this is used to open new product pop up
  open() {
    const modalRef = this.modalService.open(ProductInputComponent);
    // modalRef.componentInstance.name = 'World';
  }

  // openAlt() {
  //   console.log(this.createNew)
  //   this.productService.$productToCreate.next(this.createNew);
  // }
}
