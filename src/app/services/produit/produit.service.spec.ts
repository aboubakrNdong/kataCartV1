import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProduitService } from './produit.service';
import { Produit } from 'src/app/models/produit';


describe('ProduitService', () => {
  let service: ProduitService;
  let produitServiceStub : Partial<ProduitService>; 

  beforeEach(() => {

    produitServiceStub = { //Stub créé pour le service ProduitService
      getAllProduitsDuStock: () => of([
        { id: 1, productName: 'Paracetamol ', price: 9, isImported: true, category: 'Medecine ', quantity: 2 },
        { id: 2, productName: 'Asperin ', price: 6, isImported: true, category: 'Medecine', quantity: 1 }
      ]),

      deleteProduitDuPanier:(IdDuProduit:number, quantity: number) => quantity - 1  
    };

      TestBed.configureTestingModule({
     // declarations: [ ProduitService ],
      providers: [{provide: ProduitService, useValue: produitServiceStub}]
    })
    .compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('doit afficher la quantité affiché est égale à 1 , aprés la suppresssion total du produit avec les taxes ', () => {
    const produit: Produit= {  id: 1, productName: 'Paracetamol ', price: 9, isImported: true, category: 'Medecine ', quantity: 2 };
    expect(service.deleteProduitDuPanier(1, 2)).toBe(1);
});

});
