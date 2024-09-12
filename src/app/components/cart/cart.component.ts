import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(productId: number): void {
    this.productService.removeFromCart(productId);
  }

  calculateTax(product: Product): number {
    return this.productService.calculateTax(product.price, product.category, product.isImported);
  }

  calculateTTC(product: Product): number {
    return this.productService.calculateTTC(product.price, product.category, product.isImported);
  }

  calculateTotalTax(): number {
    return this.cartItems.reduce((total, item) => 
      total + this.calculateTax(item) * item.quantity, 0
    );
  }

  calculateTotalTTC(): number {
    return this.cartItems.reduce((total, item) => 
      total + this.calculateTTC(item) * item.quantity, 0
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}