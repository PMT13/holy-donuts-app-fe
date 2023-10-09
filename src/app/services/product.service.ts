import { Injectable } from '@angular/core';
import {IProduct, IProductCategory, IProductCategoryNew, IProductNew} from "../Interfaces/IProduct";
import {BehaviorSubject, first} from "rxjs";
import {HttpService} from "./http.service";
import {ERROR} from "../_enums/ERROR";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: IProduct[] = [];
  newProdCatList: IProductCategory[] = [];
  $productList = new BehaviorSubject<IProduct[]>([]);
  $productToUpdate = new BehaviorSubject<IProduct | null>(null);
  $productToCreate = new BehaviorSubject<IProductNew | null>(null);
  $productError = new BehaviorSubject<string | null>(null);

  categoryList: IProductCategory[] = [];
  $categoryList = new BehaviorSubject<IProductCategory[]>([]);
  $categoryError = new BehaviorSubject<string | null>(null);
  $categoryToUpdate = new BehaviorSubject<IProductCategory | null>(null);
  curProdCatList: IProductCategory[] = [];


  constructor( private httpService: HttpService) {
    this.httpService.getProductList().pipe(first()).subscribe({
      next: productList => {this.productList = productList;
        this.$productList.next(productList)
      },
      error: (err) => {
        console.error(err);
        this.$productError.next(ERROR.PRODUCT_HTTP_ERROR);
      }
    });

    this.httpService.getCategoryList().pipe(first()).subscribe({
      next: categoryList => {this.categoryList = categoryList;
        this.$categoryList.next(categoryList)
      },
      error: (err) => {
        console.error(err);
        this.$categoryError.next(ERROR.CATEGORY_HTTP_ERROR);
      }
    });


  }
  //get product list
  getProducts(){
    this.httpService.getProductList().pipe(first()).subscribe({
      next: prodList => {
        this.productList = prodList;
        this.$productList.next(this.productList)
      },
      error: (err) => {
        this.$productError.next(ERROR.PRODUCT_HTTP_ERROR);
        console.log(err)
      }
    })
  }

  deleteProduct(productToDelete: number) {
    this.httpService.deleteProduct(productToDelete).pipe(first()).subscribe({
      next: () => {
        let productList = [...this.$productList.getValue()];
        this.$productList.next(
          productList.filter(product => product.id !== productToDelete)
        );
      },
      error: (err) => {
        console.error(err);
        this.$productError.next(ERROR.PRODUCT_HTTP_ERROR); }
    })
  }

  public updateProduct(productUpdate: IProduct) {

    productUpdate.category = this.curProdCatList;
    console.log(productUpdate.category)
    this.httpService.updateProduct(productUpdate).pipe(first()).subscribe({
      next: (newProd) => {
        let productList: IProduct[] = [...this.$productList.getValue()];
        this.$productList.next(
          productList.map((product) => {
            if (product.id !== productUpdate.id) {
              return product;
            }
            return newProd;
          })
        );
        this.$productToUpdate.next(null);
        this.resetErrorMessages();
      },
      error: (err) => {
        console.error(err);
        this.$productError.next(ERROR.PRODUCT_HTTP_ERROR)
      }
    })
  }

  createProduct(productCreateEdit: IProductNew) {

    productCreateEdit.category = this.newProdCatList;
      this.httpService.createProduct(productCreateEdit).pipe(first()).subscribe({
        next:(prodList)=>{
          console.log(prodList)
          this.getProducts();
        },
        error: (err) => {
          console.error(err);
         this.$productError.next(ERROR.PRODUCT_HTTP_ERROR)
        }
      });

    this.$productToCreate.next(null);
    this.resetErrorMessages();
  }



  //###Category


  getCategoryList(){
    this.httpService.getCategoryList().pipe(first()).subscribe({
      next: categoryList => {this.categoryList = categoryList;
        this.$categoryList.next(categoryList)
      },
      error: (err) => {
        console.error(err);
        this.$categoryError.next(ERROR.CATEGORY_HTTP_ERROR);
      }
    });
  }

  //add a new category option
  addCategoryOption(catergoryAdd: IProductCategoryNew){
    this.httpService.addCategory(catergoryAdd).pipe(first()).subscribe({
      next: ()=> {
        this.getCategoryList()
      },
      error: (err) => {
        console.error(err);
        this.$categoryError.next(ERROR.CATEGORY_HTTP_ERROR);
      }
    });
  }

  //delete category option
  deleteCategoryOption(acategory: IProductCategory) {
    console.log('prod serv add cat')
    // this.httpService.addCategory(catergoryAdd);
    console.log(acategory)
    this.httpService.deleteCategory(acategory.id).pipe(first()).subscribe({
      next: ()=>{
        this.getCategoryList()
      },
      error: (err) => {
        console.error(err);
        this.$categoryError.next(ERROR.CATEGORY_HTTP_ERROR);
      }
    });

  }

  updateCategory(categorySelected: IProductCategory) {
    this.httpService.updateCategory(categorySelected).pipe(first()).subscribe({
      next: (newCat) => {
        let categoryList: IProductCategory[] = [...this.$categoryList.getValue()];
        this.$categoryList.next(
          categoryList.map((cat) => {
            if (newCat.id !== cat.id) {
              return cat;
            }
            return newCat;
          })
        );

        this.$categoryToUpdate.next(null);
      },
      error: (err) => {
        console.error(err);
        this.$categoryError.next(ERROR.CATEGORY_HTTP_ERROR);
      }
    })
  }

  addCategoryToProduct(category: IProductCategory, product: IProduct) {
    let productToUpdate = this.$productToUpdate.value
    if(productToUpdate == null){
      //if product does not exist create new array and add
      this.newProdCatList.push({id:category.id, category: category.category});
      console.log(this.newProdCatList)
    }else {
      //if product exists add to existing
      product.category.push({id: category.id, category: category.category});
      this.curProdCatList = product.category
      console.log(this.curProdCatList)
    }
  }

  removeCategoryToProduct(category: IProductCategory, product: IProduct) {

    let productToUpdate = this.$productToUpdate.value
    if(productToUpdate == null){
      //if new product, check to see if category exists, if so remove
      if (this.newProdCatList.find(cat => cat.id === category.id)) {
        this.newProdCatList = this.newProdCatList.filter((cat => cat.id !== category.id));
      }
      //this.newProdCatList = product.category
      console.log(this.newProdCatList)
    }else{
      //if updating product, check to see if category exists, if so remove
      if (product.category.find(cat => cat.id === category.id)) {
        product.category = product.category.filter((cat => cat.id !== category.id));
      }
      this.curProdCatList = product.category
      console.log(this.curProdCatList)
    }

  }


  resetErrorMessages(){
    this.$categoryError.next(null);
    this.$productError.next(null);
  }
}
