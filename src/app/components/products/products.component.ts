import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      // Initialize selectedQuantity for each product
      this.products.forEach(product => product.selectedQuantity = 1);
      this.filteredProducts = this.products;
      this.categories = ['All', ...new Set(this.products.map(p => p.category))];
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = category === 'All' 
      ? this.products 
      : this.products.filter(p => p.category === category);
  }

  addToCart(product: Product, quantity: number): void {
    this.productService.addToCart(product, quantity);
    // Decrease the product quantity
     product.quantity -= quantity;
  }

  calculateTTC(product: Product): number {
    return this.productService.calculateTTC(product.price, product.category, product.isImported);
  }
}