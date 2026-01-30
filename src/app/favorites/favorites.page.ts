import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { ProductService, Product } from '../shared/product.service';
import { FallbackImgDirective } from '../shared/fallback-img.directive';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, NgFor, NgIf, CurrencyPipe, DecimalPipe, RouterLink, FallbackImgDirective],
})
export class FavoritesPage implements OnInit, OnDestroy {
  favoriteProducts: Product[] = [];
  private storageListener?: () => void;
  private visibilityListener?: () => void;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadFavorites();
    // Listen for storage changes to update favorites when changed from other tabs/windows
    this.storageListener = () => this.loadFavorites();
    window.addEventListener('storage', this.storageListener);
    
    // Listen for visibility changes to refresh when tab becomes visible
    this.visibilityListener = () => {
      if (!document.hidden) {
        this.loadFavorites();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityListener);
  }

  ngOnDestroy() {
    if (this.storageListener) {
      window.removeEventListener('storage', this.storageListener);
    }
    if (this.visibilityListener) {
      document.removeEventListener('visibilitychange', this.visibilityListener);
    }
  }

  loadFavorites() {
    this.favoriteProducts = this.productService.getFavoriteProducts();
  }

  toggleWish(p: Product) {
    const favoriteIds = this.productService.getFavoriteIds();
    if (favoriteIds.has(p.id)) {
      favoriteIds.delete(p.id);
    } else {
      favoriteIds.add(p.id);
    }
    const favoritesArray = Array.from(favoriteIds);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
    this.loadFavorites();
  }

  isFavorite(productId: string): boolean {
    return this.productService.getFavoriteIds().has(productId);
  }
}
