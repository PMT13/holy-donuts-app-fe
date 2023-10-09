import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ProductService} from "../../services/product.service";
import {IProductCategory} from "../../Interfaces/IProduct";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList: IProductCategory[] = []
  onDestroy = new Subject();
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {
    //subscribe for category list to render
    this.productService.$categoryList.pipe(takeUntil(this.onDestroy)).subscribe(
      categoryList => this.categoryList = categoryList
    );

    this.productService.$categoryError.pipe(takeUntil(this.onDestroy)).subscribe(
      message => this.errorMessage = message
    )
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

}
