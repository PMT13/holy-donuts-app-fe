import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {IAccount} from "../../Interfaces/IAccount";
import {first, Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit,OnDestroy {

  username!: string;
  password!: string;
  email!: string;
  accountList!: IAccount[];
  errorMsg!: string;
  error: boolean = false;
  isLogin: boolean = true;

  sub: Subscription;
  @Output() changeRole = new EventEmitter<string>();

  constructor(private service: AccountService, private httpService: HttpService) {
    this.accountList = this.service.getAccountList();
    this.sub = this.service.$accountList.subscribe((accounts) => {
      this.accountList = accounts;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //Checks to see if account is in master account list and acts accordingly
  login(){
    const foundAccount = this.accountList.find((account) => {
      return account.username === this.username &&
        account.password === this.password
    });
    if( foundAccount === undefined){
      this.errorMsg = "Invalid Login";
      this.error = true;
      return;
    }else{
      this.changeRole.emit(foundAccount.role);
      this.service.setUser(foundAccount);
      this.service.setLoginStatus(true);
    }
  }

  // Checks if username already exists, makes sure input fields aren't empty/are valid, and creates a
  // new user and sends post request to http service
  register(){
    const accountExist = this.accountList.find((account) => {return account.username === this.username});
    if( accountExist !== undefined){
      this.errorMsg = "Username already exists.";
      this.error = true;
      return;
    }
    if(this.username === undefined || this.password === undefined){
      this.errorMsg = "Please fill in all input fields";
      this.error = true;
      return;
    }
    if(this.username.replace(/\s/g, '') === "" || this.password.replace(/\s/g, '') === ""){
      this.errorMsg = "Please fill in all input fields";
      this.error = true;
      return;
    }
    const newAccount =
      {
        username:this.username,
        password:this.password,
        email: this.email
      }
    this.httpService.addAccount(newAccount).pipe(first()).subscribe({
      next: (data) => {
        this.service.setLoginStatus(true);
        this.service.registerUser(data);
        this.changeRole.emit(data.role);
      },
      error: (err) => {
        this.errorMsg = err;
        this.error = true;
      }
    });
  }

  changeLogin(){
    this.isLogin = !this.isLogin;
    this.username = "";
    this.password = "";
    this.error = false;
  }

  continueAsGuest(){
    this.changeRole.emit("customer");
  }
}
