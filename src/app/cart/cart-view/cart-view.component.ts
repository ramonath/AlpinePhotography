import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  cartItems : any[] = [];
  totalPrice: number = 0; 

  constructor(private cartService: CartService){}

  async ngOnInit(): Promise<void> {
    try {
      this.cartItems = await this.cartService.getCartItems();
      this.totalPrice = this.getTotalPrice();
    } catch (error) {
      console.error('Fehler beim Laden des Warenkorbs:', error);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.products.price, 0);
  }

  async clearCart(): Promise<void> {
    try {
      await this.cartService.clearCart();
      this.cartItems = [];
      this.totalPrice = 0;
    } catch (error) {
      console.error('Fehler beim Leeren des Warenkorbs:', error);
    }
  }

  async checkout(): Promise<void> {
    try {
      await this.cartService.checkout(this.cartItems);
      this.cartItems = [];
      this.totalPrice = 0;
    } catch (error) {
      console.error('Fehler beim Checkout:', error);
    }
  }
  }

