import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => (this.products = products));
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }
}
