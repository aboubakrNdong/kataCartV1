import { Component, OnInit } from '@angular/core';
import { NOT_AVAILABLE_MESSAGE } from '../../constants/const-var';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit/produit.service';

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
  NOT_AVAILABLE_MESSAGE: string = NOT_AVAILABLE_MESSAGE;

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getAllProduitsDuStock().subscribe((produits: Produit[]) => {
      this.produits = produits;
   
      this.produits.forEach(produit => produit.selectedQuantity = 1);
      this.filtreProduit = this.produits;
      this.allCategories = ['All', ...new Set(this.produits.map(p => p.category))];
    });
  }

   filterProduitByCategory(category: string): void {
    this.categoryChoisie = category;
    this.filtreProduit = category === 'All'  
      ? this.produits 
      : this.produits.filter(p => p.category === category);
  }

  addProduitAuPanier(produit: Produit, quantity: number): void {
    this.produitService.addProduitAuPanier(produit, quantity);
    produit.quantity -= quantity;   //à chaque ajout il faut diminuer la quantité du produit dans le stock
  }

  calculDuPrixTotalAvecLesTaxes(produit: Produit): number {
    return this.produitService.calculDuPrixTotalAvecLesTaxes(produit, produit.price);
  }
  
}