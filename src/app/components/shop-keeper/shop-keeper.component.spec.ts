import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopKeeperComponent } from './shop-keeper.component';

describe('ShopKeeperComponent', () => {
  let component: ShopKeeperComponent;
  let fixture: ComponentFixture<ShopKeeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopKeeperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
