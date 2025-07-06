import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://pljcpkkoamvfkbkusqxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsamNwa2tvYW12Zmtia3VzcXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzY0NDMsImV4cCI6MjA2NzIxMjQ0M30.6va31O2X8prBWy7b9epqMrN59p2jIHkNZAN8rb7kFcU');
   }

   getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }
}
