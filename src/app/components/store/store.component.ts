import { Component, OnInit } from '@angular/core';
import {IProduct, IProductNew} from 'src/app/Interfaces/IProduct';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class StoreComponent implements OnInit {

  productToUpdate: IProduct | null = null
  productToCreate: IProductNew | null = null
  constructor(private productService: ProductService) {
    this.productService.$productToUpdate.subscribe(
      product => {
        this.productToUpdate = product
      }
    )
    this.productService.$productToCreate.subscribe(
      product => {
        this.productToCreate = product
      }
    )
  }

  ngOnInit(): void {
  }

}
