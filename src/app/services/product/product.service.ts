import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

 //check if products are already stored, if not, fetch them from the json file

  getProducts(): Observable<Product[]> {
    if (this.products.length > 0) {
      return of(this.products);
    } else {
      return this.http.get<Product[]>('assets/products.json').pipe(
        map(products => {
          this.products = products;
          return products;
        })
      );
    }
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }

  addProductToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ ...product, quantity });
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeProductFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }
  
  //change this function in case it is necessary to apply the 5% on first-time products requires  

  calculateProductTax(price: number, category: string, isImported: boolean): number {
    let taxRate = 0;
    if (category !== 'Food' && category !== 'Medecine') {
      taxRate += category === 'Books' ? 10 : 20;
      if (isImported) {
        taxRate += 5;
      }
    }
    
    const tax = price * taxRate / 100;
    return Math.round(tax * 20) / 20; // Rounded to 0.05
  }

  calculateTotalCost(price: number, category: string, isImported: boolean): number {
    const tax = this.calculateProductTax(price, category, isImported);
    const total = price + tax;
    return Math.round(total * 100) / 100; // Round to 2 decimal
  }
}