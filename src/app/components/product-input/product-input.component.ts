import {Component, Input, OnInit} from '@angular/core';

import {ProductService} from "../../services/product.service";
import {IProduct, IProductCategory, IProductNew} from 'src/app/Interfaces/IProduct';
import {first, Subject, takeUntil} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ERROR} from "../../_enums/ERROR";
import {ICart} from "../../Interfaces/ICart";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})
export class ProductInputComponent implements OnInit {

  name: string = "";
  description: string = "";
  imgUrl: string = "";
  price: number = 0.0;
  sale: number = 0.0;
  category: IProductCategory[] = [];
  discontinued: boolean = false;
  discount: number = 0;

  productEdit: IProduct =
    {
      id: 0,
      name: "",
      description: "",
      imgUrl: "",
      price: 0,
      sale: 0,
      category: [],
      discontinued: false,
      discount: 0
    }

  productNew: IProductNew =
    {
      name: "",
      description: "",
      imgUrl: "",
      price: 0,
      sale: 0,
      category: [],
      discontinued: false,
      discount: 0,
    }

  @Input() product!: IProduct
  errorMessage: string | null = null;
  onDestroy = new Subject();

  constructor(private productService: ProductService, private modalService: NgbModal) {
    this.modalService = modalService;

    this.productService.$productError.pipe(takeUntil(this.onDestroy)).subscribe(message => this.errorMessage = message);

    //get selected account
    this.productService.$productToUpdate.pipe(first()).subscribe(product => {
      if (product != null) {
        this.product = product;
      }
    })
  }

  ngOnInit(): void {

    if (this.product) {

      this.name = this.product.name;
      this.description = this.product.description;
      this.imgUrl = this.product.imgUrl;
      this.price = this.product.price;
      this.sale = this.product.sale;
      this.category = this.product.category;
      this.discontinued = this.product.discontinued;
    }

  }

  onCreate() {
    if (this.name == "") {
      this.productService.$productError.next(ERROR.PRODUCT_NAME_BLANK)
    } else if (this.price <= 0) {
      this.productService.$productError.next(ERROR.PRODUCT_PRODUCT_PRICE)
    } else if ((this.sale > this.price) || (this.sale <= 0)) {
      this.productService.$productError.next(ERROR.PRODUCT_SALE_PRICE)
    } else {
      this.productNew = {
        name: this.name,
        description: this.description,
        imgUrl: this.imgUrl,
        price: this.price,
        sale: this.sale,
        category: this.category,
        discontinued: this.discontinued,
        discount: this.discount
      }
      this.productService.createProduct(this.productNew)
      this.productService.$productError.next(null)
      this.closeThis();
    }
  }

  onCancel() {
    this.productService.$productToUpdate.next(null);
    this.productService.resetErrorMessages();
  }

  onUpdate() {

    this.productEdit = {
      id: this.product.id,
      name: this.name,
      description: this.description,
      imgUrl: this.imgUrl,
      price: this.price,
      sale: this.sale,
      category: this.category,
      discontinued: this.discontinued,
      discount: this.discount,
    }

    this.productService.updateProduct(this.productEdit)

  }

  closeThis() {
    this.modalService.dismissAll()
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
