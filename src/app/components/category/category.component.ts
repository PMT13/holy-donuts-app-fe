import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProduct, IProductCategory} from "../../Interfaces/IProduct";
import {first, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  checked: boolean = false;
  @Input() product!: IProduct;
  @Input() category!: IProductCategory;
  @Input() aCategory: IProductCategory =
    {id: 0, category: ""};

  foundOnProduct: boolean = false;
  errorMessage: string | null = null;

  onDestroy = new Subject();

  constructor(private productService: ProductService) {
    this.productService.$categoryError.pipe(takeUntil(this.onDestroy)).subscribe(message => this.errorMessage = message);
  }

  ngOnInit(): void {
    this.productService.$productToUpdate.pipe(first()).subscribe(product => {
      if (product != null){
        this.product = product;
      }
    })

    //if there's a product
    if(this.product != null) {
      //go through updating product categories and change add/remove button based on that
      for (let i = 0; i < this.product.category.length; i++) {
        if (this.product.category[i].category == this.aCategory.category) {
          this.foundOnProduct = true;
        }
      }
    }
  }

  //deep copy product
  //     this.savedProd = JSON.parse(JSON.stringify(this.product));

  //add category on this product
  addCategoryToProduct(aCategory: IProductCategory) {
    this.productService.addCategoryToProduct(aCategory,this.product);
    this.foundOnProduct = true;
  }

  //remove category on this product
  removeCategoryToProduct(aCategory: IProductCategory) {

    this.productService.removeCategoryToProduct(aCategory,this.product)
    this.foundOnProduct = false;
  }

  //delete it from db for all
  deleteCategory(aCategory: IProductCategory){
    this.productService.deleteCategoryOption(aCategory)
  }

  //update it in db for all
  updateCategory(aCategory: IProductCategory) {
    this.productService.$categoryToUpdate.next(aCategory);
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

}
