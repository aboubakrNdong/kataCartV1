import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/product/produit.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  articlesDansLePanier: Produit[] = [];

  constructor(private produitService: ProduitService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produitService.getAllArticlesDuPanier().subscribe(article => {
      this.articlesDansLePanier = article;
    });
  }

  deleteProduitDuPanier(IdDuProduit: number, quantity: number): void {
    this.produitService.deleteProduitDuPanier(IdDuProduit, quantity);
  }

  calculDeLaTaxeDuProduit(produit: Produit): number {
    return this.produitService.calculDeLaTaxeDuProduit(produit.price, produit.category, produit.isImported);
  }

  calculatDuPrixTotalAvecLesTaxes(produit: Produit): number {
    return this.produitService.calculatDuPrixTotalAvecLesTaxes(produit.price, produit.category, produit.isImported);
  }

  calcuDuMontantTotalDeLataxe(): number {
    return this.articlesDansLePanier.reduce((total, article) => 
      total + this.calculDeLaTaxeDuProduit(article) * article.quantity, 0
    );
  }

  calculDuPrixTotalAvecLesTaxes(): number {
    return this.articlesDansLePanier.reduce((total, article) => 
      total + this.calculatDuPrixTotalAvecLesTaxes(article) * article.quantity, 0
    );
  }

  goBackToProduits(): void {
    this.router.navigate(['/']);
  }

}