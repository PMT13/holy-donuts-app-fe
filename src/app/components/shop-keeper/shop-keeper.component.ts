import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../Interfaces/IProduct";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-shop-keeper',
  templateUrl: './shop-keeper.component.html',
  styleUrls: ['./shop-keeper.component.css']
})
export class ShopKeeperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
