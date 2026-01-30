import { Component, OnInit } from '@angular/core';
import { NgIf, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonToast } from '@ionic/angular/standalone';
import { ProductService, Product } from '../shared/product.service';
import { CartService } from '../shared/cart.service';
import { FallbackImgDirective } from '../shared/fallback-img.directive';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonToast, NgIf, CurrencyPipe, DecimalPipe, RouterLink, FallbackImgDirective],
})
export class ProductDetailPage implements OnInit {
  product?: Product;
  toastOpen = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.productService.getProductById(id);
    }
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product, 1);
    this.flashAdded();
  }

  buyNow() {
    if (!this.product) return;
    this.cartService.addToCart(this.product, 1);
    this.flashAdded();
    this.router.navigate(['/tabs/cart']);
  }

  isAdded(): boolean {
    return !!this.product && this.cartService.isInCart(this.product.id);
  }

  private flashAdded() {
    this.toastOpen = true;
  }
}
