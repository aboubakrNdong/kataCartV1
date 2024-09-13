import { Component, OnInit } from '@angular/core';
import { NOT_AVAILABLE_MESSAGE } from 'src/app/constants/const-var';
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
  NOT_AVAILABLE_MESSAGE = NOT_AVAILABLE_MESSAGE;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      // Initialize selectedQuantity for each product
      this.products.forEach(product => product.selectedQuantity = 1);
      this.filteredProducts = this.products;
      this.categories = ['All', ...new Set(this.products.map(p => p.category))]; //TODO remove hard code ALL
    });
  }

   //TODO add loader to app
   filterProductsByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = category === 'All' 
      ? this.products 
      : this.products.filter(p => p.category === category);
  }

  addProductToCart(product: Product, quantity: number): void {
    this.productService.addProductToCart(product, quantity);
    // Decrease the product quantity
     product.quantity -= quantity;
  }

  calculateTotalCostWithTax(product: Product): number {
    return this.productService.calculateTotalCost(product.price, product.category, product.isImported);
  }
  
  //TODO add image to product
 

}