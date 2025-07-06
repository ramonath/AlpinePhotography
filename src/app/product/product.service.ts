import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Product } from '../models/product';
import { SupabaseService } from '../supabase.service'; // Pfad ggf. anpassen

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) { }

  getProducts(): Observable<Product[]> {
    const supabase = this.supabaseService.getSupabaseClient();
  
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