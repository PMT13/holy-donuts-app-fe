import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';

import { ProductInputComponent } from './components/product-input/product-input.component';

import {RouterModule} from "@angular/router";
import {CategoryComponent} from "./components/category/category.component";
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryInputComponent } from './components/category-input/category-input.component';
import { ShopKeeperComponent } from './components/shop-keeper/shop-keeper.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    StoreComponent,
    CartComponent,
    ProfileComponent,
    AdminComponent,
    ProductListComponent,
    ProductComponent,
    ProductInputComponent,
    CategoryComponent,
    CategoryListComponent,
    CategoryInputComponent,
    ProductInputComponent,
    ShopKeeperComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        RouterModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
