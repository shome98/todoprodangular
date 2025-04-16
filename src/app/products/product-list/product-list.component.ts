import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService, private router: Router) {
    this.products$ = this.productService.getAllProducts(); 
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe();
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }
}
