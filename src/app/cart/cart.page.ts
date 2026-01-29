import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon],
})
export class CartPage {}
