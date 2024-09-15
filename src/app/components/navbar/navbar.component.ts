import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit/produit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreDeProduitDansLePanier: number = 0;

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getAllArticlesDuPanier().subscribe(article=> {
      this.nombreDeProduitDansLePanier = article.reduce((total, article) => total + article.quantity, 0);
    });
  }
}