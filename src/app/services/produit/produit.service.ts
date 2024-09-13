import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Produit } from 'src/app/models/produit';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private produits: Produit[] = [];
  private articlesDuPanier: Produit[] = [];
  private articlesDuPanierSubject = new BehaviorSubject<Produit[]>([]);

  constructor(private http: HttpClient) {}


 //check if products are already stored, if not, fetch them from the json file

getProduits(): Observable<Produit[]> {
  if (this.produits.length > 0) {
    return of(this.produits);
  } else {
    return this.http.get<Produit[]>('assets/produits.json').pipe(
      map(produits => {
        this.produits = produits;
        return produits;
      })
    );
  }
}

 getAllArticlesDuPanier(): Observable<Produit[]> {
    return this.articlesDuPanierSubject.asObservable();
  }

  addProduitAuPanier(produit: Produit, quantity: number): void {
    const isArticleExist = this.articlesDuPanier.find(article => article.id === produit.id);
    if (isArticleExist) {
      isArticleExist.quantity += quantity;
    } else {
      this.articlesDuPanier.push({ ...produit, quantity });
    }
    this.articlesDuPanierSubject.next(this.articlesDuPanier);
  }

  //Aprés suppression d'un produit dans le panier, on update la quantity 
  updateQuantiteApresDelete(IdDuProduit: number, quantity: number): void {
    const produit = this.produits.find(p => p.id === IdDuProduit);
    if (produit) {
      produit.quantity -= quantity;
    }
  }

  deleteProduitDuPanier(IdDuProduit: number, quantity: number): void {
    const article = this.articlesDuPanier.find(article => article.id === IdDuProduit);
    if (article) {
      article.quantity -= quantity;
      if (article.quantity <= 0) {
        this.articlesDuPanier = this.articlesDuPanier.filter(article => article.id !== IdDuProduit);
      }
      this.articlesDuPanierSubject.next(this.articlesDuPanier);

      this.updateQuantiteApresDelete(IdDuProduit, quantity);
   
    }
  }
 
  
  //change this function in case it is necessary to apply the 5% on first-time products requires  

  calculDeLaTaxeDuProduit(prixDuProduitSansTaxe: number, categoryDuProduit: string, isImported: boolean): number {
    let taxeAppliqueSurLeProduit = 0;
    if (categoryDuProduit !== 'Food' && categoryDuProduit !== 'Medecine') {
      taxeAppliqueSurLeProduit += categoryDuProduit === 'Books' ? 10 : 20;
    }
    if (isImported) {
      taxeAppliqueSurLeProduit += 5;
    }
    
    const montantDeLaTaxeFinale = prixDuProduitSansTaxe * taxeAppliqueSurLeProduit / 100;
    return Math.round(montantDeLaTaxeFinale * 20) / 20; // arrondi à 2 décimal et à 0.05
  }


  calculatDuPrixTotalAvecLesTaxes(prixDuProduitSansTaxe: number, categoryDuProduit: string, isImported: boolean): number {
    const taxeFinaleApresCalcul = this.calculDeLaTaxeDuProduit(prixDuProduitSansTaxe, categoryDuProduit, isImported);
    const prixTotalTTCApresCalcul = prixDuProduitSansTaxe + taxeFinaleApresCalcul;
    return Math.round(prixTotalTTCApresCalcul * 100) / 100; // arrondi à 2 décimal après la virgule
  }
}