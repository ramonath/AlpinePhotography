import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  client: any;

  constructor() {
    this.supabase = createClient('https://pljcpkkoamvfkbkusqxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsamNwa2tvYW12Zmtia3VzcXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzY0NDMsImV4cCI6MjA2NzIxMjQ0M30.6va31O2X8prBWy7b9epqMrN59p2jIHkNZAN8rb7kFcU');
   }

   getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }

  async addToCart(userId: string, productId: number, quantity: number = 1) {
    const { data, error } = await this.supabase
      .from('cart_items')
      .insert([{ user_id: userId, product_id: productId, quantity }]);
    if (error) throw error;
    return data;
  }

  async getCartItems(userId: string) {
    const { data, error } = await this.supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }

  async clearCart(userId: string) {
    const { data, error } = await this.supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }

  async checkout(userId: string) {
    // Beispiel: nur löschen. Du könntest hier auch eine "orders" Tabelle anlegen.
    const cartItems = await this.getCartItems(userId);
    await this.clearCart(userId);
    return cartItems;
  }
}

