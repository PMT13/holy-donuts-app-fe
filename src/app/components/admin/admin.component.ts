import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddAccountDTO } from 'src/app/Interfaces/AddAccountDTO';
import { IAccount } from 'src/app/Interfaces/IAccount';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  accountList: IAccount[];
  user!: IAccount;
  accountToEdit!: IAccount;

  username!: string;
  password!: string;
  email!: string;
  role!: string;

  usernameCreate: string = "";
  passwordCreate: string = "";
  emailCreate: string = "";

  error: boolean = false;
  errorMsg!: string;

  sub: Subscription;
  subTwo: Subscription;

  constructor(private service: AccountService,private modalService: NgbModal) {
    this.user = this.service.getUser();
    this.accountList = this.service.getAccountList();
    this.sub = this.service.$accountList.subscribe((accounts) => {
      this.accountList = accounts;
    });
    this.subTwo = this.service.$user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.subTwo.unsubscribe();
  }

  openCreate(create: any) {
    this.modalService.open(create);
  }

  open(content:any, account: IAccount) {
    this.modalService.open(content);
    this.accountToEdit = account;
    this.username = this.accountToEdit.username;
    this.password = this.accountToEdit.password;
    this.email = this.accountToEdit.email;
    this.role = this.accountToEdit.role;
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
      id: this.accountToEdit.id,
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role,
      cartId: this.accountToEdit.cartId,
      purchasesId: this.accountToEdit.purchasesId
    }
    this.service.updateAccount(updatedAccount);
    this.modalService.dismissAll();
  }

  createAccount(){
    if (this.usernameCreate === "" || this.passwordCreate === "" ||
      this.emailCreate === "") {
      this.error = true;
      this.errorMsg = "All fields required";
      return;
    }
    const accountExist = this.accountList.find((account) => {return account.username === this.usernameCreate});
    if( accountExist !== undefined){
      this.errorMsg = "Username already exists.";
      this.error = true;
      return;
    }
    if(this.usernameCreate.replace(/\s/g, '') === "" || this.passwordCreate.replace(/\s/g, '') === ""){
      this.errorMsg = "Please fill in all input fields";
      this.error = true;
      return;
    }
    const createdAccount: AddAccountDTO =
      {
        username: this.usernameCreate,
        password: this.passwordCreate,
        email: this.emailCreate
      }
    this.service.adminCreateAccount(createdAccount);
    this.modalService.dismissAll();
    this.resetCreate();
  }

  resetInput(){
    this.username = this.accountToEdit.username;
    this.password = this.accountToEdit.password;
    this.email = this.accountToEdit.email;
    this.role = this.accountToEdit.role;
    this.error = false;
    this.errorMsg = "";
  }

  resetCreate(){
    this.usernameCreate = "";
    this.passwordCreate = "";
    this.emailCreate = "";
    this.error = false;
    this.errorMsg = "";
  }
  deleteAccount(accountId: number) {
    this.service.deleteAccount(accountId);
  }
}
