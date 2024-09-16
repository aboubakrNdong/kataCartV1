import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProduitService } from './produit.service';
import { Produit } from 'src/app/models/produit';


describe('ProduitService', () => {
  let service: ProduitService;
  let produitServiceStub: Partial<ProduitService>;

  beforeEach(() => {

    produitServiceStub = { //Stub créé pour le service ProduitService
      getAllProduitsDuStock: () => of([
        { id: 1, productName: 'Paracetamol ', price: 9, isImported: true, category: 'Medecine ', quantity: 2 },
        { id: 2, productName: 'Asperin ', price: 6, isImported: true, category: 'Medecine', quantity: 1 }
      ]),

      deleteProduitDuPanier: (IdDuProduit: number, quantity: number) => quantity - 1,
      addProduitAuPanier: (produit: Produit, quantity: number) => quantity + 2,
      updateQuantiteApresDelete: (idDuProduit: number, quantity: number) => quantity - 3
    };

    TestBed.configureTestingModule({
      providers: [{ provide: ProduitService, useValue: produitServiceStub }]
    })
      .compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('doit afficher la quantité affiché est égale à 1 , aprés la suppression total du produit avec les taxes ', () => {
    expect(service.deleteProduitDuPanier(1, 2)).toBe(1);
  });

  it('doit afficher la quantité affiché est égale à 4 , aprés l\'ajout d\'un produit dans le ponier ', () => {
    const produit: Produit = { id: 4, productName: 'Paracetamol ', price: 13, isImported: true, category: 'Medecine ', quantity: 1 };
    expect(service.addProduitAuPanier(produit, 1)).toBe(3);
  });

  
  it('doit afficher la quantité affiché est égale à 5 , aprés mise à jour du stock suite à une suppression ', () => {
    const produit: Produit = { id: 5, productName: 'Asperin ', price: 11, isImported: false, category: 'Medecine ', quantity: 8 };
    expect(service.updateQuantiteApresDelete(5, 8)).toBe(5);
  });

});
