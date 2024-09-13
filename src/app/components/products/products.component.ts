import { Component, OnInit } from '@angular/core';
import { NOT_AVAILABLE_MESSAGE } from 'src/app/constants/const-var';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/product/produit.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  produits: Produit[] = [];
  filtreProduit: Produit[] = [];
  allCategories: string[] = [];
  categoryChoisie: string = 'All';
  NOT_AVAILABLE_MESSAGE = NOT_AVAILABLE_MESSAGE;

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getProduits().subscribe((produits: Produit[]) => {
      this.produits = produits;
      console.log(produits);

      // Initialize selectedQuantity for each product
      this.produits.forEach(produit => produit.selectedQuantity = 1);
      this.filtreProduit = this.produits;
      this.allCategories = ['All', ...new Set(this.produits.map(p => p.category))]; //TODO remove hard code ALL
    });
  }

   //TODO add loader to app
   filterProduitByCategory(category: string): void {
    this.categoryChoisie = category;
    this.filtreProduit = category === 'All'  //TODO remove hard code ALL
      ? this.produits 
      : this.produits.filter(p => p.category === category);
  }

  addProduitAuPanier(produit: Produit, quantity: number): void {
    this.produitService.addProduitAuPanier(produit, quantity);
    // Decrease the product quantity
    produit.quantity -= quantity;
  }

  calculateTotalCostWithTax(produit: Produit): number {
    return this.produitService.calculatDuPrixTotalAvecLesTaxes(produit.price, produit.category, produit.isImported);
  }
  
  //TODO add image to product
 

}