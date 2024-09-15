import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductsComponent } from './products.component';
import { ProduitService } from '../../services/produit/produit.service';
import { Produit } from 'src/app/models/produit';
import { FormsModule } from '@angular/forms'; 


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let produitServiceStub : Partial<ProduitService>; 

  beforeEach(async () => {
    produitServiceStub = { //Stub créé pour le service ProduitService
      getAllProduitsDuStock: () => of([
        { id: 1, productName: 'Paracetamol ', price: 9, isImported: true, category: 'Medecine ', quantity: 1 },
        { id: 2, productName: 'Asperin ', price: 6, isImported: true, category: 'Medecine', quantity: 1 }
      ]),

      calculDuPrixTotalAvecLesTaxes:(produit:Produit, prix: number) => prix + 2  //mock des taxes à 2 euros 
    };

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports:[FormsModule],
      providers: [{provide: ProduitService, useValue: produitServiceStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doit afficher le prix total du produit avec les taxes ', () => {
      const produit: Produit= {  id: 1, productName: 'Paracetamol ', price: 9, isImported: true, category: 'Medecine ', quantity: 1 };
      expect(component.calculDuPrixTotalAvecLesTaxes(produit)).toBe(11);
  });

});
