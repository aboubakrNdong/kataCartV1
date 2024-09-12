import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(productId: number): void {
    this.productService.removeFromCart(productId);
  }

  calculateTTC(product: Product): number {
    return this.productService.calculateTTC(product.price, product.category, product.isImported);
  }

  calculateTotalTTC(): number {
    return this.cartItems.reduce((total, item) => 
      total + this.calculateTTC(item) * item.quantity, 0
    );
  }
}