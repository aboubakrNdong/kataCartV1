import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductsComponent } from './products.component';
import { ProduitService } from '../../services/produit/produit.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let produitServiceStub : Partial<ProduitService>; 

  beforeEach(async () => {
    produitServiceStub = { //Stub créé pour le service ProduitService
      getAllArticlesDuPanier: () => of([
        { id: 1, productName: 'Product 1', price: 10, isImported: false, category: 'Category 1', quantity: 2 },
        { id: 2, productName: 'Product 2', price: 20, isImported: true, category: 'Category 2', quantity: 3 }
      ])
    };

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
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

  it('doit afficher le prix total du produit avec les taxes create', () => {
      expect(component.calculDuPrixTotalAvecLesTaxes).toBe
    //expect(component).toBeTruthy();
  });

});
