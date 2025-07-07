import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient(
      'https://pljcpkkoamvfkbkusqxe.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsamNwa2tvYW12Zmtia3VzcXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzY0NDMsImV4cCI6MjA2NzIxMjQ0M30.6va31O2X8prBWy7b9epqMrN59p2jIHkNZAN8rb7kFcU',
    {
      auth:{
        persistSession: true,
        // autoRefreshToken: true,
        // detectSessionInUrl: true
      }
    }
  );
}

getClient(): SupabaseClient {
  return this.supabase;
}

async addToCart(sessionId: string, productId: number, quantity: number = 1): Promise<void> {
  const { error } = await this.supabase
    .from('cart_items')
    .insert([{ session_id: sessionId, product_id: productId, quantity }]);
  if (error) throw error;
}

async getCartItems(sessionId: string): Promise<any[]> {
  const { data, error } = await this.supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      session_id,
      product_id,
      products (
        id,
        name,
        price,
        image_url
      )
    `)
    .eq('session_id', sessionId);

  if (error) throw error;
  return data;
}

async clearCart(sessionId: string): Promise<void> {
  const { error } = await this.supabase
    .from('cart_items')
    .delete()
    .eq('session_id', sessionId);
  if (error) throw error;
}

async checkout(sessionId: string): Promise<any[]> {
  const cartItems = await this.getCartItems(sessionId);
  await this.clearCart(sessionId);
  return cartItems;
}
}