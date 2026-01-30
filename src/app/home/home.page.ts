import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { ProductService, Product, CategoryKey } from '../shared/product.service';
import { CartService } from '../shared/cart.service';
import { FallbackImgDirective } from '../shared/fallback-img.directive';

interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
}

interface HeroSlide {
  title: string;
  subtitle: string;
  img: string; // URL
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonSearchbar, NgFor, NgIf, CurrencyPipe, DecimalPipe, RouterLink, FormsModule, FallbackImgDirective],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroTrack', { read: ElementRef }) heroTrack!: ElementRef<HTMLElement>;
  @ViewChild('popularTrack', { read: ElementRef }) popularTrack!: ElementRef<HTMLElement>;
  @ViewChild('bestTrack', { read: ElementRef }) bestTrack!: ElementRef<HTMLElement>;
  @ViewChild('searchbar') searchbar!: IonSearchbar;

  title = 'GadgetPro';
  profilePictureUrl = 'https://chhaiheang.onrender.com/img/pf-pic.png';
  private autoSlideInterval?: any;
  private scrollTimeout?: any;

  categories: Category[] = [
    { key: 'Laptop', label: 'Laptop', icon: 'laptop-outline' },
    { key: 'Desktop', label: 'Desktop', icon: 'desktop-outline' },
    { key: 'Tablet', label: 'Tablet', icon: 'tablet-portrait-outline' },
    { key: 'Gadgets', label: 'Gadgets', icon: 'hardware-chip-outline' },
  ];

  activeCategory: CategoryKey = 'Laptop';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  heroSlides: HeroSlide[] = [
    {
      title: 'Collection of 2026',
      subtitle: 'Fresh picks • Up to 30% off',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=70',
    },
    {
      title: 'Pro Workstations',
      subtitle: 'Power for creators',
      img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1400&q=70',
    },
    {
      title: 'Gaming Laptops',
      subtitle: 'High FPS • Cool thermals',
      img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1400&q=70',
    },
  ];

  heroIndex = 0;
  popularIndex = 0;
  bestIndex = 0;
  searchQuery = '';
  showSearch = false;

  get products(): Product[] {
    return this.productService.getAllProducts();
  }

  get filteredProducts(): Product[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.products;
    return this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  get hasSearchResults(): boolean {
    const q = this.searchQuery.trim();
    if (!q) return true;
    return this.filteredProducts.length > 0;
  }

  get popularProducts(): Product[] {
    // show 12 items like the sample row
    const filtered = this.filteredProducts.filter(p => p.category === this.activeCategory);
    return (filtered.length ? filtered : this.filteredProducts).slice(0, 12);
  }

  get bestSelling(): Product[] {
    // top items per category
    const filtered = this.filteredProducts
      .filter(p => p.category === this.activeCategory)
      .sort((a, b) => b.rating - a.rating);
    return (filtered.length ? filtered : this.filteredProducts).slice(0, 4);
  }

  get allProducts(): Product[] {
    const filtered = this.filteredProducts.filter(p => p.category === this.activeCategory);
    return filtered.length ? filtered : this.filteredProducts;
  }

  selectCategory(k: CategoryKey) {
    this.activeCategory = k;
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
  }

  isFavorite(productId: string): boolean {
    return this.productService.getFavoriteIds().has(productId);
  }

  addToCart(p: Product) {
    this.cartService.addToCart(p, 1);
  }

  isInCart(productId: string): boolean {
    return this.cartService.isInCart(productId);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchQuery = '';
      return;
    }
    setTimeout(() => this.searchbar?.setFocus(), 0);
  }

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    // Start auto-slide after view is initialized
    setTimeout(() => {
      this.startAutoSlide();
    }, 100);
  }

  ngOnDestroy() {
    this.stopAutoSlide();
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  startAutoSlide() {
    this.stopAutoSlide(); // Clear any existing interval
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // 3 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = undefined;
    }
  }

  nextSlide() {
    if (!this.heroTrack?.nativeElement) return;
    
    const track = this.heroTrack.nativeElement;
    const slideWidth = track.clientWidth;
    const gap = 14; // CSS gap value
    const nextIndex = (this.heroIndex + 1) % this.heroSlides.length;
    
    // Calculate scroll position: each slide is 100% width, gap is between slides
    const scrollPosition = nextIndex * (slideWidth + gap);
    
    this.heroIndex = nextIndex;
    track.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  onHeroScroll(ev: Event) {
    const el = ev.target as HTMLElement;
    const slideWidth = el.clientWidth || 1;
    const gap = 14;
    const scrollLeft = el.scrollLeft;
    
    // Calculate which slide is currently visible
    // Account for gap between slides
    const idx = Math.round(scrollLeft / (slideWidth + gap));
    this.heroIndex = Math.max(0, Math.min(this.heroSlides.length - 1, idx));
    
    // Throttle: Restart auto-slide after user interaction (reset timer)
    // Clear existing timeout to avoid multiple resets
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    this.stopAutoSlide();
    this.scrollTimeout = setTimeout(() => {
      this.startAutoSlide();
    }, 3000); // Wait 3 seconds before resuming auto-slide
  }

  scrollPopularTo(index: number) {
    if (!this.popularTrack?.nativeElement) return;
    const track = this.popularTrack.nativeElement;
    const gap = 12;
    const pageWidth = track.clientWidth;
    track.scrollTo({
      left: index * (pageWidth + gap),
      behavior: 'smooth'
    });
    this.popularIndex = index;
  }

  onPopularScroll(ev: Event) {
    const el = ev.target as HTMLElement;
    const gap = 12;
    const pageWidth = el.clientWidth || 1;
    const idx = Math.round(el.scrollLeft / (pageWidth + gap));
    this.popularIndex = Math.max(0, Math.min(2, idx));
  }

  scrollBestTo(index: number) {
    if (!this.bestTrack?.nativeElement) return;
    const track = this.bestTrack.nativeElement;
    const gap = 12;
    const pageWidth = track.clientWidth;
    track.scrollTo({
      left: index * (pageWidth + gap),
      behavior: 'smooth'
    });
    this.bestIndex = index;
  }

  onBestScroll(ev: Event) {
    const el = ev.target as HTMLElement;
    const gap = 12;
    const pageWidth = el.clientWidth || 1;
    const idx = Math.round(el.scrollLeft / (pageWidth + gap));
    this.bestIndex = Math.max(0, Math.min(1, idx));
  }
}
