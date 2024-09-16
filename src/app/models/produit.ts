export interface Produit {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  isImported: boolean;
  category: string;
  selectedQuantity?: number;
}