import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  constructor(private http: HttpClient) {
  }

 

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
  
  calculateTax(price: number, category: string, isImported: boolean): number {
    let taxRate = 0;
    if (category !== 'Food' && category !== 'Medecine') {
      taxRate += category === 'Books' ? 10 : 20;
    }
    if (isImported) {
      taxRate += 5;
    }
    const tax = price * taxRate / 100;
    return Math.ceil(tax * 20) / 20; // Round up to nearest 0.05
  }

  calculateTTC(price: number, category: string, isImported: boolean): number {
    const tax = this.calculateTax(price, category, isImported);
    return parseFloat((price + tax).toFixed(2));
  }
}