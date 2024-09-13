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

  removeProductFromCart(productId: number): void {
    this.productService.removeProductFromCart(productId);
  }

  calculateProductTax(product: Product): number {
    return this.productService.calculateProductTax(product.price, product.category, product.isImported);
  }

  calculateProductTotalCost(product: Product): number {
    return this.productService.calculateTotalCost(product.price, product.category, product.isImported);
  }

  calculateTotalTaxAmount(): number {
    return this.cartItems.reduce((total, item) => 
      total + this.calculateProductTax(item) * item.quantity, 0
    );
  }

  calculateTotalCostAmount(): number {
    return this.cartItems.reduce((total, item) => 
      total + this.calculateProductTotalCost(item) * item.quantity, 0
    );
  }

  navigateBackToProducts(): void {
    this.router.navigate(['/']);
  }

}