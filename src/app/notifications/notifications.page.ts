import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { ProductService } from '../shared/product.service';
import { FallbackImgDirective } from '../shared/fallback-img.directive';

interface DemoNotification {
  title: string;
  message: string;
  time: string;
  icon: string;
  type: 'order' | 'promo' | 'system';
  productId?: string;
  unread?: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, NgFor, FallbackImgDirective],
})
export class NotificationsPage {
  private productsMap = new Map<string, string>();
  view: 'unread' | 'all' = 'unread';
  notifications: DemoNotification[] = [
    {
      title: 'Payment successful',
      message: 'Your order #GP-2041 has been confirmed.',
      time: 'Just now',
      icon: 'checkmark-circle-outline',
      type: 'order',
      productId: 'p02',
      unread: true,
    },
    {
      title: 'Shipping update',
      message: 'Razer Blade 14 is out for delivery.',
      time: '2h ago',
      icon: 'car-outline',
      type: 'order',
      productId: 'p03',
      unread: true,
    },
    {
      title: 'Price drop',
      message: 'MacBook Air M2 is now 10% off.',
      time: 'Yesterday',
      icon: 'pricetag-outline',
      type: 'promo',
      productId: 'p01',
      unread: true,
    },
    {
      title: 'New arrivals',
      message: 'Check out the latest tablets in store.',
      time: '2 days ago',
      icon: 'sparkles-outline',
      type: 'promo',
      productId: 'p17',
      unread: false,
    },
    {
      title: 'Security notice',
      message: 'Your account was logged in on a new device.',
      time: '3 days ago',
      icon: 'shield-checkmark-outline',
      type: 'system',
      unread: false,
    },
  ];

  constructor(private productService: ProductService) {
    this.productsMap = new Map(
      this.productService.getAllProducts().map(p => [p.id, p.img])
    );
  }

  getProductImg(n: DemoNotification): string | null {
    if (!n.productId) return null;
    return this.productsMap.get(n.productId) ?? null;
  }

  setView(view: 'unread' | 'all') {
    this.view = view;
  }

  markAllRead() {
    this.notifications = this.notifications.map(n => ({ ...n, unread: false }));
  }

  removeNotification(idx: number) {
    this.notifications = this.notifications.filter((_, i) => i !== idx);
  }

  get filteredNotifications(): DemoNotification[] {
    if (this.view === 'unread') {
      return this.notifications.filter(n => n.unread);
    }
    return this.notifications;
  }
}
