import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private sessionId: string;

  constructor(private supabaseService: SupabaseService) {
    // Zufällige ID erzeugen oder aus localStorage laden
    const savedId = localStorage.getItem('guest_session_id');
    if (savedId) {
      this.sessionId = savedId;
    } else {
      this.sessionId = crypto.randomUUID(); // erzeugt eine eindeutige ID
      localStorage.setItem('guest_session_id', this.sessionId);
    }
  }

  addToCart(product: Product): Promise<void> {
    return this.supabaseService.addToCart(this.sessionId, product.id, 1);
  }

  getCartItems(): Promise<any[]> {
    return this.supabaseService.getCartItems(this.sessionId);
  }

  clearCart(): Promise<void> {
    return this.supabaseService.clearCart(this.sessionId);
  }

  checkout(products: Product[]): Promise<any[]> {
    return this.supabaseService.checkout(this.sessionId);
  }
}
