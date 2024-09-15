import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartComponent } from './cart.component';

import { ProduitService } from '../../services/produit/produit.service';
import { Produit } from 'src/app/models/produit';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let produitServiceStub : Partial<ProduitService>; 


  beforeEach(async () => {

    produitServiceStub = { //Stub créé pour le service ProduitService
      getAllArticlesDuPanier: () => of([
        { id: 1, productName: 'Paracetamol ', price: 9, isImported: true, category: 'Medecine ', quantity: 1 },
        { id: 2, productName: 'Asperin ', price: 6, isImported: true, category: 'Medecine', quantity: 1 }
      ]),
      calculDuPrixTotalAvecLesTaxes:(produit: Produit, prix:number) => prix + 1,
      calculDeLaTaxeDuProduit: (produit: Produit, prix: number) => 1 // Mock implementation


    };

    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [{provide: ProduitService, useValue: produitServiceStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('il doit calculer la taxe appliquée sur le produit', () => {
    const produit: Produit= {  id: 1, productName: 'Paracetamol ', price: 9, isImported: true, category: 'Medecine ', quantity: 1 };
    expect(component.calculDuPrixTotalAvecLesTaxes(produit)).toBe(17);
  //  expect(component).toBeTruthy();
  });

});
