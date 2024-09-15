import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
 let fixture: AppComponent;

  beforeEach(() => {
     fixture = new AppComponent();
  })
 
  it(`should have as title 'shopping-cart-app'`, () => {
    expect(fixture.title).toEqual('shopping-cart-app');
  })

  it('adds 1 + 2 to equal 3', () => {
    expect(fixture.sum(1, 2)).toBe(3);
  });


})