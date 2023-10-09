import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProductCategory, IProductCategoryNew} from "../../Interfaces/IProduct";
import {Subject, takeUntil} from "rxjs";
import {ERROR} from "../../_enums/ERROR";

@Component({
  selector: 'app-category-input',
  templateUrl: './category-input.component.html',
  styleUrls: ['./category-input.component.css']
})
export class CategoryInputComponent implements OnInit {

  categorySelected: IProductCategory | null = null;

  categoryField: string | null = null;
  categoryNew: IProductCategoryNew = {
    category: ""
  };
  onDestroy = new Subject();
  errorMessage: string | null = null;
  constructor(private productService: ProductService) {
    this.productService = productService

    this.productService.$categoryError.pipe(takeUntil(this.onDestroy)).subscribe(message => this.errorMessage = message);

    //subscribe to find selected category to update
    this.productService.$categoryToUpdate.pipe(takeUntil(this.onDestroy)).subscribe(categorySelected => {
      if (categorySelected != null){
        this.categorySelected = categorySelected;
        this.categoryField = categorySelected.category;
      }else{
        this.categorySelected = null;
      }
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  //create a new category and reset category field
  onCreateCat() {
    if (this.categoryField == null) {
      this.productService.$categoryError.next(ERROR.CATEGORY_EMPTY)
    }
    else {
      this.categoryNew.category = this.categoryField;
      this.productService.addCategoryOption(this.categoryNew);
      this.productService.$categoryError.next(null)
      this.categoryField = null;
    }
  }
  //update existing category and reset category field
  onUpdateCat() {
    if (this.categorySelected !== null) {
      if(this.categorySelected.category !== null) {
        if ( this.categoryField !== null) {
          console.log(this.categorySelected)
          this.categorySelected.category = this.categoryField
          this.productService.updateCategory(this.categorySelected)
          this.categoryField = null;
        }
      }
    }
  }

  //cancel update & change buttons back
  onUpdateCancel() {
    this.productService.$categoryToUpdate.next(null);
  }
}
