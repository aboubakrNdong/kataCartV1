import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    // Paste the JSON data here
  ];

  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  /*getProducts(): Product[] {
    return this.products;
  }*/

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json'); // Ensure the JSON file is placed in the assets folder
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

  calculateTTC(price: number, category: string, isImported: boolean): number {
    let taxRate = 0;
    if (category !== 'Food' && category !== 'Medecine') {
      taxRate += category === 'Books' ? 10 : 20;
    }
    if (isImported) {
      taxRate += 5;
    }
    const tax = Math.ceil((price * taxRate / 100) * 20) / 20;
    return parseFloat((price + tax).toFixed(2));
  }
}