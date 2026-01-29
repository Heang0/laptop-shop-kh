import { Component } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe, DecimalPipe } from '@angular/common';
import {
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';

type CategoryKey = 'Laptop' | 'Desktop' | 'Tablet' | 'Gadgets';

interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  img: string; // URL
  rating: number;
  tag?: string;
  badge?: string; // e.g. "-20%"
  category: CategoryKey;
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
  imports: [IonContent, IonIcon, NgFor, NgIf, CurrencyPipe, DecimalPipe],
})
export class HomePage {
  title = 'GadgetPro';

  categories: Category[] = [
    { key: 'Laptop', label: 'Laptop', icon: 'laptop-outline' },
    { key: 'Desktop', label: 'Desktop', icon: 'desktop-outline' },
    { key: 'Tablet', label: 'Tablet', icon: 'tablet-portrait-outline' },
    { key: 'Gadgets', label: 'Gadgets', icon: 'hardware-chip-outline' },
  ];

  activeCategory: CategoryKey = 'Laptop';

  heroSlides: HeroSlide[] = [
    {
      title: 'Collection of 2023',
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

  products: Product[] = [
    // Laptops (mix)
    { id: 'p01', name: 'MacBook Air M2', brand: 'Apple', price: 999, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=70', rating: 4.8, tag: 'Best value', category: 'Laptop' },
    { id: 'p02', name: 'MacBook Pro 14"', brand: 'Apple', price: 1999, img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=70', rating: 4.9, tag: 'Pro', category: 'Laptop' },
    { id: 'p03', name: 'Razer Blade 14', brand: 'Razer', price: 2599, img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=70', rating: 4.7, badge: '-15%', category: 'Laptop' },
    { id: 'p04', name: 'Dell XPS 13', brand: 'Dell', price: 1399, img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=70', rating: 4.6, category: 'Laptop' },
    { id: 'p05', name: 'Lenovo ThinkPad X1', brand: 'Lenovo', price: 1499, img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=70', rating: 4.6, badge: '-10%', category: 'Laptop' },
    { id: 'p06', name: 'ASUS ZenBook', brand: 'ASUS', price: 1199, img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=70', rating: 4.5, category: 'Laptop' },
    { id: 'p07', name: 'HP Spectre x360', brand: 'HP', price: 1299, img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=70', rating: 4.5, category: 'Laptop' },
    { id: 'p08', name: 'Acer Swift 5', brand: 'Acer', price: 1099, img: 'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=70', rating: 4.4, badge: '-20%', category: 'Laptop' },
    { id: 'p09', name: 'MSI Stealth 16', brand: 'MSI', price: 1899, img: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=800&q=70', rating: 4.6, category: 'Laptop' },
    { id: 'p10', name: 'Surface Laptop', brand: 'Microsoft', price: 1299, img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=70', rating: 4.4, category: 'Laptop' },
    { id: 'p11', name: 'LG Gram', brand: 'LG', price: 1399, img: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=800&q=70', rating: 4.5, category: 'Laptop' },
    { id: 'p12', name: 'Alienware m15', brand: 'Dell', price: 2199, img: 'https://images.unsplash.com/photo-1555617981-dac3880eac6d?auto=format&fit=crop&w=800&q=70', rating: 4.6, badge: '-12%', category: 'Laptop' },

    // Desktop
    { id: 'p13', name: 'iMac 24"', brand: 'Apple', price: 1499, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=70', rating: 4.7, category: 'Desktop' },
    { id: 'p14', name: 'Mac mini', brand: 'Apple', price: 699, img: 'https://images.unsplash.com/photo-1587202372775-a9a24c1c9d30?auto=format&fit=crop&w=800&q=70', rating: 4.7, category: 'Desktop' },
    { id: 'p15', name: 'Gaming PC Tower', brand: 'Custom', price: 1599, img: 'https://images.unsplash.com/photo-1587206664296-1d5e2e7c318e?auto=format&fit=crop&w=800&q=70', rating: 4.5, badge: '-8%', category: 'Desktop' },

    // Tablet
    { id: 'p16', name: 'iPad Pro 12.9"', brand: 'Apple', price: 1099, img: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=70', rating: 4.8, category: 'Tablet' },
    { id: 'p17', name: 'Galaxy Tab S', brand: 'Samsung', price: 799, img: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=70', rating: 4.6, badge: '-18%', category: 'Tablet' },
    { id: 'p18', name: 'Surface Pro', brand: 'Microsoft', price: 999, img: 'https://images.unsplash.com/photo-1611532736570-dd6b0975fa2d?auto=format&fit=crop&w=800&q=70', rating: 4.5, category: 'Tablet' },

    // Gadgets
    { id: 'p19', name: 'AirPods Pro', brand: 'Apple', price: 249, img: 'https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=70', rating: 4.7, category: 'Gadgets' },
    { id: 'p20', name: 'Mechanical Keyboard', brand: 'Keychron', price: 109, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=70', rating: 4.6, category: 'Gadgets' },
    { id: 'p21', name: 'Gaming Mouse', brand: 'Logitech', price: 79, img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=70', rating: 4.6, category: 'Gadgets' },
    { id: 'p22', name: 'USB-C Hub', brand: 'Anker', price: 49, img: 'https://images.unsplash.com/photo-1580894894513-541e068a3a42?auto=format&fit=crop&w=800&q=70', rating: 4.4, badge: '-25%', category: 'Gadgets' },
    { id: 'p23', name: 'Smart Watch', brand: 'Apple', price: 399, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=70', rating: 4.7, category: 'Gadgets' },
    { id: 'p24', name: 'Portable SSD', brand: 'Samsung', price: 129, img: 'https://images.unsplash.com/photo-1606813909027-67f9b9b8b97c?auto=format&fit=crop&w=800&q=70', rating: 4.6, category: 'Gadgets' },
  ];

  get popularProducts(): Product[] {
    // show 12 items like the sample row
    const filtered = this.products.filter(p => p.category === this.activeCategory);
    return (filtered.length ? filtered : this.products).slice(0, 12);
  }

  get bestSelling(): Product[] {
    // top 2 cards like sample
    const filtered = this.products
      .filter(p => p.category === this.activeCategory)
      .sort((a, b) => b.rating - a.rating);
    return (filtered.length ? filtered : this.products).slice(0, 2);
  }

  get allProducts(): Product[] {
    const filtered = this.products.filter(p => p.category === this.activeCategory);
    return filtered.length ? filtered : this.products;
  }

  selectCategory(k: CategoryKey) {
    this.activeCategory = k;
  }

  toggleWish(_p: Product) {
    // UI-only stub
  }

  onHeroScroll(ev: Event) {
    const el = ev.target as HTMLElement;
    const w = el.clientWidth || 1;
    const idx = Math.round(el.scrollLeft / w);
    this.heroIndex = Math.max(0, Math.min(this.heroSlides.length - 1, idx));
  }
}
