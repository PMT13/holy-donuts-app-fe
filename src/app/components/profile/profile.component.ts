import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";

import {catchError, Observable, Subject} from "rxjs";
import {IAccount} from "../../Interfaces/IAccount";
import {IPurchases} from "../../Interfaces/IPurchases";
import {CartService} from "../../services/cart.service";
import {HttpService} from "../../services/http.service";
import {NavService} from "../../services/nav.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  purchases!:IPurchases

  constructor( private navService: NavService, private accountService: AccountService, private cartService: CartService, private http: HttpService) {
    this.user = this.accountService.getUser();
    this.accountList = this.accountService.getAccountList();
    this.purchases = this.cartService.purchases;
    this.accountService.$accountList.subscribe((accounts) => {
      this.accountList = accounts;
    });
    this.accountService.$user.subscribe((user) => {
      this.user = user;
     this.cartService.$purchases.subscribe((purchase) => {
       this.purchases = purchase
     })
    });
  }

  $purchases:Subject<IPurchases> = new Subject<IPurchases>();

  error: boolean = false;
  errorMsg!: string;
  accountList: IAccount[];
  user!: IAccount;
  username!: string;
  password!: string;
  email!: string;
  role!: string;

  ngOnInit(): void {
  }

  save() {
    if (this.username === "" || this.password === "" ||
    this.email === "") {
      this.error = true;
      this.errorMsg = "All fields required";
      return;
    }
    const updatedAccount: IAccount =
      {
        id: this.user.id,
        username: this.username,
        password: this.password,
        email: this.email,
        role: this.role,
        cartId: this.user.cartId,
        purchasesId: this.user.purchasesId
      }
    this.accountService.updateAccount(updatedAccount);
    console.log(this.user)
  }

  onDelete() {
      this.accountService.deleteAccount(this.user.id);
    this.navService.$isRegistering.next(true);
  }
}
