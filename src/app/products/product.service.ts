import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../shared/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient,private alertService:AlertService) {
    this.loadInitialProducts(); 
  }

  private loadInitialProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe((products) => {
      this.productsSubject.next(products);
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.products$; 
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap((newProduct) => {
        const currentProducts = this.productsSubject.getValue();
        this.productsSubject.next([...currentProducts, { ...newProduct, id: Date.now() }]);
        this.alertService.showAlert('Product created successfully!');
      })
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap((updatedProduct) => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = currentProducts.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p));
        this.productsSubject.next(updatedProducts);
        this.alertService.showAlert('Product updated successfully!');
      })
    );
  }

  deleteProduct(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = currentProducts.filter((product) => product.id !== id);
        this.productsSubject.next(updatedProducts);
        this.alertService.showAlert('Product deleted successfully!');
      })
    );
  }
}
