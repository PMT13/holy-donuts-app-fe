import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAccount } from './Interfaces/IAccount';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeamProject-fe';

  role: string = "";


  changeRole(role:string){
    this.role = role;
  }
}
