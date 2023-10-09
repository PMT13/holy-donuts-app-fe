import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {NavService} from "../../services/nav.service";
import {Subject, takeUntil} from "rxjs";
import { AccountService } from 'src/app/services/account.service';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @Output() changeRole = new EventEmitter<string>();
  isLoggedIn!:boolean;
  role!: string;

  constructor(private nav: NavService, private accountService: AccountService, private offcanvasService: NgbOffcanvas) {
    this.isLoggedIn = this.accountService.getLoginStatus();
    this.accountService.$isLoggedIn.pipe(takeUntil(this.onDestroy))
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      })
    this.nav.$isRegistering
      .pipe(takeUntil(this.onDestroy))
      .subscribe(isRegistering => {
        this.isRegistering = isRegistering
      })
    this.nav.$isViewingStore
      .pipe(takeUntil(this.onDestroy))
      .subscribe(isViewingStore => {
        this.isViewingStore = isViewingStore
      })
    this.nav.$isViewingCart
      .pipe(takeUntil(this.onDestroy))
      .subscribe(isViewingCart => {
        this.isViewingCart = isViewingCart
      })
    this.nav.$isViewingProfile
      .pipe(takeUntil(this.onDestroy))
      .subscribe(isViewingProfile => {
        this.isViewingProfile = isViewingProfile
      })
  }


  isViewingProfile: boolean = false
  isViewingStore: boolean = false
  isViewingCart: boolean = false
  isRegistering: boolean = false
  onDestroy = new Subject();


  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  ngOnInit(): void {
  }

  onRegisterClick() {
    this.nav.$isRegistering.next(true);
    this.nav.$isViewingStore.next(false);
    this.nav.$isViewingCart.next(false)
    this.nav.$isViewingProfile.next(false);
    this.accountService.setLoginStatus(false);
    this.changeRole.emit("");
  }
  onStoreClick() {
    this.nav.$isViewingStore.next(true);
    this.nav.$isRegistering.next(false);
    this.nav.$isViewingCart.next(false);
    this.nav.$isViewingProfile.next(false);
    this.changeRole.emit("");
  }
  onCartClick() {
    this.nav.$isViewingCart.next(true);
    this.nav.$isViewingStore.next(false);
    this.nav.$isRegistering.next(false);
    this.nav.$isViewingProfile.next(false);
    this.changeRole.emit("");
  }
  onProfileClick() {
    this.nav.$isViewingProfile.next(true);
    this.nav.$isViewingCart.next(false);
    this.nav.$isViewingStore.next(false);
    this.nav.$isRegistering.next(false);
    this.changeRole.emit("");
  }


  //end of Navigation Logic

  onLogin(role:string) {
    this.nav.$isRegistering.next(false);
    this.role = role;
    this.changeRole.emit(role);
  }

  goHome(role: string){
    if(this.isLoggedIn) {
      this.nav.$isViewingProfile.next(false);
      this.nav.$isViewingCart.next(false);
      this.nav.$isViewingStore.next(false);
      this.nav.$isRegistering.next(false);
      this.changeRole.emit(role);
    }
  }


  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(
      content, {position: 'end', ariaLabelledBy: 'offcanvas-basic-title'}
    )
  }
}
