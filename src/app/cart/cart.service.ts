import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Product } from '../models/product';

import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiCartUrl = environment.apiUrl + "/cart";
  private apiCheckoutURL = environment.apiUrl + "/checkout";
  private userId = 'test-user'; // nur temporär, für Tests


  constructor(private supabaseService: SupabaseService) {}

  addToCart(product: Product): Promise<null> {
    return this.supabaseService.addToCart(this.userId, product.id, 1);
  }
  
  getCartItems(): Promise<Product[]> {
    return this.supabaseService.getCartItems(this.userId);
  }
  
  clearCart(): Promise<null> {
    return this.supabaseService.clearCart(this.userId);
  }
  
  checkout(products: Product[]): Promise<any[]> {
    return this.supabaseService.checkout(this.userId);
  }
}  
