import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
  }

 
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json'); //get data
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ ...product, quantity });
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }
  
  calculateTax(price: number, category: string, isImported: boolean): number {
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

  calculateTTC(price: number, category: string, isImported: boolean): number {
    const tax = this.calculateTax(price, category, isImported);
    const total = price + tax;
    return Math.round(total * 100) / 100; // Round to 2 decimal
  }
}