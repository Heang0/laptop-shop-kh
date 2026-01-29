import { Injectable } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'cart';

  getCartItems(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as CartItem[];
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
    return [];
  }

  addToCart(product: Product, quantity: number = 1): void {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ product, quantity });
    }

    this.saveCart(cartItems);
  }

  removeFromCart(productId: string): void {
    const cartItems = this.getCartItems().filter(item => item.product.id !== productId);
    this.saveCart(cartItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const cartItems = this.getCartItems();
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart(cartItems);
    }
  }

  clearCart(): void {
    localStorage.removeItem(this.CART_STORAGE_KEY);
  }

  getCartTotal(): number {
    return this.getCartItems().reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getCartItemCount(): number {
    return this.getCartItems().reduce((count, item) => count + item.quantity, 0);
  }

  isInCart(productId: string): boolean {
    return this.getCartItems().some(item => item.product.id === productId);
  }

  private saveCart(cartItems: CartItem[]): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cartItems));
  }
}
