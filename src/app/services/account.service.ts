import { Injectable } from '@angular/core';
import {first, Subject} from "rxjs";
import {HttpService} from "./http.service";
import {IAccount} from "../Interfaces/IAccount";
import { AddAccountDTO } from '../Interfaces/AddAccountDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountList!: IAccount[];
  private isLoggedIn!: boolean;
  private user!: IAccount;

  $accountList: Subject<IAccount[]> = new Subject<IAccount[]>();
  $isLoggedIn: Subject<boolean> = new Subject<boolean>();
  $user: Subject<IAccount> = new Subject<IAccount>();

  constructor(private httpService: HttpService) {
    this.getAllAccounts();

  }

  getAllAccounts() {
    this.httpService.getAccounts().pipe(first()).subscribe({
      next: data => {
        this.accountList = data;
        this.$accountList.next(this.accountList);
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  getAccountList(){
    return this.accountList;
  }

  // run this function when a user "checks out" their cart. A new empty cart is assigned to the account and we must update this info on frontend
  accountNewCart(id: number){
    this.httpService.getAccountById(id).pipe(first()).subscribe({
      next: data => {
        const accountIndex = this.accountList.findIndex(account_ => account_.id === data.id);
        if (accountIndex > -1) {
          this.accountList[accountIndex] = data;
          this.$accountList.next(this.accountList);
          this.setUser(data);
        }
      },
      error: (err) => {
        alert(err);
      }
    }) 
  }
  
  setUser(account: IAccount) {
    this.user = account;
    this.$user.next(this.user);
  }


  // Updates the database account list by removing the old account and replacing it with the updated account
  updateAccount(account:IAccount){
    const accountIndex = this.accountList.findIndex(account_ => account_.id === account.id);
    if (accountIndex > -1) {
      this.accountList[accountIndex] = account;
      this.$accountList.next(this.accountList);
      this.setUser(account);
      this.httpService.updateAccount(account).pipe(first()).subscribe({
        next: () => {},
        error: (err) => {
          alert(err);
        }
      });
    }
  }

  adminCreateAccount(account: AddAccountDTO){
    this.httpService.addAccount(account).pipe(first()).subscribe({
      next: () => {
        this.getAllAccounts();
      },
      error: (err) => {
        alert(err);
      }
    });
  }

  // Set a new user when someone creates an account and add it to the accounts list
  registerUser(account:IAccount){
    this.user = account;
    this.accountList.push(this.user);
    this.$user.next(this.user);
    this.$accountList.next(this.accountList);
  }

  // When someone logs in set the logged in status to true, false when logging out
  setLoginStatus(bool:boolean){
    this.isLoggedIn = bool;
    this.$isLoggedIn.next(this.isLoggedIn);
  }

  getLoginStatus(){
    return this.isLoggedIn;
  }

  getUser(){
    return this.user;
  }

  deleteAccount(accountId: number) {
    this.httpService.deleteAccount(accountId).pipe(first()).subscribe({
      next: (data) => {
        this.accountList = data;
        this.$accountList.next(this.accountList);
      },
      error: (err) => {
        alert(err);
      }
    });
  }
}
