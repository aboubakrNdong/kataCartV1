import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { ProduitService } from '../../services/produit/produit.service';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let produitServiceStub: Partial<ProduitService>;

  beforeEach(async () => {
    produitServiceStub = { //Stub créé pour le service ProduitService
      get AllArticlesDuPanier () {
        return of([
        { id: 1, productName: 'Sapiens', price: 12.61, isImported: false, category: 'Books ', quantity: 2 },
        { id: 2, productName: 'Dior sauvage 100ml', price: 73.58, isImported: true, category: 'Parfum', quantity: 3 }
      ]);
    },
  };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [{ provide: ProduitService, useValue: produitServiceStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doit afficher: le nombre de produit dans le panier est égale à 5', () => {
    expect(component.nombreDeProduitDansLePanier).toBe(5);
  });

});
