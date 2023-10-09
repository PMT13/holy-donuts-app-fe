import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  $isRegistering = new BehaviorSubject<boolean>(true);
  $isViewingCart = new BehaviorSubject<boolean>(false);
  $isViewingStore = new BehaviorSubject<boolean>(false);
  $isViewingProfile = new BehaviorSubject<boolean>(false);
}
