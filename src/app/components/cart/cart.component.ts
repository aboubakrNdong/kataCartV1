import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit/produit.service';

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
    return this.produitService.calculDeLaTaxeDuProduit(produit, produit.price);
  }

  calcultDuPrixTtcDeChaqueArticle(produit: Produit): number {
    return this.produitService.calculDuPrixTotalAvecLesTaxes(produit, produit.price);
  }

  calcuDuMontantTotalDeLataxe(): number {
    return this.articlesDansLePanier.reduce((total, article) => 
      total + this.calculDeLaTaxeDuProduit(article) * article.quantity, 0
    );
  }

  calculDuPrixTotalAvecLesTaxes(produit: Produit): number {
    return this.articlesDansLePanier.reduce((total, article) => 
      total + this.calcultDuPrixTtcDeChaqueArticle(article) * article.quantity, 0
    );
  }

  goBackToProduits(): void {
    this.router.navigate(['/']);
  }

}