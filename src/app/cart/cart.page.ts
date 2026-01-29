import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { CartService, CartItem } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, NgFor, NgIf, CurrencyPipe],
})
export class CartPage implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private visibilityListener?: () => void;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
    this.visibilityListener = () => {
      if (!document.hidden) {
        this.loadCart();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityListener);
  }

  ngOnDestroy() {
    if (this.visibilityListener) {
      document.removeEventListener('visibilitychange', this.visibilityListener);
    }
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      this.removeItem(item.product.id);
    } else {
      this.cartService.updateQuantity(item.product.id, newQuantity);
      this.loadCart();
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  getTotal(): number {
    return this.cartService.getCartTotal();
  }
}
