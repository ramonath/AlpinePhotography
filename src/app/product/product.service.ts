import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Product } from '../models/product';
import { SupabaseService } from '../supabase.service'; 

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private supabaseService: SupabaseService) {}

  getProducts(): Observable<Product[]> {
    const supabase = this.supabaseService.getClient();
  
    return from(
      supabase.from('products').select('*')
    ).pipe(
      map(result => {
        if (result.error) {
          throw new Error(result.error.message);
        }
        return result.data as Product[];
      })
    );
  }
}