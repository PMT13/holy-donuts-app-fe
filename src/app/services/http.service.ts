import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {IAccount} from "../Interfaces/IAccount";
import {AddAccountDTO} from "../Interfaces/AddAccountDTO";
import {IProduct, IProductCategory, IProductCategoryNew, IProductNew} from "../Interfaces/IProduct";
import {ICart} from "../Interfaces/ICart";
import { IPurchases } from '../Interfaces/IPurchases';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  subjectNotifier: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  getAccounts() {
    return this.httpClient.get('http://localhost:8080/api/account') as Observable<IAccount[]>;
  }

  getAccountById(id: number) {
    return this.httpClient.get('http://localhost:8080/api/account/' + id) as Observable<IAccount>;
  }

  addAccount(account: AddAccountDTO) {
    return this.httpClient.post('http://localhost:8080/api/account', account) as Observable<IAccount>;
  }

  updateAccount(account: IAccount) {
    return this.httpClient.put('http://localhost:8080/api/account', account) as Observable<IAccount>;
  }

  deleteAccount(accountId: number){
    return this.httpClient.delete('http://localhost:8080/api/account/' + accountId) as Observable<IAccount[]>;
  }

  getProductList() {
    return this.httpClient.get('http://localhost:8080/api/product') as Observable<IProduct[]>
  }

  createProduct(product: IProductNew) {
    return this.httpClient.post('http://localhost:8080/api/product', product) as Observable<IProduct>;
  }
  updateProduct(product: IProduct) {
    return this.httpClient.put('http://localhost:8080/api/product/', product) as Observable<IProduct>;
  }
  deleteProduct(productId: number) {
    return this.httpClient.delete('http://localhost:8080/api/product/' + productId) as Observable<IProduct[]>;
  }

  addCategory(categoryAdd: IProductCategoryNew) {
    console.log('http serv add cat')
    console.log(categoryAdd)
    return this.httpClient.post('http://localhost:8080/api/category', categoryAdd) as Observable<IProductCategory>;
  }

  getCategoryList() {
    return this.httpClient.get('http://localhost:8080/api/category') as Observable<IProductCategory[]>;
  }

  deleteCategory(category: number){
    return this.httpClient.delete('http://localhost:8080/api/category/' + category) as Observable<IProductCategory[]>;
  }

  updateCategory(categorySelected: IProductCategory) {
    return this.httpClient.put('http://localhost:8080/api/category/', categorySelected) as Observable<IProductCategory>;
  }

  getCartById(cartId: number) {
    return this.httpClient.get('http://localhost:8080/api/cart/' + cartId) as Observable<ICart>;
  }

  updateCart(cart: ICart){
    return this.httpClient.put('http://localhost:8080/api/cart', cart) as Observable<ICart>;
  }

  getPurchasesById(id: number){
    return this.httpClient.get('http://localhost:8080/api/purchases/' + id) as Observable<IPurchases>;
  }

  updatePurchases(accountId: number,purchases: IPurchases) {
    return this.httpClient.put('http://localhost:8080/api/purchases/' + accountId, purchases) as Observable<IPurchases>;
  }
}
